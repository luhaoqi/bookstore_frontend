import config from '../utils/config.js';
import {oldRequest} from "../utils/ajax";

//获取购物车所有书
export const getAllCartItems = (uid) => {
    let url = `${config.backendUrl}/cartItem/getAllCartItems?uid=${uid}`;
    let method = "GET", api_name = "cartService/getAllCartItems";
    return oldRequest(url, method, api_name);
};

//增加一本书到购物车
export const addBookToCart = (uid, bid) => {
    let url = `${config.backendUrl}/cartItem/add?uid=${uid}&bid=${bid}`;
    let method = "POST", api_name = "cartService/addBookToCart";
    return oldRequest(url, method, api_name);
};

//增加一本书到购物车
export const deleteBookFromCart = (uid, bid) => {
    let url = `${config.backendUrl}/cartItem/delete?uid=${uid}&bid=${bid}`;
    let method = "POST", api_name = "cartService/deleteBookFromCart";
    return oldRequest(url, method, api_name);
};

export const purchaseAll = (uid, tel, address, name) => {
    let url = `${config.backendUrl}/order/purchase?uid=${uid}&tel=${tel}&address=${address}&name=${name}`;
    let method = "POST", api_name = "cartService/purchaseAll";
    return oldRequest(url, method, api_name);
};

