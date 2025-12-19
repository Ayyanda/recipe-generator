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

// Recipe output functionality
document.addEventListener("DOMContentLoaded", () => {
  const backBtn = document.getElementById("backBtn");
  const recipeCardsContainer = document.getElementById("recipeCards");
  const introText = document.getElementById("introText");

  // Get recipes from sessionStorage
  const recipesText = sessionStorage.getItem('recipes');
  
  if (recipesText) {
    displayRecipes(recipesText);
    sessionStorage.removeItem('recipes'); // Clear after displaying
  } else {
    window.location.href = '/ai';
  }

  backBtn.addEventListener("click", () => {
    window.location.href = '/ai';
  });

  function displayRecipes(recipesText) {
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
  }

  function formatRecipes(text) {
    const recipes = [];
    let splits = text.split(/(?:\n\s*){2,}(?=(?:\*\*)?(?:\d+\.|##|###)\s*(?:\*\*)?)/);

    if (splits.length < 3 || splits.some(s => s.length < 100)) {
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
});
