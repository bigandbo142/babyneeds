const routes = [
    require('../routes/Home/Home'),
    require('../routes/NotFound/NotFound')
]

const Router = {
    match(location) {
        const util = require('util');
        const route = routes.find(x => {
            return x.path === location.path;
        });

        if(route){
            try{
                return route.action();
            } catch (err) {
                return routes.find(x => x.path === '/500').action();
            }
        }else{
            return routes.find(x => x.path === '/404').action();
        }
    }
}

export default Router;