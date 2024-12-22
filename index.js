const express = require('express')
const app = express()
const axios = require('axios')
const redis = require('./redisClient.js')
require('dotenv').config()
const API_KEY = process.env.API_KEY
const PORT = process.env.PORT

app.get("/weather/:city", async (req, res) => {
  const {city} = req.params
  
  try {
    // get data from redis cache
    const cachedData = await redis.get(city);
    
    if (cachedData) {
      res.send({ data: JSON.parse(cachedData) }); // send response from cached data if exists
    } else {
      // hit the API database
      const response = await axios(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours%2Cevents&key=${API_KEY}&contentType=json`)
      redis.set(city, JSON.stringify(response.data), 'EX', 3600); // set data into redis cache if not yet set
      res.send({ data: response.data }) // send response from API
    }

  } catch (error) {
    console.log('Error fetching data from weather API: ',error)
    throw new Error('Failed to fetch weather data')
  }
})

app.listen(PORT, () => {
  console.log(`App listening @ http://localhost:${PORT}`)
})
