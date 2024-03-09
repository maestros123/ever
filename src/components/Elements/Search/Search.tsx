import React, { useState } from 'react';
import styles from './Search.module.scss';
import {auth} from "../../../services/apiService";
import {Param} from "../../Layots/Main/Main";



export interface Item {
    code: string,
    title: string,
    manufacturer: string,
    description: string,
    price: string,
    stock: string
}

interface SearchProps {
    setData: React.Dispatch<React.SetStateAction<{ totalItems: number; items: Item[] }>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    param: Param,
    setParam: React.Dispatch<React.SetStateAction<Param>>,
    setPageNum: React.Dispatch<React.SetStateAction<number>>;
}


const Search = ({setData, setError, setLoading,param, setParam,setPageNum}:SearchProps) => {


    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParam({ ...param, text: e.target.value });
    };

    const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = parseInt(e.target.value, 10) || 0;
        setParam({ ...param, value: number });
    };

    function handleChangeData() {
        setPageNum(1)
        setLoading(true);
        auth(param.text, param.value, 0).then(response => {
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
            <div className={styles.field}>
                <div>
                    <p>Поиск</p>
                    <input
                        className={styles.text}
                        onChange={handleTextChange}
                        placeholder="Введите строку поиска"
                        value={param.text}
                        type="text"
                    />
                </div>

                <div>
                    <p>Кол-во</p>
                    <input
                        className={styles.count}
                        onChange={handleCountChange}
                        value={param.value.toString()}
                        type="text"
                    />
                </div>
            </div>
            <button className={styles.btn} onClick={() => handleChangeData()}>Поиск</button>
        </div>
    );
};

export default Search;
