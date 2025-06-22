# This file handles all ingredient-related functionality

def generate_ingredients():
    """This function gets ingredients from user input"""
    ingredients = []

    print("Enter the ingredients you have (type 'finished' when done):")
    
    while True:
        try:
            ingredient = input("Enter ingredient: ").strip().lower()

            if ingredient == "finished":
                break

            if ingredient:
                ingredients.extend([i.strip() for i in ingredient.split(",") if i.strip()])
            else:
                print("Please enter a valid ingredient.")

        except EOFError:
            break

    return ingredients