import React from 'react';

const Html = (props) =>
<html>
    <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="id=edge" />
        <title>{props.title || ''}</title>
        <meta name="description" content={props.description || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="client.js" />
    </head>
    <body>
        <div id="app" dangerouslySetInnerHTML={{__html : props.body}} />
    </body>
</html>;

export default Html;

