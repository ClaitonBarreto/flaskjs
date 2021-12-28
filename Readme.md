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

