# This file handles all API communication

import requests

API_KEY = ""

def get_recipes(ingredients_available):
    """This function gets recipes based on ingredients"""
    
    parameters = {
        "ingredients": ingredients_available,
        "number": 5,  
        "apiKey": API_KEY  
    }

    print("Getting your recipes...")
    try:
        response = requests.get(
            "https://api.spoonacular.com/recipes/findByIngredients", 
            params=parameters
        )
        
        # Check if the request was successful
        if response.status_code == 200:
            recipes = response.json()
            return recipes
        else:
            print(f"Error fetching recipes: Status code {response.status_code}")
            print(f"Error message: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Connection error: {e}")
        return None

def get_recipe_instructions(recipe_id):
    """Get instructions for a specific recipe by ID"""
    parameters = {
        "apiKey": API_KEY
    }
    
    try:
        response = requests.get(
            f"https://api.spoonacular.com/recipes/{recipe_id}/information",
            params=parameters
        )
        
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching recipe details: Status code {response.status_code}")
            return None
            
    except requests.exceptions.RequestException as e:
        print(f"Connection error: {e}")
        return None
