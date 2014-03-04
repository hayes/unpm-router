var Router = require('../')
  , test = require('tape')

test('does not match routes with unmatching methods', function(t) {
  var router = Router()

  var fake_req = {method: 'post', url: '/cats'}

  router.add('get', '/cats', noop)

  t.ok(!router.match(fake_req), 'routes scoped by method')
  t.end()
})

test('matches routes as expected', function(t) {
  var fake_req = {method: 'post', url: '/cats'}
    , router = Router()

  router.add('post', '/cats', noop)

  var route = router.match(fake_req)

  t.ok(route, 'mathced!')
  t.equal(route.fn, noop, 'returned correct function')
  t.end()
})

function noop() {}
