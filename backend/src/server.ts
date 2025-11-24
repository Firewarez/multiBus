import dns from 'node:dns';
if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
}
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import cors from "cors";
import stopsRoutes from "./api/routes/stops.routes";
import linesRoutes from "./api/routes/lines.routes";
import routesRoutes from "./api/routes/routes.routes";
import userRoutes from "./api/routes/user.routes";
import notifRoutes from "./api/routes/notif.routes";

dotenv.config();
const envPath = path.resolve(__dirname, "../../.env");
const result = dotenv.config({ path: envPath });


if (result.error) {
    console.error("❌ Erro ao ler o arquivo .env:", result.error);
} else {
    console.log("📂 Caminho do .env carregado:", envPath);
    console.log("📝 Variáveis lidas:", Object.keys(result.parsed || {}).length);
    // Verifica se leu as variáveis críticas (sem mostrar a senha)
    console.log("   -> DB_HOST:", process.env.DB_HOST || "NÃO LIDO");
    console.log("   -> PORT:", process.env.PORT || "NÃO LIDO");
}

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'https://multi-bus-develop.vercel.app', // Durante desenvolvimento pode deixar '*', em produção coloque a URL do Vercel
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Carregar Documentação Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "MultiBus API Documentation"
}));

// Rotas principais
app.use("/api/v1/stops", stopsRoutes);
app.use("/api/v1/lines", linesRoutes);
app.use("/api/v1/routes", routesRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/notifications", notifRoutes);

// Teste de Rota Inicial com Tipagem em TY
app.get("/", (req: Request, res: Response) => {
    res.send("🚍 API MultiBus rodando!");
});

// Rota para Acessar a Documentação
app.get("/docs", (req: Request, res: Response) => {
    res.redirect("/api-docs");
});

// Quando Executado, Imprime a Porta que está Rodando
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚍 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
});