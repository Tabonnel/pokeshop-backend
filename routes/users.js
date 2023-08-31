var express = require('express');
var router = express.Router();
const User = require('../models/users');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');
const { checkBody } = require('../modules/checkBody');


router.post('/signup', function(req, res) {

  if (!checkBody(req.body, ['username', 'email', 'password'])) {
    res.json({ result: false, error: 'champs manquants ou vides' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    // Vérifie si l'utilisateur n'est pas déjà enregistré dans la BDD
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const {username, email}=req.body

      const newUser = new User({
        username, email, 
        password: hash,
        token: uid2(32),
        })
      newUser.save().then(newDoc => {
        res.json({ result: true, data: newDoc });
      });
    } else {
      // Utilisateur déjà existant dans la BDD
      res.json({ result: false, error: 'Utilisateur déjà existant' });
    }
  });
});


router.post('/signin', (req, res) => {
  // Vérifie que les champs ne sont pas vides
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'champs manquants ou vides' });
    return;
  }
  User.findOne({ email: req.body.email }).then(data => {
    // Vérifie si l'utilisateur est bien présent dans la BDD
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, data: data });
    } else {
      res.json({ result: false, error: 'Utilisateur non trouvé ou mauvais mot de passe' });
    }
  });
});
module.exports = router;
