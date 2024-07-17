\ echo 'Creating all necessary tables...' CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(15) NOT NULL UNIQUE,
    pw VARCHAR(255) NOT NULL
);

CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    metal_type VARCHAR NOT NULL,
    from_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Weak Entity
CREATE TABLE item_purchase (
    id INTEGER PRIMARY KEY REFERENCES item(id) ON DELETE CASCADE,
    price NUMERIC NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    supplier VARCHAR NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE invoice (
    id SERIAL PRIMARY KEY,
    invoice_name VARCHAR NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    from_user INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Weak Entity
CREATE TABLE invoice_item (
    invoice_id INTEGER NOT NULL REFERENCES invoice(id),
    item_id INTEGER NOT NULL REFERENCES item(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price INTEGER NOT NULL,
    PRIMARY KEY(invoice_id, item_id)
);

\ echo 'Finished creating all tables'