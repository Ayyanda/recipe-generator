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

  function displayRecipes(recipesText) {
  document.querySelector(".header").style.display = "none";
  document.querySelector(".recipe-types").style.display = "none";
  document.querySelector(".ingredients").style.display = "none";
  document.querySelector(".input-box").style.display = "none";
  document.querySelector(".action").style.display = "none";

  const resultsSection = document.querySelector(".results-section");
  const recipeCardsContainer = document.getElementById("recipeCards");
  const introText = document.getElementById("introText");

  // Clear previous cards
  recipeCardsContainer.innerHTML = "";

  // Extract intro paragraph
  const introMatch = recipesText.match(/^(.*?)\n\n/);
  if (introMatch) {
    introText.textContent = introMatch[1].trim();
    recipesText = recipesText.replace(introMatch[0], '');
  } else {
    introText.textContent = "Here are your recipes:";
  }

  // Add new cards
  const recipeElements = formatRecipes(recipesText);
  recipeElements.forEach(card => recipeCardsContainer.appendChild(card));

  resultsSection.style.display = "block";

  document.getElementById("backBtn").addEventListener("click", resetPage);
}

  function formatRecipes(text) {
  const recipes = [];
  let splits = text.split(/(?:\n\s*){2,}(?=(?:\*\*)?(?:\d+\.|##|###)\s*(?:\*\*)?)/);

  if (splits.length < 3) {
    splits = text.split(/(?:\n\s*){3,}/);
  }

  splits.forEach((recipeText, index) => {
    const trimmed = recipeText.trim();
    if (trimmed.length > 50) {
      recipes.push(formatSingleRecipe(trimmed, index + 1));
    }
  });

  if (recipes.length === 0) {
    recipes.push(formatSingleRecipe(text, 1));
  }

  return recipes;
}


 function formatSingleRecipe(text, index) {
  let html = text;

  html = html.replace(/^(?:\*\*)?(?:\d+\.)\s*(?:\*\*)?/g, '');
  html = html.replace(/^(?:###|##)\s*/g, '');

  let title = '';
  const titleMatch = html.match(/^(?:\*\*)?(.+?)(?:\*\*)?\n/);
  if (titleMatch) {
    title = titleMatch[1].replace(/\*\*/g, '').trim();
    html = html.substring(titleMatch[0].length);
  }

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/(?:^|\n)(Ingredients?:)/gi, '\n<h3>$1</h3>\n');
  html = html.replace(/(?:^|\n)(Instructions?:|Directions?:|Method:|Steps?:)/gi, '\n<h3>$1</h3>\n');

  const lines = html.split('\n');
  let inList = false;
  let processedLines = [];

  lines.forEach(line => {
    const trimmedLine = line.trim();

    if (trimmedLine.match(/^[-•*]\s+(.+)/) || trimmedLine.match(/^\d+\.\s+(.+)/)) {
      if (!inList) {
        processedLines.push('<ul>');
        inList = true;
      }
      const content = trimmedLine.replace(/^(?:[-•*]|\d+\.)\s+/, '');
      processedLines.push(`<li>${content}</li>`);
    } else if (trimmedLine === '') {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push('');
    } else {
      if (inList) {
        processedLines.push('</ul>');
        inList = false;
      }
      processedLines.push(line);
    }
  });

  if (inList) {
    processedLines.push('</ul>');
  }

  html = processedLines.join('\n');
  html = html.replace(/\n\n+/g, '</p><p>');
  html = `<p>${html}</p>`;
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<p>\s*(<h3>)/g, '$1');
  html = html.replace(/(<\/h3>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*(<ul>)/g, '$1');
  html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
  html = html.replace(/<p>\s*<br\s*\/?>\s*<\/p>/g, '');

  const card = document.createElement("div");
  card.classList.add("recipe-card");

  card.innerHTML = `
    <div class="recipe-card-header">
      <h2>${title || `Recipe ${index}`}</h2>
    </div>
    <div class="recipe-card-body">
      ${html}
    </div>
  `;

  return card;
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