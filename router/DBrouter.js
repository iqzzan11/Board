const express = require("express");
const DBrouter = express.Router();
const mysql = require('mysql2')

const conn = require("../config/DBConfig.js")

//게시글 가져오기
DBrouter.post('/list',(req,res)=>{
    let limit = req.body.limit;
    let currentPage = req.body.currentPage;
    let search = req.body.search;
    const sql = `select * from board where state = 1 and (title like '%${search}%' or name like '%${search}%' or content like '%${search}%')     order by uid desc limit ${currentPage}, ${limit}`;
    console.log(sql)
    conn.query(sql, [], (err, row) => { 
        if(row.length > 0){
            console.log("가져오기 성공");
            res.json({
                result: 'success',
                row: row
            });
        } else {
            console.log("가져오기 실패 : " + err);
        }
    })
})

//게시글 내용
DBrouter.post('/view',(req,res)=>{
    let uid = req.body.uid;

    const hitSql = `update board set hit = hit+1 where  uid =${uid}`;
    conn.query(hitSql, [], (err, row) => { })

    console.log(hitSql)

    const sql = `select * from board where  uid =${uid} `;
    console.log(sql)
    conn.query(sql, [], (err, row) => { 
        if(row.length > 0){
            console.log("뷰 가져오기 성공");
            res.json({
                result: 'success',
                row: row
            });
        } else {
            console.log("뷰 가져오기 실패 : " + err);
        }
    })
})

//게시글 총 카운터 가져오기
DBrouter.post('/getPageCnt',(req,res)=>{
    let search = req.body.search ? req.body.search : '' ;
    const sql = `select count(*) as cnt from board where state = 1  and (title like '%${search}%' or name like '%${search}%' or content like '%${search}%') `;
    console.log(sql)
    conn.query(sql, [], (err, row) => { 
        if(row.length > 0){
            console.log("카운터 가져오기 성공");
            res.json({
                result: 'success',
                length: row[0].cnt
            });
        } else {
            console.log("카운터 가져오기 실패 : " + err);
        }
    })
})

// 게시판 글등록
DBrouter.post("/reg", (req, res) => {
    let name = req.body.name;
    let title = req.body.title;
    let content = req.body.content;
    let pw = req.body.pw;

    console.log(req.body);
    let sql = "insert into board(name, title, content, pw, regdate ) values(?, ?, ?, ?, NOW())";
    console.log(sql);
    conn.query(sql, [name, title, content, pw], (err, row) => {
        if(row.affectedRows > 0){
            console.log("입력성공 : " + row.affectedRows);
            res.send("등록성공")
        } else {
            res.send("등록실패")
            console.log("입력실패 : " + err);
        }
    })
});

// 게시글수정
DBrouter.post("/update", (req, res) => {

    let uid = req.body.uid;
    let name = req.body.name;
    let title = req.body.title;
    let content = req.body.content;
    let pw = req.body.pw;
    console.log(req.body);

    const sql = `update board set name= ?, title=?,content=?,pw=? ,state=1 where uid = ${uid} `
    // console.log(sql+'update');
    conn.query(sql, [name, title, content, pw], (err, row) => {
        if (!err && row.affectedRows > 0) {
            console.log("수정성공 : " + row);
            res.json({
                result: "등록성공",
            })
        } else {
            res.json({
                result: "실패",
            })
            console.log("수정실패 : " + err);
        }
    })

})

// 게시글 삭제
DBrouter.post("/delete", (req, res) => {

    let uid = req.body.uid;
    let pw = req.body.pw;
    console.log(req.body);

     //비번 맞는지 체크
     const pwChkSql = `select count(*) as cnt from board  where uid = ${uid} and pw = ${pw} `;
     console.log(pwChkSql)
     conn.query(pwChkSql, [], (err, row) => {
         if (!err && row[0].cnt > 0) {
             const sql = `update board set state=0 where uid = ${uid} `
             console.log(sql);
             conn.query(sql, [], (err, row) => {
                if(row.affectedRows > 0){
                     console.log("삭제성공 : " + row);
                     res.json({
                         result: "성공",
                     })
                 } else {
                    res.json({
                        result: "삭제실패",
                    })
                     console.log("삭제실패 : " + err);
                 }
             })
         } else {
            res.json({
                result: "비번실패",
            })
             console.log("조회없음 : " + err);
         }
     })


})

module.exports = DBrouter;