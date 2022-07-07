import config from '../utils/config.js';
import {postRequest, postRequest_v2} from "../utils/ajax";


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
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/book/all`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Book Service(getBooks): SUCCESS IN getBooks :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Book Service(getBooks): ERROR IN getBooks :', error);
                reject(error);
            });
    });
}

export const getBook = (bid) => {
    return new Promise(function (resolve, reject) {
        console.log(`${config.backendUrl}/book/search?id=${bid}`);
        fetch(
            `${config.backendUrl}/book/search?id=${bid}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Book Service(getBook): SUCCESS:', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Book Service(getBook): ERROR:', error);
                reject(error);
            });
    });
}

export const editBook = (bid, name, author, isbn, sales, stock) => {
    return new Promise(function (resolve, reject) {
        console.log(`${config.backendUrl}/book/edit?bid=${bid}&name=${name}&author=${author}&isbn=${isbn}&sales=${sales}&stock=${stock}`);
        fetch(
            `${config.backendUrl}/book/edit?bid=${bid}&name=${name}&author=${author}&isbn=${isbn}&sales=${sales}&stock=${stock}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Book Service(editBook): SUCCESS:', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Book Service(editBook): ERROR:', error);
                reject(error);
            });
    });
}

export const deleteBook = (bid) => {
    return new Promise(function (resolve, reject) {
        console.log(`${config.backendUrl}/book/delete?bid=${bid}`);
        fetch(
            `${config.backendUrl}/book/delete?bid=${bid}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Book Service(deleteBook): SUCCESS:', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Book Service(deleteBook): ERROR:', error);
                reject(error);
            });
    });
}

export const addBook = (name, author, price, image, description, isbn, stock) => {
    return new Promise(function (resolve, reject) {
        let url = `${config.backendUrl}/book/add?name=${name}&author=${author}&price=${price}&image=${image}&description=${description}&isbn=${isbn}&sales=0&stock=${stock}`;
        console.log(url);
        fetch(
            url,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Book Service(addBook): SUCCESS:', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Book Service(addBook): ERROR:', error);
                reject(error);
            });
    });
}