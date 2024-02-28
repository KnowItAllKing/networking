-- Your SQL goes here
CREATE TABLE network (
    id        SERIAL PRIMARY KEY,
    name    VARCHAR(255) ,
    company VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);