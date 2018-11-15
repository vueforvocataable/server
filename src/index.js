const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const init = require('./config')
const router = express.Router()
const routes = require('./routes')({router, init})
const cors = require('cors')
const prod = require('./config/production')(app)

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('views', __dirname + '/views')
app.set('view engine', 'pug')
app.locals.pretty = true

app.use('/api', routes)

app.listen(init.port, () => {
    console.log(`listening port: " ${init.port}...`)
})