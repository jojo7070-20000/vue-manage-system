import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './cdn/config/list',
        method: 'get',
        params: query
    });
};
