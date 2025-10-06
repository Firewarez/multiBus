// Importa os módulos necessários
import { Pool } from "pg";          // Para conexão com PostgreSQL
import dotenv from "dotenv";        // Para variáveis de ambiente
import path from "path";            // Para manipulação de caminhos

// Carrega as variáveis do arquivo .env
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Configura a conexão com o banco de dados
const pool = new Pool({
    host: process.env.DB_HOST || "localhost",     // Endereço do banco
    port: Number(process.env.DB_PORT) || 5433,    // Porta do PostgreSQL
    user: process.env.POSTGRES_USER,              // Usuário
    password: process.env.POSTGRES_PASSWORD,       // Senha
    database: process.env.POSTGRES_DB,            // Nome do banco
});

export default pool;