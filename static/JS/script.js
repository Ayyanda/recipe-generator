
const input = document.getElementById("ingredient-input");
const ingredientBox = document.querySelector(".ingredients");

document.querySelector(".input-btn").addEventListener("click", () => {
  if (input.value.trim() !== "") {
    const newIngredient = document.createElement("span");
    newIngredient.classList.add("ingredient");
    newIngredient.textContent = input.value.trim();
    ingredientBox.appendChild(newIngredient);
    input.value = "";
  }
});


document.querySelectorAll(".recipe-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".recipe-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});


document.querySelector(".generate-btn").addEventListener("click", async () => {
  const recipeType = document.querySelector(".recipe-btn.active")?.textContent || "Normal Recipe";
  const ingredients = [...document.querySelectorAll(".ingredient")].map(el => el.textContent);

  const response = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients, recipe_type: recipeType })
  });

  const data = await response.json();
  document.getElementById("recipe-output").innerHTML = `<pre>${data.recipes}</pre>`;
});
