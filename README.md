# DishWhiz

<<<<<<< HEAD
DishWhiz is a smart and beginner-friendly Python app that helps you discover recipes based on ingredients you already have in your kitchen. Powered by the OpenAI API, it can suggest:

- Normal/fancy recipes  
- Traditional South African cuisine  
- Quick 5-minute meals

Just type your ingredients, and let DishWhiz do the magic!
=======
A Python application that helps you find recipes based on ingredients you have available in your kitchen. This program connects to the Spoonacular API to search for recipes and display detailed cooking instructions.
>>>>>>> e28681d0ec7d6c855f37f1d5176976b86f424e62

## Features

- Enter ingredients you have on hand
<<<<<<< HEAD
- AI-powered recipe suggestions (no limited database)
- Choose quick recipes, cultural recipes, or general ones
- Clean and simple command-line interface
- API key stored securely via `.env`

## Installation

## 1. Clone this repository or download the files:
```bash
git clone https://github.com/yourusername/dishwhiz.git
cd dishwhiz

2. Create a virtual environment and activate it
python -m venv .venv
# Activate it:
.venv\Scripts\activate       # On Windows
# OR
source .venv/bin/activate    # On macOS/Linux


3. Install dependencies:

pip install -r requirements.txt

=======
- Find recipes that use those ingredients
- View detailed recipe instructions
- Clean and simple command-line interface

## Installation

1. Clone this repository or download the files
2. Make sure you have Python 3.6 or newer installed
3. Install the required package:

```bash
pip install requests
```
>>>>>>> e28681d0ec7d6c855f37f1d5176976b86f424e62

## Usage

1. Run the program:

```bash
python main.py
```

<<<<<<< HEAD
2. Choose the type of recipes you want:
    Normal/fancy
    South African
    5-minute meals
3. Enter ingredients one by one. Type 'finished' when done.
4. Get personalized recipe suggestions instantly!



## Project Structure

- `main.py` - Main app logic and flow
- `AI_handler.py` - AI API communication using OpenAI
- .env           - (add your api-key) contains your API key
- requirements.txt   -  Project dependencies
- README.md          -  You’re reading it

## Set Up Your OpenAI API Key

1. Go to [OpenAI platform](https://platform.openai.com/account/api-keys) and get your API key.
2. Create a file named `.env` in the root of your project.
3. Paste your API key like this:
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

=======
2. Enter the ingredients you have (one at a time)
3. Type 'finished' when done entering ingredients
4. Select a recipe number from the displayed list
5. View the detailed recipe instructions

## Project Structure

- `main.py` - Main program entry point
- `ingredients.py` - Handles ingredient input from user
- `API_handler.py` - Manages API communication with Spoonacular
- `display.py` - Formats and displays recipe information

## API Key

This program uses the Spoonacular API.
For your own use:

1. Sign up for your own free API key at [Spoonacular API](https://spoonacular.com/food-api)
2. Replace the API_KEY value in `API_handler.py` with your own key

The free tier of the Spoonacular API has 60 requests per minute request limits.
>>>>>>> e28681d0ec7d6c855f37f1d5176976b86f424e62

## Requirements

- Python 3.6+
<<<<<<< HEAD
- openai
- python- dotenv

## Future Improvements

- Save favorite recipes to a file
- Filter recipes by dietary restrictions
- Implement a graphical user interface
- Allow recipe exports to .pdf or .txt

## Acknowledgements

Recipe generation powered by OpenAI API

=======
- Requests library

## Future Improvements

- Have a 'quick recipes' option(microwave recipes and 5-10 min recipes)
- Save favorite recipes
- Filter recipes by dietary restrictions
- Add error logging
- Implement a graphical user interface

- Recipe data provided by [Spoonacular API](https://spoonacular.com/food-api)
>>>>>>> e28681d0ec7d6c855f37f1d5176976b86f424e62
