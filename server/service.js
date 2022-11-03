const express = require('express');
const pg = require('pg');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.json({ sanityCheck: 'Your still insane?!?!' })
})

module.exports = app;