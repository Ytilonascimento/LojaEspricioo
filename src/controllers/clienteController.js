const { clienteModel } = require("../model/clienteModel");
const bcrypt = require ("bcrypt");

const clienteController = {
    criarCliente: async (req, res) => {
        try {
            const { nomeCliente, emailCliente, senhaCliente, cpfCliente } = req.body;

            if (nomeCliente== undefined || nomeCliente== "" || emailCliente== undefined || emailCliente=="" || senhaCliente== undefined || senhaCliente== "" || cpfCliente== undefined || cpfCliente== "") {
                return res.status(400).json({ erro: "Campos obrigatórios não preenchidos!" });
            }

            // Validar CPF (tamanho simples)
            if (cpfCliente.length !== 11) {
                return res.status(400).json({ erro: "CPF inválido! Use o formato 000.000.000-00" });
            }
            const result = await clienteModel.buscarEmailOrCPF(cpfCliente, emailCliente);

            if (result.length > 0){
                return res.status(409).json({message: "Cpf ou Email cadastrado!"});
            }


            const saltRounds = 10;
            
            const senhaCriptografada = bcrypt.hashSync(senhaCliente, saltRounds);
            

            await clienteModel.inserirCliente(
                nomeCliente,
                emailCliente,
                senhaCriptografada,
                cpfCliente
            );

            res.status(201).json({ mensagem: "Cliente cadastrado com sucesso!" });

        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
            res.status(500).json({ erro: "Erro interno ao cadastrar cliente." });
        }
    },

        listarCliente: async (req, res) => {
        try {
            const { idCliente } = req.query;

            if (idCliente) {
                if (idCliente.length != 36) { // Validando o UUID
                    return res.status(400).json({ erro: "Id do Cliente inválido!" });
                }

                const cliente = await clienteModel.buscarUm(idCliente);

                return res.status(200).json(cliente);
            }

            const clientes = await clienteModel.buscarTodos();

            res.status(200).json(clientes);

        } catch (error) {
            console.error('Erro ao listar Clientes:', error);
            res.status(500).json({ erro: 'Erro interno no servidor ao buscar Clientes.' });
        }
    }
};

module.exports = { clienteController };
