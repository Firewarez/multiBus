# Exemplos de Notificações para Testar no Swagger

## 1. Notificação de Atraso (Amarelo)
```json
{
  "type": "atraso",
  "title": "Linha 301",
  "description": "Atraso de 10 minutos devido ao trânsito intenso na Av. Cruz das Armas.",
  "priority": "alta",
  "affectedLines": "301, 1501",
  "affectedStops": "Terminal Integração, Cruz das Armas"
}
```

## 2. Notificação de Informação (Azul)
```json
{
  "type": "informacao",
  "title": "Linha 510",
  "description": "Rota alterada temporariamente devido a obras na Rua Principal.",
  "priority": "media",
  "affectedLines": "510, 5100",
  "affectedStops": "Centro, Mangabeira"
}
```

## 3. Notificação de Aviso (Verde)
```json
{
  "type": "aviso",
  "title": "Linha 118",
  "description": "Operação normalizada após problemas técnicos. Horários regulares restabelecidos.",
  "priority": "baixa",
  "affectedLines": "118",
  "affectedStops": "Todos os pontos da linha"
}
```

## 4. Notificação de Emergência (Vermelho)
```json
{
  "type": "emergencia",
  "title": "Linha 5120 - URGENTE",
  "description": "Linha temporariamente suspensa devido a acidente na via. Previsão de retorno: 2 horas.",
  "priority": "urgente",
  "affectedLines": "5120",
  "affectedStops": "Todos os pontos da linha 5120"
}
```

## 5. Notificação de Manutenção (Laranja)
```json
{
  "type": "manutencao",
  "title": "Manutenção Programada",
  "description": "Sistema de bilhetagem eletrônica em manutenção das 2h às 5h. Use dinheiro neste período.",
  "priority": "media",
  "startDate": "2025-11-25T02:00:00.000Z",
  "endDate": "2025-11-25T05:00:00.000Z"
}
```

## Como usar no Swagger

1. Acesse: `http://localhost:3000/api-docs` (local) ou `https://multibus-api.onrender.com/api-docs` (produção)
2. Procure pela seção **Notificações**
3. Clique em **POST /api/v1/notifications** - "Cria uma nova notificação"
4. Clique em "Try it out"
5. Cole um dos exemplos acima no campo "Request body"
6. Clique em "Execute"
7. Verifique a resposta (deve retornar status 201 Created)

## Verificar notificações ativas

Use: **GET /api/v1/notifications/active**
- Este endpoint retorna apenas notificações com `isActive: true`
- São estas que aparecem no frontend

## Tipos de notificação disponíveis

- `aviso` - Badge verde (notificações gerais)
- `informacao` - Badge azul (informações importantes)
- `atraso` - Badge amarelo (atrasos e problemas de trânsito)
- `emergencia` - Badge vermelho (situações urgentes)
- `manutencao` - Badge laranja (manutenções programadas)

## Prioridades disponíveis

- `baixa` - Informações gerais
- `media` - Avisos importantes
- `alta` - Requer atenção
- `urgente` - Situações críticas

## Campos opcionais

- `affectedLines`: Lista de códigos de linhas afetadas (ex: "301, 510, 5120")
- `affectedStops`: Lista de paradas afetadas
- `startDate`: Data/hora de início (para manutenções programadas)
- `endDate`: Data/hora de término (para manutenções programadas)
- `isActive`: true/false (padrão: true) - define se aparece no frontend
