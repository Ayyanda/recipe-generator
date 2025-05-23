# This is the main entry point for the program

from ingredients import generate_ingredients
from API_handler import get_recipes, get_recipe_instructions
from display import show_recipe_list, show_recipe_details

def main():
    """Main function to run the recipe generator"""

    print("Welcome to DishWhiz!")
    print("-" * 30)
    
    ingredients_available = generate_ingredients()
    print("Ingredients available:", ingredients_available)

    if not ingredients_available:
        print("No ingredients entered. Exiting program.")
        return
        
    recipes = get_recipes(ingredients_available)

    if show_recipe_list(recipes):
        while True:
            try:
                choice = input("\nEnter the number of the recipe you want to see (or type 'exit'): ")
                
                if choice.lower() == 'exit':
                    break
                    
                recipe_index = int(choice) - 1
                
                if 0 <= recipe_index < len(recipes):
                    selected_recipe = recipes[recipe_index]
                    recipe_id = selected_recipe['id']
                    
                    print(f"\nGetting instructions for {selected_recipe['title']}...")
                    recipe_details = get_recipe_instructions(recipe_id)
                    
                    if show_recipe_details(recipe_details):
                        print("\nThank you for using DishWhiz!")
                        break
                    else:
                        print("Please try another recipe.")
                else:
                    print("Invalid recipe number. Please try again.")
            except ValueError:
                print("Please enter a valid number or 'exit'.")

if __name__ == "__main__":
    main()