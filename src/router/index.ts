import { IRouter } from "../interfaces/router.interface";
export class Router implements IRouter {

  basePath = "";
  routes: any[] = []

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  get(path: string, middleware: any, handler: () => void): void {
    this.setupRoute(path, middleware, handler, "GET");
  }
  
  post(path: string, middleware: any, handler: () => void): void {
    this.setupRoute(path, middleware, handler, "POST");
  }
  
  put(path: string, middleware: any, handler: () => void): void {
    this.setupRoute(path, middleware, handler, "PUT");
  }
  
  del(path: string, middleware: any, handler: () => void): void {
    this.setupRoute(path, middleware, handler, "DELETE");
  }

  setupRoute(path: string, middleware: any, handler: () => void, method: string): void {
    if(this.basePath) {
      if(path === "/")
        path = this.basePath
      else
        path = this.basePath + path
    }

    this.routes.push({
      method,
      path,
      handler,
      middleware
    })
  }

  registerRoutes(app: any) {
    this.routes.forEach(({ method, path, handler, middleware }) => {
      this.registerPath(app, path)
      app[path][method] = handler

      if(!handler) {
        app[path][method] = middleware
        return
      }

      if(middleware) {
        app[path][method]['middleware'] = middleware
      }
    })
  }

  registerPath(app: any, path: string): void {
    if(app[path] === undefined) {
      app[path] = {}
    }
  }
}