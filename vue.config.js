module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        port: 3333, // 启动端口
        open: true,  // 启动后是否自动打开网页
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:20001',
                changeOrigin: true,
                // pathRewrite: {
                //     '/ssss': '' // 后段路径
                // }
            }
        }
    }
};
