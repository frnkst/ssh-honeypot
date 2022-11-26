FROM python:3

COPY . .
RUN pip3 install -r requirements.txt
RUN ssh-keygen -q -N '' -f server.key

ENTRYPOINT ["python3", "./ssh-honeypot.py"]

