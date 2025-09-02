# This file handles all OpenAI API communication

import requests


def build_prompt(ingredients_available, recipe_type):
    """Builds the prompt for the AI model based on user input ingredients and recipe type."""

    prompt = f"what can I prepare with the following ingredients: {', '.join(ingredients_available)}.\n"

    if recipe_type == "South African cuisine":
        prompt += "Please give me 3 traditional South African recipes using these ingredients." 
    elif recipe_type == "Quick 5-minutes recipes":
        prompt += "Please give me 3 quick recipes (5-minutes prep) using these ingredients."
    else:
        prompt += "Please give me 3 delicious recipes using these ingredients."
    
    context = "You are a helpful recipe generator that takes in ingredients from users as input and returns 3 recipe options with preparation steps in a markdown format"
 
    return prompt, context
    
   

def get_recipes(ingredients_available, recipe_type="general"):
    """Fetches recipes from the AI model based on the provided ingredients and recipe type."""

    api_key = ""
    base_url = "https://api.shecodes.io/ai/v1/generate?prompt={prompt}&context={context}&key={key}"

    prompt, context = build_prompt(ingredients_available,recipe_type)

    params = {
        "prompt" : prompt,
        "key" : api_key,
        "assistant_context" : context
    }

    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        return data.get("answer", "No answer returned.")
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return None


