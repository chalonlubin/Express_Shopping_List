/** Routes for shopping list app. */

const express = require("express");

const db = require("./fakeDb");
const router = new express.Router();

const { finder, confirmType } = require("./middleware");
const { BadRequestError } = require("./expressError");

//** GET /items: get list of items */
router.get("/", function(req, res) {

  return res.json({
    items: db.items
  })
})

//** POST /items: add item to list */
router.post("/", confirmType, function(req, res) {
  const { name, price } = req.body
  let x = db.items.length
  db.items.push({name, price})
  if (x < db.items.length) {
    return res.json({"added": {name, price}})
  } else {
    throw new BadRequestError();
  }
})

//* GET /items/:name: get a single item. */
router.get("/:name", finder, function(req, res) {

  const result = db.items.find(({ name }) => name === req.params.name);

  return res.json(result)
})

//* PATCH /items/:name: Edit a single item. */
router.patch("/:name", finder, confirmType, function(req, res) {
  const { name, price } = req.body
  const index = db.items.findIndex(({ name }) => name === req.params.name);

  db.items[index] = req.body;

  return res.json({"updated:": db.items[index]})
})

//* DELETE /items/:name: Delete a single item. */
router.delete("/:name", finder, function(req, res) {
  const index = db.items.findIndex(({ name }) => name === req.params.name);

  db.items.splice(index,1);

  return res.json({"message": "Deleted"})
})

module.exports = router;