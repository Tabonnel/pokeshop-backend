var express = require("express");
var router = express.Router();
const Pokemon = require("../models/pokemons");

// This is your test secret API key.
const stripe = require("stripe")(
  "sk_test_51NnH79CGeghBSZjO1BLge1VAF5WiZA85QTfPSvsWoLmAD2p7nhDpsIEuYRBAJNGtrq05tq3pkqTHn8jwEC4NNPcr00E93YopJM"
);

const calculateOrderAmount = async ({ items }) => {
    let pokemonPrice = 0;
  
    // Utilisez Promise.all pour attendre que toutes les requêtes asynchrones soient terminées
    await Promise.all(
      items.map(async (item) => {
        const pokemon = await Pokemon.findById(item.id);
        console.log(pokemon.price);
        console.log(item.quantity);
        pokemonPrice += pokemon.price * item.quantity;
      })
    );
  
    // Retournez le montant total de la commande
    return pokemonPrice;
  };
  

router.post("/pay", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// router.listen(4242, () => console.log("Node server listening on port 4242!"));

module.exports = router;