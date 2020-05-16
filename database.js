const Sequelize = require('sequelize')
const databaseURL = 'postgres://postgres:1234@localhost:5432/postgres'

// Create a new Sequelize instance
const database = new Sequelize(databaseURL)

database
    .sync(
        {
            force: false
        }
    )
    .then(() => {
        console.log("Database is connected")
    })
    .catch(console.error)

module.exports = database