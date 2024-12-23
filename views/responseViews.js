async function sendWeatherResponse(res, data) {
    await res.status(200).send({ data });
}

async function sendErrorResponses(res, error) {
    await res.status(error.status).send(error.message);
}

module.exports = { sendWeatherResponse, sendErrorResponses }