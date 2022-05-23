#!/usr/bin/env bash/bin/bash
# run this: git reset --hard && git pull && chmod +x run.sh && ./run.sh

ARTIFACT_ID=$(git rev-parse --short HEAD)

docker kill "$(docker ps -q)"
docker rm "$(docker ps -a -q)"
docker run -d -p 40001:80 ghcr.io/frnkst/honeypot-frontend:"$ARTIFACT_ID"
docker run -d -p 40002:3000 ghcr.io/frnkst/honeypot-backend:"$ARTIFACT_ID"
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=45432dfdf*dfdfl -e POSTGRES_USER=honeypot_user postgres

psql honeypot_user -c "CREATE DATABASE honeypotdb;"
psql honeypot_user -d honeypotdb -c "CREATE TABLE logins
                                     (
                                         logins_key    serial primary key,
                                         timestamp     DATE not null,
                                         ip            VARCHAR(100) not null,
                                         username      VARCHAR(100) not null,
                                         password      VARCHAR(100) not null,
                                         useragent    VARCHAR(100)
                                     );"


rm server.key
ssh-keygen -q -N '' -f server.key
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
