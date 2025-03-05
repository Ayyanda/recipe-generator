import requests

API_key = "47c8a1a57ba24939bb25b2357340f3e3"

response = requests.get("https://api.spoonacular.com/recipes/complexsearch")

def generate_ingredients():
    ingredients = []

    while True:
        try:
            ingredient = input("Enter the ingredients you have ").strip().lower()
            if ingredient.lower() == "finished":
                break

            ingredients.append(ingredient)

            
        except EOFError:
            break

    return ingredients
            
        


        

    