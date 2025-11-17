# 🚌 MultiBus API - Sistema de Transporte Público

Uma API REST para gerenciamento de dados de transporte público, desenvolvida com Node.js, TypeScript e PostgreSQL. Inclui dados pré-configurados para João Pessoa/PB.

##  Quick Start (3 minutos)

### 1️⃣ **Clone e Configure**
```bash
git clone https://github.com/Firewarez/multiBus.git
cd multiBus

# Windows
Copy-Item .env.example .env
# Linux/Mac  
cp .env.example .env

# ⚠️ IMPORTANTE: Edite o .env e defina suas próprias senhas!
```

### 2️⃣ **Inicie o Banco (Docker)**
```bash
docker-compose up -d
```

### 3️⃣ **Configure a API**
```bash
cd backend
npm install
npm run seed:city  # Popula com dados de João Pessoa
npm run dev       # Inicia servidor
```

### 4️⃣ **Acesse**
- 🌐 **API**: http://localhost:3000
- 📖 **Swagger**: http://localhost:3000/api-docs

## 📊 Conectar no DBeaver

```
🔧 Tipo: PostgreSQL
🌐 Host: localhost
🔌 Porta: 5433 ⚠️ (não 5432!)
🏷️ Database: multibus_db
👤 Usuário: multibus_user
🔑 Senha: [DEFINA_UMA_SENHA_FORTE]
```

**Passo a passo:**
1. Nova Conexão → PostgreSQL
2. Preencher dados acima (definir sua própria senha)
3. Testar Conexão → OK
4. Finalizar

⚠️ **IMPORTANTE**: Defina sua própria senha no arquivo .env

## 🌱 Dados de João Pessoa

O comando `npm run seed:city` popula automaticamente:

### 📍 **14 Paradas Estratégicas:**
- Terminal de Integração
- Centro - Praça João Pessoa  
- Tambaú, Cabo Branco, Manaíra
- UFPB, Shopping Tambiá
- Epitácio Pessoa, Cruz das Armas
- E outras...

### 🚌 **9 Linhas Reais (SEMOB-JP):**
- **1300** - Terminal ↔ Tambaú
- **1301** - Terminal ↔ Cabo Branco  
- **1400** - Terminal ↔ Manaíra
- **513** - Terminal ↔ UFPB
- **511** - Terminal ↔ Centro
- E outras linhas do sistema real!

### 🎯 **O que acontece:**
1. 🧹 Limpa dados existentes
2. 📍 Busca coordenadas GPS via Google Maps
3. 🚏 Insere 14 paradas
4. 🚌 Cria 9 linhas
5. 🔄 Gera rotas IDA e VOLTA automáticas
6. ✅ **Resultado**: 14 paradas + 9 linhas + 18 rotas

## 📡 Endpoints da API

### 🚏 **Paradas**
```
GET    /stops           # Listar todas
GET    /stops/:id       # Parada específica
POST   /stops           # Criar nova
PUT    /stops/:id       # Atualizar
DELETE /stops/:id       # Deletar
```

### 🚌 **Linhas**
```
GET    /lines           # Listar todas
GET    /lines/:id       # Linha específica
POST   /lines           # Criar nova
PUT    /lines/:id       # Atualizar
DELETE /lines/:id       # Deletar
```

### 🗺️ **Rotas**
```
GET    /routes          # Listar todas
GET    /routes/:id      # Rota específica
GET    /routes/:id/stops # Paradas de uma rota
GET    /routes/line/:id # Rotas de uma linha
POST   /routes          # Criar nova
PUT    /routes/:id      # Atualizar
DELETE /routes/:id      # Deletar
```

## 🛠️ Scripts Úteis

```bash
# Backend
npm run dev          # Servidor desenvolvimento
npm run seed:city    # Popular com João Pessoa
npm run seed         # Popular com dados genéricos

# Docker
docker-compose up -d        # Iniciar
docker-compose down -v      # Parar e limpar
docker-compose logs api     # Ver logs API
docker-compose logs db      # Ver logs banco
```


## 🏗️ Estrutura do Projeto

```
multiBus/
├── backend/
│   ├── src/
│   │   ├── api/          # Controllers, Routes, Services
│   │   ├── config/       # DB config + schema
│   │   ├── scripts/      # Seeding João Pessoa
│   │   └── server.ts     # Servidor principal
│   ├── swagger.yaml      # Documentação API
│   └── package.json
├── frontend/             # React (em desenvolvimento)
     ├── src/
          ├── components/   # Mapa
          └── pages/        #  Componente das paginas
     ├── # Componentes e variaveis globais css/ts
├── docker-compose.yml    # Orquestração
└── README.md
```

## 🔧 Solução de Problemas

### ❌ **DBeaver não conecta**
- ✅ Porta: **5433** (não 5432)
- ✅ Database: **multibus_db**
- ✅ Usuário: **multibus_user**
- ✅ Senha: **[A QUE VOCÊ DEFINIU NO .env]**

### ❌ **"Connection refused"**
```bash
docker ps                # Verificar containers
docker-compose up -d     # Iniciar se necessário
```

### ❌ **"Table doesn't exist"**
```bash
cd backend
npm run seed:city        # Criar tabelas + dados
```

### ❌ **Google API Error**
- Remova `GOOGLE_API_KEY` do .env temporariamente
- Execute `npm run seed:city` (usa coordenadas aproximadas)

## 📋 Comandos de Teste

```bash
# Testar API
curl http://localhost:3000/stops
curl http://localhost:3000/lines

# Testar banco direto
docker exec multibus_db psql -U multibus_user -d multibus_db -c "SELECT COUNT(*) FROM stops;"

# Ver todas as paradas
docker exec multibus_db psql -U multibus_user -d multibus_db -c "SELECT name FROM stops;"
```

## 🎯 Para Equipe

1. **Setup rápido**: Seguir passos 1-4 do Quick Start
2. **DBeaver**: Usar credenciais da seção "Conectar no DBeaver"
3. **Testar**: Acessar http://localhost:3000/api-docs
4. **Dados**: Comando `npm run seed:city` popula tudo automaticamente

## 📄 Licença

MIT License - Veja `LICENSE` para detalhes.

---
⭐ **MultiBus - Transporte Público de João Pessoa digitalizado!**

