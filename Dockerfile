FROM alpine

ENV TZ=Europe/Switzerland \
    DEBIAN_FRONTEND=noninteractive

# Install software
RUN apt-get update
RUN apt-get -y install nodejs nginx python3 python3-pip keychain
RUN apt-get -y install wget ca-certificates
RUN apt-get -y install postgresql postgresql-contrib

COPY . .
COPY init.sql /docker-entrypoint-initdb.d/
# Install and run frontend
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY ./frontend/build .
RUN /etc/init.d/nginx start

# Run backend
RUN node backend/server.js &

# Install honeypot
WORKDIR /honeypot
RUN pip3 install -r requirements.txt
RUN ssh-keygen -q -N '' -f server.key
# RUN python3 ssh-honeypot.py


# Expose ports
EXPOSE 3000 80

ENTRYPOINT ["sleep"]
CMD ["50000"]



