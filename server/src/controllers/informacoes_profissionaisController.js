const Sequelize = require('sequelize');
const sequelize = require('../models/database');
const InformacoesProfissionais = require('../models/informacoes_profissionais');

const informacoesProfissionaisController = {};

informacoesProfissionaisController.getId = async (req, res) => {
    const { id } = req.params;

    try {
        const query = `SELECT * FROM informacoes_profissionais WHERE id_pessoa = ${id}`;
        const data = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });

        if (data.length > 0) {
            res.json({ success: true, data: data });
        } else {
            res.status(404).json({ success: false, message: 'Não contem informaçoes' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

informacoesProfissionaisController.create = async (req, res) => {
    const {
        id_pessoa_param,
        titulo_param,
        descricao_param,
        documento_param,
        password_tipo_paramparam
    } = req.body;

    try {
        const query = `
        CALL InserirInformacaoProfissional(
          ${id_pessoa_param},
          '${titulo_param}',
          '${descricao_param}',
          '${documento_param}',
          '${password_tipo_paramparam}'
        )
      `;

        await sequelize.query(query);

        res.json({ success: true, message: 'Informação profissional inserida com sucesso!' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

informacoesProfissionaisController.delete = async (req, res) => {
    const {
        id_informacao_param
    } = req.body;
    try {
        const query = `
        CALL ExcluirInformacaoProfissional(
          ${id_informacao_param}
        )
      `;
        await sequelize.query(query);
        res.json({ success: true, message: 'Informação profissional apagada com sucesso!', deleted: query });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


module.exports = informacoesProfissionaisController;