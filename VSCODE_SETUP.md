# VS Code Setup Guide - Climate Prediction App

## 🚀 Quick Start in VS Code

### Method 1: Open Workspace File (Recommended)
1. **Open VS Code**
2. **File → Open Workspace from File**
3. **Select `climate_prediction.code-workspace`**
4. **Install recommended extensions** when prompted

### Method 2: Open Folder
1. **Open VS Code**
2. **File → Open Folder**
3. **Select the `climate_prediction` folder**
4. **Install recommended extensions** from the popup

## 📦 Required VS Code Extensions

When you open the project, VS Code will automatically suggest these extensions:

### Essential Extensions
- **Python** (`ms-python.python`) - Python language support
- **Flake8** (`ms-python.flake8`) - Python linting
- **Black Formatter** (`ms-python.black-formatter`) - Python code formatting
- **Prettier** (`esbenp.prettier-vscode`) - HTML/CSS/JS formatting

### Helpful Extensions
- **Auto Rename Tag** (`formulahendry.auto-rename-tag`) - HTML tag renaming
- **Path Intellisense** (`christian-kohler.path-intellisense`) - File path autocompletion
- **Live Server** (`ritwickdey.liveserver`) - Live preview for HTML files
- **REST Client** (`humao.rest-client`) - Test API endpoints
- **GitLens** (`eamodio.gitlens`) - Enhanced Git integration

## 🔧 VS Code Configuration

The project includes pre-configured VS Code settings:

### `.vscode/settings.json`
- Python interpreter set to `./venv/bin/python`
- Auto-formatting enabled
- Linting configured
- File associations set up

### `.vscode/launch.json`
Debug configurations:
- **Python: Flask App** - Run the main application
- **Python: Flask Backend Only** - Run just the backend
- **Python: Test Setup** - Run setup verification

### `.vscode/tasks.json`
Quick tasks available via `Ctrl+Shift+P` → "Tasks: Run Task":
- **Setup Virtual Environment**
- **Install Dependencies**
- **Run Flask App**
- **Test Setup**
- **Format Python Code**
- **Lint Python Code**
- **Open in Browser**

## 🏃‍♂️ Running the App in VS Code

### Option 1: Using Debug Panel
1. **Open Debug Panel** (`Ctrl+Shift+D`)
2. **Select "Run Climate App"** from dropdown
3. **Press F5** or click the green play button

### Option 2: Using Terminal
1. **Open Terminal** (`Ctrl+` `)
2. **Run**: `python run.py`

### Option 3: Using Tasks
1. **Press** `Ctrl+Shift+P`
2. **Type**: "Tasks: Run Task"
3. **Select**: "Run Flask App"

### Option 4: Using Keyboard Shortcut
- **Press** `Ctrl+F5` to run without debugging

## 🛠️ Development Workflow in VS Code

### 1. Initial Setup
```bash
# Terminal in VS Code (Ctrl+`)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env file with your API key
```

### 2. Daily Development
1. **Open VS Code workspace**
2. **Terminal auto-activates virtual environment**
3. **Edit code with IntelliSense support**
4. **Auto-formatting on save**
5. **Run/Debug with F5**

### 3. Testing
- **Run tests**: Use "Test Setup" debug configuration
- **API testing**: Use REST Client extension with `.http` files

## 📁 Project Structure in VS Code

```
climate_prediction/
├── .vscode/                    # VS Code configuration
│   ├── settings.json          # Workspace settings
│   ├── launch.json            # Debug configurations
│   ├── tasks.json             # Custom tasks
│   └── extensions.json        # Recommended extensions
├── backend/
│   └── app.py                 # Flask application
├── templates/
│   └── index.html             # HTML template
├── static/
│   ├── css/style.css          # Stylesheets
│   └── js/app.js              # JavaScript
├── venv/                      # Virtual environment
├── climate_prediction.code-workspace  # VS Code workspace file
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables
├── run.py                     # Application launcher
└── README.md                  # Documentation
```

## ⌨️ Useful VS Code Shortcuts

### General
- `Ctrl+Shift+P` - Command Palette
- `Ctrl+` ` - Toggle Terminal
- `Ctrl+Shift+E` - Explorer Panel
- `Ctrl+Shift+D` - Debug Panel
- `Ctrl+Shift+X` - Extensions Panel

### Python Development
- `F5` - Start Debugging
- `Ctrl+F5` - Run Without Debugging
- `Shift+F5` - Stop Debugging
- `F9` - Toggle Breakpoint
- `Ctrl+Shift+I` - Format Document

### File Navigation
- `Ctrl+P` - Quick Open File
- `Ctrl+Shift+F` - Search in Files
- `Ctrl+G` - Go to Line
- `Alt+Left/Right` - Navigate Back/Forward

## 🐛 Debugging in VS Code

### Setting Breakpoints
1. **Click on line number** to set breakpoint
2. **Red dot** appears indicating breakpoint
3. **F5** to start debugging
4. **F10** to step over, **F11** to step into

### Debug Features
- **Variables panel** - View variable values
- **Watch panel** - Monitor expressions
- **Call stack** - See function call hierarchy
- **Debug console** - Execute Python commands

### Debugging Flask App
1. **Set breakpoints** in `backend/app.py`
2. **Start debugging** with F5
3. **Make requests** to trigger breakpoints
4. **Inspect variables** and step through code

## 🔍 Code Intelligence Features

### IntelliSense
- **Auto-completion** for Python, HTML, CSS, JavaScript
- **Parameter hints** for functions
- **Quick info** on hover
- **Error squiggles** for syntax errors

### Code Navigation
- **Go to Definition** (`F12`)
- **Peek Definition** (`Alt+F12`)
- **Find All References** (`Shift+F12`)
- **Rename Symbol** (`F2`)

### Refactoring
- **Extract Method** (`Ctrl+Shift+R`)
- **Organize Imports** (auto on save)
- **Format Document** (`Ctrl+Shift+I`)

## 📊 Integrated Terminal

### Features
- **Auto-activates virtual environment**
- **Multiple terminals** support
- **Split terminals** (`Ctrl+Shift+5`)
- **Terminal tabs** for organization

### Common Commands
```bash
# Activate virtual environment (if not auto-activated)
source venv/bin/activate

# Install new packages
pip install package_name
pip freeze > requirements.txt

# Run application
python run.py

# Run tests
python test_setup.py

# Format code
black backend/ run.py test_setup.py

# Lint code
flake8 backend/ run.py test_setup.py
```

## 🌐 Live Development

### Live Server Extension
1. **Right-click** on `templates/index.html`
2. **Select** "Open with Live Server"
3. **Auto-refresh** on file changes

### API Testing with REST Client
Create `.http` files to test API endpoints:

```http
### Test weather endpoint
GET http://localhost:5000/api/weather/London

### Test forecast endpoint
GET http://localhost:5000/api/forecast/Paris

### Test history endpoint
GET http://localhost:5000/api/history
```

## 🎨 Customization

### Theme and Icons
- **File → Preferences → Color Theme** - Choose your theme
- **File → Preferences → File Icon Theme** - Choose icon theme

### Custom Keybindings
- **File → Preferences → Keyboard Shortcuts**
- **Search for commands** and assign custom keys

### Workspace Settings
Edit `.vscode/settings.json` to customize:
- Editor behavior
- Python interpreter
- Formatting options
- File associations

## 🚨 Troubleshooting

### Python Interpreter Issues
1. **Ctrl+Shift+P** → "Python: Select Interpreter"
2. **Choose** `./venv/bin/python`

### Extension Issues
1. **Reload Window**: `Ctrl+Shift+P` → "Developer: Reload Window"
2. **Reinstall Extensions** if needed

### Terminal Issues
1. **Check virtual environment**: `which python`
2. **Manually activate**: `source venv/bin/activate`

### Debugging Issues
1. **Check launch configuration** in `.vscode/launch.json`
2. **Verify Python interpreter** path
3. **Check environment variables**

## 📈 Pro Tips

1. **Use Workspace File** - Always open `climate_prediction.code-workspace`
2. **Install Extensions** - Accept all recommended extensions
3. **Use Integrated Terminal** - Better than external terminal
4. **Set Breakpoints** - Debug instead of print statements
5. **Format on Save** - Keep code clean automatically
6. **Use Command Palette** - `Ctrl+Shift+P` for everything
7. **Learn Shortcuts** - Boost productivity significantly

## 🎉 Ready to Code!

Your VS Code environment is now perfectly configured for the Climate Prediction App development. Enjoy coding with:

- ✅ **IntelliSense** for smart code completion
- ✅ **Debugging** with breakpoints and variable inspection
- ✅ **Auto-formatting** for clean code
- ✅ **Integrated terminal** with virtual environment
- ✅ **Extension ecosystem** for enhanced productivity
- ✅ **Custom tasks** for common operations

Happy coding! 🚀