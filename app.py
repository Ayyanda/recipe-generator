from flask import Flask, request, jsonify, render_template, redirect, url_for
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
    return render_template("input_page.html")

@app.route("/results")
def results_page():
    return render_template("output_page.html")

@app.route("/how-it-works")
def how_it_works():
    return render_template("how_it_works.html")

@app.route("/saved-recipes")
def saved_recipes():
    return render_template("saved_recipes.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/generate", methods=["POST"])
def generate():
    data = request.json
    ingredients = data.get("ingredients", [])
    recipe_type = data.get("recipe_type", "general")

    if not ingredients:
        return jsonify({"error": "No ingredients provided"}), 400

    result = get_recipes(ingredients, recipe_type)

    if result is None:
        return jsonify({"error": "Failed to generate recipes. API request failed."}), 500

    return jsonify({"answer": result}), 200 


if __name__ == "__main__":
    app.run(debug=True)