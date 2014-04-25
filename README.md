unpm-router
====

HTTP router for [unpm](https://github.com/mghayes/unpm)

[![Build Status](https://travis-ci.org/hayes/unpm-router.png?branch=master)](https://travis-ci.org/hayes/unpm-router)

## usage

```js
var http = require('http')

var Router = require('unpm-router')
  , router

router = Router('/optional/root/directory')

router.add('method', 'route-to-match', handler_function)

http.createServer(function(req, res) {
  var result = router.match(req)

  if(result) {
    return result.fn(req, res, result)
  }

  res.writeHead(404)
  res.end('not found')
}).listen(4444)
```

## notes

Internally, unpm-router uses [routes](http://npm.im/routes) for route matching,
so all of its handy pattern matching functionality is available.

## license

MIT
