const RouterDebugger = () => {
    const debbugRoutes = (app) => {
        const methods = ['get', 'post', 'put', 'delete', 'listen', 'use', 'Router', 'Debugger', 'RouterDebugger'];
        
        const methodsColors = {
            get: '\x1b[32m',
            post: '\x1b[33m',
            put: '\x1b[34m',
            delete: '\x1b[35m',
            listen: '\x1b[36m'
        }
        const routesArray = Object.keys(app).filter(path => !methods.includes(path));

        routesArray.forEach(path => {
            const methodsInPath = Object.keys(app[path]);
            methodsInPath.forEach(method => {
                const textTerminalColor =  methodsColors[method.toLocaleLowerCase()];
                console.log(`${textTerminalColor}`, `${method.toUpperCase()}`, `${path}`, '\x1b[0m');
            })
        })
        return app
    }

    const start = (app, options) => {
        return debbugRoutes(app);
    }

    return {
        start
    }
}

module.exports = RouterDebugger;