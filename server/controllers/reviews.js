const { getReviewByProduct, postProductReview} = require('../models/reviews');

// db.query references the query method exported by db/index.js - query(text, params, callback)
const getReviews = async (req, res) => {
  // Still need to include pagination either by offset/limit or with ordered keyset
  try {
    const { product_id } = req.query;
    if (!product_id) return res.status(400).send('Error: invalid product_id provided');
    const { rows } = await getReviewByProduct(product_id);
    res.send(rows);

  } catch (err) {
    res.status(500).send(err);
  }

}

const postReview = async (req, res) => {
  try {
    const reviewData = req.body;
    if (!reviewData) return res.status(400).send('Error: no review responses');

    const queryResponse = await postProductReview(reviewData);
    res.send(queryResponse);
  } catch (err) {
    res.sendStatus(500);
  }
}

const getCharacteristics = async (req, res) => {
  const { product_id } = req.body
  const queryResponse = await db.query('', [product_id])
  res.send(queryResponse)
}

const markHelpful = async (req, res) => {
  const { product_id } = req.body
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
}

const reportReview = async (req, res) => {
  const { product_id } = req.body
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
}

module.exports = {
  getReviews,
  postReview,
  getCharacteristics,
  markHelpful,
  reportReview
}