
# run this: git reset --hard && git pull && chmod +x run.sh && ./run.sh

docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker run -d -p 5555:80 ghcr.io/frnkst/honeypot-frontend:2022-05-22t20-51_8e95825
docker run -d -p 6666:3000 ghcr.io/frnkst/honeypot-backend:2022-05-22t20-49_8e95825
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=45432dfdf*dfdfl -e POSTGRES_USER=honey postgres
rm server.key
ssh-keygen -q -N '' -f server.key
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
