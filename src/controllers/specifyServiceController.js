const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { service_id } = req.params;
    const services = await connection("services")
      .where("id", service_id)
      .select("*");

    return res.json(services);
  },
};
