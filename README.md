# Climate Prediction Application

A modern, responsive web application for real-time weather information and climate prediction. Built with Python Flask backend and vanilla JavaScript frontend, featuring a beautiful UI and comprehensive weather data storage.

## Features

### 🌤️ Weather Information
- **Real-time weather data** for any city worldwide
- **5-day weather forecast** with detailed predictions
- **Comprehensive weather details**: temperature, humidity, pressure, wind speed, visibility
- **Weather icons** and visual representations

### 🗄️ Data Management
- **SQLite database** for storing searched cities and weather data
- **Search history** tracking with search counts
- **Popular cities** ranking based on search frequency
- **Persistent data storage** for all weather queries

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Gradient backgrounds** and modern styling
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Keyboard shortcuts** for better user experience

### 🚀 Performance
- **Fast API responses** with caching
- **Optimized database queries**
- **Client-side performance monitoring**
- **Offline detection** and handling

## Technology Stack

### Backend
- **Python 3.8+**
- **Flask** - Web framework
- **SQLite** - Database
- **OpenWeatherMap API** - Weather data source
- **Flask-CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript (ES6+)** - Interactive functionality
- **Font Awesome** - Icons
- **Google Fonts** - Typography

## Installation & Setup

### Prerequisites
- Python 3.8 or higher
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd climate_prediction
```

### Step 2: Create Virtual Environment
```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Configure Environment Variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file and add your OpenWeatherMap API key
WEATHER_API_KEY=your_actual_api_key_here
```

### Step 5: Run the Application
```bash
# Development mode
python backend/app.py

# Or using Flask command
export FLASK_APP=backend/app.py
flask run

# Production mode with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Weather Data
- `GET /api/weather/<city>` - Get current weather for a city
- `GET /api/forecast/<city>` - Get 5-day forecast for a city

### Data Management
- `GET /api/history` - Get search history (last 20 searches)
- `GET /api/popular` - Get popular cities (top 10 by search count)

### Example API Response
```json
{
  "success": true,
  "city": "London",
  "country": "GB",
  "coordinates": {
    "lat": 51.5074,
    "lon": -0.1278
  },
  "weather": {
    "main": "Clouds",
    "description": "Scattered Clouds",
    "icon": "03d"
  },
  "temperature": {
    "current": 15.2,
    "feels_like": 14.8,
    "min": 12.1,
    "max": 18.3
  },
  "humidity": 72,
  "pressure": 1013,
  "wind": {
    "speed": 3.5,
    "direction": 240
  },
  "visibility": 10,
  "timestamp": "2024-01-15T10:30:00"
}
```

## Database Schema

### searched_cities
- `id` - Primary key
- `city_name` - City name
- `country` - Country code
- `latitude` - Latitude coordinate
- `longitude` - Longitude coordinate
- `search_timestamp` - Last search time
- `search_count` - Number of times searched

### weather_data
- `id` - Primary key
- `city_id` - Foreign key to searched_cities
- `temperature` - Current temperature
- `feels_like` - Feels like temperature
- `humidity` - Humidity percentage
- `pressure` - Atmospheric pressure
- `weather_main` - Main weather condition
- `weather_description` - Detailed description
- `wind_speed` - Wind speed
- `wind_direction` - Wind direction in degrees
- `visibility` - Visibility in meters
- `recorded_timestamp` - Data recording time

## Usage

### Basic Weather Search
1. Enter a city name in the search box
2. Click the search button or press Enter
3. View current weather and 5-day forecast
4. Check search history and popular cities in the sidebar

### Keyboard Shortcuts
- `Enter` - Search for weather
- `Escape` - Clear search and hide results
- `Ctrl/Cmd + K` - Focus on search input

### Features in Detail

#### Search History
- Automatically tracks all searched cities
- Shows search count for each city
- Click any history item to search again
- Sorted by most recent searches

#### Popular Cities
- Ranks cities by search frequency
- Shows total search count
- Click to quickly search popular locations
- Updates in real-time

## Configuration

### Environment Variables
```bash
# Required
WEATHER_API_KEY=your_openweathermap_api_key

# Optional
FLASK_ENV=development
FLASK_DEBUG=True
DATABASE_PATH=climate_data.db
```

### OpenWeatherMap API Key
1. Sign up at [OpenWeatherMap](https://openweathermap.org/api)
2. Get your free API key
3. Add it to your `.env` file
4. The free tier allows 1000 calls per day

## Deployment

### Using Gunicorn (Production)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
```

### Using Docker (Optional)
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "backend.app:app"]
```

### Environment Setup for Production
- Set `FLASK_ENV=production`
- Use a proper WSGI server (Gunicorn, uWSGI)
- Configure reverse proxy (Nginx)
- Set up SSL/HTTPS
- Use environment variables for sensitive data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for weather data API
- [Font Awesome](https://fontawesome.com/) for icons
- [Google Fonts](https://fonts.google.com/) for typography
- Flask community for the excellent web framework
