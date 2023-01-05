const express = require("express");

const db = require("./fakeDb");

const router = new express.Router():

app.use(express.json());

router.get("/", function(req, res) {
  return res.json({
    items: db.items
  })
})

router.post("/", function(req, res) {
  name = req.body.name;
  price = req.body.price;

  db.items.push({name, price})

  return res.json({"added": {name, price}})


})

module.export()