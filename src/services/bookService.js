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

export const getBooksFilter = (key) => {
    let url = `${config.backendUrl}/book/filter?key=${key}`;
    let method = "POST", api_name = "bookService/getBooksFilter";
    return oldRequest(url, method, api_name);
}

export const getBookByName = (name) => {
    let url = `${config.backendUrl}/book/name?name=${name}`;
    let method = "GET", api_name = "bookService/getBookByName";
    return oldRequest(url, method, api_name);
}
export const getBooksByKind = (kind) => {
    let url = `${config.backendUrl}/book/kind?kind=${kind}`;
    let method = "GET", api_name = "bookService/getBooksByKind";
    return oldRequest(url, method, api_name);
}

export const getkindNeighbors = (kind) => {
    let url = `${config.backendUrl}/bookkind/find_neighbor_one_step?kind=${kind}`;
    let method = "GET", api_name = "bookService/getkindNeighbors";
    return oldRequest(url, method, api_name);
}

export const getBook = (bid) => {
    let url = `${config.backendUrl}/book/search?id=${bid}`;
    let method = "POST", api_name = "bookService/getBook";
    return oldRequest(url, method, api_name);
}

export const editBook = (bid, name, author, isbn, sales, stock, URL, BookIcon) => {
    let url = `${config.backendUrl}/book/edit?bid=${bid}&name=${name}&author=${author}&isbn=${isbn}&sales=${sales}&stock=${stock}&image=${URL}`;
    let method = "POST", api_name = "bookService/editBook";
    let formdata = new FormData();
    formdata.append("iconBase64", BookIcon);
    let opts = {
        method: method,
        //请求时添加Cookie
        credentials: "include",
        body: formdata,
    };
    return new Promise(function (resolve, reject) {
        fetch(url, opts)
            .then(response => response.json())
            .then(result => {
                console.log("SUCCESS in " + api_name + ":", result);
                resolve(result);
            })
            .catch(error => {
                console.log("ERROR in " + api_name + ":", error);
                reject(error);
            });
    });
}

export const deleteBook = (bid) => {
    let url = `${config.backendUrl}/book/delete?bid=${bid}`;
    let method = "POST", api_name = "bookService/deleteBook";
    return oldRequest(url, method, api_name);
}

export const addBook = (name, author, price, image, description, isbn, stock, BookIcon) => {
    let url = `${config.backendUrl}/book/add?name=${name}&author=${author}&price=${price}&image=${image}&description=${description}&isbn=${isbn}&sales=0&stock=${stock}`;
    let method = "POST", api_name = "bookService/addBook";
    let formdata = new FormData();
    formdata.append("iconBase64", BookIcon);
    let opts = {
        method: method,
        //请求时添加Cookie
        credentials: "include",
        body: formdata,
    };
    return new Promise(function (resolve, reject) {
        fetch(url, opts)
            .then(response => response.json())
            .then(result => {
                console.log("SUCCESS in " + api_name + ":", result);
                resolve(result);
            })
            .catch(error => {
                console.log("ERROR in " + api_name + ":", error);
                reject(error);
            });
    });
}