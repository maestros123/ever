import axios from 'axios';
import {config} from "../config/config.development";


export const auth = (search: string, count: number, skip: number ) => {
    const { username, password } = config.credentials;
    const base64Credentials = window.btoa(`${username}:${password}`);

    return axios.get(`http://fakestock.everys.com/api/v1/Stock?filter=${search}&take=${count}&skip=${skip}`, {
        headers: {
            'Authorization': `Basic ${base64Credentials}`
        }
    })
        .then(response => {
            return response.data; // Или response.data.token, если API возвращает токен
        })
        .catch(error => {
            throw new Error(`Ошибка при получении данных: ${error}`);
        });
};
