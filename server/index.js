const service = require('./service.js');
const db = require('./db');
const port = 8000;

app.listen(port, () => {
  console.log(`review-service is listening on ${port}`);
});