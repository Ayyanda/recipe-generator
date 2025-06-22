# This file handles all OpenAI API communication

import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_recipes(ingredients_available, recipe_type="general"):
    """
    This function uses OpenAI to generate recipes based on ingredients and recipe type.
    """
    prompt = build_prompt(ingredients_available, recipe_type)

    print("\nFinding you recipes...")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful and creative recipe assistant."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=700,
            temperature=0.7
        )

        message = response.choices[0].message.content.strip()
        return message

    except Exception as e:
        print(f"AI request failed:\n{e}")
        return None


def build_prompt(ingredients_available, recipe_type):
    """
    Builds the prompt to send to the OpenAI API based on ingredients and recipe type.
    """
    intro = f"I have the following ingredients: {', '.join(ingredients_available)}.\n"

    if recipe_type == "south_african":
        intro += "Can you give me 3 traditional South African recipes using these ingredients?"
    elif recipe_type == "quick":
        intro += "Can you give me 3 quick recipes (5-minute prep) using these ingredients?"
    else:
        intro += "Can you give me 3 delicious recipes using these ingredients?"

    intro += " For each recipe, include a title, ingredients, and preparation steps."

    return intro
