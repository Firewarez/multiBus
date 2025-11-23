<div align="center">

# 🚌 MultiBus

### Plataforma Inteligente de Transporte Público

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

**Uma solução moderna e completa para acesso e gerenciamento de dados de transporte público em tempo real**

[Documentação](#-documentação) • [Instalação](#-instalação-rápida) • [API](#-api-rest) • [Contribuir](#-contribuindo)

---

</div>

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Características](#-características)
- [Tecnologias](#-tecnologias)
- [Instalação Rápida](#-instalação-rápida)
- [Arquitetura](#-arquitetura)
- [API REST](#-api-rest)
- [Frontend](#-frontend)
- [Banco de Dados](#-banco-de-dados)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Dados de Exemplo](#-dados-de-exemplo)
- [Desenvolvimento](#-desenvolvimento)
- [Solução de Problemas](#-solução-de-problemas)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

**MultiBus** é uma plataforma completa e moderna para democratizar o acesso a informações de transporte público. Desenvolvida com as melhores práticas de engenharia de software, a solução oferece uma API RESTful robusta e uma interface web intuitiva para consulta de linhas, paradas e rotas de ônibus.

### 💡 Motivação

O acesso a informações precisas sobre transporte público é fundamental para a mobilidade urbana. MultiBus nasceu com o objetivo de:

- 🌐 **Democratizar dados**: Tornar informações de transporte acessíveis via API pública
- ⚡ **Tempo real**: Fornecer dados atualizados sobre linhas, paradas e rotas
- 🗺️ **Geolocalização**: Integrar coordenadas GPS para melhor experiência do usuário
- 📱 **Multiplataforma**: Disponibilizar dados para web, mobile e integrações

### 🎯 Caso de Uso Atual

A plataforma está em produção com dados reais de **João Pessoa/PB**, incluindo:
- ✅ 14 paradas estratégicas georeferenciadas
- ✅ 9 linhas oficiais do sistema SEMOB-JP
- ✅ 18 rotas (ida e volta) completamente mapeadas
- ✅ Integração com Google Maps API para coordenadas precisas

---

## ✨ Características

### 🔥 Funcionalidades Principais

| Recurso | Descrição |
|---------|-----------|
| **🚏 Gestão de Paradas** | CRUD completo de pontos de ônibus com geolocalização |
| **🚌 Gestão de Linhas** | Gerenciamento de linhas de ônibus com números e nomes |
| **🗺️ Gestão de Rotas** | Mapeamento de rotas (ida/volta) com sequência de paradas |
| **📍 Geolocalização** | Integração com Google Maps para coordenadas precisas |
| **📖 Documentação Swagger** | API totalmente documentada e testável via interface web |
| **🐳 Docker Ready** | Deploy simplificado com Docker Compose |
| **🌱 Seed Automatizado** | População automática com dados reais de João Pessoa |
| **🔐 Validação Robusta** | Validação de dados com Zod |

### 🎨 Interface Moderna

- 💅 **Design Responsivo**: Interface adaptável para desktop e mobile
- 🗺️ **Mapas Interativos**: Visualização de paradas e rotas em mapa
- 🎨 **Material UI**: Componentes modernos e acessíveis
- ⚡ **Performance**: Carregamento rápido com Vite

---

## 🛠️ Tecnologias

### Backend

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=nodejs" width="48" height="48" alt="Node.js" />
      <br>Node.js 20+
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=express" width="48" height="48" alt="Express" />
      <br>Express 5
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=postgres" width="48" height="48" alt="PostgreSQL" />
      <br>PostgreSQL 15
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=docker" width="48" height="48" alt="Docker" />
      <br>Docker
    </td>
  </tr>
</table>

**Dependências principais:**
- `express` - Framework web minimalista
- `pg` - Cliente PostgreSQL nativo
- `zod` - Validação de esquemas TypeScript-first
- `swagger-ui-express` - Documentação API interativa
- `axios` - Cliente HTTP para integrações
- `cors` - Middleware CORS
- `dotenv` - Gerenciamento de variáveis de ambiente

### Frontend

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=react" width="48" height="48" alt="React" />
      <br>React 19
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=typescript" width="48" height="48" alt="TypeScript" />
      <br>TypeScript
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br>Vite 7
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="Tailwind" />
      <br>Tailwind CSS
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=materialui" width="48" height="48" alt="MUI" />
      <br>Material UI
    </td>
  </tr>
</table>

**Dependências principais:**
- `react` & `react-dom` - Biblioteca UI
- `react-router-dom` - Roteamento SPA
- `@mui/material` - Componentes Material Design
- `leaflet` & `react-leaflet` - Mapas interativos
- `axios` - Cliente HTTP
- `framer-motion` - Animações fluidas
- `zod` - Validação de formulários

---

## 🚀 Instalação Rápida

### Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 20.0.0 ou superior ([Download](https://nodejs.org/))
- **Docker** & **Docker Compose** ([Download](https://www.docker.com/get-started))
- **Git** ([Download](https://git-scm.com/))

### ⚡ Setup em 5 Minutos

#### 1️⃣ **Clone o Repositório**

```bash
git clone https://github.com/Firewarez/multiBus.git
cd multiBus
```

#### 2️⃣ **Configure as Variáveis de Ambiente**

**Windows:**
```powershell
Copy-Item .env.example .env
```

**Linux/Mac:**
```bash
cp .env.example .env
```

**Edite o arquivo `.env` e defina suas credenciais:**
```env
# Database
POSTGRES_USER=multibus_user
POSTGRES_PASSWORD=SUA_SENHA_FORTE_AQUI
POSTGRES_DB=multibus_db
DB_PORT=5432

# Google Maps (opcional)
GOOGLE_API_KEY=sua_chave_api_aqui
```

⚠️ **IMPORTANTE**: Nunca commit credenciais reais! Use senhas fortes em produção.

#### 3️⃣ **Inicie o Banco de Dados**

```bash
docker-compose up -d
```

Aguarde alguns segundos para o PostgreSQL inicializar completamente.

#### 4️⃣ **Configure o Backend**

```bash
cd backend
npm install
npm run seed:city  # Popula com dados de João Pessoa
npm run dev        # Inicia servidor em modo desenvolvimento
```

#### 5️⃣ **Configure o Frontend** (opcional)

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

### 🎉 Pronto! Acesse:

| Serviço | URL | Descrição |
|---------|-----|-----------|
| 🌐 **API Backend** | http://localhost:3000/api/v1 | Servidor API REST |
| 📖 **Swagger Docs** | http://localhost:3000/api-docs | Documentação interativa |
| 🎨 **Frontend** | http://localhost:5173 | Interface web (Vite) |

---

## 🏗️ Arquitetura

### 📁 Estrutura do Projeto

```
multiBus/
├── 📂 backend/                    # API REST Node.js
│   ├── 📂 src/
│   │   ├── 📂 api/
│   │   │   ├── 📂 controllers/   # Lógica de requisições HTTP
│   │   │   │   ├── lines.controller.ts
│   │   │   │   ├── stops.controller.ts
│   │   │   │   ├── routes.controller.ts
│   │   │   │   └── login.controller.ts
│   │   │   ├── 📂 routes/        # Definição de rotas Express
│   │   │   │   ├── lines.routes.ts
│   │   │   │   ├── stops.routes.ts
│   │   │   │   ├── routes.routes.ts
│   │   │   │   └── login.routes.ts
│   │   │   └── 📂 services/      # Lógica de negócio
│   │   │       ├── lines.services.ts
│   │   │       ├── stops.services.ts
│   │   │       ├── routes.services.ts
│   │   │       └── login.services.ts
│   │   ├── 📂 config/
│   │   │   ├── db.ts             # Configuração PostgreSQL
│   │   │   └── db.sql            # Schema do banco
│   │   ├── 📂 scripts/           # Utilitários
│   │   │   ├── seedCityData.ts   # Seed João Pessoa
│   │   │   ├── seedDatabase.ts   # Seed genérico
│   │   │   ├── googleApi.services.ts
│   │   │   ├── createTables.ts
│   │   │   └── testConnection.ts
│   │   └── server.ts             # Inicialização do servidor
│   ├── swagger.yaml              # Documentação OpenAPI 3.0
│   ├── Dockerfile                # Container backend
│   ├── package.json
│   └── tsconfig.json
│
├── 📂 frontend/                   # SPA React
│   ├── 📂 src/
│   │   ├── 📂 components/        # Componentes reutilizáveis
│   │   │   ├── InteractiveMap.tsx
│   │   │   └── Login/
│   │   ├── 📂 pages/             # Páginas da aplicação
│   │   │   ├── Home.tsx
│   │   │   ├── MapaPrevisoes.tsx
│   │   │   ├── Pontos.tsx
│   │   │   ├── Recarga.tsx
│   │   │   └── ...
│   │   ├── 📂 services/          # Integrações API
│   │   │   └── api.ts
│   │   ├── 📂 hooks/             # Custom hooks React
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.js
│
├── docker-compose.yml             # Orquestração de containers
├── package.json                   # Dependências raiz
└── README.md                      # Documentação
```

### 🔄 Fluxo de Dados

```
┌─────────────┐      HTTP/REST      ┌──────────────┐      SQL      ┌──────────────┐
│   Frontend  │ ──────────────────> │   Backend    │ ────────────> │  PostgreSQL  │
│  (React)    │                     │  (Express)   │               │   Database   │
└─────────────┘ <────────────────── └──────────────┘ <──────────── └──────────────┘
                     JSON                               Rows
```

**Camadas da API:**

1. **Routes** → Define endpoints HTTP (GET, POST, PUT, DELETE)
2. **Controllers** → Processa requisições, valida dados (Zod)
3. **Services** → Lógica de negócio, queries SQL
4. **Database** → Persistência PostgreSQL

---

## 📡 API REST

### Endpoints Disponíveis

#### 🚏 Paradas (Stops)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/stops` | Lista todas as paradas |
| `GET` | `/api/v1/stops/:id` | Obtém parada específica por ID |
| `POST` | `/api/v1/stops` | Cria nova parada |
| `PUT` | `/api/v1/stops/:id` | Atualiza parada existente |
| `DELETE` | `/api/v1/stops/:id` | Remove parada |

**Exemplo de resposta** (`GET /api/v1/stops`):
```json
[
  {
    "stop_id": 1,
    "name": "Terminal de Integração",
    "latitude": "-7.1195",
    "longitude": "-34.8450",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

#### 🚌 Linhas (Lines)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/lines` | Lista todas as linhas |
| `GET` | `/api/v1/lines/:id` | Obtém linha específica por ID |
| `POST` | `/api/v1/lines` | Cria nova linha |
| `PUT` | `/api/v1/lines/:id` | Atualiza linha existente |
| `DELETE` | `/api/v1/lines/:id` | Remove linha |

**Exemplo de resposta** (`GET /api/v1/lines`):
```json
[
  {
    "line_id": 1,
    "number": "1300",
    "name": "Terminal - Tambaú",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

#### 🗺️ Rotas (Routes)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/v1/routes` | Lista todas as rotas |
| `GET` | `/api/v1/routes/:id` | Obtém rota específica por ID |
| `GET` | `/api/v1/routes/:id/stops` | Lista paradas de uma rota (ordenadas) |
| `GET` | `/api/v1/routes/line/:lineId` | Lista rotas de uma linha específica |
| `POST` | `/api/v1/routes` | Cria nova rota |
| `PUT` | `/api/v1/routes/:id` | Atualiza rota existente |
| `DELETE` | `/api/v1/routes/:id` | Remove rota |

**Exemplo de resposta** (`GET /api/v1/routes/1/stops`):
```json
[
  {
    "route_id": 1,
    "stop_id": 1,
    "stop_name": "Terminal de Integração",
    "stop_order": 1,
    "latitude": "-7.1195",
    "longitude": "-34.8450"
  },
  {
    "route_id": 1,
    "stop_id": 5,
    "stop_name": "Tambaú",
    "stop_order": 2,
    "latitude": "-7.0965",
    "longitude": "-34.8350"
  }
]
```

### 🔒 Autenticação (em desenvolvimento)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/api/v1/login` | Autenticação de usuário |

### 📖 Documentação Interativa

Acesse a documentação Swagger completa em:

**http://localhost:3000/api-docs**

Nela você pode:
- ✅ Visualizar todos os endpoints
- ✅ Ver schemas de requisição/resposta
- ✅ Testar chamadas API diretamente no navegador
- ✅ Ver códigos de status e erros possíveis

---

## 🎨 Frontend

### Páginas Disponíveis

| Página | Rota | Descrição |
|--------|------|-----------|
| 🏠 **Home** | `/` | Página inicial |
| 🗺️ **Mapa** | `/mapa` | Mapa interativo com paradas e linhas |
| 🚏 **Pontos** | `/pontos` | Lista de paradas |
| 💳 **Recarga** | `/recarga` | Sistema de recarga de cartão |
| 👤 **Perfil** | `/perfil` | Perfil do usuário |
| 📞 **Suporte** | `/suporte` | Central de ajuda |

### 🗺️ Mapa Interativo

O componente `InteractiveMap.tsx` oferece:

- 📍 Visualização de paradas em tempo real
- 🚌 Rotas desenhadas no mapa
- 🔍 Busca de linhas e paradas
- 📱 Design responsivo mobile-first
- ⚡ Performance otimizada com Leaflet

### 🎨 Design System

- **Cores**: Paleta customizada para acessibilidade
- **Tipografia**: Fontes otimizadas para legibilidade
- **Componentes**: Material UI com tema personalizado
- **Responsividade**: Mobile-first com breakpoints Tailwind

---

## 🧰 Scripts Disponíveis

### Backend

```bash
# Desenvolvimento
npm run dev              # Inicia servidor com hot-reload (nodemon)

# Produção
npm run build            # Compila TypeScript → JavaScript
npm start                # Executa build compilado

# Database
npm run seed:city        # Popula com dados de João Pessoa
npm run seed             # Popula com dados genéricos
npm run create:tables    # Cria estrutura de tabelas
npm run test:connection  # Testa conexão com PostgreSQL
```

### Frontend

```bash
npm run dev              # Servidor desenvolvimento (Vite)
npm run build            # Build de produção
npm run preview          # Preview do build
npm run lint             # Executa ESLint
```

---

## 🌱 Dados de Exemplo

### João Pessoa (SEMOB-JP)

O comando `npm run seed:city` popula o banco com dados reais da cidade:

#### 📍 **14 Paradas Estratégicas**

| ID | Nome | Latitude | Longitude |
|----|------|----------|-----------|
| 1 | Terminal de Integração | -7.1195 | -34.8450 |
| 2 | Centro - Praça João Pessoa | -7.1194 | -34.8792 |
| 3 | Tambaú | -7.0965 | -34.8350 |
| 4 | Cabo Branco | -7.1417 | -34.7967 |
| 5 | Manaíra | -7.0889 | -34.8306 |
| 6 | UFPB - Campus I | -7.1378 | -34.8460 |
| ... | ... | ... | ... |

#### 🚌 **9 Linhas Oficiais**

| Número | Nome | Rotas |
|--------|------|-------|
| 1300 | Terminal - Tambaú | IDA / VOLTA |
| 1301 | Terminal - Cabo Branco | IDA / VOLTA |
| 1400 | Terminal - Manaíra | IDA / VOLTA |
| 513 | Terminal - UFPB | IDA / VOLTA |
| 511 | Terminal - Centro | IDA / VOLTA |
| 1500 | Terminal - Epitácio Pessoa | IDA / VOLTA |
| 510 | Terminal - Cruz das Armas | IDA / VOLTA |
| 1100 | Terminal - Shopping Tambiá | IDA / VOLTA |
| 3300 | Terminal - Mangabeira | IDA / VOLTA |

#### 🎯 Processo de Seed

O script executa automaticamente:

1. 🧹 **Limpeza**: Remove dados anteriores (CASCADE)
2. 📍 **Geocoding**: Busca coordenadas via Google Maps API
3. 🚏 **Paradas**: Insere 14 paradas georeferenciadas
4. 🚌 **Linhas**: Cria 9 linhas oficiais
5. 🔄 **Rotas**: Gera 18 rotas (IDA + VOLTA)
6. ✅ **Validação**: Verifica integridade dos dados

---

## 💻 Desenvolvimento

### 🔧 Configuração do Ambiente

**Requisitos de versão:**
- Node.js: ≥ 20.0.0
- npm: ≥ 9.0.0
- PostgreSQL: 15
- Docker: ≥ 24.0.0

### 📝 Convenções de Código

- **TypeScript Strict Mode**: Habilitado
- **ESLint**: Configurado para React e Node.js
- **Prettier**: Formatação automática (recomendado)
- **Commit Convention**: Conventional Commits

### 🧪 Testando a API

**Com cURL:**
```bash
# Listar paradas
curl http://localhost:3000/api/v1/stops

# Obter parada específica
curl http://localhost:3000/api/v1/stops/1

# Criar nova parada
curl -X POST http://localhost:3000/api/v1/stops \
  -H "Content-Type: application/json" \
  -d '{"name":"Nova Parada","latitude":"-7.1234","longitude":"-34.8567"}'
```

**Com HTTPie:**
```bash
http GET http://localhost:3000/api/v1/stops
http GET http://localhost:3000/api/v1/lines
http GET http://localhost:3000/api/v1/routes/1/stops
```

### 🔍 Debugging

**Backend (VS Code):**
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Backend",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["run", "dev"],
  "cwd": "${workspaceFolder}/backend",
  "console": "integratedTerminal"
}
```

**Frontend (Browser DevTools):**
- React DevTools extension recomendada
- Redux DevTools (se implementado futuramente)

---

## 🔧 Solução de Problemas

### ❌ Problema: "Table doesn't exist"

**Sintomas:**
```
ERROR: relation "stops" does not exist
```

**Soluções:**

1. ✅ Executar seed completo:
   ```bash
   cd backend
   npm run seed:city
   ```

2. ✅ Ou criar tabelas manualmente:
   ```bash
   npm run create:tables
   ```

---

### ❌ Problema: "Port already in use"

**Sintomas:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Soluções:**

**Windows:**
```powershell
# Encontrar processo na porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua PID)
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
# Encontrar e matar processo
lsof -ti:3000 | xargs kill -9
```

**Alternativa:** Alterar porta no `.env`:
```env
PORT=3001
```

---

### ❌ Problema: Google API Error

**Sintomas:**
```
Error fetching coordinates from Google Maps API
```

**Soluções:**

1. ✅ **Sem API Key disponível**: Remova do `.env`
   ```env
   # GOOGLE_API_KEY=
   ```
   O script usará coordenadas aproximadas pré-definidas.

2. ✅ **Com API Key**: Obtenha em [Google Cloud Console](https://console.cloud.google.com/):
   - Ative "Geocoding API"
   - Crie credenciais (API Key)
   - Adicione ao `.env`:
     ```env
     GOOGLE_API_KEY=AIzaSy...
     ```

---

### ❌ Problema: Frontend não carrega

**Sintomas:**
```
Failed to fetch / Network Error
```

**Soluções:**

1. ✅ Verificar se backend está rodando:
   ```bash
   curl http://localhost:3000/api/v1/stops
   ```

2. ✅ Verificar CORS no backend (`src/server.ts`):
   ```typescript
   app.use(cors({
     origin: 'http://localhost:5173'
   }));
   ```

3. ✅ Verificar URL da API (`frontend/src/services/api.ts`):
   ```typescript
   const API_URL = 'http://localhost:3000/api/v1';
   ```

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Siga estas etapas:

### 1️⃣ Fork do Projeto

Clique em "Fork" no canto superior direito do GitHub.

### 2️⃣ Clone seu Fork

```bash
git clone https://github.com/SEU_USUARIO/multiBus.git
cd multiBus
```

### 3️⃣ Crie uma Branch

```bash
git checkout -b feature/minha-feature
# ou
git checkout -b fix/meu-bugfix
```

### 4️⃣ Desenvolva

Faça suas alterações seguindo as convenções de código.

### 5️⃣ Commit

Use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat: adiciona endpoint de busca por nome"
git commit -m "fix: corrige validação de coordenadas"
git commit -m "docs: atualiza documentação da API"
```

**Tipos de commit:**
- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Documentação
- `style`: Formatação de código
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Tarefas de manutenção

### 6️⃣ Push & Pull Request

```bash
git push origin feature/minha-feature
```

Abra um Pull Request no GitHub com:
- ✅ Título descritivo
- ✅ Descrição detalhada das mudanças
- ✅ Screenshots (se aplicável)
- ✅ Testes realizados

### 📋 Checklist para PR

- [ ] Código segue as convenções do projeto
- [ ] Testes passando (`npm test`)
- [ ] Documentação atualizada
- [ ] Sem conflitos com `main`
- [ ] Build sem erros (`npm run build`)
- [ ] Commit messages seguem padrão

---

## 📝 Roadmap

### 🚀 Versão 2.0 (Em Planejamento)

- [ ] 🔐 **Autenticação JWT** completa
- [ ] 📱 **App Mobile** (React Native)
- [ ] ⏱️ **Previsão de horários** em tempo real
- [ ] 🚌 **Rastreamento GPS** de ônibus
- [ ] 🔔 **Notificações push** de atrasos
- [ ] 📊 **Dashboard administrativo**
- [ ] 🌍 **Suporte multi-cidades**
- [ ] 🧪 **Testes unitários** e E2E
- [ ] 📈 **Analytics** de uso
- [ ] 🌐 **Internacionalização** (i18n)

### 🎯 Melhorias Contínuas

- [ ] Performance otimizada
- [ ] Acessibilidade WCAG 2.1
- [ ] SEO otimizado
- [ ] PWA (Progressive Web App)
- [ ] Modo offline

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

Isso significa que você pode:
- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👥 Autores

**Equipe MultiBus**

- 💻 Desenvolvedor: [@Firewarez](https://github.com/Firewarez)
- 📧 Email: contato@multibus.com.br
- 🌐 Website: [multibus.com.br](https://multibus.com.br)

---

## 📞 Suporte

### 💬 Precisa de Ajuda?

- 📖 **Documentação**: Leia este README completo
- 🐛 **Bug Report**: [Abra uma issue](https://github.com/Firewarez/multiBus/issues/new?template=bug_report.md)
- 💡 **Feature Request**: [Sugira melhorias](https://github.com/Firewarez/multiBus/issues/new?template=feature_request.md)
- 💬 **Discussões**: [GitHub Discussions](https://github.com/Firewarez/multiBus/discussions)

---

## 🙏 Agradecimentos

- **SEMOB-JP** - Dados de transporte público de João Pessoa
- **Google Maps** - API de geolocalização
- **Comunidade Open Source** - Bibliotecas e ferramentas incríveis
- **Contribuidores** - Todos que ajudaram a melhorar o projeto

---

<div align="center">

### ⭐ Se este projeto foi útil, considere dar uma estrela!

[![GitHub stars](https://img.shields.io/github/stars/Firewarez/multiBus?style=social)](https://github.com/Firewarez/multiBus/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Firewarez/multiBus?style=social)](https://github.com/Firewarez/multiBus/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Firewarez/multiBus?style=social)](https://github.com/Firewarez/multiBus/watchers)

---

**Feito com ❤️ pela equipe MultiBus**

*Democratizando o acesso a dados de transporte público*

[⬆ Voltar ao topo](#-multibus)

</div>

