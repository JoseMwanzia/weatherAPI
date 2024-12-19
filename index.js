const express = require('express')
const app = express()
const axios = require('axios')
require('dotenv').config()
const API_KEY = process.env.API_KEY
const PORT = process.env.PORT

app.get("/weather/:city", async (req, res) => {
  const {city} = req.params
  
  try {
    const response = await axios(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours%2Cevents&key=${API_KEY}&contentType=json`)
    res.send(response.data)
  } catch (error) {
    console.log('Error fetching data from weather API: ',error)
    throw new Error('Failed to fetch weather data')
  }
})

app.listen(PORT, () => {
  console.log(`App listening @ http://localhost:${PORT}`)
})
