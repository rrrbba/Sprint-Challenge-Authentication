const router = require('express').Router();

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets');

const Users = require('../jokes/jokes-model');

const { validateUser } = require('../jokes/jokes-helpers');

router.post('/register', (req, res) => {
  let user = req.body;

  const validateResult = validateUser(user)

  if(validateResult.isSuccessful === true) {
    
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.insert(user)
      .then(saved => {
        res.status(201).json(saved)
      })
      .catch(err => {
        res.status(500).json(err);
      })
  } else {
    res.status(400).json({
      message: 'SEE ERROR FOR DETAILS!!',
      errors: validateResult.errors
    })
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {

        const token = getJwtToken(user)

        res.status(200).json({
          message: `HELLLLOOOOOO ${user.username}!`,
          token
        });

      } else {
        res.status(401).json({ message: 'Invalid credentials! Try again!!!!'})
      }
    })
    .catch(err => {
      res.status(500).json(err);
  })
});

function getJwtToken(user) {

  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: '12h'
  };

  return jwt.sign(payload, secrets.jwtSecret, options)
};

module.exports = router;
