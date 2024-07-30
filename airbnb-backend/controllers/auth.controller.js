const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../config/jwt.config');

const users = []; // Dummy users array, replace with your actual user model

async function register(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { id: Date.now().toString(), username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('Failed to register user');
  }
}

async function login(req, res) {
  const user = users.find(user => user.username === req.body.username);
  if (!user) {
    return res.status(404).send('User not found');
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const accessToken = jwt.sign({ username: user.username }, secretKey);
      res.json({ accessToken: accessToken });
    } else {
      res.status(403).send('Incorrect password');
    }
  } catch {
    res.status(500).send('Login error');
  }
}

module.exports = { register, login };
