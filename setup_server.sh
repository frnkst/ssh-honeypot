
# install docker (https://docs.docker.com/engine/install/debian/)
apt-get update
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# install all the software needed
apt-get -y install python3-pip python3 postgresql-client-common postgresql-client

# change port
/sbin/iptables -A PREROUTING -t nat -p tcp --dport 22 -j REDIRECT --to-port 2222

curl -O https://raw.githubusercontent.com/frnkst/ssh-honeypot/main/docker-compose.yaml
docker-compose down --volumes  && docker-compose up -d

cd honeypot
python3 ssh-honeypot.py
