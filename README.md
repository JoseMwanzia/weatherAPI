# Weather API with Rate Limiting and Redis Integration

This project is a Node.js-based API built with Express for fetching weather data. It incorporates rate-limiting to control request volumes, Redis for caching, and is structured in a modularized format.[@weatherProj](https://roadmap.sh/projects/weather-api-wrapper-service)

## Features

- **Express Framework**: A minimalist web framework for building APIs.
- **Rate Limiting**: Limits API usage to ensure service stability using `express-rate-limit`.
- **Redis Integration**: Improves performance by caching weather data.
- **Environment Variables**: Utilizes `.env` for secure configuration of sensitive information.
- **Modular Structure**: Organized into controllers, models, views, and configuration for scalability and maintainability.

## Project Structure

```
├── server.js                  # Main entry point of the application
├── config
│   └── redisClient.js        # Redis client configuration
├── controllers
│   └── weatherController.js  # Handles API logic and interactions
├── models
│   └── weatherModel.js       # Handles data processing and retrieval logic
├── views
│   └── responseViews.js      # Formats and sends responses
├── .env                      # Environment variables file
└── package.json              # Project dependencies and scripts
```

## Prerequisites

- **Node.js**: Ensure Node.js is installed on your machine.
- **Redis**: Install and run a Redis server.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
    npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=3000
   REDIS_HOST=<your-redis-url>
   API_KEY=<your-weather-api-key>
   ```

4. Ensure that your Redis server is running and accessible.

## Usage

1. Start the server:
   ```bash
   npm start
   ```

2. Access the API:
   ```
   http://localhost:<PORT>/weather/:city
   ```
   Replace `:city` with the name of the city you want to fetch weather data for.

## API Endpoints

### GET `/weather/:city`

Fetches weather information for the specified city.

- **Parameters**:  
  `:city` - The name of the city to fetch weather data for.

- **Response**:  
  JSON object containing weather data for the city.

- **Rate Limiting**:  
  - Maximum of **50 requests** per 15-minute window per IP.
  - If exceeded, the server responds with:
    ```json
    { "message": "Too many requests, please try again later." }
    ```

## Modules

### `server.js`
- Initializes the Express app.
- Sets up rate limiting.
- Configures the `/weather/:city` route.

### `config/redisClient.js`
- Configures and exports a Redis client for caching data.

### `controllers/weatherController.js`
- Handles logic for fetching and caching weather data.
- Uses `weatherModel.js` to interact with external APIs and `redisClient.js` for caching.

### `models/weatherModel.js`
- Defines the logic for making requests to external weather APIs.
- Retrieves and processes weather data.

### `views/responseViews.js`
- Formats and sends responses to the client.
- Handles success and error message formatting.

## Environment Variables

| Variable      | Description                                  |
|---------------|----------------------------------------------|
| `PORT`        | The port on which the server runs            |
| `REDIS_HOST`  | The URL of the Redis server                  |
| `API_KEY`     | The API key for the weather API              |

## Contributing

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License

This project is licensed under the MIT License.

