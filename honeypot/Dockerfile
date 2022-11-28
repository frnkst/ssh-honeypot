FROM python:3

WORKDIR /usr/src/app

COPY ./honeypot/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ./honeypot .
RUN ssh-keygen -q -N '' -f server.key
RUN chmod +x ./start-honeypot.sh
ENTRYPOINT ["./start-honeypot.sh"]

