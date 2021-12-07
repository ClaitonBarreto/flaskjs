# Mini Express

## :construction: In Construction :construction: 

## A simple study project that create a Mini Framework for NodeJS

### To use the framework, runs:

```
npm install mini-expressjs
```
or
```
yarn add mini-expressjs
```

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

