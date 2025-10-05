import db from "../config/db";
import * as googleService from "./googleApi.services";

// Configure this for your city
const CITY_CONFIG = {
    name: "João_Pessoa", // Replace with your city name
    state: "Paraíba", // Replace with your state
    centerCoordinates: {
        lat: -7.1150, // Replace with your city center latitude
        lng: -34.8641  // Replace with your city center longitude
    }
};

// Paradas específicas de João Pessoa, PB
const CITY_STOPS = [
    {
        name: "Terminal de Integração",
        address: "Terminal de Integração, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Centro - Praça João Pessoa",
        address: "Praça João Pessoa, Centro, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Tambaú",
        address: "Tambaú, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Cabo Branco",
        address: "Cabo Branco, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Manaíra",
        address: "Manaíra, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Shopping Tambaú",
        address: "Shopping Tambaú, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "UFPB - Campus I",
        address: "Universidade Federal da Paraíba, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Hospital Universitário",
        address: "Hospital Universitário Lauro Wanderley, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Epitácio Pessoa",
        address: "Epitácio Pessoa, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Shopping Mangabeira",
        address: "Shopping Mangabeira, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Valentina de Figueiredo",
        address: "Valentina de Figueiredo, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Bancários",
        address: "Bancários, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Shopping Sul",
        address: "Shopping Sul, João Pessoa, PB",
        lat: null as number | null,
        lng: null as number | null
    },
    {
        name: "Aeroporto Castro Pinto",
        address: "Aeroporto Castro Pinto, Bayeux, PB",
        lat: null as number | null,
        lng: null as number | null
    }
];

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
        await db.query("DELETE FROM route_stops");
        await db.query("DELETE FROM routes");
        await db.query("DELETE FROM lines");
        await db.query("DELETE FROM stops");

        // Get coordinates for stops using Google API
        console.log("📍 Obtendo coordenadas das paradas...");
        for (const stop of CITY_STOPS) {
            try {
                if (process.env.GOOGLE_API_KEY) {
                    const coords = await googleService.getCoordinates(stop.address);
                    stop.lat = coords.lat;
                    stop.lng = coords.lng;
                    console.log(`✅ ${stop.name}: ${coords.lat}, ${coords.lng}`);
                } else {
                    // Use approximate coordinates near city center
                    stop.lat = CITY_CONFIG.centerCoordinates.lat + (Math.random() - 0.5) * 0.02;
                    stop.lng = CITY_CONFIG.centerCoordinates.lng + (Math.random() - 0.5) * 0.02;
                    console.log(`📍 ${stop.name}: ${stop.lat}, ${stop.lng} (aproximado)`);
                }
                // Add small delay to avoid API rate limits
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (error) {
                console.warn(`⚠️  Erro ao obter coordenadas para ${stop.name}, usando aproximadas`);
                stop.lat = CITY_CONFIG.centerCoordinates.lat + (Math.random() - 0.5) * 0.02;
                stop.lng = CITY_CONFIG.centerCoordinates.lng + (Math.random() - 0.5) * 0.02;
            }
        }

        // Insert stops
        console.log("🚏 Inserindo paradas...");
        const insertedStops = [];
        for (const stop of CITY_STOPS) {
            const result = await db.query(
                "INSERT INTO stops (name, latitude, longitude) VALUES ($1, $2, $3) RETURNING *",
                [stop.name, stop.lat, stop.lng]
            );
            insertedStops.push(result.rows[0]);
        }

        // Insert lines and routes
        console.log("🚌 Inserindo linhas de ônibus...");
        for (const line of CITY_LINES) {
            // Insert line
            const lineResult = await db.query(
                "INSERT INTO lines (code, name) VALUES ($1, $2) RETURNING *",
                [line.code, line.name]
            );
            const insertedLine = lineResult.rows[0];

            // Create ida route
            const idaRouteResult = await db.query(
                "INSERT INTO routes (line_id, direction) VALUES ($1, 'ida') RETURNING *",
                [insertedLine.id]
            );
            const idaRoute = idaRouteResult.rows[0];

            // Create volta route  
            const voltaRouteResult = await db.query(
                "INSERT INTO routes (line_id, direction) VALUES ($1, 'volta') RETURNING *",
                [insertedLine.id]
            );
            const voltaRoute = voltaRouteResult.rows[0];

            // Add stops to ida route
            for (let i = 0; i < line.stops.length; i++) {
                const stopName = line.stops[i];
                const stop = insertedStops.find(s => s.name === stopName);
                if (stop) {
                    await db.query(
                        "INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3)",
                        [idaRoute.id, stop.id, i + 1]
                    );
                }
            }

            // Add stops to volta route (reverse order)
            for (let i = line.stops.length - 1; i >= 0; i--) {
                const stopName = line.stops[i];
                const stop = insertedStops.find(s => s.name === stopName);
                if (stop) {
                    await db.query(
                        "INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES ($1, $2, $3)",
                        [voltaRoute.id, stop.id, line.stops.length - i]
                    );
                }
            }

            console.log(`✅ Linha ${line.code} - ${line.name} criada`);
        }

        console.log("🎉 Banco de dados populado com sucesso!");
        console.log(`📊 Criadas: ${insertedStops.length} paradas e ${CITY_LINES.length} linhas`);
        
        // Show summary
        const stopsCount = await db.query("SELECT COUNT(*) FROM stops");
        const linesCount = await db.query("SELECT COUNT(*) FROM lines");
        const routesCount = await db.query("SELECT COUNT(*) FROM routes");
        
        console.log("📈 Resumo final:");
        console.log(`   Paradas: ${stopsCount.rows[0].count}`);
        console.log(`   Linhas: ${linesCount.rows[0].count}`);
        console.log(`   Rotas: ${routesCount.rows[0].count}`);

    } catch (error: any) {
        console.error("❌ Erro ao popular banco:", error.message);
        throw error;
    }
}

// Export for use in other scripts
export { seedBrazilianCity, CITY_CONFIG, CITY_STOPS, CITY_LINES };

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