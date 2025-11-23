import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

// Carrega .env local se existir
const envPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: envPath });

// Limpa e força tipagem string
const user = String(process.env.POSTGRES_USER || "").trim();
const password = String(process.env.POSTGRES_PASSWORD || "").trim();
const host = String(process.env.DB_HOST || "").trim();
const port = Number(process.env.DB_PORT) || 5432;
const database = String(process.env.POSTGRES_DB || "postgres").trim();

// --- ÁREA DE DEBUG ---
console.log("========================================");
console.log("🔍 DEBUG DE CREDENCIAIS (Render)");
console.log(`👤 User lido:     '${user}'`); // Aspas mostram espaços escondidos
console.log(`🏠 Host lido:     '${host}'`);
console.log(`🚪 Port lido:     '${port}'`);
console.log(`🗄️  Database:      '${database}'`);
console.log(`🔑 Senha (len):   ${password.length} caracteres`);
console.log("========================================");

// Monta string manualmente
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