document.addEventListener("DOMContentLoaded", () => {
  const generateBtn = document.getElementById("generateBtn");
  const inputField = document.getElementById("ingredientInput");
  const sendBtn = document.getElementById("addBtn");
  const ingredientsContainer = document.querySelector(".ingredients");
  const recipeButtons = document.querySelectorAll(".recipe-btn");
  const loading = document.getElementById("loading");

  let ingredients = [];
  let selectedRecipeType = null;

  recipeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      recipeButtons.forEach((b) => b.classList.remove("active"));
      
      btn.classList.add("active");
      selectedRecipeType = btn.dataset.type;

      console.log("Selected recipe type:", selectedRecipeType);
    });
  });

  function addIngredient() {
    const ingredient = inputField.value.trim();
    
    if (ingredient === "") {
      return;
    }

    const ingredientLower = ingredient.toLowerCase();
    if (ingredients.some(i => i.toLowerCase() === ingredientLower)) {
      alert("This ingredient is already added!");
      inputField.value = "";
      return;
    }

    ingredients.push(ingredient);

    if (ingredients.length === 1) {
      document.querySelectorAll(".ingredient.decoy").forEach((el) => el.remove());
    }

    const span = document.createElement("span");
    span.classList.add("ingredient");
    span.innerHTML = `
      ${ingredient}
      <button class="remove-btn" data-ingredient="${ingredient}">×</button>
    `;
    ingredientsContainer.appendChild(span);

    span.querySelector(".remove-btn").addEventListener("click", (e) => {
      const ingredientToRemove = e.target.dataset.ingredient;
      ingredients = ingredients.filter(i => i !== ingredientToRemove);
      span.remove();
      console.log("Removed ingredient:", ingredientToRemove);
      
      if (ingredients.length === 0) {
        ingredientsContainer.innerHTML = `
          <span class="ingredient decoy">Tomatoes</span>
          <span class="ingredient decoy">Rice</span>
          <span class="ingredient decoy">Onions</span>
          <span class="ingredient decoy">Beef</span>
          <span class="ingredient decoy">Salt</span>
        `;
      }
    });

    inputField.value = "";
    inputField.focus();

    console.log("Current ingredients:", ingredients);
  }

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  });

  sendBtn.addEventListener("click", () => {
    addIngredient();
  });

  // Handle Generate Recipes
  generateBtn.addEventListener("click", async () => {
    if (!selectedRecipeType) {
      alert("Please select a recipe type first.");
      return;
    }

    if (ingredients.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    // Disable button and show loading
    generateBtn.disabled = true;
    loading.classList.add("active");

    try {
      const response = await fetch("/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: ingredients,
          recipe_type: selectedRecipeType,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Display the recipes in UI
      displayRecipes(data.answer);

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch recipes. Please check your connection and try again.");
    } finally {
      generateBtn.disabled = false;
      loading.classList.remove("active");
    }
  });

  // display recipes
  function displayRecipes(recipesText) {
    // Hide the input sections
    document.querySelector(".header").style.display = "none";
    document.querySelector(".recipe-types").style.display = "none";
    document.querySelector(".ingredients").style.display = "none";
    document.querySelector(".input-box").style.display = "none";
    document.querySelector(".action").style.display = "none";

    // Create results section
    let resultsSection = document.querySelector(".results-section");
    
    if (!resultsSection) {
      resultsSection = document.createElement("section");
      resultsSection.classList.add("results-section");
      resultsSection.innerHTML = `
        <div class="results-header">
          <h1>Your Recipes</h1>
          <button class="back-btn" id="backBtn">Generate Another Recipe</button>
        </div>
        <div class="recipes-container"></div>
      `;
      document.querySelector(".container").appendChild(resultsSection);

      document.getElementById("backBtn").addEventListener("click", resetPage);
    }

    const recipesContainer = resultsSection.querySelector(".recipes-container");
    recipesContainer.innerHTML = formatRecipes(recipesText);
    resultsSection.style.display = "block";
  }

  function formatRecipes(text) {
    let html = text;
    
    html = html.replace(/### (.*?)(\n|$)/g, '<h3>$1</h3>');
    html = html.replace(/## (.*?)(\n|$)/g, '<h2>$1</h2>');
    html = html.replace(/# (.*?)(\n|$)/g, '<h1>$1</h1>');
    
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    html = html.replace(/\n\n/g, '</p><p>');
    html = `<p>${html}</p>`;
    
    return html;
  }

  function resetPage() {
    
    document.querySelector(".header").style.display = "block";
    document.querySelector(".recipe-types").style.display = "flex";
    document.querySelector(".ingredients").style.display = "flex";
    document.querySelector(".input-box").style.display = "flex";
    document.querySelector(".action").style.display = "block";

   
    document.querySelector(".results-section").style.display = "none";

    
    ingredients = [];
    selectedRecipeType = null;
    ingredientsContainer.innerHTML = `
      <span class="ingredient decoy">Tomatoes</span>
      <span class="ingredient decoy">Rice</span>
      <span class="ingredient decoy">Onions</span>
      <span class="ingredient decoy">Beef</span>
      <span class="ingredient decoy">Salt</span>
    `;
    recipeButtons.forEach((b) => b.classList.remove("active"));
  }
});