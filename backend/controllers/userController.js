const BaseController = require("./baseController");
const { Op } = require("sequelize");

class UserController extends BaseController {
  constructor(model, listingModel) {
    super(model);
    this.listingModel = listingModel;
  }

  async getInventory(req, res) {
    const buyerId = req.params.buyerId;
    try {
      const output = await this.listingModel.findAll({
        where: {
          [Op.and]: [{ buyer_id: buyerId }, { bought: true }],
        },
      });
      return res.json(output);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }

  async insertUser(req, res) {
    const { email, password, username } = req.body;

    try {
      const newUser = await this.model.create({
        email: email,
        password: password,
        username: username,
      });

      //return with res.json
      return res.json(newUser);
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = UserController;
