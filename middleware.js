/** Middleware for express-shopping-list app. */

const { BadRequestError, NotFoundError } = require("./expressError");
const db = require("./fakeDb");

function finder(req, res, next) {
  if (db.items.find(({ name }) => name === req.params.name)) {
    next();
  } else {
    throw new NotFoundError(`${req.params.name} is not an item.`);
  }
}

function confirmType(req, res, next) {
  const { name, price } = req.body;

  // Make sure name is a-z and less than 25 chars long.

  if (!/^[a-z ]+$/i.test(name)) {
    throw new BadRequestError("Please input a valid string.")
  }

  // Make sure price can be converted into a number.
  try {
    Number(price);
  } catch (e) {
    throw new BadRequestError("Please input a valid number.");
  }
  if (!Number(price)) throw new BadRequestError("Please input a valid number.");
  next();
}


module.exports = { finder, confirmType };
