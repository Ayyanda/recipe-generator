# This file handles all OpenAI API communication

import google.generativeai as genai
import os

google_api_key = "AIzaSyDRqsF6_GvMoY4cWs7rsfYviDN-sAcut7w"
genai.configure(api_key=google_api_key)

model = genai.GenerativeModel("gemini-pro")

def build_prompt(ingredients_available, recipe_type):
    """Builds the prompt for the AI model based on user input ingredients and recipe type."""

    recipe_prompt = f"I have the following ingredients: {', '.join(ingredients_available)}.\n"

    if recipe_type == "South African cuisine":
        recipe_prompt += "Please give me 5 traditional South African recipes using these ingredients." 
    elif recipe_type == "Quick 5-minutes recipes":
        recipe_prompt += "Please give me 5 quick recipes (5-minutes prep) using these ingredients."
    else:
        recipe_prompt += "Please give me 5 delicious recipes using these ingredients."

    recipe_prompt += " For each recipe, include a title, ingredients, and preparation steps. Respond in a Markdown format"
    return recipe_prompt


def get_recipes(ingredients_available, recipe_type="general"):
    """Fetches recipes from the AI model based on the provided ingredients and recipe type."""

    prompt = build_prompt(ingredients_available,recipe_type)

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"AI request failed:{e}")
        return None


