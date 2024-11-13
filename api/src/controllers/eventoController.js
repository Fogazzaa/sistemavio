const connect = require("../db/connect");

module.exports = class eventoController {
  // criação de um evento
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = ` INSERT INTO evento (nome,descricao,data_hora,local,fk_id_organizador) VALUES (?,?,?,?,?)`;
    const values = [nome, descricao, data_hora, local, fk_id_organizador];
    try {
      connect.query(query, values, (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar evento!" });
        }
        return res.status(201).json({ message: "Evento criado com sucesso!" });
      });
    } catch (error) {
      console.log("Erro ao executar consulta: ", error);
      return res.status(500).json({ error: "Erro interno do servido" });
    }
  } // fim do 'createEvento'

  static async getAllEventos(req, res) {
    const query = `SELECT * FROM evento`;
    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }
        return res
          .status(200)
          .json({ message: "Eventos listados com sucesso", eventos: results });
      });
    } catch (error) {
      console.log("Erro ao executar a querry: ", error);
      return res.status(500).json({ error: "Erro interno do Servidor" });
    }
  } // fim do 'getAllEventos'

  static async updateEvento(req, res) {
    const { id_evento, nome, descricao, data_hora, local, fk_id_organizador } =
      req.body;

    if (
      !id_evento ||
      !nome ||
      !descricao ||
      !data_hora ||
      !local ||
      !fk_id_organizador
    ) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = ` UPDATE evento SET nome = ?,descricao = ?,data_hora = ?,local = ?, fk_id_organizador = ? WHERE id_evento = ?`;
    const values = [
      nome,
      descricao,
      data_hora,
      local,
      fk_id_organizador,
      id_evento,
    ];
    try {
      connect.query(query, values, (err, results) => {
        console.log("Resultados: ", results);
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao criar evento!" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ message: "Evento não encontrado" });
        }
        return res
          .status(201)
          .json({ message: "Evento atualizado com sucesso: " });
      });
    } catch (error) {
      console.log("Erro ao executar consulta: ", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  } // fim do 'updateEvento'

  static async deleteEvento(req, res) {
    const eventoId = req.params.id_evento;
    const query = `DELETE FROM evento WHERE id_evento = ?`;
    const values = [eventoId];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não Encontrado" });
        }
        return res.status(200).json({ message: "Evento Excluido com Sucesso" });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  } // fim do 'deleteEvento'

  static async getEventosPorData(req, res) {
    const query = `SELECT * FROM evento`;
    let datasEventos;
    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Erro ao buscar eventos" });
        }
        const dataEvento1 = new Date(results[0].data_hora)
        const dia1 = dataEvento1.getDate();
        const mes1 = dataEvento1.getMonth()+1;
        const ano1 = dataEvento1.getFullYear();
        console.log(' Data Evento 1:', dia1 + '/' + mes1 + '/' + ano1, "\n")
        const dataEvento2 = new Date(results[1].data_hora)
        const dia2 = dataEvento2.getDate();
        const mes2 = dataEvento2.getMonth()+1;
        const ano2 = dataEvento2.getFullYear();
        console.log(' Data Evento 2:', dia2 + '/' + mes2 + '/' + ano2, "\n")
        const dataEvento3 = new Date(results[2].data_hora)
        const dia3 = dataEvento3.getDate();
        const mes3 = dataEvento3.getMonth()+1;
        const ano3 = dataEvento3.getFullYear();
        console.log(' Data Evento 3:', dia3 + '/' + mes3 + '/' + ano3, "\n")
        const now = new Date();
        const eventosPassados = results.filter(evento => new Date(evento.data_hora) < now);
        const eventosFuturos = results.filter(evento => new Date(evento.data_hora) >= now);
        return res
          .status(200)
          .json({ message: "Eventos: ", eventosFuturos, eventosPassados});
      });
    } catch (error) {
      console.log("Erro ao executar a querry: ", error);
      return res.status(500).json({ error: "Erro interno do Servidor" });
    }
  } // fim do 'getEventosPorData'
};
