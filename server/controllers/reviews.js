const db = require('../db')

// db.query references the query method exported by db/index.js - query(text, params, callback)
const getReviews = async (req, res) => {
  // Still need to include pagination either by offset/limit or with ordered keyset
  try {
    const { product_id } = req.query;
    if (!product_id) return res.status(400).send('Error: invalid product_id provided');
    const { rows } = await db.query(`
      SELECT r.review_id, r.rating, r.summary, r.recommend, r.response, r.body,  TO_TIMESTAMP(r.date / 1000) AS date, r.reviewer_name, r.helpfulness,
        COALESCE(
          json_agg(
            json_build_object(
              'id', rp.review_photo_id,
              'url', rp.url
        )) FILTER (WHERE rp.review_photo_id IS NOT NULL), '[]') AS photos
      FROM public.reviews r
        LEFT JOIN review_photos rp
        ON r.review_id = rp.review_id
      WHERE product_id = $1
      GROUP BY r.review_id;
    `, [product_id])
    res.send(rows)

  } catch (err) {
    res.status(500).send(err)
  }

}

const postReview = async (req, res) => {
  const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = req.body
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
}

const getCharacteristics = async (req, res) => {
  const { product_id } = req.body
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
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