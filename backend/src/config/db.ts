import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";


const envPath = path.resolve(__dirname, "../../../.env");

dotenv.config({ path: envPath });

// Debug para garantir que o db.ts leu antes de conectar
console.log("🔌 [DB] Tentando conectar...");
console.log("   -> HOST:", process.env.DB_HOST || "❌ Não leu");

export const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    ssl: {
        rejectUnauthorized: false,
    },
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 10000, // Adicionado para evitar conexões presas
});

pool.on('connect', () => {
    console.log('✅ [DB] Conectado com sucesso!');
});

pool.on('error', (err) => {
    console.error('❌ [DB] Erro inesperado:', err);
});

export default pool;