import config from '../utils/config.js';
import {oldRequest} from "../utils/ajax";

//获取所有订单item
export const getAllOrderItem = () => {
    let url = `${config.backendUrl}/orderItem/all`;
    let method = "GET", api_name = "orderService/getAllOrderItem";
    return oldRequest(url, method, api_name);
};

//获取所有订单
export const getAllOrderList = () => {
    let url = `${config.backendUrl}/order/all`;
    let method = "Get", api_name = "orderService/getAllOrderList";
    return oldRequest(url, method, api_name);
};

//获取指定用户所有订单item
export const getOrderItemByUid = (uid) => {
    let url = `${config.backendUrl}/orderItem/getByUid?uid=${uid}`;
    let method = "POST", api_name = "orderService/getOrderItemByUid";
    return oldRequest(url, method, api_name);
};

//获取指定 oid 所有订单item
export const getOrderItemByOid = (oid) => {
    let url = `${config.backendUrl}/orderItem/getByOid?oid=${oid}`;
    let method = "POST", api_name = "orderService/getOrderItemByOid";
    return oldRequest(url, method, api_name);
};