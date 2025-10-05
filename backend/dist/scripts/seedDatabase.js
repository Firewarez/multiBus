"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../config/db"));
async function seed() {
    console.log("🌱 Iniciando inserção de dados...");
    try {
        // Limpar tabelas existentes
        await db_1.default.query("DELETE FROM route_stops");
        await db_1.default.query("DELETE FROM routes");
        await db_1.default.query("DELETE FROM lines");
        await db_1.default.query("DELETE FROM stops");
        // Inserir paradas
        const stops = await db_1.default.query(`
      INSERT INTO stops (name, latitude, longitude)
      VALUES
        ('Terminal Central', -23.550520, -46.633308),
        ('Av. Paulista - Estação Trianon', -23.561684, -46.655981),
        ('Av. Paulista - Estação Consolação', -23.556580, -46.662113)
      RETURNING *;
    `);
        // Inserir linha
        const line = await db_1.default.query(`
      INSERT INTO lines (code, name)
      VALUES ('120', 'Terminal Central - Paulista')
      RETURNING *;
    `);
        // Inserir rotas (ida e volta)
        const routeIda = await db_1.default.query(`
      INSERT INTO routes (line_id, direction)
      VALUES ($1, 'ida') RETURNING *;
    `, [line.rows[0].id]);
        const routeVolta = await db_1.default.query(`
      INSERT INTO routes (line_id, direction)
      VALUES ($1, 'volta') RETURNING *;
    `, [line.rows[0].id]);
        // Inserir ordem das paradas
        await db_1.default.query(`
      INSERT INTO route_stops (route_id, stop_id, stop_order)
      VALUES
        ($1, $2, 1),
        ($1, $3, 2),
        ($1, $4, 3),
        ($5, $4, 1),
        ($5, $3, 2),
        ($5, $2, 3);
    `, [
            routeIda.rows[0].id,
            stops.rows[0].id,
            stops.rows[1].id,
            stops.rows[2].id,
            routeVolta.rows[0].id
        ]);
        console.log("✅ Banco populado com sucesso!");
    }
    catch (error) {
        console.error("❌ Erro ao popular banco:", error.message);
    }
    finally {
        db_1.default.end();
    }
}
seed();
//# sourceMappingURL=seedDatabase.js.map