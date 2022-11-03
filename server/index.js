const app = require('./service.js');
// const db = require('./db');
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`review-service is listening on ${PORT}`);
});