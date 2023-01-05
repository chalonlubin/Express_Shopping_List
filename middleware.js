/** Middleware for express-shopping-list app. */

const { BadRequestError, NotFoundError } = require("./expressError");
const { items } = require("./fakeDb")

function finder(req, res, next) {

  if (db.items.find(({ name }) => name === req.params.name)) {
    next()
  } else {
    throw new NotFoundError(`${req.name} is not an item.`)
  }
}

function confirmType(req, res, next) {
  const { name, price } = req.body
  try {
   name.toString()
  } catch(e) {
    throw new BadRequestError("Please input valid alphabetical characters.")
  }
  try {
    Number(price)
   } catch(e) {
     throw new BadRequestError("Please input a valid number.")
   }
  next()
}