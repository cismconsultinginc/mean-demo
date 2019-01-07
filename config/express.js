const config = require('./config');
const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');

module.exports = function() {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        // In dev environment use morgan to log
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        // In prod environment use compress to compress response
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Use session
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Render EJS views
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);


    // Serve static files
    app.use(express.static('./public'));

    return app;
};