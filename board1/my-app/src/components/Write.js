import React from 'react'
import { useNavigate } from 'react-router-dom';
function Write() {
    const nav = useNavigate();

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
                            <td><input type="text" name="name" size="30" /> </td>
                        </tr>

                        <tr>
                            <td>제목</td>
                            <td><input type="text" name="title" size="100" /></td>
                        </tr>

                        <tr>
                            <td>내용</td>
                            <td><textarea name="content" cols="100" rows="20"></textarea></td>
                        </tr>

                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" name="pw" size="10" /></td>
                        </tr>
                    </table>

                    <div className="foot_area">
                        <input type="submit"  className="btn btn-dark reg"  value="작성" />
                        <input type="button" onClick={()=>nav(-1)}  className="btn btn-dark back"  value="뒤로가기" />
                    </div>

                </div >
            </section >
        </>
    )
}

export default Write;