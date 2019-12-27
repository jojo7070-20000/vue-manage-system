import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './security/gateway/set/site/config/list',
        method: 'get',
        params: query
    });
};
