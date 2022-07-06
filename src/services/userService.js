import config from '../utils/config.js';
import {postRequest} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';
import localStorage from "localStorage";

//login logout 为老师的例子

export const login = (data) => {
    const url = `${config.apiUrl}/login`;
    const callback = (data) => {
        if (data.status >= 0) {
            localStorage.setItem('user', JSON.stringify(data.data));
            history.push("/");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, data, callback);
};

export const logout = () => {
    const url = `${config.apiUrl}/logout`;

    const callback = (data) => {
        if (data.status >= 0) {
            localStorage.removeItem("user");
            history.push("/login");
            message.success(data.msg);
        } else {
            message.error(data.msg);
        }
    };
    postRequest(url, {}, callback);
};

export const checkSession = (callback) => {
    const url = `${config.apiUrl}/checkSession`;
    postRequest(url, {}, callback);
};

//登录时验证用户信息
export const authUser = (name, password) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/user/auth?name=${name}&password=${password}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service(Auth): SUCCESS IN AUTH User :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service(Auth): ERROR IN AUTH User :', error);
                reject(error);
            });
    });
};

//注册用户
export const registerUser = (name, password , email, tel) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/user/add?name=${name}&password=${password}&email=${email}&tel=${tel}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service(register): SUCCESS IN register User :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service(register): ERROR IN register User :', error);
                reject(error);
            });
    });
};

//查询用户是否存在
export const checkUserExist = (username) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/user/exist?username=${username}`,
            {
                method: 'Get',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service: SUCCESS IN checkUserExist :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service: ERROR IN checkUserExist :', error);
                reject(error);
            });
    });
};

//获取用户所有订单
export const getAllOrder = (uid) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/order/getByUid?uid=${uid}`,
            {
                method: 'Get',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service: SUCCESS IN getAllOrder :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service: ERROR IN getAllOrder :', error);
                reject(error);
            });
    });
};
//获取所有用户
export const getAllUser = () => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/user/all`,
            {
                method: 'Get',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service: SUCCESS IN getalluser :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service: ERROR IN getalluser :', error);
                reject(error);
            });
    });
};

//修改用户状态
export const updateUserState = (uid, s) => {
    return new Promise(function (resolve, reject) {
        fetch(
            `${config.backendUrl}/user/setstate?uid=${uid}&s=${s}`,
            {
                method: 'POST',
            },
        )
            .then(response => response.json())
            .then(result => {
                console.log('User Service: SUCCESS IN updateUserState :', result);
                resolve(result);
            })
            .catch(error => {
                console.log('User Service: ERROR IN updateUserState :', error);
                reject(error);
            });
    });
};