"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const stops_routes_1 = __importDefault(require("./api/routes/stops.routes"));
const lines_routes_1 = __importDefault(require("./api/routes/lines.routes"));
const routes_routes_1 = __importDefault(require("./api/routes/routes.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Carregar documentação Swagger
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, "../swagger.yaml"));
// Swagger UI
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "MultiBus API Documentation"
}));
// Rotas principais
app.use("/stops", stops_routes_1.default);
app.use("/lines", lines_routes_1.default);
app.use("/routes", routes_routes_1.default);
// Teste de rota inicial com tipagem
app.get("/", (req, res) => {
    res.send("🚍 API MultiBus rodando!");
});
// Rota para acessar a documentação
app.get("/docs", (req, res) => {
    res.redirect("/api-docs");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚍 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
});
//# sourceMappingURL=server.js.map