const routes = [
    require('../routes/Home/Home')
]

const Router = {
    match(location) {
        const util = require('util');
        const route = routes.find(x => {
            return x.default.path === location.path;
        });

        if(route){
            try{
                return route.default.action();
            } catch (err) {
                return routes.find(x => x.path === '/500').action();
            }
        }else{
            return routes.find(x => x.path === '/404').action();
        }
    }
}

export default Router;