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

-- Rotas (Routes) — Cada Linha pode ter mais de uma Rota (Ida/Volta)
CREATE TABLE IF NOT EXISTS routes (
    id SERIAL PRIMARY KEY,
    line_id INT NOT NULL REFERENCES lines(id) ON DELETE CASCADE,
    direction VARCHAR(10) NOT NULL CHECK (direction IN ('ida', 'volta'))
);
-- Tabela de Paradas Favoritas
CREATE TABLE IF NOT EXISTS favorite_stops (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES usuario(id) ON DELETE CASCADE,
    stop_id INT NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, stop_id)
);

-- Notificações (Notifications)
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL CHECK (type IN ('aviso', 'informacao', 'atraso', 'emergencia', 'manutencao')),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    priority VARCHAR(10) DEFAULT 'media' CHECK (priority IN ('baixa', 'media', 'alta', 'urgente')),
    start_date TIMESTAMP, -- Quando a notificação começa a valer
    end_date TIMESTAMP,   -- Quando a notificação expira
    affected_lines VARCHAR(100), -- Linhas afetadas (ex: '120, 175, 201')
    affected_stops VARCHAR(100)  -- Paradas afetadas
);

-- Ordem das Paradas dentro de cada Rota (Route_Stops)
CREATE TABLE IF NOT EXISTS route_stops (
    id SERIAL PRIMARY KEY,
    route_id INT NOT NULL REFERENCES routes(id) ON DELETE CASCADE,
    stop_id INT NOT NULL REFERENCES stops(id) ON DELETE CASCADE,
    stop_order INT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_route_stops_route ON route_stops(route_id);
CREATE INDEX IF NOT EXISTS idx_route_stops_stop ON route_stops(stop_id);

-- Populando a Tabela com exemplos prévios
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