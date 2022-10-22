const express = require("express");
const cors = require("cors");
const PORT = 3000;

//importing Routers
const ListingsRouter = require("./routers/listingRouter");
const UsersRouter = require("./routers/userRouter");

//importing controllers
const ListingsController = require("./controllers/listingController");
const UserController = require("./controllers/userController");

//importing DB
const db = require("./db/models/index");
const { listing, category, shop, user } = db;

//initializing controlers
const listingsController = new ListingsController(listing, category, shop);
const usersController = new UserController(user, listing);

//initializing controllers
const listingsRouter = new ListingsRouter(listingsController).routes();
const usersRouter = new UsersRouter(usersController).routes();

const app = express();
app.use(cors());

const { auth } = require("express-oauth2-jwt-bearer");

const checkJwt = auth({
  audience: "https://maplesell/api",
  issuerBaseURL: `https://dev-hmluigxe.us.auth0.com`,
});

app.get("/", checkJwt, (req, res) => {
  res.send("Hello, World!");
});

//enable reading JSON request bodies
app.use(express.json());

//enable and use router
app.use("/home", listingsRouter);
app.use("/user", usersRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
