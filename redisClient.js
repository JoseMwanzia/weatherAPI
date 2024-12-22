const Redis = require('ioredis')
require('dotenv').config()

// create a connection to Redis
const redis = new Redis(process.env.REDIS_HOST)

redis.on('error', () => {
    console.error(`An error occured during Redis connection, Check redisClient.js file!`)
})

redis.on('connect', () => {
    console.log(`Connection to Redis succesfull`)
})

module.exports = redis