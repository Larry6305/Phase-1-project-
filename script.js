const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipesContainer = document.getElementById('recipes-container');

// Spoonacular API key (sign up at https://spoonacular.com/food-api to get one)
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
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p>Ready in ${recipe.readyInMinutes} minutes</p>
    `;
    recipesContainer.appendChild(recipeCard);
  });
}
recipeCard.addEventListener('click', async () => {
    const recipeId = recipe.id;
    const response = await fetch(`/api/recipes/${recipeId}`);
    const details = await response.json();
    alert(`Ingredients: ${details.extendedIngredients.map(ing => ing.original).join(', ')}`);
});
