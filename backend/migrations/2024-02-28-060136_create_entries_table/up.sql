-- Your SQL goes here
CREATE TABLE entries (
    id          SERIAL PRIMARY KEY,
    title       VARCHAR(255),
    body        TEXT,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    name        VARCHAR(255) NOT NULL
);
