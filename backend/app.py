from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import requests
import sqlite3
from datetime import datetime
import os
from typing import Dict, Any
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__, template_folder='../templates', static_folder='../static')
CORS(app)

# Configuration
WEATHER_API_KEY = os.getenv('WEATHER_API_KEY', 'your_api_key_here')
WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
FORECAST_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast'

# Database setup
DATABASE = 'climate_data.db'

def init_database():
    """Initialize the database with required tables."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS searched_cities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_name TEXT NOT NULL,
            country TEXT,
            latitude REAL,
            longitude REAL,
            search_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            search_count INTEGER DEFAULT 1
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS weather_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            city_id INTEGER,
            temperature REAL,
            feels_like REAL,
            humidity INTEGER,
            pressure INTEGER,
            weather_main TEXT,
            weather_description TEXT,
            wind_speed REAL,
            wind_direction INTEGER,
            visibility INTEGER,
            recorded_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (city_id) REFERENCES searched_cities (id)
        )
    ''')
    
    conn.commit()
    conn.close()

def get_weather_data(city: str) -> Dict[str, Any]:
    """Fetch current weather data from OpenWeatherMap API."""
    try:
        params = {
            'q': city,
            'appid': WEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(WEATHER_BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch weather data: {str(e)}")

def get_forecast_data(city: str) -> Dict[str, Any]:
    """Fetch 5-day weather forecast from OpenWeatherMap API."""
    try:
        params = {
            'q': city,
            'appid': WEATHER_API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(FORECAST_BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        
        return response.json()
    except requests.RequestException as e:
        raise Exception(f"Failed to fetch forecast data: {str(e)}")

def save_city_to_database(weather_data: Dict[str, Any]) -> int:
    """Save searched city to database and return city_id."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    city_name = weather_data['name']
    country = weather_data['sys']['country']
    latitude = weather_data['coord']['lat']
    longitude = weather_data['coord']['lon']
    
    # Check if city already exists
    cursor.execute('''
        SELECT id, search_count FROM searched_cities 
        WHERE city_name = ? AND country = ?
    ''', (city_name, country))
    
    existing_city = cursor.fetchone()
    
    if existing_city:
        # Update search count
        city_id, search_count = existing_city
        cursor.execute('''
            UPDATE searched_cities 
            SET search_count = search_count + 1, search_timestamp = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (city_id,))
    else:
        # Insert new city
        cursor.execute('''
            INSERT INTO searched_cities (city_name, country, latitude, longitude)
            VALUES (?, ?, ?, ?)
        ''', (city_name, country, latitude, longitude))
        city_id = cursor.lastrowid
    
    conn.commit()
    conn.close()
    
    return city_id

def save_weather_to_database(city_id: int, weather_data: Dict[str, Any]):
    """Save weather data to database."""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    main_data = weather_data['main']
    weather_info = weather_data['weather'][0]
    wind_data = weather_data.get('wind', {})
    
    cursor.execute('''
        INSERT INTO weather_data (
            city_id, temperature, feels_like, humidity, pressure,
            weather_main, weather_description, wind_speed, wind_direction, visibility
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        city_id,
        main_data['temp'],
        main_data['feels_like'],
        main_data['humidity'],
        main_data['pressure'],
        weather_info['main'],
        weather_info['description'],
        wind_data.get('speed', 0),
        wind_data.get('deg', 0),
        weather_data.get('visibility', 0)
    ))
    
    conn.commit()
    conn.close()

@app.route('/')
def index():
    """Serve the main application page."""
    return render_template('index.html')

@app.route('/api/weather/<city>')
def get_weather(city: str):
    """Get current weather for a city."""
    try:
        # Fetch weather data
        weather_data = get_weather_data(city)
        
        # Save to database
        city_id = save_city_to_database(weather_data)
        save_weather_to_database(city_id, weather_data)
        
        # Format response
        response = {
            'success': True,
            'city': weather_data['name'],
            'country': weather_data['sys']['country'],
            'coordinates': {
                'lat': weather_data['coord']['lat'],
                'lon': weather_data['coord']['lon']
            },
            'weather': {
                'main': weather_data['weather'][0]['main'],
                'description': weather_data['weather'][0]['description'].title(),
                'icon': weather_data['weather'][0]['icon']
            },
            'temperature': {
                'current': round(weather_data['main']['temp'], 1),
                'feels_like': round(weather_data['main']['feels_like'], 1),
                'min': round(weather_data['main']['temp_min'], 1),
                'max': round(weather_data['main']['temp_max'], 1)
            },
            'humidity': weather_data['main']['humidity'],
            'pressure': weather_data['main']['pressure'],
            'wind': {
                'speed': weather_data.get('wind', {}).get('speed', 0),
                'direction': weather_data.get('wind', {}).get('deg', 0)
            },
            'visibility': weather_data.get('visibility', 0) / 1000,  # Convert to km
            'timestamp': datetime.now().isoformat()
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/forecast/<city>')
def get_forecast(city: str):
    """Get 5-day weather forecast for a city."""
    try:
        forecast_data = get_forecast_data(city)
        
        # Process forecast data
        forecasts = []
        for item in forecast_data['list'][:5]:  # Get next 5 forecasts
            forecasts.append({
                'datetime': item['dt_txt'],
                'temperature': {
                    'temp': round(item['main']['temp'], 1),
                    'feels_like': round(item['main']['feels_like'], 1),
                    'min': round(item['main']['temp_min'], 1),
                    'max': round(item['main']['temp_max'], 1)
                },
                'weather': {
                    'main': item['weather'][0]['main'],
                    'description': item['weather'][0]['description'].title(),
                    'icon': item['weather'][0]['icon']
                },
                'humidity': item['main']['humidity'],
                'wind_speed': item.get('wind', {}).get('speed', 0)
            })
        
        response = {
            'success': True,
            'city': forecast_data['city']['name'],
            'country': forecast_data['city']['country'],
            'forecasts': forecasts
        }
        
        return jsonify(response)
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/history')
def get_search_history():
    """Get search history of cities."""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT city_name, country, search_count, search_timestamp
            FROM searched_cities
            ORDER BY search_timestamp DESC
            LIMIT 20
        ''')
        
        history = []
        for row in cursor.fetchall():
            history.append({
                'city': row[0],
                'country': row[1],
                'search_count': row[2],
                'last_searched': row[3]
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'history': history
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

@app.route('/api/popular')
def get_popular_cities():
    """Get most searched cities."""
    try:
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT city_name, country, search_count
            FROM searched_cities
            ORDER BY search_count DESC
            LIMIT 10
        ''')
        
        popular = []
        for row in cursor.fetchall():
            popular.append({
                'city': row[0],
                'country': row[1],
                'search_count': row[2]
            })
        
        conn.close()
        
        return jsonify({
            'success': True,
            'popular_cities': popular
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    init_database()
    app.run(debug=True, host='0.0.0.0', port=5000)