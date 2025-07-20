#!/usr/bin/env python3
"""
Climate Prediction Application Runner
Simple script to start the Flask application
"""

import os
import sys
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend to Python path
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))

# Import and run the app
from app import app, init_database

if __name__ == '__main__':
    # Initialize database
    init_database()
    
    # Check for API key
    api_key = os.getenv('WEATHER_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        print("⚠️  Warning: WEATHER_API_KEY not set!")
        print("Please set your OpenWeatherMap API key in the .env file")
        print("You can get a free API key at: https://openweathermap.org/api")
        print()
    
    print("🌤️  Starting Climate Prediction Application...")
    print("📍 Application will be available at: http://localhost:5000")
    print("🔑 Make sure you have set your WEATHER_API_KEY in .env file")
    print("📖 Check README.md for detailed setup instructions")
    print()
    
    # Run the application
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    )