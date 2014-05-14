var Routes = require('routes')
  , url = require('url')

module.exports = Router

function Router(root) {
  if(!(this instanceof Router)) {
    return new Router(root)
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
  if(typeof method === 'object') {
    route = method.url
    method = method.method.toUpperCase()
  } else {
    method = method.toUpperCase()
  }

  route = url.parse(route, true)

  var routes = this.routers[method]
    , query = route.query
    , result

  if(!routes) {
    return
  }

  if(this.root && route.pathname.indexOf(this.root) !== 0) {
    return
  }

  route = route.pathname.slice(this.root.length)

  if(route[0] !== '/') {
    route = '/' + route
  }

  result = routes.match(route)

  if(!result) {
    return
  }

  result.query = query || {}
  result.method = method
  result.path = route

  return result
}
