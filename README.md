# DishWhiz 🍽️

**AI-Powered Recipe Generator**

DishWhiz is a modern web application that helps you discover delicious recipes based on ingredients you already have. Powered by SheCodes AI API, it generates creative recipes tailored to your preferences and available ingredients.
---

## Features

- **Smart Recipe Generation** - AI-powered recipe suggestions based on your ingredients
- **Multiple Recipe Types** - Choose from:
  - South African Cuisine
  - Normal Recipes
  - Quick Recipes (5-30 minutes)
- **User-Friendly Interface** - Clean, intuitive web UI with responsive design
- **Save Recipes** - Bookmark your favorite recipes (coming soon)
- **No Database Limits** - Unlimited recipe variations thanks to AI
- **Mobile Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Multiple Pages** - Dedicated pages for How It Works, About, Contact, and Saved Recipes

---

## Getting Started

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)
- SheCodes AI API key

### Installation

1. **Clone the repository:**
   ```bash
   git clonehttps://github.com/Ayyanda/recipe-generator.git
   cd recipe-generator
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv .venv
   ```

3. **Activate the virtual environment:**
   ```bash
   # On Windows:
   .venv\Scripts\activate
   
   # On macOS/Linux:
   source .venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   SHECODES_API_KEY=your_api_key_here
   ```

6. **Run the application:**
   ```bash
   python app.py
   ```

7. **Open in your browser:**
   Navigate to `http://127.0.0.1:5000`

---

## Project Structure

```
recipe-generator/
│
├── app.py                          # Flask application & routes
├── AI_handler.py                   # Google Gemini AI integration
├── requirements.txt                # Python dependencies
│
├── templates/
│   ├── index.html                 # Homepage
│   ├── input_page.html            # Recipe generator form
│   ├── output_page.html           # Recipe results display
│   ├── how_it_works.html          # How to use DishWhiz
│   ├── saved_recipes.html         # Saved recipes page (mockup)
│   ├── about.html                 # About DishWhiz
│   └── contact.html               # Contact form
│
└── static/
    ├── css/
    │   ├── ai-page.css            # Navbar & shared styles
    │   ├── input.css              # Input form styles
    │   ├── output.css             # Results page styles
    │   ├── pages.css              # Info pages styles
    │   └── styles.css             # Homepage styles
    ├── js/
    │   ├── script.js              # Input form functionality
    │   └── output-script.js       # Results page functionality
    └── images/
        └── [food-related images]
```

---

## How It Works

1. **Select Recipe Type** - Choose your preferred recipe category
2. **Add Ingredients** - Enter ingredients you have available
3. **Generate Recipes** - Click to generate AI-powered recipes
4. **View Results** - See formatted recipe cards with ingredients and instructions
5. **Save Favorites** - Save recipes to your collection (future feature)

---

## Technologies Used

- **Backend:** Flask, Python
- **Frontend:** HTML5, CSS3, JavaScript
- **AI/ML:** SheCodes AI API
- **Environment:** Virtual Environment, .env configuration

---

## Dependencies

See `requirements.txt` for full list:
- Flask
- Flask-CORS
- Python-dotenv

---

## Environment Setup

Create a `.env` file:
```env
SHECODES_API_KEY=your_shecodes_ai_api_key
```

Never commit `.env` to version control!

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Design Features

- **Purple Color Scheme** - Modern, vibrant purple theme
- **Responsive Layout** - Adapts to all screen sizes
- **Food Photography** - Beautiful background images on homepage
- **Interactive UI** - Smooth transitions and hover effects
- **Clear Navigation** - Easy-to-use navbar across all pages

---

## Future Features

- [ ] User authentication & accounts
- [ ] Save & manage recipes
- [ ] Shopping list generation

---

## 📧 Contact & Support

- **Email:** support@dishwhiz.com
- **Website:** [Coming soon]
- **Issues:** Please report bugs via GitHub Issues

Visit the Contact page in the app for more ways to reach us!

---

## Project Structure
    - main.py – Main app logic and flow
    - AI_handler.py – Handles communication with SheCodes AI API
    - .env – Stores your API key securely
    - requirements.txt – Project dependencies
    - README.md – You’re reading it


## Setting Up your SheCodes AI API Key
1. Go to SheCodes AI platform and get your API key.
2. Create a file named .env in the root of your project.
3. Paste your API key like this:
   SHECODES_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

## Requirements
- Python 3.6+
- shecodes-ai
- python-dotenv

## Future Improvements
    - Save favorite recipes to a file



