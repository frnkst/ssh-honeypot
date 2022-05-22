VERSION=2022-05-22t20-18_7a69391

docker rm $(docker ps -a -q)
docker run -d -p 5555:80 ghcr.io/frnkst/honeypot-frontend:$VERSION
docker run -d -p 3000:3000 ghcr.io/frnkst/honeypot-backend:$VERSION
docker run --name honeypot-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
ssh-keygen -f server.key
python3 honeypot/ssh-honeypot.py
