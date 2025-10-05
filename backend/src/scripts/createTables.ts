import db from "../config/db";
import fs from "fs";
import path from "path";

async function createTables() {
    try {
        console.log("🏗️  Criando tabelas do banco de dados...");
        
        // Ler o arquivo SQL schema
        const sqlFilePath = path.join(__dirname, "../config/db.sql");
        const sqlCommands = fs.readFileSync(sqlFilePath, "utf8");
        
        // Executar comandos SQL
        await db.query(sqlCommands);
        
        console.log("✅ Tabelas criadas com sucesso!");
        
        // Verificar se as tabelas foram criadas
        const tablesResult = await db.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public'
        `);
        
        console.log("📋 Tabelas no banco:");
        tablesResult.rows.forEach(row => {
            console.log(`   - ${row.table_name}`);
        });
        
    } catch (error: any) {
        console.error("❌ Erro ao criar tabelas:", error.message);
        throw error;
    } finally {
        await db.end();
    }
}

createTables();