const express = require('express')
const { Router } = express  // import the Router class
const eventModel = require('./model')

// Create a new Router instance
const router = new Router()

// POST request to create
router.post('/event', (req, res, next) => {
    eventModel
        .create(req.body)
        .then(event => {
            // send back the new event you created
            res.send(event)
        })
        .catch(next)
})

// GET request to read all events
router.get('/event', (req, res, next) => {
    // for pagination
    // limit:  the number of results on one page
    const limit = Math.min(req.query.limit || 5, 20)    // impose limit <= 20
    // offset: the number of results to skip
    const offset = Math.min(req.query.offset || 0, 1000)    // impose offset <= 1000
    eventModel
        .findAndCountAll(
            {
                limit,
                offset
            }
        )
        .then(result => {
            let events = result.rows    // array of events with limited number
            let total = result.count    // total number of events in events_table
            console.log('Events Total: ', total)
            // events is an array containing the limited num of events from the events_table
            res.send({ events, total })
        })
        .catch(next)
})

// GET request to read one event
router.get('/event/:id', (req, res, next) => {
    eventModel
        .findByPk(req.params.id)
        .then(event => {
            res.send(event)
        })
        .catch(next)
})

// PUT request to update one event
router.put('/event/:id', (req, res, next) => {
    eventModel
        .findByPk(req.params.id)
        .then(event => {
            // update the found event
            event
                .update(req.body)
                .then(() => {
                    eventModel
                        .findByPk(req.params.id)
                        .then(event => {
                            // find the updated event and send it back
                            res.send(event)
                        })
                })
        })
        .catch(next)
})

// DELETE request
router.delete('/event/:id', (req, res, next) => {
    eventModel
        .destroy(
            {
                where: {
                    id: req.params.id
                }
            }
        )
        .then(numDeleted => {
            // send the number of deleted items
            res.send({ numDeleted })
        })
        .catch(next)
})

module.exports = router