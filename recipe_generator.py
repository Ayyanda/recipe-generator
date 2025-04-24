import requests

API_KEY = "47c8a1a57ba24939bb25b2357340f3e3"

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
                ingredients.append(ingredient)
            else:
                print("Please enter a valid ingredient.")

        except EOFError:
            break

    ingredients_available = ",".join(ingredients)
    return ingredients_available

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
            print(f"Error fetching your recipes: Status code {response.status_code}")
            print(f"Error message: {response.text}")
            return None
            
    except requests.exceptions.RequestException as e:
        
        print(f"Connection error: {e}")
        return None

def get_recipe_instructions(recipe_id):
    """This function gets instructions for a specific recipe by ID"""
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

    # Display list of recipes
    if recipes and len(recipes) > 0:
        print(f"\nFound {len(recipes)} recipes:")
        for i, recipe in enumerate(recipes, 1):
            print(f"{i}. {recipe['title']}")
        
        # User selects recipe by number
        while True:
            try:
                choice = input("\nEnter the number of the recipe you want to see (or type 'exit'): ")
                
                if choice.lower() == 'exit':
                    break
                    
                recipe_index = int(choice) - 1
                
                if 0 <= recipe_index < len(recipes):
                    selected_recipe = recipes[recipe_index]
                    recipe_id = selected_recipe['id']
                    
                    # Get full recipe information including instructions
                    print(f"\nGetting instructions for {selected_recipe['title']}...")
                    recipe_details = get_recipe_instructions(recipe_id)
                    
                    if recipe_details:
                        print("\n" + "=" * 50)
                        print(f"RECIPE: {recipe_details['title']}")
                        print("=" * 50)
                        
                        print("\nINGREDIENTS:")
                        for ingredient in recipe_details.get('extendedIngredients', []):
                            print(f"- {ingredient.get('original', 'Unknown ingredient')}")
                        
                        if recipe_details.get('instructions'):
                            print("\nINSTRUCTIONS:")
                            instructions = recipe_details['instructions'].replace('<ol>', '').replace('</ol>', '')
                            instructions = instructions.replace('<li>', '• ').replace('</li>', '\n')
                            print(instructions)
                        else:
                            print("\nNo instructions available for this recipe.")
                            
                        if recipe_details.get('sourceUrl'):
                            print(f"\nFull recipe at: {recipe_details['sourceUrl']}")
                            
                        print("=" * 50)
                        
                        print("\nThank you for using DishWhiz!")
                        break
                    else:
                        print("Couldn't get recipe details. Please try another recipe.")
                else:
                    print("Invalid recipe number. Please try again.")
            except ValueError:
                print("Please enter a valid number or 'exit'.")
    else:
        print("No recipes found with those ingredients or there was an API error.")

# Run the program
if __name__ == "__main__":
    main()