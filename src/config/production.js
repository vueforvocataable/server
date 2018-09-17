module.exports = function(app) {
    const helmet = require('helmet');
    const compression = require('compression');

    app.use(helmet());
    app.use(compression());
}