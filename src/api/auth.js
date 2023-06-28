import request from '@/helpers/request.js';

const URL = {
    // 注册用户
    REGISTER: '/auth/register',
    // 登录
    LOGIN: '/auth/login',
    // 退出登录
    LOGOUT: '/auth/logout',
    // 检查是否登录,获取用户信息
    GET_INFO: '/auth'
}

export default {
    hx_register: ({username, password}) => request(URL.REGISTER, 'POST', {username, password}) ,

    hx_login: ({username, password}) => request(URL.LOGIN, 'POST', {username, password}),

    hx_logout: () => request(URL.LOGOUT) ,

    hx_getInfo: () => request(URL.GET_INFO) 
}
