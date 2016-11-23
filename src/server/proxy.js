import proxy from 'http-proxy-middleware'

module.exports = function(app,proxies) {

  for(var i = 0, len = proxies.length; i < len; i++){
    console.log("adding proxy api: " + proxies[i].api + " to target: "+proxies[i].target);
    app.use(proxies[i].api,proxy({ target: proxies[i].target, changeOrigin: true }))
  }

}
