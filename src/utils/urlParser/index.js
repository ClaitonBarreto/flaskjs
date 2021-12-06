class UrlParser {
    getMathRoute = (routes, url) => {
        const splitedUrl = url.split('/').filter(item => item !== '');
        const route = routes.filter(route => {
            const splitedRoute = route.split('/').filter(item => item !== '');            
            if(splitedRoute.length === splitedUrl.length) {
                let isMath = true;
                splitedRoute.forEach((item, index) => {
                    if(item.startsWith(':')) {
                        splitedUrl[index] = splitedUrl[index];
                    } else if(item !== splitedUrl[index]) {
                        isMath = false;
                    }
                });
                if(isMath) {
                    return route;
                }
            }
        })

        return route[0]
    }

    parseRouteParams = (routes, url) => {
        const routeParams = {}
        const route = this.getMathRoute(routes, url);

        if(route) {
            const splitedRoute = route.split('/').filter(item => item !== '');
            const splitedUrl = url.split('/').filter(item => item !== '');
            splitedRoute.forEach((item, index) => {
                if(item.startsWith(':')) {
                    routeParams[item.substring(1)] = splitedUrl[index];
                }
            })
        }
        return {routeParams, route};
    }
}

module.exports = new UrlParser();