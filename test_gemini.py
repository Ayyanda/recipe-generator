import google.generativeai as genai

# Replace with your actual API key
genai.configure(api_key="AIzaSyDRqsF6_GvMoY4cWs7rsfYviDN-sAcut7w")

# List and print all available models for your account
def list_available_models():
    try:
        models = genai.list_models()
        print("✅ Models available for your API key:\n")
        for model in models:
            print(f"🔹 Name: {model.name}")
            print(f"   Description: {model.description}")
            print(f"   Generation Methods: {model.supported_generation_methods}")
            print()
    except Exception as e:
        print(f"❌ Failed to list models:\n{e}")

# Call the function
list_available_models()
