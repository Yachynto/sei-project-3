// const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use('/api', { target: 'http://fixie:DOTs93lGtrOQlNg@velodrome.usefixie.com:80' })
}

// module.exports = function (app) {
//   app.use(createProxyMiddleware('/api', { target: 'http://localhost:4000' }))
// }
