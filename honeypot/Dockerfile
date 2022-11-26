FROM python:3

WORKDIR /usr/src/app

COPY abc.txt ./
RUN pip install --no-cache-dir -r abc.txt

COPY . .
RUN ssh-keygen -q -N '' -f server.key

ENTRYPOINT ["python", "./ssh-honeypot.py"]

