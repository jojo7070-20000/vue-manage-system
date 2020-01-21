import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './fs/config/list',
        method: 'get',
        params: query
    });
};
