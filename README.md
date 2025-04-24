# DishWhiz

A Python application that helps you find recipes based on ingredients you have available in your kitchen. This program connects to the Spoonacular API to search for recipes and display detailed cooking instructions.

## Features

- Enter ingredients you have on hand
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

## Usage

1. Run the program:

```bash
python main.py
```

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

## Requirements

- Python 3.6+
- Requests library

## Future Improvements

- Have a 'quick recipes' option(microwave recipes and 5-10 min recipes)
- Save favorite recipes
- Filter recipes by dietary restrictions
- Add error logging
- Implement a graphical user interface

- Recipe data provided by [Spoonacular API](https://spoonacular.com/food-api)