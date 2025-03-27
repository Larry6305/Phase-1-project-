const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');

// Spoonacular API key (replace with your own valid key)
const API_KEY = '7c3bb3a9c1b94c5784436c0e85d6615c';
const BASE_URL = 'https://api.spoonacular.com/recipes/complexSearch';

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchRecipes(query);
  }
});

async function fetchRecipes(query) {
  const url = `${BASE_URL}?query=${query}&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

function displayRecipes(recipes) {
  recipesContainer.innerHTML = ''; // Clear previous results
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.dataset.id = recipe.id; // Store ID in data attribute
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
    `;
    recipesContainer.appendChild(recipeCard);
  });
}

// Use event delegation to handle clicks on dynamically added elements
recipesContainer.addEventListener('click', async (event) => {
  const recipeCard = event.target.closest('.recipe-card');
  if (!recipeCard) return;

  const recipeId = recipeCard.dataset.id;
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`);
    const details = await response.json();
    alert(`Ingredients: ${details.extendedIngredients.map(ing => ing.original).join(', ')}`);
  } catch (error) {
    console.error('Error fetching recipe details:', error);
  }
});
