const express = require('express');
const axios = require("axios");
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.params.id}`);
        
        if (data)
            res.status(200).json(data);
    } catch (e) {
        res.status(404).json({ message: 'Pokemon not found' });;
    }
});

router.get('/page/:page', async (req, res) => {
    try {
        let page = Number(req.params.page);
        const limit = 18;

        if (isNaN(page)) {
            res.status(404).json({ message: 'Pokemons not found' });
            return;
        }

        let offset = page * limit;
        const pokemons = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);

        if (pokemons.data.results.length === 0) {
            res.status(404).json({ message: 'Pokemons not found' });
            return; 
        }

        let pokes = [];
        let data = {
            next: pokemons.data.next,
            previous: pokemons.data.previous,
            totalPage: Math.ceil(pokemons.data.count / limit),
        } 

        for (const pokemon of pokemons.data.results) {
            const id = pokemon.url.slice(34).replace('/', '');
            
            let pokemonObj = {};
            pokemonObj.id = id;
            pokemonObj.name = pokemon.name;
            pokemonObj.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
            pokes.push(pokemonObj);            
        }
        
        if (pokes)
            data.results = pokes;
            res.status(200).json(data);
    } catch (e) {
        res.status(404).json({ message: 'Pokemons not found' });
    }
});

module.exports = router;