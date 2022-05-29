#!/bin/bash
# run this: git reset --hard && git pull && chmod +x run.sh && ./run.sh

ARTIFACT_ID=$(git rev-parse --short HEAD)
export PGPASSWORD=weeoiio459drv

echo "---------- kill and remove all running docker container ----------"
docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker network rm honeypot-net
docker network create honeypot-net

echo "---------- start database ---------- "
docker run -d -p 5432:5432 --name honeypot-database --net honeypot-net -e POSTGRES_PASSWORD=$PGPASSWORD -e POSTGRES_USER=honeypot_user -v /opt/honeypot:/var/lib/postgresql/data postgres

echo "---------- create database and table ----------"
sleep 10
psql -U honeypot_user -h localhost -c "CREATE DATABASE honeypotdb;"
psql -U honeypot_user -h localhost -d honeypotdb -c "CREATE TABLE logins
                                     (
                                         logins_key    serial primary key,
                                         timestamp     TIMESTAMP not null,
                                         ip            VARCHAR(100) not null,
                                         username      VARCHAR(100) not null,
                                         password      VARCHAR(100) not null,
                                         useragent     VARCHAR(100),
                                         city          VARCHAR(100),
                                         country       VARCHAR(100),
                                         isp           VARCHAR(100),
                                     );"

echo "---------- start frontend and backend ----------"
docker run -d -p 40001:80 --name honeypot-frontend --net honeypot-net ghcr.io/frnkst/honeypot-frontend:"$ARTIFACT_ID"
docker run -d -p 40002:3000 --name honeypot-backend --net honeypot-net ghcr.io/frnkst/honeypot-backend:"$ARTIFACT_ID"

echo "---------- generate new server key"
rm server.key
ssh-keygen -q -N '' -f server.key

echo "---------- start ssh honeypot"
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
