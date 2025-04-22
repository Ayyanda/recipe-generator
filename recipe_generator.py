import os
import google.generativeai as genai


genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def get_recipes(ingredients_available):
    prompt = f"Generate a recipe using the following ingredients: {ingredients_available}. " \
             f"Provide the name, ingredients, and step-by-step instructions."

    model = genai.GenerativeModel(model_name="gemini-pro")
    response = model.generate_content(prompt)
    
    return response.text if response.text else "No recipe found."

def main():
    print("Enter the ingredients you have (type 'finished' when done):")
    ingredients = []

    while True:
        ingredient = input().strip()
        if ingredient.lower() == "finished":
            break
        ingredients.append(ingredient)

    ingredients_available = ", ".join(ingredients)
    print("\nIngredients available:", ingredients_available)

    recipe = get_recipes(ingredients_available)
    print("\nHere is your recipe:\n")
    print(recipe)

if __name__ == "__main__":
    main()
