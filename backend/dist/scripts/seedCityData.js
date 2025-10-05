"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CITY_LINES = exports.CITY_STOPS = exports.CITY_CONFIG = void 0;
exports.seedBrazilianCity = seedBrazilianCity;
const db_1 = __importDefault(require("../config/db"));
const googleService = __importStar(require("./googleApi.services"));
// Configure this for your city
const CITY_CONFIG = {
    name: "João_Pessoa", // Replace with your city name
    state: "Paraíba", // Replace with your state
    centerCoordinates: {
        lat: -7.1150, // Replace with your city center latitude
        lng: -34.8641 // Replace with your city center longitude
    }
};
exports.CITY_CONFIG = CITY_CONFIG;
// Paradas específicas de João Pessoa, PB
const CITY_STOPS = [
    {
        name: "Terminal de Integração",
        address: "Terminal de Integração, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Centro - Praça João Pessoa",
        address: "Praça João Pessoa, Centro, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Tambaú",
        address: "Tambaú, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Cabo Branco",
        address: "Cabo Branco, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Manaíra",
        address: "Manaíra, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Shopping Tambaú",
        address: "Shopping Tambaú, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "UFPB - Campus I",
        address: "Universidade Federal da Paraíba, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Hospital Universitário",
        address: "Hospital Universitário Lauro Wanderley, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Epitácio Pessoa",
        address: "Epitácio Pessoa, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Shopping Mangabeira",
        address: "Shopping Mangabeira, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Valentina de Figueiredo",
        address: "Valentina de Figueiredo, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Bancários",
        address: "Bancários, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Shopping Sul",
        address: "Shopping Sul, João Pessoa, PB",
        lat: null,
        lng: null
    },
    {
        name: "Aeroporto Castro Pinto",
        address: "Aeroporto Castro Pinto, Bayeux, PB",
        lat: null,
        lng: null
    }
];
exports.CITY_STOPS = CITY_STOPS;
// Linhas de ônibus baseadas no sistema real de João Pessoa
const CITY_LINES = [
    {
        code: "1300",
        name: "Terminal - Tambaú",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Tambaú"]
    },
    {
        code: "1301",
        name: "Terminal - Cabo Branco",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Tambaú", "Cabo Branco"]
    },
    {
        code: "1400",
        name: "Terminal - Manaíra",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Epitácio Pessoa", "Manaíra"]
    },
    {
        code: "513",
        name: "Terminal - UFPB",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "UFPB - Campus I"]
    },
    {
        code: "1500",
        name: "Terminal - Mangabeira",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Shopping Mangabeira", "Valentina de Figueiredo"]
    },
    {
        code: "1200",
        name: "Terminal - Bancários",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Bancários", "Shopping Sul"]
    },
    {
        code: "100",
        name: "Aeroporto - Centro",
        stops: ["Aeroporto Castro Pinto", "Centro - Praça João Pessoa", "Terminal de Integração"]
    },
    {
        code: "510",
        name: "Circular Hospitais",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Hospital Universitário", "UFPB - Campus I"]
    },
    {
        code: "1600",
        name: "Orla Marítima",
        stops: ["Cabo Branco", "Tambaú", "Manaíra", "Shopping Tambaú"]
    }
];
exports.CITY_LINES = CITY_LINES;
async function seedBrazilianCity() {
    console.log(`🌱 Populando banco de dados para ${CITY_CONFIG.name}...`);
    try {
        // Check if Google API key is configured
        if (!process.env.GOOGLE_API_KEY) {
            console.warn("⚠️  GOOGLE_API_KEY não configurada. Usando coordenadas padrão.");
            console.log("📝 Para obter coordenadas reais, configure a API key do Google Maps.");
        }
        // Clear existing data
        console.log("🧹 Limpando dados existentes...");
        await db_1.default.query("DELETE FROM route_stops");
        await db_1.default.query("DELETE FROM routes");
        await db_1.default.query("DELETE FROM lines");
        await db_1.default.query("DELETE FROM stops");
        // Get coordinates for stops using Google API
        console.log("📍 Obtendo coordenadas das paradas...");
        for (const stop of CITY_STOPS) {
            try {
                if (process.env.GOOGLE_API_KEY) {
                    const coords = await googleService.getCoordinates(stop.address);
                    stop.lat = coords.lat;
                    stop.lng = coords.lng;
                    console.log(`✅ ${stop.name}: ${coords.lat}, ${coords.lng}`);
                }
                else {
                    // Use approximate coordinates near city center
                    stop.lat = CITY_CONFIG.centerCoordinates.lat + (Math.random() - 0.5) * 0.02;
                    stop.lng = CITY_CONFIG.centerCoordinates.lng + (Math.random() - 0.5) * 0.02;
                    console.log(`📍 ${stop.name}: ${stop.lat}, ${stop.lng} (aproximado)`);
                }
                // Add small delay to avoid API rate limits
                await new Promise(resolve => setTimeout(resolve, 200));
            }
            catch (error) {
                console.warn(`⚠️  Erro ao obter coordenadas para ${stop.name}, usando aproximadas`);
                stop.lat = CITY_CONFIG.centerCoordinates.lat + (Math.random() - 0.5) * 0.02;
                stop.lng = CITY_CONFIG.centerCoordinates.lng + (Math.random() - 0.5) * 0.02;
            }
        }
        // Insert stops
        console.log("🚏 Inserindo paradas...");
        const insertedStops = [];
        for (const stop of CITY_STOPS) {
            const result = await db_1.default.query("INSERT INTO stops (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *", [stop.name, stop.lat, stop.lng]);
            insertedStops.push(result.rows[0]);
        }
        // Insert lines and routes
        console.log("🚌 Inserindo linhas de ônibus...");
        for (const line of CITY_LINES) {
            // Insert line
            const lineResult = await db_1.default.query("INSERT INTO lines (code, name) VALUES ($1, $2) RETURNING *", [line.code, line.name]);
            const insertedLine = lineResult.rows[0];
            // Create ida route
            const idaRouteResult = await db_1.default.query("INSERT INTO routes (line_id, direction) VALUES ($1, 'ida') RETURNING *", [insertedLine.id]);
            const idaRoute = idaRouteResult.rows[0];
            // Create volta route  
            const voltaRouteResult = await db_1.default.query("INSERT INTO routes (line_id, direction) VALUES ($1, 'volta') RETURNING *", [insertedLine.id]);
            const voltaRoute = voltaRouteResult.rows[0];
            // Add stops to ida route
            for (let i = 0; i < line.stops.length; i++) {
                const stopName = line.stops[i];
                const stop = insertedStops.find(s => s.name === stopName);
                if (stop) {
                    await db_1.default.query("INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3)", [idaRoute.id, stop.id, i + 1]);
                }
            }
            // Add stops to volta route (reverse order)
            for (let i = line.stops.length - 1; i >= 0; i--) {
                const stopName = line.stops[i];
                const stop = insertedStops.find(s => s.name === stopName);
                if (stop) {
                    await db_1.default.query("INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3)", [voltaRoute.id, stop.id, line.stops.length - i]);
                }
            }
            console.log(`✅ Linha ${line.code} - ${line.name} criada`);
        }
        console.log("🎉 Banco de dados populado com sucesso!");
        console.log(`📊 Criadas: ${insertedStops.length} paradas e ${CITY_LINES.length} linhas`);
        // Show summary
        const stopsCount = await db_1.default.query("SELECT COUNT(*) FROM stops");
        const linesCount = await db_1.default.query("SELECT COUNT(*) FROM lines");
        const routesCount = await db_1.default.query("SELECT COUNT(*) FROM routes");
        console.log("📈 Resumo final:");
        console.log(`   Paradas: ${stopsCount.rows[0].count}`);
        console.log(`   Linhas: ${linesCount.rows[0].count}`);
        console.log(`   Rotas: ${routesCount.rows[0].count}`);
    }
    catch (error) {
        console.error("❌ Erro ao popular banco:", error.message);
        throw error;
    }
}
// Run if called directly
if (require.main === module) {
    seedBrazilianCity()
        .then(() => {
        console.log("✅ Script finalizado com sucesso!");
        process.exit(0);
    })
        .catch((error) => {
        console.error("❌ Script falhou:", error);
        process.exit(1);
    });
}
//# sourceMappingURL=seedCityData.js.map