import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState ,useRef} from 'react';
import axios from 'axios';

function Content() {
    const refPw = useRef()
    const nav = useNavigate();
    const [info, setInfo] = useState({
        name: '',
        title: '',
        date: '',
        content: '',
        pw: '',
        uid:''
    });
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
                setInfo({
                    name: res.data.row[0].name,
                    title: res.data.row[0].title,
                    date: res.data.row[0].regdate,
                    content: res.data.row[0].content,
                    pw: res.data.row[0].name,
                    hit: res.data.row[0].hit,
                    uid: res.data.row[0].uid
                })
            }
        });
    }

    //수정하기,삭제하기
    const actionData = (type) => {
        const data = {
            uid: info.uid,
            pw: refPw.current.value
        }

        if (type === 'edit') {

            axios.post('/delete', data).then((res) => {
                if (res.data.result == '성공') {
                    nav('/write', {
                        state: {
                            uid: info.uid
                        }
                    })
                } else {
                    alert('비밀번호가 틀렸습니다.')
                }
            });


        } else if (type === 'del') {
            if (window.confirm('삭제하시겠습니까?')) {

                axios.post('/delete', data).then((res) => {
                    if (res.data.result == '성공') {
                        alert('삭제성공!')
                        nav('/')
                    } else {
                        alert('비밀번호가 틀렸습니다.')
                    }
                });
            }
        }


    }

    return (
        <>
            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        <h3>글내용</h3>
                    </div>
                </div>
                <div className="container">
                    <div className='gallview_head clear ub-content'>
                        <h3 class="title ub-word">
                            <span class="title_subject">{info.title}</span><span class="title_device"></span>
                        </h3>
                        <div class="gall_writer ub-writer" >
                            <div class="fl">
                                <span class="nickname" ><em>{info.name}</em></span>
                                <span class="gall_date" >{info.date}</span>
                            </div>
                            <div class="fr">
                                <span class="gall_count">조회 {info.hit}</span>
                                <span class="gall_reply_num">추천 0</span>
                                <span class="gall_comment"><a href="#focus_cmt">댓글 0</a></span>
                            </div>
                        </div>
                    </div>
                    <div className='gallview_contents'>
                        {info.content}
        
                        <div>
                        <br/>
                            <span class="gall_pw">비밀번호 <input type='password' name='pw' ref={refPw}/></span>
                        </div>

                    </div>
                    <div className="foot_area">
                        <input type="button" className="btn btn-dark reg" onClick={() => actionData('edit')} value="수정하기" />
                        <input type="button" className="btn btn-dark reg" onClick={() => actionData('del')} value="삭제하기" />
                        <input type="button" onClick={() => nav(-1)} className="btn btn-dark back" value="뒤로가기" />
                    </div>

                </div >
            </section >
        </>
    )
}

export default Content;