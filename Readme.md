# Mini Express
## A simple study project that create a Mini Framework for NodeJS

### :construction: In Construction :construction: 

### To use the framework, runs:

```
npm install mini-expressjs
```
or
```
yarn add mini-expressjs
```
<br><br>
## Basic usage

```javascript

const MiniExpress = require('mini-expressjs')()

const App = MiniExpress.createApp()

const Router = new MiniExpress.Router()

Router.get('/', (request, response) => {
    response.end('Server is on')
})

App.use(Router)

App.listen(3333)
```
<br><br>
## Route debugger

The library has a internal route debugger. It shows all the routes from app in the console when start the server.

```javascript
    App.use(router, {
        debug: true
    })
```

That's enough to map routes from app and show it in your console.

<br><br>

## Route groups

```javascript

const MiniExpress = require('mini-expressjs')()

const App = MiniExpress.createApp()

const Router = new MiniExpress.Router()

Router.group('/users', (router) => {
    router.get('/', (req, res) => {
        // route /users
    })

    router.get('/:id', (req, res) => {
        // route /users/:id
    })
})

App.use(Router)

App.listen(3333)

```
<br><br>
## Route middleware

Route middleware is a code block that is executed before the 'main' route code block.

```javascript

router.get('/', (req,res,next) => {
    return next()
}, (req,res) => {
    res.json({
        message: 'OK'
    })
})
```

<br>

## Status code

We need to change the status code in the response a lot, for this, we use the ```status``` method, like this:

```javascript

    router.get('/protected-route', (req, res) => {
        if('user is not authorized') {
            res.status(401)
                .json({
                    message: 'Unauthorized'
                })
        }
    })

```
That's return a 401 status code in response header <br>

The framework provides a Http Status Code Helper Object:

```javascript

const HttpStatusCode = require('mini-express/src/utils/status-codes')

router.get('/protected-route', (req, res) => {
        if('user is not authorized') {
            res.status(HttpStatusCode.UNAUTHORIZED)
                .json({
                    message: 'Unauthorized'
                })
        }
    })

```

