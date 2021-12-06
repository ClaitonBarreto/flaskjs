const RouterDebugger = require("../debugger/RouterDebugger");

class Router {

    app = {}
    routes = []
    groups = []

    initializePath = (app, path) => {
        if(app[path] === undefined) {
            app[path] = {};
        }
    }
    
    get = (path, handler) => {
        this.routes.push({
            method: 'GET',
            path: path,
            handler: handler
        });
    }

    post = (path, handler) => {
        this.routes.push({
            method: 'POST',
            path: path,
            handler: handler
        });
    }

    put = (path, handler) => {
        this.routes.push({
            method: 'PUT',
            path: path,
            handler: handler
        });
    }

    del = (path, handler) => {
        this.routes.push({
            method: 'DELETE',
            path: path,
            handler: handler
        });
    }

    group = (path) => {
        this.groups.push({
            path: path,
        });
        
        return {...this, ...this.groups.find(group => group.path === path)}
    }

    start = (app, options) => {
        const withRoutesApp = this.createRoutes(app)
        if(options) {
            if(options.debug) {
                RouterDebugger().start(withRoutesApp);
            }
        }

        return withRoutesApp;
    }

    createRoutes = (app) => {
        this.routes.forEach(({method, path, handler}) => {
            this.initializePath(app, path);
            app[path][method] = handler;
        })
        return app
    }
}

module.exports = Router;