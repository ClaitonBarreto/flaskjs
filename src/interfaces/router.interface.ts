export interface IRouter {
  get(path:string, middleware: any, handler: () => void): void;
  post(path:string, middleware: any, handler: () => void): void;
  put(path:string, middleware: any, handler: () => void): void;
  del(path:string, middleware: any, handler: () => void): void;
  setupRoute(path: string, middleware: any, handler: () => void, method: string): void;
  registerRoutes(app: any): any;
  registerPath(app:any, path:string): void;
}