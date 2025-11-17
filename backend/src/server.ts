// Todas as Importações
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import stopsRoutes from "./api/routes/stops.routes";
import linesRoutes from "./api/routes/lines.routes";
import routesRoutes from "./api/routes/routes.routes";
import loginRoutes from "./api/routes/login.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Carregar Documentação Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "MultiBus API Documentation"
}));

<<<<<<< HEAD
// Rotas principais
app.use("/api/v1/stops", stopsRoutes);
app.use("/api/v1/lines", linesRoutes);
app.use("/api/v1/routes", routesRoutes);
app.use("/api/v1/login", loginRoutes);
=======
//Rotas Principais dos Ônibus
app.use("/stops", stopsRoutes);
app.use("/lines", linesRoutes);
app.use("/routes", routesRoutes);
>>>>>>> 2b5bde9fcb3b8d0f9a21925d0d41fb27a19d5569

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