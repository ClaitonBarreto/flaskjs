const MiniExpress = require('../src/index')();
const http = require('http');

jest.mock('http', () => ({
    createServer: jest.fn(() => ({ listen: jest.fn() })),
}));

describe('App Tests', () => {

    it('should create a app instance', () => {
    
        const app = MiniExpress.createApp();
    
        expect(app).toBeDefined();
        expect(app.use).toBeDefined();
        expect(app.listen).toBeDefined();
        expect(app.Router).toBeDefined();
    })

    it('should create a app instance and start a server', async () => {
        
        const app = MiniExpress.createApp();

        app.listen(3000);

        expect(http.createServer).toBeCalled();
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



