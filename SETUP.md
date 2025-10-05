# MultiBus - Guia de Configuração

## 🚀 Configuração Rápida para Membros da Equipe

### Pré-requisitos
- Node.js 20+ instalado
- Docker e Docker Compose instalados
- Git

### 1. Clonar e Configurar
```bash
git clone <url-do-repositorio>
cd multiBus
cp .env.example .env
```

### 2. Configurar Ambiente
Edite o arquivo `.env` e adicione:
- Sua chave da API do Google Maps
- Senhas do banco de dados (se necessário)

### 3. Executar com Docker (Recomendado)
```bash
# Iniciar tudo com Docker
docker-compose up --build

# Acessar a aplicação:
# - API: http://localhost:3000
# - Documentação Swagger: http://localhost:3000/api-docs
# - Banco de dados: localhost:5433
```

### 4. Executar Localmente (Desenvolvimento)
```bash
# Instalar dependências
cd backend
npm install

# Iniciar apenas o banco de dados
docker-compose up db -d

# Executar servidor de desenvolvimento
npm run dev
```

## 🔧 Comandos Disponíveis

### Comandos Docker
```bash
# Iniciar tudo
docker-compose up --build

# Iniciar em segundo plano
docker-compose up -d

# Parar tudo
docker-compose down

# Ver logs
docker-compose logs -f api
```

### Comandos de Desenvolvimento
```bash
cd backend

# Instalar dependências
npm install

# Servidor de desenvolvimento (com hot reload)
npm run dev

# Compilar TypeScript
npm run build

# Servidor de produção
npm start

# Popular banco com dados da cidade
npm run seed:city

# Popular banco com dados de exemplo
npm run seed
```

## 🌍 Variáveis de Ambiente

### Obrigatórias
- `GOOGLE_API_KEY`: Obter no Google Cloud Console
- `POSTGRES_PASSWORD`: Senha do banco de dados

### Opcionais
- `PORT`: Porta da API (padrão: 3000)
- `NODE_ENV`: Ambiente (development/production)

## 📚 Documentação da API

Após executar, visite:
- **Swagger UI**: http://localhost:3000/api-docs
- **API Root**: http://localhost:3000

## 🗄️ Banco de Dados

- **Host**: localhost
- **Porta**: 5433 (Docker) / 5432 (Local)
- **Banco**: multibus_db
- **Usuário**: multibus_user

## 🚨 Solução de Problemas

### Porta Já em Uso
```bash
docker-compose down
# Altere as portas no docker-compose.yml se necessário
```

### Problemas de Conexão com Banco
```bash
# Verificar se banco está rodando
docker-compose ps
# Reiniciar banco
docker-compose restart db
```

### Problemas de NPM Install
```bash
# Limpar cache e reinstalar
cd backend
rm -rf node_modules package-lock.json
npm install
```

## 📱 Configuração Específica para João Pessoa

### Popular com Dados de João Pessoa
```bash
cd backend
npm run seed:city
```

Isso criará paradas e linhas baseadas no sistema real de transporte de João Pessoa, incluindo:
- **Paradas**: Terminal de Integração, Tambaú, Cabo Branco, Manaíra, UFPB, etc.
- **Linhas**: 1300 (Terminal-Tambaú), 1301 (Terminal-Cabo Branco), 513 (Terminal-UFPB), etc.