/** Routes for shopping list app. */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

// app.use(express.json()); // Do we need here?

//** GET /items: get list of items */
router.get("/", function(req, res) {
  return res.json({
    items: db.items
  })
})

//** POST /items: add item to list */
router.post("/", function(req, res) {
  const name = req.body.name;
  const price = req.body.price;

  db.items.push({name, price})

  return res.json({"added": {name, price}})
})

module.exports = router;