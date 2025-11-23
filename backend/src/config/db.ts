// Importações do projeto
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
    // Se existir DATABASE_URL (Produção), usa ela. Se não, usa as variáveis soltas (Local)
    connectionString: process.env.DATABASE_URL
        ? process.env.DATABASE_URL
        : undefined,

    // Fallback para variáveis individuais se não tiver string completa
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,

    // OBRIGATÓRIO PARA O SUPABASE
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;