const express = require("express");
const router = express.Router();

class ListingsRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    router.get("/", this.controller.getShop.bind(this.controller));
    router.get("/:shopId", this.controller.getShopItem.bind(this.controller));
    router.put("/:shopId", this.controller.soldOne.bind(this.controller));
    return router;
  }
}

module.exports = ListingsRouter;
