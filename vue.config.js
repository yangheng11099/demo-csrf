/*
 * @Author: yangheng 799644162@qq.com
 * @Date: 2025-04-18 16:15:47
 * @LastEditors: yangheng 799644162@qq.com
 * @LastEditTime: 2025-04-18 20:19:17
 * @FilePath: \vue3-api-demo\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue3-api-demo/'
    : '/',
  devServer: {
    https: true,
    proxy: {
      // 假设代理所有以 /api 开头的请求
      '/': {
        target: 'https://dev.178778.xyz',
        changeOrigin: true,
        // 如果需要重写路径，可以取消注释下面的代码
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    }
  }
};