# 🏙️ Guia de Configuração da Cidade

## 📍 Como Configurar os Dados da Sua Cidade

### Passo 1: Editar o Arquivo de Configuração

Abra o arquivo `backend/src/scripts/seedCityData.ts` e edite:

```typescript
const CITY_CONFIG = {
    name: "João_Pessoa",        // Nome da sua cidade
    state: "Paraíba",           // Seu estado
    centerCoordinates: {
        lat: -7.1150,           // Latitude do centro da cidade
        lng: -34.8641           // Longitude do centro da cidade
    }
};
```

### Passo 2: Customizar as Paradas

Edite a lista `CITY_STOPS` com as paradas da sua cidade:

```typescript
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
    // Adicione mais paradas conforme necessário
];
```

### Passo 3: Configurar as Linhas de Ônibus

Edite a lista `CITY_LINES` com as linhas da sua cidade:

```typescript
const CITY_LINES = [
    {
        code: "1300",
        name: "Terminal - Tambaú",
        stops: ["Terminal de Integração", "Centro - Praça João Pessoa", "Tambaú"]
    },
    // Adicione mais linhas conforme necessário
];
```

### Passo 4: Executar o Seeding

#### Opção 1: Com Google Maps API (Recomendado)
```bash
# 1. Configure sua API key no arquivo .env
GOOGLE_API_KEY=sua_chave_aqui

# 2. Execute o seeding
cd backend
npm run seed:city
```

#### Opção 2: Sem Google Maps API (Coordenadas Aproximadas)
```bash
# Execute sem configurar a API key
cd backend
npm run seed:city
```

## 🏙️ Configuração Específica para João Pessoa

### Já Configurado! ✅

O arquivo já está configurado com:

#### **Paradas Principais:**
- Terminal de Integração
- Centro - Praça João Pessoa
- Tambaú (praia)
- Cabo Branco (praia)
- Manaíra (praia)
- Shopping Tambaú
- UFPB - Campus I
- Hospital Universitário
- Epitácio Pessoa
- Shopping Mangabeira
- Valentina de Figueiredo
- Bancários
- Shopping Sul
- Aeroporto Castro Pinto

#### **Linhas Baseadas no Sistema Real:**
- **1300**: Terminal - Tambaú
- **1301**: Terminal - Cabo Branco
- **1400**: Terminal - Manaíra
- **513**: Terminal - UFPB
- **1500**: Terminal - Mangabeira
- **1200**: Terminal - Bancários
- **100**: Aeroporto - Centro
- **510**: Circular Hospitais
- **1600**: Orla Marítima

## 🗺️ Exemplos de Outras Cidades Brasileiras

### Para Campinas/SP:
```typescript
const CITY_CONFIG = {
    name: "Campinas",
    state: "SP", 
    centerCoordinates: {
        lat: -22.9068,
        lng: -47.0653
    }
};

const CITY_STOPS = [
    { name: "Terminal Central", address: "Terminal Central, Campinas, SP" },
    { name: "Centro", address: "Centro, Campinas, SP" },
    { name: "Unicamp", address: "Universidade Estadual de Campinas, Campinas, SP" },
    { name: "Shopping Iguatemi", address: "Shopping Iguatemi Campinas, Campinas, SP" },
    { name: "Aeroporto", address: "Aeroporto Internacional de Campinas, Campinas, SP" }
];
```

### Para Recife/PE:
```typescript
const CITY_CONFIG = {
    name: "Recife",
    state: "PE",
    centerCoordinates: {
        lat: -8.0476,
        lng: -34.8770
    }
};

const CITY_STOPS = [
    { name: "Terminal Integrado Recife", address: "TI Recife, PE" },
    { name: "Marco Zero", address: "Marco Zero, Recife Antigo, Recife, PE" },
    { name: "Boa Viagem", address: "Boa Viagem, Recife, PE" },
    { name: "Shopping RioMar", address: "Shopping RioMar Recife, PE" }
];
```

## 🛠️ Comandos Úteis

```bash
# Popular banco com dados de João Pessoa
npm run seed:city

# Popular banco com dados de exemplo
npm run seed

# Ver dados inseridos
# Acesse: http://localhost:3000/api-docs
```

## 📋 Checklist de Configuração

- [x] Editei CITY_CONFIG com João Pessoa
- [x] Configurei as paradas principais (CITY_STOPS)
- [x] Defini as linhas de ônibus (CITY_LINES)
- [ ] Configurei Google Maps API key
- [ ] Executei npm run seed:city
- [ ] Testei a API em /api-docs

## 🆘 Dicas para João Pessoa

1. **Comece com as principais**: Terminal, Centro, praias (Tambaú, Cabo Branco, Manaíra)
2. **Use endereços conhecidos**: UFPB, Shopping Tambaú, Hospital Universitário
3. **Teste gradualmente**: Adicione paradas e linhas aos poucos
4. **Coordenadas**: O Google Maps API é mais preciso que coordenadas manuais
5. **Backup**: Faça backup do banco antes de grandes mudanças

## 🚌 Sistema Real de João Pessoa

As linhas configuradas são baseadas no sistema real da SEMOB-JP:
- Linhas 1300-1600: Atendem a orla marítima
- Linha 513: Conecta Terminal à UFPB
- Linha 100: Ligação aeroporto-centro
- Linhas 1200-1500: Atendem bairros periféricos