-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    nascimento DATE NOT NULL,
    senha VARCHAR(255) NOT NULL
);

-- Tabela de Login (para autenticação)
CREATE TABLE IF NOT EXISTS login (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) NOT NULL REFERENCES usuario(email) ON DELETE CASCADE,
    senha VARCHAR(255) NOT NULL REFERENCES usuario(senha) ON DELETE CASCADE,
    data_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela para Recarga de Cartão
CREATE TABLE IF NOT EXISTS recarga_cartao (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuario(id) ON DELETE SET NULL,
    numero_cartao VARCHAR(20) NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    nome_titular VARCHAR(100) NOT NULL,
    valor_recarga DECIMAL(10,2) NOT NULL CHECK (valor_recarga > 0),
    status VARCHAR(20) DEFAULT 'pendente' CHECK (status IN ('pendente', 'processando', 'concluido', 'falha')),
    metodo_pagamento VARCHAR(50) NOT NULL CHECK (metodo_pagamento IN ('credito', 'debito', 'pix', 'boleto')),
    ultimos_digitos_cartao VARCHAR(4),
    transacao_id VARCHAR(100)
);
-- Tabela para Saldo do Cartão
CREATE TABLE IF NOT EXISTS saldo_cartao (
    id SERIAL PRIMARY KEY,
    numero_cartao VARCHAR(20) UNIQUE NOT NULL,
    cpf_titular VARCHAR(14) NOT NULL,
    saldo_atual DECIMAL(10,2) DEFAULT 0.00 CHECK (saldo_atual >= 0),
    ativo BOOLEAN DEFAULT true
);

-- Tabela de Paradas Favoritas
CREATE TABLE IF NOT EXISTS paradafav (
    id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL
);
-- Paradas (Stops)
CREATE TABLE IF NOT EXISTS stops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    latitude DECIMAL(9,6) NOT NULL,
    longitude DECIMAL(9,6) NOT NULL
);

-- Linhas de ônibus (Lines)
CREATE TABLE IF NOT EXISTS lines (
    id SERIAL PRIMARY KEY,
    code VARCHAR(20) NOT NULL,    
    name VARCHAR(100) NOT NULL   
);

-- Rotas (Routes) — cada linha pode ter mais de uma rota (ida/volta)
CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    line_id INT NOT NULL REFERENCES lines(id) ON DELETE CASCADE,
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('ida', 'volta'))
);

-- Ordem das paradas dentro de cada rota (Route_Stops)
CREATE TABLE IF NOT EXISTS route_stops (
    id SERIAL PRIMARY KEY,
    route_id INT NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id INT NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    stop_order INT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_route_stops_route ON route_stops(route_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_stop ON route_stops(stop_id);

INSERT INTO stops (name, latitude, longitude) VALUES
('Terminal Central', -23.550520, -46.633308),
('Av. Paulista - Estação Trianon', -23.561684, -46.655981),
('Av. Paulista - Estação Consolação', -23.556580, -46.662113)
ON CONFLICT DO NOTHING;

INSERT INTO lines (code, name) VALUES
('120', 'Terminal Central - Paulista')
ON CONFLICT DO NOTHING;

INSERT INTO routes (line_id, direction) VALUES
(1, 'ida'),
(1, 'volta')
ON CONFLICT DO NOTHING;

INSERT INTO route_stops (route_id, stop_id, stop_order) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 3, 1),
(2, 2, 2),
(2, 1, 3)
ON CONFLICT DO NOTHING;