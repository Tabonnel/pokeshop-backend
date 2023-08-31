const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    number: Number,
    name: String,
    type: String,
    price: Number,
    image: String,
    stock: Number

});

const Pokemon = mongoose.model('pokemons', pokemonSchema);

module.exports = Pokemon;
