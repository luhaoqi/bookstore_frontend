import config from '../utils/config.js';


//获取购物车所有书
export const getAllCartItems = (uid) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/cartItem/getAllCartItems?uid=${uid}`,
            {
                method: 'GET',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Cart Service(Auth): SUCCESS IN getAllCartItems :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Cart Service(Auth): ERROR IN getAllCartItems :', error);
                reject(error);
            });
    });
};

//增加一本书到购物车
export const addBookToCart = (uid, bid) => {
    console.log(`${config.backendUrl}/cartItem/add?uid=${uid}&bid=${bid}`);
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/cartItem/add?uid=${uid}&bid=${bid}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Cart Service(Auth): SUCCESS IN addBookToCart :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Cart Service(Auth): ERROR IN addBookToCart :', error);
                reject(error);
            });
    });
};

//增加一本书到购物车
export const deleteBookFromCart = (uid, bid) => {
    console.log(`${config.backendUrl}/cartItem/delete?uid=${uid}&bid=${bid}`);
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/cartItem/delete?uid=${uid}&bid=${bid}`,
            {
                method: 'POST',
            },
        )
            .then(response => {
                return response.json();
            })
            .then(result => {
                console.log('Cart Service(Auth): SUCCESS IN deleteBookFromCart :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Cart Service(Auth): ERROR IN deleteBookFromCart :', error);
                reject(error);
            });
    });
};

export const purchaseAll = (uid, tel, address, name) => {
    console.log(`{config.backendUrl}/order/purchase?uid=${uid}&tel=${tel}&address=${address}&name=${name}`);
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/order/purchase?uid=${uid}&tel=${tel}&address=${address}&name=${name}`,
            {
                method: 'POST',
            },
        )
            .then(response => {
                return response;
            })
            .then(result => {
                console.log('Cart Service(Auth): SUCCESS IN purchaseAll :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Cart Service(Auth): ERROR IN purchaseAll :', error);
                reject(error);
            });
    });
};

