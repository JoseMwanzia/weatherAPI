const express = require('express')
const app = express()
const rateLimit = require('express-rate-limit');
require('dotenv').config()
const PORT = process.env.PORT
const { getWeather } = require('./controllers/weatherController.js');

// Define a rate limiter with options
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // limit each IP to 50 requests per windowMs
  message: 'Too many requests, please try again later.',
});

// Apply the rate limiter to all requests with the '/weather/' prefix
app.use('/weather/', apiLimiter)

app.get('/', (req, res) => {
  res.redirect("/weather/")
})
app.get("/weather/:city", getWeather)

app.listen(PORT, () => {
  console.log(`Server running from http://localhost:${PORT}`)
})
