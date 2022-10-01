import config from '../utils/config.js';
import {oldRequest} from "../utils/ajax";
//
// //login logout 为老师的例子
//
// export const login = (data) => {
//     const url = `${config.apiUrl}/login`;
//     const callback = (data) => {
//         if (data.status >= 0) {
//             localStorage.setItem('user', JSON.stringify(data.data));
//             history.push("/");
//             message.success(data.msg);
//         } else {
//             message.error(data.msg);
//         }
//     };
//     postRequest(url, data, callback);
// };
//
// export const logout = () => {
//     const url = `${config.apiUrl}/logout`;
//
//     const callback = (data) => {
//         if (data.status >= 0) {
//             localStorage.removeItem("user");
//             history.push("/login");
//             message.success(data.msg);
//         } else {
//             message.error(data.msg);
//         }
//     };
//     postRequest(url, {}, callback);
// };

// export const checkSession = (callback) => {
//     const url = `${config.apiUrl}/checkSession`;
//     postRequest(url, {}, callback);
// };

//登录时验证用户信息
export const authUser = (name, password) => {
    let url = `${config.backendUrl}/user/auth?name=${name}&password=${password}`;
    let method = "POST", api_name = "userService/authUser";
    return oldRequest(url, method, api_name);
};

//用户登出;
export const logout = () => {
    let url = `${config.backendUrl}/user/logout`;
    let method = "GET", api_name = "userService/logout";
    return oldRequest(url, method, api_name);
};

//注册用户
export const registerUser = (name, password, email, tel) => {
    let url = `${config.backendUrl}/user/add?name=${name}&password=${password}&email=${email}&tel=${tel}`;
    let method = "POST", api_name = "userService/registerUser";
    return oldRequest(url, method, api_name);
};

//查询用户是否存在
export const checkUserExist = (username) => {
    let url = `${config.backendUrl}/user/exist?username=${username}`;
    let method = "Get", api_name = "userService/checkUserExist";
    return oldRequest(url, method, api_name);
};

//获取用户所有订单
export const getAllOrder = (uid) => {
    let url = `${config.backendUrl}/order/getByUid?uid=${uid}`;
    let method = "Get", api_name = "userService/getAllOrder";
    return oldRequest(url, method, api_name);
};
//获取所有用户
export const getAllUser = () => {
    let url = `${config.backendUrl}/user/all`;
    let method = "Get", api_name = "userService/getAllUser";
    return oldRequest(url, method, api_name);
};

//修改用户状态
export const updateUserState = (uid, s) => {
    let url = `${config.backendUrl}/user/setstate?uid=${uid}&s=${s}`;
    let method = "POST", api_name = "userService/updateUserState";
    return oldRequest(url, method, api_name);
};