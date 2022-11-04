require("dotenv").config();
const express = require('express');
const PORT = process.env.SERVER_PORT || 8000;
const mountRoutes = require('./routes')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mounts routes via function returned in routes/index.js
mountRoutes(app)


app.get('/', (request, response) => {
  response.json({ sanityCheck: 'Your still insane?!?!' })
})


app.listen(PORT, () => {
  console.log(`review-service is listening on ${PORT}`);
});