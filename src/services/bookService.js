import config from '../utils/config.js';
import {oldRequest} from "../utils/ajax";


// export const getBooks = (data, callback) => {
//     const url = `${config.apiUrl}/getBooks`;
//     postRequest(url, data, callback);
// };
//
// export const getBook = (id, callback) => {
//     const data = {id: id};
//     const url = `${config.apiUrl}/getBook`;
//     postRequest_v2(url, data, callback);
//
// };

export const getBooks = () => {
    let url = `${config.backendUrl}/book/all`;
    let method = "GET", api_name = "bookService/getBooks";
    return oldRequest(url, method, api_name);
}

export const getBook = (bid) => {
    let url = `${config.backendUrl}/book/search?id=${bid}`;
    let method = "POST", api_name = "bookService/getBook";
    return oldRequest(url, method, api_name);
}

export const editBook = (bid, name, author, isbn, sales, stock, URL) => {
    let url = `${config.backendUrl}/book/edit?bid=${bid}&name=${name}&author=${author}&isbn=${isbn}&sales=${sales}&stock=${stock}&image=${URL}`;
    let method = "POST", api_name = "bookService/editBook";
    return oldRequest(url, method, api_name);
}

export const deleteBook = (bid) => {
    let url = `${config.backendUrl}/book/delete?bid=${bid}`;
    let method = "POST", api_name = "bookService/deleteBook";
    return oldRequest(url, method, api_name);
}

export const addBook = (name, author, price, image, description, isbn, stock) => {
    let url = `${config.backendUrl}/book/add?name=${name}&author=${author}&price=${price}&image=${image}&description=${description}&isbn=${isbn}&sales=0&stock=${stock}`;
    let method = "POST", api_name = "bookService/addBook";
    return oldRequest(url, method, api_name);
}