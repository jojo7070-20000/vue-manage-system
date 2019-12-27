import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './security/gateway/config/list',
        method: 'get',
        params: query
    });
};
