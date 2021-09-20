DROP TABLE IF EXISTS INTOXICATION_STORE;

CREATE TABLE INTOXICATION_STORE
(
    id        varchar(40)  not null,
    title     varchar(255) not null,
    completed boolean,
    constraint intoxication_store_pkey primary key (id)
);

CREATE INDEX INTOXICATION_STORE_IDX ON INTOXICATION_STORE (id);

