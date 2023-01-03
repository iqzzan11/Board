import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import {refSearch} from './BoardList';
import { useDispatch, useSelector } from "react-redux";
const Pagination = ({ limit, currentPage, onPageChange}) => {

    const [pageCount, setPageCount] = useState(0);
    const [pages, setPages] = useState([]);
    const search = useSelector((state) => (state.search));
    console.log(search)
    let data = {
        search : search
    }
    useEffect(() => {
        axios.post('/getPageCnt',data)
            .then(
                (res) => {
                    const length = res.data.length;
                    const tmpCnt = Math.ceil(length / limit);
                    setPageCount(tmpCnt);
                    const tmpPages = Array.from({ length: tmpCnt }, (v, i) => i + 1);
                    setPages(tmpPages);
                }
            )
            .catch(err => console.log(err));
    }, [search])

    return (
        <>

            {pages.map(page => {
                if (pages.length > 0) {
                    return (
                        <div
                            className={page == currentPage ? 'current' : ''}
                            key={page}
                            onClick={() => { onPageChange(page) }}>
                            {page}
                        </div>
                    )
                }
            })}

        </>
    )
}

export default Pagination