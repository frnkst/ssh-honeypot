VERSION=2022-05-22t20-18_7a69391

docker run -d -p 8080:80 ghcr.io/frnkst/honeypot-frontend:$VERSION
docker run -d -p 8080:80 ghcr.io/frnkst/honeypot-backend:$VERSION
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
python3 ssh-honeypot.py
