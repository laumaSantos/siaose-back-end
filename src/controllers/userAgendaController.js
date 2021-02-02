const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    console.log(req.params);
    const { id } = req.params;
    const agenda = await connection("agenda").where("user_id", id).select("*");

    if (agenda.length === 0)
      return res.json({ message: "Nenhum serviço agendado!" });

    return res.json(agenda);
  },
};
