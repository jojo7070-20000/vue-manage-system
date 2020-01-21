import axios from 'axios';

let config = {
    // baseURL: 'http://localhost:8099/', // 替换关键词-作用是我们每次发送的请求都会带一个/api的前缀。
    timeout: 5000
};

if (process.env.NODE_ENV === 'development') {
    config.baseURL = 'http://127.0.0.1:20001';
    // {
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    // baseURL: 'https://www.easy-mock.com/mock/592501a391470c0ac1fab128',
    // baseURL: 'http://localhost:8099/', // 替换关键词-作用是我们每次发送的请求都会带一个/api的前缀。
    // timeout: 5000
    // }
}

let token = localStorage.getItem('token');
let headers = {
    common: {
        'Authorization': "Bearer " + token
    },
};
config.headers = headers;
console.log("================", config);

const service = axios.create(config);

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
