import socket, sys, threading
import paramiko
import psycopg2
from datetime import datetime


#generate keys with 'ssh-keygen -t rsa -f server.key'
HOST_KEY = paramiko.RSAKey(filename='server.key')
SSH_PORT = 2222
LOGFILE = 'logins.txt' #File to log the user:password combinations to
LOGFILE_LOCK = threading.Lock()

class SSHServerHandler (paramiko.ServerInterface):
    def __init__(self, client_ip):
        self.client_ip = client_ip
        self.event = threading.Event()

    def check_auth_password(self, username, password):
        LOGFILE_LOCK.acquire()
        try:
            logfile_handle = open(LOGFILE,"a")
            print("New login: " + username + ":" + password)
            logfile_handle.write(username + ":" + password + "\n")
            logfile_handle.close()
            insert(self.client_ip, username, password)
        finally:
            LOGFILE_LOCK.release()
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

def insert(ip, username, password):
    try:
        connection = psycopg2.connect(user="honeypot_user",
                                      password="1234",
                                      host="127.0.0.1",
                                      port="5432",
                                      database="honeypotdb")
        cursor = connection.cursor()

        postgres_insert_query = """ INSERT INTO logins (timestamp , ip, username, password) VALUES (%s,%s,%s,%s)"""
        record_to_insert = (datetime.now(), ip, username, password)
        cursor.execute(postgres_insert_query, record_to_insert)

        connection.commit()
        count = cursor.rowcount
        print(count, "Record inserted successfully into mobile table")

    except (Exception, psycopg2.Error) as error:
        print("Failed to insert record into mobile table", error)

    finally:
        # closing database connection.
        if connection:
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

def main():
    try:
        server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        server_socket.bind(('', SSH_PORT))
        server_socket.listen(100)

        paramiko.util.log_to_file ('paramiko.log')

        while(True):
            try:
                client_socket, client_addr = server_socket.accept()
                threading.Thread.start(handleConnection(client_socket, client_addr))
            except Exception as e:
                print("ERROR: Client handling")
                print(e)

    except Exception as e:
        print("ERROR: Failed to create socket")
        print(e)
        sys.exit(1)

main()
