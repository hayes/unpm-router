var Routes = require('routes')
var url = require('url')
var qs = require('querystring')

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

  result.splats = result.splats.map(qs.unescape)

  var params = Object.keys(result.params)

  for (var i = 0, l = params.length; i < l; ++i) {
    if(result.params[params[i]]) {
      result.params[params[i]] = qs.unescape(result.params[params[i]])
    }
  }

  result.query = query || {}
  result.method = method
  result.path = route

  return result
}
