const mongoose = require("mongoose");
   

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  wishList: [{type: mongoose.Schema.Types.ObjectId, ref: "pokemons"}],
});

const User = mongoose.model("users", userSchema);

module.exports = User;
