"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carregar .env do diretório raiz do projeto (uma pasta acima)
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../../.env') });
console.log("=== TESTE DE VARIÁVEIS DE AMBIENTE ===");
console.log("📁 Arquivo .env carregado de:", path_1.default.join(__dirname, '../../../.env'));
console.log("🔧 Variáveis de ambiente:");
console.log("POSTGRES_USER:", process.env.POSTGRES_USER || "❌ NÃO ENCONTRADA");
console.log("POSTGRES_PASSWORD:", process.env.POSTGRES_PASSWORD ? "✅ ENCONTRADA" : "❌ NÃO ENCONTRADA");
console.log("POSTGRES_DB:", process.env.POSTGRES_DB || "❌ NÃO ENCONTRADA");
console.log("DB_HOST:", process.env.DB_HOST || "❌ NÃO ENCONTRADA");
console.log("DB_PORT:", process.env.DB_PORT || "❌ NÃO ENCONTRADA");
console.log("GOOGLE_API_KEY:", process.env.GOOGLE_API_KEY ? "✅ ENCONTRADA" : "❌ NÃO ENCONTRADA");
// Teste de conexão com banco
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
});
async function testConnection() {
    try {
        console.log("\n=== TESTE DE CONEXÃO COM BANCO ===");
        console.log("🔗 Tentando conectar...");
        const client = await pool.connect();
        console.log("✅ Conexão bem sucedida!");
        const result = await client.query('SELECT NOW()');
        console.log("⏰ Hora do servidor:", result.rows[0].now);
        client.release();
        await pool.end();
    }
    catch (error) {
        console.error("❌ Erro na conexão:", error.message);
        process.exit(1);
    }
}
testConnection();
//# sourceMappingURL=testConnection.js.map