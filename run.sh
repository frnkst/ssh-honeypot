
# run this: git reset --hard && git pull && chmod +x run.sh && ./run.sh

ARTIFACT_ID=$(date +%Y-%m-%dT%H-%M)_$(git rev-parse --short HEAD)


docker kill $(docker ps -q)
docker rm $(docker ps -a -q)
docker run -d -p 40001:80 ghcr.io/frnkst/honeypot-frontend:$ARTIFACT_ID
docker run -d -p 40002:3000 ghcr.io/frnkst/honeypot-backend:$ARTIFACT_ID
docker run -d -p 40003:5432 -e POSTGRES_PASSWORD=45432dfdf*dfdfl -e POSTGRES_USER=honey postgres
rm server.key
ssh-keygen -q -N '' -f server.key
nohup python3 honeypot/ssh-honeypot.py > honeypot-log.txt &
