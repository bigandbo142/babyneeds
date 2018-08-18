import 'babel-core/register';
import React from 'react';
import ReactDOM from 'react-dom/server';
import path from 'path';
import express from 'express';
// import App from './components/App';
import Router from './core/Router';
import Html from './components/Html/Html';

const server = express();
const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, 'public')));

server.use( function(req, res, next) {

    if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
      return res.sendStatus(204);
    }
  
    return next();
  
  });

server.get('*', (req, res) => {
    const component = Router.match(req);
    const title = 'Sample Application';
    const body = ReactDOM.renderToString(component);
    
    const html = ReactDOM.renderToStaticMarkup(
        <Html
            title={title}
            description="Isomorphic javascript app"
            body={body}
        />
    )
    res.send(`<!doctype html>\n` + html);
});

server.listen(port, () => {
    console.log(`Node.js server is listening at http://localhost:${port}/`);
})