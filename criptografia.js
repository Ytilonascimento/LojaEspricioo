const bcrypt = require ("bcrypt");

let senha = 'senha-123';

const saltRounds = 10;

const senhaCriptografada = bcrypt.hashSync(senha, saltRounds); // hashSync gera o hash

const crypto = require("crypto");

function criptografarSenha(senha) {
    return crypto.createHash("sha256").update(senha).digest();
};

module.exports = { criptografarSenha };

