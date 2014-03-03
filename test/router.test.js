var Router = require('../')
  , test = require('tape')

test('does not match routes with unmatching methods', function(t) {
  var router = Router()

  var fake_req = {method: 'post', url: '/cats'}

  router.add('get', '/cats', noop)

  t.ok(!router.match(fake_req), 'routes scoped by method')
  
  t.end()
})

function noop() {

}
