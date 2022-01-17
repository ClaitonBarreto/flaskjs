const Flask = require('../../index')();
const UrlParser = require('./index');

describe('Url Parser Tests', () => {

    it('should parse route params', () => {

        const app = Flask.createApp();
        const router = new Flask.Router();

        router.get('/:id', (req, res) => {
            res.json({
                message: 'Hello World'
            })
        })

        app.use(router);

        const appRoutes = Object.keys(app).filter(key => key.includes("/"));

        const {routeParams, route} = UrlParser.parseRouteParams(appRoutes, '/1');

        expect(routeParams).toEqual({
            id: '1'
        })
    })

})