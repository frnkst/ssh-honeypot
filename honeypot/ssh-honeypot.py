import socket, sys, threading
import paramiko
import psycopg2
from psycopg2.pool import SimpleConnectionPool
from datetime import datetime
from contextlib import contextmanager
import requests

HOST_KEY = paramiko.RSAKey(filename='server.key')
SSH_PORT = 2222
LOGFILE = 'logins.txt'
LOGFILE_LOCK = threading.Lock()

db = SimpleConnectionPool(1, 10, host='127.0.0.1', database='honeypotdb',
                          user='docker', password='world',
                          port=5432)
iplist = {}


@contextmanager
def get_connection():
    con = db.getconn()
    try:
        yield con
    finally:
        db.putconn(con)


def get_ip_info(ip):
    if ip not in iplist:
        response = requests.get("http://ip-api.com/json/" + ip)
        response.raise_for_status()
        data = response.json()

        iplist[ip] = {
                'city': data['city'],
                'country': data['country'],
                'isp': data['isp']
            }

    return iplist[ip]


def write_to_db(ip, username, password):
    ip_info = get_ip_info(ip)

    with get_connection() as conn:
        try:
            cursor = conn.cursor()

            postgres_insert_query = """INSERT INTO logins (timestamp , ip, username, password, city, country, isp) VALUES (%s,%s,%s,%s,%s,%s,%s)"""
            record_to_insert = (datetime.now(), ip, username, password, ip_info['city'], ip_info['country'], ip_info['isp'])
            cursor.execute(postgres_insert_query, record_to_insert)
            cursor.close()
            conn.commit()
        except Exception as e:
            print("someting went wrong", e)
            conn.rollback()


class SSHServerHandler(paramiko.ServerInterface):
    def __init__(self, client_ip):
        self.client_ip = client_ip
        self.event = threading.Event()

    def check_auth_password(self, username, password):
        write_to_db(self.client_ip, username, password)
        return paramiko.AUTH_FAILED

    def get_allowed_auths(self, username):
        return 'password'


def handleConnection(client, addr):
    client_ip = addr[0]
    transport = paramiko.Transport(client)
    transport.add_server_key(HOST_KEY)

    server_handler = SSHServerHandler(client_ip)

    transport.start_server(server=server_handler)

    channel = transport.accept(1)
    if not channel is None:
        channel.close()


def main():
    try:
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_socket.bind(('', SSH_PORT))
        server_socket.listen(100)

        paramiko.util.log_to_file('paramiko.log')

        while (True):
            try:
                client_socket, client_addr = server_socket.accept()
                threading.Thread.start(
                    handleConnection(client_socket, client_addr))
            except Exception as e:
                print("ERROR: Client handling")
                print(e)

    except Exception as e:
        print("ERROR: Failed to create socket")
        print(e)
        sys.exit(1)


main()
