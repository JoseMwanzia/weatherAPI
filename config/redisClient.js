const Redis = require('ioredis')
require('dotenv').config()

// create a connection to Redis
const redis = new Redis(process.env.REDIS_HOST)

redis.on('error', (err) => {
    console.error(`An error occured during Redis connection, Check redisClient.js file!`, err)
})

redis.on('connect', () => {
    console.log(`Connection to Redis is succesfull`)
})

module.exports = redis