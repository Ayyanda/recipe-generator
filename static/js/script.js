// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Main recipe generator functionality
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

      // Store recipes in sessionStorage and redirect to results page
      sessionStorage.setItem('recipes', data.answer);
      window.location.href = '/results';

    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch recipes. Please check your connection and try again.");
      generateBtn.disabled = false;
      loading.classList.remove("active");
    }
  });
});