# This file handles displaying information to the user

def show_recipe_list(recipes):
    """This function displays a list of recipes"""

    if recipes and len(recipes) > 0:
        print(f"\nFound {len(recipes)} recipes:")
        for i, recipe in enumerate(recipes, 1):
            print(f"{i}. {recipe['title']}")
        return True
    else:
        print("No recipes found with those ingredients or there was an API error.")
        return False

def show_recipe_details(recipe_details):
    """This function displays details of a specific recipe"""
    
    if recipe_details:
        print("\n" + "=" * 50)
        print(f"RECIPE: {recipe_details['title']}")
        print("=" * 50)
        
        print("\nINGREDIENTS:")
        for ingredient in recipe_details.get('extendedIngredients', []):
            print(f"- {ingredient.get('original', 'Unknown ingredient')}")
        
        if recipe_details.get('instructions'):
            print("\nPREPARATION:")
            instructions = recipe_details['instructions'].replace('<ol>', '').replace('</ol>', '')
            instructions = instructions.replace('<li>', '• ').replace('</li>', '\n')
            print(instructions)
        else:
            print("\nNo instructions available for this recipe.")
            
        if recipe_details.get('sourceUrl'):
            print(f"\nFull recipe at: {recipe_details['sourceUrl']}")
            
        print("=" * 50)
        return True
    else:
        print("Couldn't get recipe details.")
        return False