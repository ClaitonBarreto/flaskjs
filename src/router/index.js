const RouterDebugger = require("../debugger/RouterDebugger");

class Router {

    app = {}
    routes = []
    groups = []
    basePath = ""

    initializePath = (app, path) => {
        if(app[path] === undefined) {
            app[path] = {};
        }
    }
    
    get = (path, middleware, handler) => {
        this.setupRoute(path, middleware, handler, "GET");
    }

    post = (path, middleware, handler) => {
        this.setupRoute(path, middleware, handler, "POST");
    }

    put = (path, middleware, handler) => {
        this.setupRoute(path, middleware, handler, "PUT");
    }

    del = (path, middleware, handler) => {
        this.setupRoute(path, middleware, handler, "DELETE");
    }

    group = (path, handler) => {
        this.groups.push(path);
        this.basePath = path;
        handler(this)
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

    setupRoute = (path, middleware, handler, method) => {
        if(this.basePath) {
            if(path === "/")
                path = this.basePath;
            else
                path = this.basePath + path;
        }

        this.routes.push({
            method,
            path,
            handler,
            middleware
        });
    }

    createRoutes = (app) => {
        this.routes.forEach(({method, path, handler, middleware}) => {

            this.initializePath(app, path);
            app[path][method] = handler;

            if(!handler) {
                app[path][method] = middleware;
                return
            }

            if(middleware) {
                app[path][method]['middleware'] = middleware;
            }

        })
        return app
    }
}

module.exports = Router;