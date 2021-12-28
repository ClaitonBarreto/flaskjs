const MiniExpress = require('../src/index')();

describe('App Tests', () => {

    it('should create a app instance', () => {
    
        const app = MiniExpress.createApp();
    
        expect(app).toBeDefined();
        expect(app.use).toBeDefined();
        expect(app.listen).toBeDefined();
        expect(app.Router).toBeDefined();
    })

    it('should create a app instance with declared route', () => {
        
        const app = MiniExpress.createApp();
        const router = new MiniExpress.Router();

        router.get('/', (req, res) => {
            res.json({
                message: 'Hello World'
            })
        })

        app.use(router);
        app.listen(3000);
        expect(app).toBeDefined();
    })

    it('should create a app instance with declared route and middleware', () => {
            
        const app = MiniExpress.createApp();
        const router = new MiniExpress.Router();

        router.get('/', (req,res,next) => {
            return next();
        }, (req, res) => {
            res.json({
                message: 'Hello World'
            })
        })

        app.use(router, {
            debug: true
        });
        expect(app).toBeDefined();
    })

})



