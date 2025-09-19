from flask import Flask,request,jsonify
from flask_cors import CORS
from AI_handler import get_recipes

app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    ingredients = data.get("ingredients",[])
    recipe_type = data.get("recipe_type", "general")

    if not ingredients:
        return jsonify({"error" : "no ingredients provided"}), 400
    
    result = get_recipes(ingredients, recipe_type)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug = True)
