import { Link, useNavigate } from "react-router-dom";
import React from 'react'
import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from "./Pagination ";
import { useDispatch, useSelector } from "react-redux";
function BoardList() {

    const [boardList, setBoardList] = useState([]);
    const [skip, setSkip] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const refSearch = useRef();
    const dispatch = useDispatch();

    //로딩시 리스트를뿌려줌
    useEffect(() => {
        getList()
    }, [])

    //페이지 전환
    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSkip((page - 1) * limit);
        const body = {
            skip: (page - 1) * limit,
            limit: limit
        }
        getList(body);
        setCurrentPage(page)
    }
    const [pagesing, setPagesing] = useState(<Pagination limit={limit} currentPage={currentPage} onPageChange={handlePageChange} />);

    //노드랑 DB 게시판을 가져오기위한 데이터 통신
    const getList = (body) => {

        const data = {
            limit: body ? body.limit : limit,
            currentPage: body ? body.skip : skip,
            search: refSearch.current.value
        }
        axios.post('/list', data).then((res) => {
            if (res.data.result == 'success') {
                arrBoardList(res.data.row, data);
            }
        });

        
    }

    //가져온 row 데이터를 가공해서 담아줌
    const arrBoardList = (data, page) => {
        let cnt = page.currentPage + 1;
        let device = data.map((val, index) => {
            return (
                <>
                    <tr>
                        <td>{cnt++}</td>
                        <th>
                            <Link to={"/content"} state={{ uid: val.uid }}>{val.title} </Link>
                        </th>
                        <td>{val.name}</td>
                        <td>{val.regdate}</td>
                        <td>{val.hit}</td>
                    </tr>
                </>
            )
        })

        setBoardList(device);
    }

    //검색하기
    const searchSubmit = (e) => {
        e.preventDefault();
        getList('');
        dispatch({ type: 'search', search: refSearch.current.value });
    
    }

    return (
        <>
            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        <h3>익명 게시판</h3>
                    </div>
                </div>

                <div id="board-search">
                    <div className="container">
                        <div className="search-window">
                            <form action="" className='search_form' onSubmit={searchSubmit}>
                                <div className="search-wrap">
                                    <label for="search" className="blind">공지사항 내용 검색</label>
                                    <input  id="search"  type="text" name="search" size="30" ref={refSearch} placeholder="검색어를 입력해주세요." />
                                    <button type="submit" className="btn btn-dark">검색</button>
                                </div>
                                <Link to='/write' className="btn btn-dark write">글쓰기</Link >
                            </form>
                        </div>
                    </div>
                </div>

                <div id="board-list">
                    <div className="container">
                        <table className="board-table">
                            <thead>
                                <tr>
                                    <th scope="col" className="th-num">번호</th>
                                    <th scope="col" className="th-title">제목</th>
                                    <th scope="col" className="th-name">작성자</th>
                                    <th scope="col" className="th-date">등록일</th>
                                    <th scope="col" className="th-hit">조회수</th>
                                </tr>
                            </thead>
                            <tbody>
                                {boardList}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div id="divPaging">
                   <Pagination limit={limit} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>

            </section>
        </>
    );
}

export default BoardList;