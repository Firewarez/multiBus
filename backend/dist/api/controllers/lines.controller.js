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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLine = exports.updateLine = exports.createLine = exports.getLineById = exports.getAllLines = void 0;
const linesService = __importStar(require("../services/lines.services"));
const getAllLines = async (req, res) => {
    try {
        const lines = await linesService.getAllLines();
        res.json(lines);
    }
    catch {
        res.status(500).json({ error: "Erro ao buscar linhas." });
    }
};
exports.getAllLines = getAllLines;
const getLineById = async (req, res) => {
    try {
        const line = await linesService.getLineById(Number(req.params.id));
        if (!line)
            return res.status(404).json({ error: "Linha não encontrada." });
        res.json(line);
    }
    catch {
        res.status(500).json({ error: "Erro ao buscar linha." });
    }
};
exports.getLineById = getLineById;
const createLine = async (req, res) => {
    try {
        const newLine = await linesService.createLine(req.body);
        res.status(201).json(newLine);
    }
    catch {
        res.status(500).json({ error: "Erro ao criar linha." });
    }
};
exports.createLine = createLine;
const updateLine = async (req, res) => {
    try {
        const updated = await linesService.updateLine(Number(req.params.id), req.body);
        res.json(updated);
    }
    catch {
        res.status(500).json({ error: "Erro ao atualizar linha." });
    }
};
exports.updateLine = updateLine;
const deleteLine = async (req, res) => {
    try {
        await linesService.deleteLine(Number(req.params.id));
        res.json({ message: "Linha removida com sucesso." });
    }
    catch {
        res.status(500).json({ error: "Erro ao deletar linha." });
    }
};
exports.deleteLine = deleteLine;
//# sourceMappingURL=lines.controller.js.map