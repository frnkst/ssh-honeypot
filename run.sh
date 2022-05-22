docker run -d -p 8080:80 ghcr.io/frnkst/honeypot-frontend:2022-05-22t19-58_39cee2
docker run -d -p 8080:80 ghcr.io/frnkst/honeypot-backend:2022-05-22t19-58_39cee2
docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres
python3 ssh-honeypot.py
