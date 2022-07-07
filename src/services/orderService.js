import config from '../utils/config.js';
import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import localStorage from "localStorage";



//获取所有订单item
export const getAllOrderItem = () => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/orderItem/all`,
            {
                method: 'Get',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Order Service: SUCCESS IN getAllOrderItem :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Order Service: ERROR IN getAllOrderItem :', error);
                reject(error);
            });
    });
};

//获取指定用户所有订单item
export const getOrderItemByUid = (uid) => {
    return new Promise(function (resolve, reject) {
        console.log(`${config.backendUrl}/orderItem/getByUid?uid=${uid}`);
        fetch(
            `${config.backendUrl}/orderItem/getByUid?uid=${uid}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Order Service: SUCCESS IN getOrderItemByUid :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Order Service: ERROR IN getOrderItemByUid :', error);
                reject(error);
            });
    });
};

//获取指定 oid 所有订单item
export const getOrderItemByOid = (oid) => {
    return new Promise(function (resolve, reject) {
        console.log(`${config.backendUrl}/orderItem/getByOid?oid=${oid}`);
        fetch(
            `${config.backendUrl}/orderItem/getByOid?oid=${oid}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('Order Service: SUCCESS IN getOrderItemByOid :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('Order Service: ERROR IN getOrderItemByOid :', error);
                reject(error);
            });
    });
};