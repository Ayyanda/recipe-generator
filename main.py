# This is the main entry point for the program

from AI_handler import get_recipes

def main():
    """Main function to run the recipe generator"""

    print("Welcome to DishWhiz!")
    print("=" * 50)

    print("What kind of recipes would you like today? :")
    print("1. Normal recipe")
    print("2. South African cuisine")
    print("3. Quick 5-minutes recipes")

    choice = input("Enter the number of your choice: ").strip()

    if choice == "2":
        recipe_type = "south_african"
    elif choice == "3":
        recipe_type = "Quick 5 minutes recipes"
    else:
        recipe_type = "Normal recipe"

    print("\nEnter your ingredients one by one (type 'finished' when done):")
    ingredients_available = []

    while True:
        item = input("Ingredient: ").strip()
        if item.lower()=="finished":
            break
        if item:
            ingredients_available.append(item.lower())


    if not ingredients_available:
        print("No ingredients entered. Exiting program.")
        return

    print("\nGenerating recipes... Please wait.\n")
   
    response = get_recipes(ingredients_available, recipe_type)

    if response:
        print("\n Here are some recipe ideas:\n")
        print(response)
    else:
        print("Sorry we couldn't generate your recipes at the moment")


if __name__ == "__main__":
    main()