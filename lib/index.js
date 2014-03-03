var qs = require('querystring')
  , Routes = require('routes')
  , path = require('path')
  , url = require('ur')

module.exports = Router

function Router(root) {
  if(!(this instanceof Router)) {
    return new Router(app, not_found, root)
  }

  this.routers = {}
  this.root = root || ''
}

Router.prototype.add = function add(method, pattern, handler) {
  method = method.toUpperCase()

  if(!this.routers[method]) {
    this.routers[method] = Routes()
  }

  this.routers[method].addRoute(pattern, handler)
}

Router.prototype.match = function match(method, route) {
  if(typeof method === object) {
    method.method.toUpperCase()
    route = url.req.url
  }

  route = url.parse(route, true)

  var routes = this.routers[method]
    , query = url.query
    , result

  if(this.root && route.indexOf(this.root) !== 0) {
    return
  }

  route = path.relative(root, route.pathname)

  if(route.charAt(0) !== '/') {
    route = '/' + route
  }

  result = routes.match(route)

  if(!result) {
    return
  }

  result.query = query

  return result
}
