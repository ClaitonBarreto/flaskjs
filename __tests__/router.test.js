const Flask = require('../src/index')();

describe('Router Tests', () => {
    
    it('should create a router instance', () => {
    
        const router = new Flask.Router();
    
        expect(router).toBeDefined();
        expect(router.get).toBeDefined();
        expect(router.post).toBeDefined();
        expect(router.put).toBeDefined();
        expect(router.del).toBeDefined();
        expect(router.group).toBeDefined();
    })

    it('should create a router instance with declared route', () => {
        
        const router = new Flask.Router();
        
        router.get('/', () => {})

        expect(router.routes).toHaveLength(1);
        expect(router.routes[0].method).toBe('GET');
        expect(router.routes[0].path).toBe('/');
    })

    it('should create a router instance with multiple routes', () => {
            
        const router = new Flask.Router();
        
        router.get('/', () => {})
        router.get('/test', () => {})

        expect(router.routes).toHaveLength(2);
        expect(router.routes[0].method).toBe('GET');
        expect(router.routes[0].path).toBe('/');
        expect(router.routes[1].method).toBe('GET');
        expect(router.routes[1].path).toBe('/test');
    })

    it('should create a router instance with all http methods', () => {
                
        const router = new Flask.Router();
        
        router.get('/', () => {})
        router.post('/', () => {})
        router.put('/', () => {})
        router.del('/', () => {})

        expect(router.routes).toHaveLength(4);
        expect(router.routes[0].method).toBe('GET');
        expect(router.routes[0].path).toBe('/');
        expect(router.routes[1].method).toBe('POST');
        expect(router.routes[1].path).toBe('/');
        expect(router.routes[2].method).toBe('PUT');
        expect(router.routes[2].path).toBe('/');
        expect(router.routes[3].method).toBe('DELETE');
        expect(router.routes[3].path).toBe('/');
    })

    it('should create a router instance with a group route', () => {
                    
            const router = new Flask.Router();
            
            router.group('/', () => {
                router.get('/', () => {})
            })
    
            expect(router.routes).toHaveLength(1);
            expect(router.routes[0].method).toBe('GET');
            expect(router.routes[0].path).toBe('/');
    })

    it('setup route', () => {
            
        const router = new Flask.Router();
        const handler = () => {};
        const middleware = () => {};
        const path = '/';
        const method = 'GET';

        router.setupRoute(path, middleware, handler, method);

        expect(router.routes).toHaveLength(1);
        expect(router.routes[0].method).toBe(method);
        expect(router.routes[0].path).toBe(path);
        expect(router.routes[0].handler).toBe(handler);
        expect(router.routes[0].middleware).toBe(middleware);
    })

    it('should not find a undeclared route', () => {
            
            const router = new Flask.Router();
            
            router.get('/', () => {})
    
            expect(router.routes.find(r => r.path === "/test")).toBeUndefined();
    })

    it('should find a declared route', () => {
            
        const router = new Flask.Router();
        
        router.get('/user', () => {})

        expect(router.routes.find(r => r.path === "/user")).toBeDefined();
})

})