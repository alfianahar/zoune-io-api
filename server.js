const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const signin = require('./Control/signin');
const register = require('./Control/register');
const profile = require('./Control/profile');
const image = require('./Control/image.js');

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      rejectUnauthorized: false
    }
  });

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {res.send('server working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.put('/image', image.handleImage(db))
app.post('/imageurl', image.handleApiCall())

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})

