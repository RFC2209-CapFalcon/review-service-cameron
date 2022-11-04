const Router = require('express-promise-router')
const db = require('../db')

const router = new Router()

// export our router to be mounted by the parent application
module.exports = router

// db.query references the query method exported by db/index.js - query(text, params, callback)

router.get('/', async (req, res) => {
  const { product_id } = req.params
  const { rows } = await db.query(`
  SELECT review_id
  FROM reviews
  WHERE product_id = $1
  `, [product_id])
  res.send(rows)
})

router.post('/', async (req, res) => {
  const { product_id } = req.body
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
})

router.get('/meta', async (req, res) => {
  const { product_id } = req.params
  const { rows } = await db.query('', [product_id])
  res.send(rows)
})

router.put('/:review_id/helpful', async (req, res) => {
  const { review_id } = req.params
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
})

router.put('/:review_id/report', async (req, res) => {
  const { review_id } = req.params
  const queryRes = await db.query('', [product_id])
  res.send(queryRes)
})