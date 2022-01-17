const http = require('http');
const Router = require('./router');
const UrlParser = require('./utils/UrlParser');
const ResponseMethods = require('./utils/ResponseMethods');

const Flask = () => {
    
    const createApp = () => {
        let app = {}

        app.Router = new Router(app)

        app.listen = (port) => {
            const server = http.createServer((req, res) => {

                let queryParams = {}
                const appRoutes = Object.keys(app).filter(key => key.includes("/"));

                if(req.url.includes('?')) {
                    queryParams = UrlParser.parseQueryParams(req.url);
                    req.url = req.url.split('?')[0];
                }

                const {routeParams, route} = UrlParser.parseRouteParams(appRoutes, req.url)
                

                const handler = app[route] ? app[route][req.method] : null;
                const middleware = handler ? handler.middleware : [];

                if (handler) {
                    res.json = ResponseMethods.sendJson.bind(null, res);
                    res.status = ResponseMethods.setStatusCode.bind(null, res);

                    req.on("data", (data) => {
                        req.body = JSON.parse(data);
                    })
                    .on("end", () => {

                        if(queryParams)
                            req.query = queryParams;

                        if(routeParams)
                            req.params = routeParams;

                        if(middleware)
                            middleware(req, res, handler)
                        else
                            handler(req, res);
                    })
                } else {
                    res.writeHead(404);
                    res.end(`Cannot find ${req.url} with ${req.method} method`);
                }
            });
            server.listen(port, () => {
                console.log(`Application is started and linstening on port: ${port}`);
            });
        };

        app.use = (middleware, options) => {
            app = middleware.start(app, options);
            return app
        }
        return app;
    }

    return {
        createApp,
        Router,
    }
}

module.exports = Flask;