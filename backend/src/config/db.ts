// Importações do projeto
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Carregar .env do diretório raiz do projeto
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});

export default pool;