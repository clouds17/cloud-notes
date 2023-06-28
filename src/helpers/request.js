import Axios from "axios";
import baseURLConfig from "./config-baseURL";

console.log('baseURLConfig', baseURLConfig)
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
Axios.defaults.baseURL = baseURLConfig.baseURL
// 不同域名的时候，客户端存储不了服务端传过来的cookie, 设置 withCredentials(带凭证)
// chrome在2020年3月份升级了安全策略，对于跨域请求如果想写入cookie，必须是https的网站才可以。对于http的网站，cookie写入总是失败。
Axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let options = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
            options.params = data
        } else {
            options.data = data
        }

        Axios(options).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                console.error(res.data)
                reject(res.data)
            }
        }).catch(err => {
            console.error({msg: '网络异常'})
            reject({msg: '网络异常'})
        })
    })
}