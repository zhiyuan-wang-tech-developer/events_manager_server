const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const database = require('./database')
const eventModel = require('./event/model')
const eventRouter = require('./event/router')

// Creata an express API server app
const app = express()
// API server port
const port = 4000

// Enable Cross-Origin-Resource-Sharing
// cors() returns a middleware
// cors() needs to add the header 'Access-Control-Allow-Origin' first
const corsMiddleware = cors()
// The order matters: make sure you register cors() before all other middlewares and routes
app.use(corsMiddleware)     // Add header field 'Access-Control-Allow-Origin: *'

const parserMiddleware = bodyParser.json()
// The request body must be parsed before the request is handled.
// Otherwise, the JSON body will be unreadable.
app.use(parserMiddleware)   // Parse request json body

app.use(eventRouter)

// GET request test
app.get('/test', (req, res) => {
    res.send("Backend server is working now!")
})

// To start API server
app.listen(port, () => {
    console.log(`RESTful API server is listening on port ${port}`)
})