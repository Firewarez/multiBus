# 🗺️ Guia de Configuração da API do Google Maps

## Passo 1: Criar Projeto no Google Cloud

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Clique em "Criar Projeto" ou selecione um projeto existente
3. Dê um nome como "MultiBus"

## Passo 2: Habilitar APIs

Habilite estas APIs no seu projeto:

1. **Maps JavaScript API**
2. **Directions API** 
3. **Geocoding API**
4. **Places API** (opcional, para autocomplete)

### Como habilitar:
1. Vá em "APIs e Serviços" > "Biblioteca"
2. Pesquise por cada API acima
3. Clique em "Ativar" para cada uma

## Passo 3: Criar Chave da API

1. Vá em "APIs e Serviços" > "Credenciais"
2. Clique em "Criar Credenciais" > "Chave da API"
3. Copie a chave gerada
4. **Importante**: Clique em "Restringir Chave" para segurança

## Passo 4: Restringir Chave da API (Segurança)

### Restrições de Aplicação:
- Escolha "Referenciadores HTTP" para apps web
- Adicione: `http://localhost:3000/*` para desenvolvimento
- Adicione seu domínio de produção quando fizer deploy

### Restrições de API:
- Selecione "Restringir chave"
- Escolha apenas as APIs que você habilitou acima

## Passo 5: Adicionar ao Seu Projeto

1. Abra seu arquivo `.env`
2. Substitua `GOOGLE_API_KEY=` por `GOOGLE_API_KEY=sua_chave_aqui`
3. Salve o arquivo

## 💰 Informações de Preço

- A API do Google Maps tem uma camada gratuita: $200 de crédito/mês
- A maioria dos projetos pequenos fica dentro dos limites gratuitos
- Monitore o uso no Google Cloud Console

## 🔧 Testando Sua Chave

Após adicionar a chave, teste chamando os endpoints da API do Google no seu app:
- Geocoding: Converter endereços em coordenadas
- Directions: Obter rotas entre pontos

## ⚠️ Notas de Segurança

- Nunca faça commit de chaves da API para o git
- Sempre restrinja suas chaves da API
- Monitore o uso para evitar cobrança inesperada
- Regenere chaves se comprometidas

## 🏙️ Específico para João Pessoa

Com a API configurada, o sistema irá:
- Buscar coordenadas reais dos pontos de João Pessoa
- Calcular rotas entre Terminal de Integração e bairros
- Fornecer direções precisas na orla (Tambaú, Cabo Branco, Manaíra)