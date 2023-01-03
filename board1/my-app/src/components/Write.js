import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
function Write() {
    const refName = useRef();
    const refTitle = useRef();
    const refContent = useRef();
    const refPw = useRef();
    const nav = useNavigate();

    //빈값 입력 체크
    const [nameChk, setNameChk] = useState(false);
    const [titleChk, setTitleChk] = useState(false);
    const [contentChk, setContentChk] = useState(false);
    const [pwChk, setPwChk] = useState(false);

    //수정내용
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pw, setPw] = useState('');

    const location = useLocation();  // uid 파라미터 가져오기
    const uid = location.state?.uid;

    //로딩시 내용뿌려줌
    useEffect(() => {
        getContent()
    }, [])

    const getContent = () => {

        const data = {
            uid: uid
        }
        axios.post('/view', data).then((res) => {
            if (res.data.result == 'success') {
                
                setName(res.data.row[0].name)
                setTitle(res.data.row[0].title)
                setContent(res.data.row[0].content)
                setPw(res.data.row[0].pw)
                    // title: res.data.row[0].title,
                    // date: res.data.row[0].regdate,
                    // content: res.data.row[0].content,
                    // pw: res.data.row[0].name,
                    // hit: res.data.row[0].hit,
                    // uid: res.data.row[0].uid
                
            }
        });
    }

    //입력폼 체크
    function chkSubmit(type) {
        const name = refName.current.value;
        const title = refTitle.current.value;
        const content = refContent.current.value;
        const pw = refPw.current.value;

        const data = {
            name: name,
            title: title,
            content: content,
            pw: pw,
            uid:uid
        }

        if (name === '') {
            setNameChk(true);
        } else {
            setNameChk(false);
        }

        if (title === '') {
            setTitleChk(true);
        } else {
            setTitleChk(false);
        }

        if (content === '') {
            setContentChk(true);
        } else {
            setContentChk(false);
        }

        if (pw === '') {
            setPwChk(true);
        } else {
            setPwChk(false);
        }

        if (name && title && content && pw) {
            console.log('들어옴'+type);
            axios.post('/'+type+'', data).then((res) => {
                if(type == 'update'){
                    if (res.data.result === '등록성공') {
                        alert('수정 완료!');
                        nav('/');
                    }
                }else{
                    if (res.data === '등록성공') {
                        alert('완료!');
                        nav('/');
                    }
                }
                
            });
        }
    }

    return (
        <>
            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        <h3>글쓰기</h3>
                    </div>
                </div>
                <div className="container">
                    <table class="table">
                        <tr>
                            <td>작성자</td>
                            <td>
                                <input type="text" name="name" size="30" ref={refName} onChange={(e)=>{setName(e.target.value)}} value={name}/>
                                {nameChk ? <h6 Class='mb' style={{ color: "red" }}>&nbsp;작성자를 입력하세요.</h6> : ''}
                            </td>
                        </tr>

                        <tr>
                            <td>제목</td>
                            <td>
                                <input type="text" name="title" size="100" ref={refTitle} onChange={(e)=>{setTitle(e.target.value)}} value={title}/>
                                {titleChk ? <h6 Class='mb' style={{ color: "red" }}>&nbsp;제목을 입력하세요.</h6> : ''}
                            </td>
                        </tr>

                        <tr>
                            <td>내용</td>
                            <td>
                                {contentChk ? <h6 Class='mb' style={{ color: "red" }}>&nbsp;내용을 입력하세요.</h6> : ''}
                                <textarea name="content" cols="100" rows="20" ref={refContent} onChange={(e)=>{setContent(e.target.value)}} value={content} ></textarea>
                            </td>
                        </tr>

                        <tr>
                            <td>비밀번호</td>
                            <td>
                                <input type="password" name="pw" size="10" ref={refPw} onChange={(e)=>{setPw(e.target.value)}} value={pw}/>
                                {pwChk ? <h6 Class='mb' style={{ color: "red" }}>&nbsp;비밀번호를 입력하세요.</h6> : ''}
                            </td>
                        </tr>
                    </table>

                    <div className="foot_area">
                        {uid ?  <input type="button" onClick={() => chkSubmit('update')} className="btn btn-dark reg" value="수정" /> :  <input type="button" onClick={() => chkSubmit('reg')} className="btn btn-dark reg" value="작성" />}
                        <input type="button" onClick={() => nav(-1)} className="btn btn-dark back" value="뒤로가기" />
                    </div>

                </div >
            </section >
        </>
    )
}

export default Write;