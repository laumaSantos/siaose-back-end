const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { user_id } = req.headers;
    const services = await connection("services")
      .where("user_id", user_id)
      .select("*");

    return res.json(services);
  },
};
