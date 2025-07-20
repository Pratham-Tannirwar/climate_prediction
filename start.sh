#!/bin/bash

# Climate Prediction Application - Quick Start Script

echo "🌤️  Starting Climate Prediction Application..."
echo "=" * 50

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if [ ! -f "venv/pyvenv.cfg" ] || ! pip show flask > /dev/null 2>&1; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your OpenWeatherMap API key!"
fi

# Run the application
echo "🚀 Starting the application..."
python run.py