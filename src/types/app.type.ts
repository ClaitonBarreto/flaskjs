export type App = {
  Router: any;
  listen(port: number): void;
  use(middleware: any, options?: any): void;
}