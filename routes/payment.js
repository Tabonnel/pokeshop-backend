var express = require("express");
var router = express.Router();
const Pokemon = require("../models/pokemons");

const stripe = require("stripe")(
  process.env.STRIPE
);

const calculateOrderAmount = async (items) => {
    if (!items || !Array.isArray(items)) {
      // Gérez le cas où items n'est pas défini ou n'est pas un tableau
      return 0;
    }
  
    let pokemonPrice = 0;
    // Utilisez Promise.all pour attendre que toutes les requêtes asynchrones soient terminées
    await Promise.all(
      items.map(async (item) => {
        const pokemon = await Pokemon.findById(item.id);
        // console.log(pokemon.price);
        // console.log(item.quantity);
        pokemonPrice += (pokemon.price * item.quantity)*100;
      })
    );
  
    // Retournez le montant total de la commande comme un nombre
    return pokemonPrice;
  };
  

  router.post("/pay", async function (req, res) { // Ajoutez 'async' ici
    const { items } = req.body;
  
    const orderAmount = await calculateOrderAmount(items); // Ajoutez 'await' ici
  
    // Créez un PaymentIntent avec le montant de la commande et la devise
    const paymentIntent = await stripe.paymentIntents.create({ // Ajoutez 'await' ici
      amount: orderAmount, // Utilisez la variable orderAmount ici
      currency: "eur",
      // Dans la dernière version de l'API, préciser le paramètre `automatic_payment_methods` est facultatif car Stripe active sa fonctionnalité par défaut.
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method: 'pm_card_visa',
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
module.exports = router;
