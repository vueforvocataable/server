require('dotenv').config()

module.exports = {
    "port": process.env.PORT || 5001,
    "mongoUrl": process.env.mongoUrl
}