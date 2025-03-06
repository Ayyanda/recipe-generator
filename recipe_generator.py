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

def main():
    ingredients_available= generate_ingredients()
    print("Ingredients available:", ingredients_available)

main()
