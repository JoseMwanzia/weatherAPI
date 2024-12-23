const {getWeatherModel} = require('../model/weatherModel.js');
const responseViews = require('../views/responseViews')

async function getWeather(req, res) {
    const {city} = req.params

    if (!city) {
        return responseViews.sendErrorResponses(res, 'Provide a valid city name')
    }

    try {
        const response = await getWeatherModel(city, res);

        response.status === 400 ? responseViews.sendErrorResponses(res, response) : 
        await responseViews.sendWeatherResponse(res, response);

    } catch (error) {
        console.log('weatherController error', error);
        await res.status(error.status).send(error.message)
        responseViews.sendErrorResponses(res, data)
    }
}

module.exports = { getWeather }