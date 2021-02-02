const connection = require("../database/connection");

module.exports = {
  async create(req, res) {
    const { data, observation } = req.body;
    // console.log(req.body)
    const user_id = req.headers.user_id; // Usuário que quer o serviço
    const service_id = req.headers.service_id; // Id do serviço
    console.log(user_id);
    // Busca na tabela serviços pelo usuário criador, e compara com o usuário que está tentando se registrar, caso seja o mesmo, retorna erro.
    const maker_id = await connection("services")
      .where("id", service_id)
      .select("user_id")
      .first();
    console.log(maker_id);
    if (maker_id.user_id === user_id) {
      return res.json({
        Message: "Usuário(a) não pode ser o(a) mesmo(a) prestador(a)!",
      });
    }

    const agenda_id = await connection("agenda").insert({
      data,
      observation,
      user_id,
      service_id,
    });
    return res.json(agenda_id);
  },

  async index(req, res) {
    const agenda = await connection("agenda").select("*");

    return res.json(agenda);
  },

  async delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers.user_id;

    console.log("id", id);

    const agenda = await connection("agenda")
      .where("id", id)
      .select("user_id")
      .first();

    if (agenda.user_id != user_id) {
      return res.status(401).json({ error: "Sem permissão" });
    }

    await connection("agenda").where("id", id).delete();

    return res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const user_id = req.headers.user_id;
    const { serviceName, data, hora } = req.body;
    console.log(serviceName);

    const agenda = await connection("agenda")
      .where("id", id)
      .select("user_id")
      .first();
    console.log(agenda);

    if (agenda.user_id != user_id) {
      return res.status(401).json({ error: "Sem permissão" });
    }
    await connection("agenda").where("id", id).update({
      serviceName,
      data,
      hora,
    });

    return res.status(201).json({ Message: "Alteração realizada com sucesso" });
  },
};
