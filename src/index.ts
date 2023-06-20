import { App } from './types/app.type';
import { MiniExpress } from './interfaces/mini-express.interface' 
import http, { IncomingMessage, ServerResponse } from 'http'
import UrlParser from './utils/UrlParser';
import ResponseMethods from './utils/ResponseMethods';
import { Request, Response } from './aux';

export class MiniExpressApp
implements MiniExpress {

  createApp(): App {
    const app: App = {
      Router: {},
      listen(port) {
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
      },
      use(middleware, options) {
        
      },
    }

    return app
  } 

}