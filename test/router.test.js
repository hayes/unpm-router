var Router = require('../')
  , test = require('tape')

test('does not match routes with unmatching methods', function(t) {
  t.plan(1)

  var router = Router()

  var fake_req = {method: 'post', url: '/cats'}

  router.add('get', '/cats', noop)

  t.ok(!router.match(fake_req), 'routes scoped by method')
})

test('routes are prefixable', function(t) {
  t.plan(1)

  var router = Router('/lol/')

  var fake_req = {method: 'get', url: '/lol/cats'}

  router.add('get', '/cats', noop)

  t.ok(router.match(fake_req), 'routes work behind prefix')
})

test('prefix works with / route', function(t) {
  t.plan(1)

  var router = Router('/lol/')

  var fake_req = {method: 'get', url: '/lol/'}

  router.add('get', '/', noop)

  t.ok(router.match(fake_req), '/ route works with prefix')
})

function noop() {

}
