# This file handles all OpenAI API communication

import requests
from dotenv import load_dotenv;
import os;

load_dotenv()

def build_prompt(ingredients_available, recipe_type):
    """Builds the prompt for the AI model based on user input ingredients and recipe type."""

    prompt = f"what can I prepare with the following ingredients: {', '.join(ingredients_available)}.\n"

    if recipe_type == "South African cuisine":
        prompt += "Please give me 3 traditional South African recipes using these ingredients." 
    elif recipe_type == "Quick 5-minutes recipes":
        prompt += "Please give me 3 quick recipes (5-minutes prep) using these ingredients."
    else:
        prompt += "Please give me 3 easy delicious recipes using these ingredients."
    
    context = "You are a helpful recipe generator that takes in ingredients from users as input and returns 3 recipe options in UK metrics with preparation steps in a markdown format"
 
    return prompt, context
    
   

def get_recipes(ingredients_available, recipe_type="general"):
    """Fetches recipes from the AI model based on the provided ingredients and recipe type."""

    api_key = os.getenv("SHECODES_API_KEY")
    
    if not api_key:
        print("ERROR: API key not found!")
        return None
        
    base_url = "https://api.shecodes.io/ai/v1/generate"

    prompt, context = build_prompt(ingredients_available, recipe_type)

    params = {
        "prompt": prompt,
        "key": api_key,
        "assistant_context": context  
    }

    try:
        print(f"Making API request with ingredients: {ingredients_available}")
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        print(f"API Response: {data}")
        return data.get("answer", "No answer returned.")
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return None

