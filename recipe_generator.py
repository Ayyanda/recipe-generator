import requests

API_key = "47c8a1a57ba24939bb25b2357340f3e3"

response = requests.get("https://api.spoonacular.com/recipes/complexsearch")

def generate_ingredients():
    ingredients = []

    while True:
        try:
            ingredient = input("Enter the ingredients you have (type 'finished' when done): ").strip().lower()

            if ingredient == "finished":
                break

            if ingredient:
                ingredients.append(ingredient)
            else:
                print("Please enter a valid ingredient.")

        except EOFError:
            break

    ingredients_available= ",".join(ingredients)
    return ingredients_available

def get_recipes(ingredients_available):
    parameters = {
        "ingredients": ingredients_available,
        "number": 5,
        "apiKey": "47c8a1a57ba24939bb25b2357340f3e3"
    }

    response = requests.get("https://api.spoonacular.com/recipes/complexsearch", params = parameters)
    if response.status_code == 200:
        recipes = response.json()
        return recipes
    else:
        print("There was an error fetcthing recipe:", response.status_code)
        return None

    

def main():
    ingredients_available= generate_ingredients()
    print("Ingredients available:", ingredients_available)

    recipes = get_recipes(ingredients_available)

    if recipes:
        for recipe in recipes:
            print(recipe['title'])

main()
