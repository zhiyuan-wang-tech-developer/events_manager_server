const Sequelize = require('sequelize')
const database = require('../database')

// Define an event model
const EventModel = database.define(
    'event',
    {
        name: Sequelize.STRING,
        date: Sequelize.STRING,
        description: Sequelize.STRING
    },
    {
        tableName: 'events_table'
    }
)

module.exports = EventModel