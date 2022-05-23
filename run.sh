#!/usr/bin/env bash/bin/bash
# run this: git reset --hard && git pull && chmod +x run.sh && ./run.sh

ARTIFACT_ID=$(git rev-parse --short HEAD)
export PGPASSWORD=1234

echo "kill and remove all running docker container"
docker kill "$(docker ps -q)"
docker rm "$(docker ps -a -q)"

echo "start frontend, backend and postgres"
docker run -d -p 40001:80 ghcr.io/frnkst/honeypot-frontend:"$ARTIFACT_ID"
docker run -d -p 40002:3000 ghcr.io/frnkst/honeypot-backend:"$ARTIFACT_ID"
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=$PGPASSWORD -e POSTGRES_USER=honeypot_user postgres

echo "create database and table"
psql -U honeypot_user -h localhost -c "CREATE DATABASE honeypotdb;"
psql -U honeypot_user -h localhost -d honeypotdb -c "CREATE TABLE logins
                                     (
                                         logins_key    serial primary key,
                                         timestamp     DATE not null,
                                         ip            VARCHAR(100) not null,
                                         username      VARCHAR(100) not null,
                                         password      VARCHAR(100) not null,
                                         useragent    VARCHAR(100)
                                     );"


echo "generate new server key"
rm server.key
ssh-keygen -q -N '' -f server.key

echo "start ssh honeypot"
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
