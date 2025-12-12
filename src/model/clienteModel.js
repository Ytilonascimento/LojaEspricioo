const { sql, getConnection } = require("../config/db");

const clienteModel = {
    inserirCliente: async (nomeCliente, emailCliente, senhaCliente, cpfCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                INSERT INTO Cliente (nomeCliente, emailCliente, senhaCliente, cpfCliente)
                VALUES (@nomeCliente, @emailCliente, @senhaCliente, @cpfCliente)
            `;

            await pool.request()
                .input("nomeCliente", sql.VarChar(100), nomeCliente)
                .input("emailCliente", sql.VarChar(200), emailCliente)
                .input("senhaCliente", sql.VarChar(255), senhaCliente)
                .input("cpfCliente", sql.VarChar(11), cpfCliente)
                .query(querySQL);

        } catch (error) {
            console.error("Erro ao inserir cliente:", error);
            throw error;
        }
    },

        buscarTodos: async () => {
        try {

            const pool = await getConnection();

            const querySQL = 'SELECT * FROM Cliente'; // SELECT (seleciona) * (todas as colunas) FROM Produtos (da tabela de produtos)

            const result = await pool.request()
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao buscar Cliente:", error);
            throw error; // Reverberar o erro para a função que o chamar.
        }
    },

    buscarUm: async (idCliente) => {
        try {
            const pool = await getConnection();

            const querySQL = `
                SELECT * FROM Cliente
                WHERE idCliente = @idCliente
            `; // SELECT (seleciona) * (todas as colunas) FROM Produtos (da tabela de produtos) WHERE idProduto =

            const result = await pool.request()
                .input('idCliente', sql.UniqueIdentifier, idCliente)
                .query(querySQL);

            return result.recordset;

        } catch (error) {
            console.error("Erro ao busca o Cliente:", error);
            throw error;
        }
    },

    buscarEmailOrCPF: async (cpfCliente, emailCliente) => {
        try {
            const pool = await getConnection();
    
            let querySQL = "SELECT * FROM Cliente WHERE cpfCliente = @cpfCliente OR emailCliente = @emailCliente";
    
            const result = await pool
            .request()
            .input("cpfCliente", sql.Char(11), cpfCliente)
            .input("emailCliente", sql.VarChar(200), emailCliente)
            .query(querySQL);
    
            return result.recordset;
    
        } catch (error) {
            console.error("Erro ao buscar cliente", error);
            throw error;
        }
    },
}


module.exports = { clienteModel };
