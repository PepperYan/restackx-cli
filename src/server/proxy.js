import proxy from 'http-proxy-middleware'

module.exports = function(app,url) {

  app.use('/chameleon-qdt-api',proxy({ target: "http://"+url+":8088", changeOrigin: true }))

  //
  // 匹配所有模块的api路径，代理之
  // 例如：
  // "/security/api/v1/xxxx"
  // "workflow/api/v1/xxx"
  //
  //app.use('/:module/api', proxy({ target: "http://kong.appbricks.io", changeOrigin: true }))
  app.use('/:module/api', proxy({ target: "http://kong.appbricks.io", changeOrigin: true }))


}
