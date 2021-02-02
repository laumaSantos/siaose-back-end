const { select, where } = require("../database/connection");
const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const { name } = req.headers;

    const services = await connection("users")
      .where("name", "like", `%${name}%`)
      .select("*");
    // console.log(services)

    if (services.length === 0) {
      return res.json({ error: "Não encontramos esses dados." });
    }

    return res.json(services);
  },
};
