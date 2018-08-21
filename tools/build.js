import run from './run';
import del from 'del';
import ncp from 'ncp';
import Promise from 'bluebird';
import webpack from 'webpack';
import webpackConfig from './webpack.config';
import clean from './clean';

async function copy(){
    // copy everything inisde public folder and package.json to the build folder
    await ncp('public', 'build/public');
    await ncp('package.json', 'build/package.json');
}

async function bundle({ watch }) {
    return new Promise((resolve, reject) => {
        let runCount  = 1;
        const bundler = webpack(webpackConfig)
        const cb = (err, stats) => {
            if(err){
                reject(err);
                return;
            }
            console.log(stats.toString(webpackConfig[0].stats));
            
            if(++runCount === (watch ? webpackConfig.length : 1)){
                resolve();
                return;
            }
        }

        if(watch){
            bundler.watch(200, cb)
        }else {
            bundler.run(cb)
        }
    });
    
}

async function build(options = {watch : false}){    
    await run(clean);
    await run(copy);
    await run(bundle, options);
}

export default build;