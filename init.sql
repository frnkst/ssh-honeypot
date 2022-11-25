CREATE DATABASE honeypot;
\c honeypot
CREATE TABLE logins
(
    logins_key    serial primary key,
    timestamp     TIMESTAMP not null,
    ip            VARCHAR(100) not null,
    username      VARCHAR(100) not null,
    password      VARCHAR(100) not null,
    useragent     VARCHAR(100),
    city          VARCHAR(100),
    country       VARCHAR(100),
    isp           VARCHAR(100)
);
