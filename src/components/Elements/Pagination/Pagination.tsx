import React, {useState} from 'react';
import {Item} from "../Search/Search";
import {Param} from "../../Layots/Main/Main";
import styles from './Pagination.module.scss'
import {auth} from "../../../services/apiService";

interface CountPages {
    data: DataState,
    setData: React.Dispatch<React.SetStateAction<{ totalItems: number; items: Item[] }>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    param: Param,
    pageNum: number,
    setPageNum: React.Dispatch<React.SetStateAction<number>>;
}
interface DataState {
    totalItems: number;
    items: Item[];
}

const Pagination = ({data, param,setData, setError, setLoading,pageNum, setPageNum}: CountPages) => {

    const totalPages = Math.round(data.totalItems / param.value);
    const [elements, setElements] = useState(0)



    function handleChangePage(direction: 'prev' | 'next') {
        if (direction === 'prev' && pageNum > 1) {
            setPageNum(prev => Math.max(prev - 1, 1))
            const tempElements = elements - param.value;
            handleChangeData(tempElements)
            setElements(tempElements)
        } else {
            setPageNum(prev => Math.min(prev + 1, totalPages))
            const tempElements = elements + param.value;
            handleChangeData(tempElements)
            setElements(tempElements)
        }
    }

    function handleChangeData(count:number) {
        setLoading(true);
        auth(param.text, param.value, count).then(response => {
            setData(response.result);
            setError('')
            setLoading(false);
        }).catch(error => {
            setError(error.message)
            setLoading(false);
        });
    }



    return (
        <div className={styles.container}>
            <p>Страница {pageNum} из {totalPages}</p>
            <div className={styles.buttons}>
                <button className={pageNum === 1 ? styles.disable : ''} onClick={() => handleChangePage('prev')}>Предыдущая</button>
                <button className={pageNum === totalPages ? styles.disable : ''} onClick={() => handleChangePage('next')}>Следующая</button>
            </div>
        </div>
    );
};

export default Pagination;