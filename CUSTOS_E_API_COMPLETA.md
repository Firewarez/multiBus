# 💰 Guia de Monitoramento de Custos - Google Cloud

## 📊 Como Monitorar Custos

### 1. **Verificação Regular**
- Acesse: [Google Cloud Console - Billing](https://console.cloud.google.com/billing)
- Verifique a seção "Current month, Group by Service"
- Mantenha-se sempre abaixo dos **$200 USD/mês** gratuitos

### 2. **Configurar Alertas** ⚠️
```
Google Cloud Console > Billing > Budgets & alerts
→ Create Budget
→ Set amount: $50 USD (25% do limite gratuito)
→ Add email notifications
```

### 3. **Monitorar APIs Específicas**
- **Geocoding API**: Máximo 40.000 chamadas/mês gratuitas
- **Directions API**: Máximo 40.000 chamadas/mês gratuitas
- **Seu uso atual**: ~14 chamadas por execução do seed

### 4. **Estimativa de Uso da Equipe**
```
Cenário Conservador:
- 5 desenvolvedores
- 10 execuções de seed por semana cada um
- Total: 50 × 14 = 700 chamadas/mês
- Percentual usado: 1.75% do limite gratuito ✅

Cenário Intenso:
- 5 desenvolvedores  
- 100 execuções por mês cada um
- Total: 500 × 14 = 7.000 chamadas/mês
- Percentual usado: 17.5% do limite gratuito ✅
```

## 🚨 **Ações Preventivas**

### Se Aproximar do Limite:
1. **Remover chave da API temporariamente**
2. **Usar coordenadas fixas** (sem API)
3. **Limitar execuções do seed**

### Código de Emergência:
```typescript
// Se quiser desabilitar temporariamente
const GOOGLE_API_KEY = ""; // Deixar vazio
```

## 👥 **Para Sua Equipe**

### **Orientações:**
1. **Executar seed apenas quando necessário**
2. **Não fazer seed em loop ou automação**
3. **Usar Docker para desenvolvimento** (evita rebuilds)
4. **Compartilhar banco populado** quando possível

### **Comandos Seguros:**
```bash
# ✅ Para desenvolvimento normal
npm run dev

# ✅ Para popular banco (ocasional)
npm run seed:city

# ❌ Evitar em automação/CI
```

---

# 🔧 **API CRUD Completa - Guia de Uso**

## 📱 **Novos Endpoints Disponíveis**

### **🚏 Paradas (Stops)**
```http
GET    /stops           # Listar todas
POST   /stops           # Criar nova
GET    /stops/{id}      # Buscar por ID
PUT    /stops/{id}      # Atualizar
DELETE /stops/{id}      # Deletar
```

### **🚌 Linhas (Lines)**
```http
GET    /lines           # Listar todas
POST   /lines           # Criar nova
GET    /lines/{id}      # Buscar por ID  
PUT    /lines/{id}      # Atualizar
DELETE /lines/{id}      # Deletar
```

### **🛤️ Rotas (Routes) - NOVO!**
```http
GET    /routes                      # Listar todas
POST   /routes                      # Criar nova
GET    /routes/{id}                 # Buscar por ID
PUT    /routes/{id}                 # Atualizar
DELETE /routes/{id}                 # Deletar
GET    /routes/line/{lineId}        # Rotas de uma linha
GET    /routes/{id}/stops           # Paradas de uma rota
POST   /routes/{id}/stops           # Adicionar parada à rota
DELETE /routes/{routeId}/stops/{stopId} # Remover parada da rota
```

## 🎯 **Exemplos Práticos de Uso**

### **1. Criar Nova Parada**
```json
POST /stops
{
  "name": "Shopping Manaíra",
  "latitude": -7.100608,
  "longitude": -34.837581
}
```

### **2. Criar Nova Linha**
```json
POST /lines
{
  "code": "2000",
  "name": "Nova Linha Teste"
}
```

### **3. Criar Rota para Linha**
```json
POST /routes
{
  "line_id": 1,
  "direction": "ida"
}
```

### **4. Adicionar Parada à Rota**
```json
POST /routes/1/stops
{
  "stop_id": 5,
  "stop_order": 3
}
```

## 🧪 **Como Testar no Swagger**

1. **Acesse**: http://localhost:3000/api-docs
2. **Vá na seção "Rotas"** (nova seção adicionada)
3. **Teste os endpoints**:
   - Clique em "Try it out"
   - Preencha os dados
   - Execute e veja a resposta

## 📋 **Fluxo Completo de Criação Manual**

```bash
# 1. Criar parada
POST /stops → Retorna ID da parada

# 2. Criar linha  
POST /lines → Retorna ID da linha

# 3. Criar rota ida
POST /routes (direction: "ida") → Retorna ID da rota

# 4. Criar rota volta
POST /routes (direction: "volta") → Retorna ID da rota

# 5. Adicionar paradas às rotas
POST /routes/{id}/stops (para cada parada)
```

## 🎉 **Resultado Final**

Agora você tem:
- ✅ **CRUD completo** para todos os recursos
- ✅ **Documentação interativa** no Swagger
- ✅ **Endpoints específicos** para relacionamentos
- ✅ **Controle de custos** do Google Cloud
- ✅ **Dados reais de João Pessoa** já populados

**Sua API está pronta para produção! 🚍🎯**