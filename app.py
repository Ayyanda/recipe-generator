from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from AI_handler import get_recipes

app = Flask(__name__)
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0
CORS(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/ai")
def ai_page():
    return render_template("AI_page.html")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    ingredients = data.get("ingredients", [])
    recipe_type = data.get("recipe_type", "general")

    if not ingredients:
        return jsonify({"error": "no ingredients provided"}), 400
    
    result = get_recipes(ingredients, recipe_type)
    return jsonify(result) 

if __name__ == "__main__":
    app.run(debug=True)