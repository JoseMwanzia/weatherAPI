require('dotenv').config()
const WEATHER_API = process.env.WEATHER_API

  fetch(WEATHER_API)
    .then(response => response.json())
    .then((data => {
      console.dir(data, {depth: null})
    }))
    .catch(err => {
      console.error('Error Fetching Data: ', err);
    })

