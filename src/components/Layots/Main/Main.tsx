import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import styles from './Main.module.scss';
import Search, {Item} from "../../Elements/Search/Search";
import Error from "../../Elements/Error/Error";
import Pagination from "../../Elements/Pagination/Pagination";
import Layout from "../../../templates/Layout";

export interface Param {
    text: string;
    value: number;
}
interface DataState {
    totalItems: number;
    items: Item[];
}
const Main = () => {
    const [data, setData] = useState<DataState>({ totalItems: 0, items: [] });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [param, setParam] = useState<Param>({ text: '', value: 3 });
    const [pageNum, setPageNum] = useState(1)

    return (
        <Layout showHeader={true}>
            <div className={styles.container}>
                <Search setData={setData} setError={setError} setLoading={setLoading} param={param} setParam={setParam} setPageNum={setPageNum}/>
                <div className={`${styles.tableItem} ${styles.head}`}>
                    <ul className={styles.details}>
                        <li className={styles.code}>Code</li>
                        <li className={styles.title}>Title</li>
                        <li className={styles.manufacturer}>Manufacturer</li>
                        <li className={styles.description}>Description</li>
                        <li className={styles.price}>Price</li>
                        <li className={styles.stock}>Stock</li>
                    </ul>
                </div>
                {loading ? (
                    <div className={styles.loading}>
                        <ReactLoading type="bars" color="#000000" />
                    </div>
                ) : error ? (
                    <Error error={error} />
                ) : data.items.length > 0 ? (
                    data.items.map(({ code, title, manufacturer, description, price, stock }) => (
                        <div key={code} className={`${styles.tableItem} ${styles.items}`}>
                            <ul className={styles.details}>
                                <li className={styles.code}>{code}</li>
                                <li className={styles.title}>{title}</li>
                                <li className={styles.manufacturer}>{manufacturer}</li>
                                <li className={styles.description}>{description}</li>
                                <li className={styles.price}>{price}</li>
                                <li className={styles.stock}>{stock}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>Элементы не найдены.</p>
                )}
                {
                    data.items.length > 0 && <Pagination data={data} param={param} setData={setData} setError={setError} setLoading={setLoading} pageNum={pageNum} setPageNum={setPageNum}/>
                }
            </div>
        </Layout>
    );
};

export default Main;