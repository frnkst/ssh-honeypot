FROM postgres

# Database setup
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB world

# Install software
RUN apt-get update
RUN apt-get -y install nodejs nginx python3 python3-pip keychain

COPY . .
# Install and run frontend
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./frontend/build .

# Install honeypot
WORKDIR /honeypot
RUN pip3 install -r requirements.txt
RUN ssh-keygen -q -N '' -f server.key

# Start all applications
WORKDIR /
RUN chmod +x /start-applications.sh
ENTRYPOINT ["/start-applications.sh"]

# Expose ports
EXPOSE 3000 80



