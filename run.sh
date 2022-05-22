VERSION=2022-05-22t20-28_bfee435

docker rm $(docker ps -a -q)
docker run -d -p 5555:80 ghcr.io/frnkst/honeypot-frontend:$VERSION
docker run -d -p 3000:3000 ghcr.io/frnkst/honeypot-backend:$VERSION
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=45432dfdf*dfdfl -e POSTGRES_USER=honey postgres
rm server.key
ssh-keygen -q -N '' -f server.key
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
