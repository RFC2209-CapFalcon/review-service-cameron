const Router = require('express-promise-router')
const { getReviews, postReview, getCharacteristics, markHelpful, reportReview } = require('../controllers/reviews.js')

const router = new Router()


router.get('/', getReviews)

router.post('/', postReview)

router.get('/meta', getCharacteristics)

router.put('/:review_id/helpful', markHelpful)

router.put('/:review_id/report', reportReview)

// export our router to be mounted by the parent application
module.exports = router
