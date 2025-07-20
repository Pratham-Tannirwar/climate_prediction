#!/usr/bin/env python3
"""
Test script to verify the Climate Prediction Application setup
"""

import os
import sys
import sqlite3
from pathlib import Path

def check_requirements():
    """Check if all required files and dependencies exist."""
    print("🔍 Checking project setup...")
    
    required_files = [
        'backend/app.py',
        'templates/index.html',
        'static/css/style.css',
        'static/js/app.js',
        'requirements.txt',
        '.env',
        'README.md'
    ]
    
    missing_files = []
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Missing files: {', '.join(missing_files)}")
        return False
    else:
        print("✅ All required files present")
        return True

def check_python_packages():
    """Check if required Python packages are installed."""
    print("\n🔍 Checking Python packages...")
    
    required_packages = [
        'flask',
        'flask_cors',
        'requests',
        'python-dotenv'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
        except ImportError:
            missing_packages.append(package)
    
    if missing_packages:
        print(f"❌ Missing packages: {', '.join(missing_packages)}")
        print("Run: pip install -r requirements.txt")
        return False
    else:
        print("✅ All required packages installed")
        return True

def check_environment():
    """Check environment variables."""
    print("\n🔍 Checking environment configuration...")
    
    if not os.path.exists('.env'):
        print("❌ .env file not found")
        print("Copy .env.example to .env and set your API key")
        return False
    
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv('WEATHER_API_KEY')
    if not api_key or api_key == 'your_api_key_here':
        print("⚠️  Weather API key not configured")
        print("Get your free API key from: https://openweathermap.org/api")
        print("Then update WEATHER_API_KEY in .env file")
        return False
    else:
        print("✅ Environment variables configured")
        return True

def test_database():
    """Test database functionality."""
    print("\n🔍 Testing database setup...")
    
    try:
        # Import the app to initialize database
        sys.path.append('backend')
        from app import init_database, DATABASE
        
        # Initialize database
        init_database()
        
        # Test connection
        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        
        # Check tables exist
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = [row[0] for row in cursor.fetchall()]
        
        expected_tables = ['searched_cities', 'weather_data']
        if all(table in tables for table in expected_tables):
            print("✅ Database initialized successfully")
            conn.close()
            return True
        else:
            print(f"❌ Missing database tables: {expected_tables}")
            conn.close()
            return False
            
    except Exception as e:
        print(f"❌ Database error: {e}")
        return False

def main():
    """Run all checks."""
    print("🌤️  Climate Prediction Application - Setup Test")
    print("=" * 50)
    
    checks = [
        check_requirements(),
        check_python_packages(),
        check_environment(),
        test_database()
    ]
    
    print("\n" + "=" * 50)
    
    if all(checks):
        print("🎉 All checks passed! Your application is ready to run.")
        print("\n📍 To start the application:")
        print("   python run.py")
        print("\n🌐 Then visit: http://localhost:5000")
        print("\n🔑 Don't forget to set your OpenWeatherMap API key in .env file!")
    else:
        print("❌ Some checks failed. Please fix the issues above.")
        sys.exit(1)

if __name__ == '__main__':
    main()