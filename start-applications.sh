#!/bin/sh
set -x

echo "starting nginx"
/etc/init.d/nginx start
echo "starting backend"
node backend/server.js &
echo "starting honeypot"
python3 honeypot/ssh-honeypot.py
