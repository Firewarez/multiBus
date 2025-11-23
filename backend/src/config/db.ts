import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Tenta carregar o .env localmente (para quando você roda no PC)
const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

// Limpa espaços em branco que podem vir do Copy/Paste
const user = (process.env.POSTGRES_USER || "").trim();
const password = (process.env.POSTGRES_PASSWORD || "").trim();
const host = (process.env.DB_HOST || "").trim();
const port = Number(process.env.DB_PORT) || 5432;
const database = (process.env.POSTGRES_DB || "postgres").trim();

console.log(`🔌 [DB] Conectando em: ${host}:${port}`);
console.log(`👤 [DB] Usuário: ${user}`);


const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, 
    },
    connectionTimeoutMillis: 10000, 
    idleTimeoutMillis: 10000,
});

pool.on('connect', () => {
    console.log('✅ [DB] Conexão estabelecida com sucesso!');
});

pool.on('error', (err) => {
    console.error('❌ [DB] Erro fatal na conexão:', err);
});

export default pool;