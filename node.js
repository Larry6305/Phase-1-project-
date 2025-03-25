require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.SPOONACULAR_API_KEY;

app.get('/api/recipes/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const detailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;
        const response = await fetch(detailsUrl);
        const details = await response.json();
        res.json(details);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch recipe details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
