const redis = require('../config/redisClient.js');
const axios = require('axios')
require('dotenv').config()

async function fetchDatafromAPI(city) {
    const API_KEY = process.env.API_KEY
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&include=hours%2Cevents&key=${API_KEY}&contentType=json`

    try {
        const response = await axios(apiUrl) 
        redis.set(city, JSON.stringify(response.data), 'EX', 3600); // set data into redis cache if not yet set
        return  response.data
    }catch (error) {
        if (error.status === 400) {
            console.error("Error fetching weather data from API:", error.response.data)
            return {status: error.status, message: error.response.data }
        }
    }
}
  
async function getCachedData(city) {
    try {
        // get data from redis cache
        return await redis.get(city);
    }catch (error) {
        console.log(error) 
    }
}

async function getWeatherModel (city) {
    try {
        const cachedData = await getCachedData(city);
        
        if (cachedData) {
           return await JSON.parse(cachedData)// return response from cached data if exists
        } else {
            return await fetchDatafromAPI(city); // hit the API database
        }
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch weather data');
    }
}

module.exports = { getWeatherModel }