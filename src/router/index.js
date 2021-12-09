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
    
    get = (path, handler) => {
        this.setupRoute(path, handler, "GET");
    }

    post = (path, handler) => {
        this.setupRoute(path, handler, "POST");
    }

    put = (path, handler) => {
        this.setupRoute(path, handler, "PUT");
    }

    del = (path, handler) => {
        this.setupRoute(path, handler, "DELETE");
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

    setupRoute = (path, handler, method) => {
        if(this.basePath) {
            if(path === "/")
                path = this.basePath;
            else
                path = this.basePath + path;
        }

        this.routes.push({
            method,
            path,
            handler
        });
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