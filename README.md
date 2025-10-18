# DishWhiz

DishWhiz is a smart and beginner-friendly Python app that helps you discover recipes based on ingredients you already have in your kitchen. Powered by the SheCodes AI API, it can suggest:

- Normal/fancy recipes  
- Traditional South African cuisine  
- Quick 5-minute meals

Just type your ingredients, and let DishWhiz do the magic!

---

## Features

- Enter ingredients you have on hand  
- AI-powered recipe suggestions (no limited database)  
- Choose quick recipes, cultural recipes, or general ones  
- Clean and simple command-line interface  
- API key stored securely via `.env`

---

## Installation

1. Clone this repository or download the files:
   ```bash
   git clone https://github.com/yourusername/dishwhiz.git
   cd dishwhiz

2. Create a virtual environment and activate it:
    python -m venv .venv
    # Activate it:
    .venv\Scripts\activate       # On Windows
    # OR
    source .venv/bin/activate    # On macOS/Linux

3. Install dependencies:
   pip install -r requirements.txt

## Usage

1. Run the program:
    python main.py

2. Choose the type of recipes you want:
    - Normal/fancy
    - South African
    - 5-minute meals

3. Enter ingredients one by one.Click "Generate Recipes"    when done.
4. Get personalised recipe suggestions.

## Project Structure
    - main.py – Main app logic and flow
    - AI_handler.py – Handles communication with SheCodes AI API
    - .env – Stores your API key securely
    - requirements.txt – Project dependencies
    - README.md – You’re reading it


## Setting Up your SheCodes AI API Key
1. Go to SheCodes AI platform and get your API key.
2. Create a file named .env in the root of your project.
3. Paste your API key like this:
   SHECODES_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## Requirements
- Python 3.6+
- shecodes-ai
- python-dotenv

## Future Improvements
    - Save favorite recipes to a file



