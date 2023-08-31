
const mongoose = require('mongoose');

const connectionString = "mongodb+srv://abonnelt:126942@cluster0.vhbd6kl.mongodb.net/pokeshop";

mongoose.connect(connectionString, { connectTimeoutMS: 2000 })
 .then(() => console.log('Database connected'))
 .catch((errorMessage) => console.error(errorMessage))