var express = require('express');
var router = express.Router();
const Pokemon = require('../models/pokemons');

// route pour créer un product
router.post('/', function(req, res) {

    const newPokemon = new Pokemon({
        number: req.body.number,
        name: req.body.name,
        price: req.body.price,
        type: req.body.type,
        image: req.body.image,
        stock: req.body.stock
    });

    newPokemon.save().then((pokemon) => {
        res.json(pokemon);
        console.log(pokemon);
    });
});

//route pour récupérer tous les pokemons
router.get('/', function(req, res) {
    Pokemon.find().then((pokemon) => {
        res.json(pokemon);
        console.log(pokemon);
    });
});

//route pour récupérer un product par son id
router.get('/:id', function(req, res) {
    Pokemon.findById(req.params.id).then((pokemon) => {
        res.json(pokemon);
        console.log(pokemon);
    });
});



module.exports = router;