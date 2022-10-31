require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT;

//importing Routers
const ListingsRouter = require("./routers/listingRouter");
const UsersRouter = require("./routers/userRouter");
const CategoriesRouter = require("./routers/categoryRouter");

//importing controllers
const ListingsController = require("./controllers/listingController");
const UserController = require("./controllers/userController");
const CategoryController = require("./controllers/categoryController");
const UploadFormController = require("./controllers/uploadFormController");

//importing DB
const db = require("./db/models/index");
const { listing, category, shop, user } = db;

//initializing controlers
const listingsController = new ListingsController(listing, category, shop);
const usersController = new UserController(user, listing);
const categoriesController = new CategoryController(category);

//initializing routes
const listingsRouter = new ListingsRouter(listingsController).routes();
const usersRouter = new UsersRouter(usersController).routes();
const categoriesRouter = new CategoriesRouter(categoriesController).routes();

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

app.use(express.json());

//enable and use router
app.use("/home", listingsRouter);
app.use("/user", usersRouter);
app.use("/category", categoriesRouter);
// to obtain photos from the localhost folder
app.use("/uploadedImg", express.static("./uploadedImg"));

app.post("/home", UploadFormController.upload, UploadFormController.insertOne);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
