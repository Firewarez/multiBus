import express, { Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import stopsRoutes from "./api/routes/stops.routes";
import linesRoutes from "./api/routes/lines.routes";
import routesRoutes from "./api/routes/routes.routes";

dotenv.config();

const app = express();
app.use(express.json());

// Carregar documentação Swagger
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger.yaml"));

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "MultiBus API Documentation"
}));

//Rotas Principais dos Ônibus
app.use("/stops", stopsRoutes);
app.use("/lines", linesRoutes);
app.use("/routes", routesRoutes);

// Teste de rota inicial com tipagem
app.get("/", (req: Request, res: Response) => {
    res.send("🚍 API MultiBus rodando!");
});

// Rota para acessar a documentação
app.get("/docs", (req: Request, res: Response) => {
    res.redirect("/api-docs");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚍 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
});