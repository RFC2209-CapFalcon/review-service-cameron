const db = require('../db')

const getReviewByProduct = async (product_id) => {
  return db.query(`
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
}

const postProductReview = async (reviewData) => {
  const { product_id, rating, summary, body, recommend, name, email, photos, characteristics } = reviewData;
  try {
    // Post review to reviews
    let { rows } = await db.query(`
      INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING review_id
    `, [product_id, rating, Date.now(), summary, body, recommend, false, name, email, null, 0])
    if (!(!!rows.length)) {
      throw new Error('Posting review failed');
    }
    const { review_id } = rows[0]

    // Post pictures to review_photos
    if (!!photos.length) {
      const photoResponses = [];
      await Promise.all(photos.map(async (url) => {
        let photoRes = await db.query('INSERT INTO review_photos(review_id, url) VALUES($1, $2)', [review_id, url]);
        photoResponses.push(photoRes);
      }))
      .then(() => {
        if (!(photos.length === photoResponses.length)) {
          throw new Error('Posting review photos failed');
        }
      })
    }

    // Post into characteristic_reviews
    let characteristicsIds = Object.keys(characteristics);
    const characteristicsResponses = []
    await Promise.all(characteristicsIds.map(async characteristicId => {
      let characteristicsResponse = await db.query('INSERT INTO characteristic_reviews(characteristic_id, review_id, value) VALUES($1, $2, $3)', [characteristicId, review_id, characteristics[characteristicId]]);
      characteristicsResponses.push(characteristicsResponse);
    }))
    .then(() => {
      if (!(characteristicsResponses.length === characteristicsIds.length)) {
        throw new Error('Posting characteristics failed');
      }
    })
  } catch (err) {
    console.log('Error: Database', err.message);
  }


}

module.exports = {
  getReviewByProduct,
  postProductReview
}