module.exports = ({ router, init }) => {
    const initializeDB = require('../config/db_connection');
    const voca = require('../controller/voca');

    initializeDB(db => {
        router.use('/voca', voca({init, db}));
    })

    return router;
}