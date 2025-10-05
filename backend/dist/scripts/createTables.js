"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function createTables() {
    try {
        console.log("🏗️  Criando tabelas do banco de dados...");
        // Ler o arquivo SQL schema
        const sqlFilePath = path_1.default.join(__dirname, "../config/db.sql");
        const sqlCommands = fs_1.default.readFileSync(sqlFilePath, "utf8");
        // Executar comandos SQL
        await db_1.default.query(sqlCommands);
        console.log("✅ Tabelas criadas com sucesso!");
        // Verificar se as tabelas foram criadas
        const tablesResult = await db_1.default.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        console.log("📋 Tabelas no banco:");
        tablesResult.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
    }
    catch (error) {
        console.error("❌ Erro ao criar tabelas:", error.message);
        throw error;
    }
    finally {
        await db_1.default.end();
    }
}
createTables();
//# sourceMappingURL=createTables.js.map