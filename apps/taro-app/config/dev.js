export default {
  mini: {
    devServer: {},
  },
  h5: {
    publicPath: './', // 开发环境使用根路径
    // staticDirectory: 'assets', // 静态文件目录
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api',
          },
        },
      },
    },
  },
};
