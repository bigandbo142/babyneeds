import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { static as staticMiddleware } from 'express';
import run from './run';
import build from './build';
import runServer from './runServer';
import webpackConfig from './webpack.config';
import BrowserSync from 'browser-sync';


async function start() {
    // await run(require('./clean'));
    const watch = true;
    await run(build, { watch });
    await new Promise((resolve) => {
      // Inject HMR functionality into client-side bundle configurations
      /* eslint-disable no-param-reassign */
      webpackConfig.filter(x => x.target !== 'node').forEach((x) => {
        x.entry = [x.entry, 'webpack-hot-middleware/client'];
        // x.plugins.push(new webpack.HotModuleReplacementPlugin());
        // x.plugins.push(new webpack.NoEmitOnErrorsPlugin());
      });
      /* eslint-enable no-param-reassign */
  
      const bundler = webpack(webpackConfig);
      const middleware = [
        webpackDevMiddleware(bundler, {
          stats: webpackConfig[0].stats
        }),
        ...(bundler.compilers
          .filter(compiler => compiler.options.target !== 'node')
          .map(compiler => webpackHotMiddleware(compiler)))
      ];
      let handleServerBundleComplete = () => {
        runServer((err, host) => {
          if (!err) {
            const bs = BrowserSync.create();
            bs.init({
              proxy: { target: host, middleware },
              serveStatic: [
                path.join(__dirname, '../public')
              ]
            }, resolve);
            handleServerBundleComplete = () => runServer();
          }
        });
      };
  
      bundler.plugin('done', () => handleServerBundleComplete());
    });
  }
  
  export default start;
  