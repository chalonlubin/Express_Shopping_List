const request = require("supertest");
const { response } = require("./app");

const app = require("./app");
let db = require("./fakeDb");

let testItem = { name: "Beer", price: 5.0 };

beforeEach(function () {
  db.items.push({ ...testItem });
});

afterEach(function () {
  db.items = [];
});

/** GET /items - returns `{items: [item, ...]} */

describe("GET /items", function () {
  test("Get a list of items", async function () {
    const resp = await request(app).get("/items");
    expect(resp.body).toEqual({ items: [testItem] });
  });
});

/** GET /items/:name - returns data about a single item obj: `{name, price}` */
describe("GET /items/:name", function () {
  test("valid", async function () {
    const resp = await request(app).get(`/items/${testItem.name}`);
    expect(resp.body).toEqual(testItem);
  });

  test("invalid", async function () {
    const resp = await request(app).get("/items/not-real");
    expect(resp.status).toEqual(404);
  });
});

//** POST /items - push an item to db, return a success message. */
describe("POST /items", function () {
  test("Add a single item to the db", async function () {
    const resp = await request(app)
      .post("/items")
      .send({ name: "Cheese", price: 3.00 })
    expect(resp.body).toEqual({ "added": { name: "Cheese", price: 3.00 } });
  });
  test("Item not present", async function () {
    const response = await request(app)
      .post("/items")
      .send();
    expect(response.statusCode).toEqual(500);
  })
});



//** DELETE /items/:name deletes item from db. */
describe("DELETE /items/:item", function () {
  test("Delete a single item from the db", async function () {
    const resp = await request(app).delete(`/items/${testItem.name}`);
    expect(resp.body).toEqual({ message: "Deleted" });
    expect(db.items.length).toEqual(0);
  });
});
