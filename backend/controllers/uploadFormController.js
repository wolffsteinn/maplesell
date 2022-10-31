const db = require("../db/models");
const multer = require("multer");
const ListingModel = db.listing;
const imgFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("please upload an image file", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploadedImg");
  },
  filename: (req, file, cb) => {
    //ensures that each photo filename is unique
    cb(null, `${Date.now()}-maplesell-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: imgFilter,
}).single("photo");

const insertOne = async (req, res) => {
  const newListing = await ListingModel.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    category_id: req.body.category_id,
    shop_id: req.body.shop_id,
    photo: req.file.path,
    seller_id: req.body.seller_id,
  });
  return res.json(newListing);
};

module.exports = { upload, insertOne };
