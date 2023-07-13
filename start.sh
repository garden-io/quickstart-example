#!/bin/bash

set -euxo pipefail

# Install rsync if it's not already installed
command -v rsync &> /dev/null || sudo apt-get install -y rsync

command -v jq &> /dev/null || sudo apt-get install -y jq

# Install Garden if it's not already installed
command -v garden &> /dev/null || (
  ASSET_URL=$(curl -s https://api.github.com/repos/garden-io/garden/releases/latest | \
    jq -r '.assets[] | select(.browser_download_url | test("linux-amd64.tar.gz$")) | .browser_download_url')
  curl -sSL $ASSET_URL | tar xz && \
  sudo mv linux-amd64/* /usr/local/bin)

# Download k3s if it's not already installed
if [ ! -f "./k3s" ]; then
    wget -O k3s https://github.com/k3s-io/k3s/releases/download/v1.27.1%2Bk3s1/k3s
    chmod +x k3s
else
    # Check if k3s is already running and stop it
    if ps aux | grep '[k]3s server' > /dev/null; then
        sudo kill $(ps aux | grep '[k]3s server' | awk '{print $2}')
    fi
fi

# Start k3s server with host Docker iamge support and Traefik ingress controller disabled
nohup sudo ./k3s server --docker --disable=traefik --write-kubeconfig-mode=644 --snapshotter native > /dev/null 2>&1 &

# Copy k3s config to user's home directory
mkdir -p ~/.kube
sleep 5
sudo cp /etc/rancher/k3s/k3s.yaml ~/.kube/config

# Do not install NGINX ingress controller
sed -i 's/\(providers:\)/\1\n  - name: local-kubernetes\n    environments: [local]\n    namespace: ${environment.namespace}\n    defaultHostname: ${var.base-hostname}\n    setupIngressController: null/' project.garden.yml

# Update the garden.yml file for the vote container
sed -i 's/servicePort: 80/nodePort: 30000/' vote/garden.yml
sed -i 's/vote.${var.base-hostname}/http:\/\/localhost:30000/' vote/garden.yml
sed -i 's/hostname:/linkUrl:/' vote/garden.yml

# Remove ingress blocks from result and api containers
sed -i '/ingresses:/, /hostname: result.\${var.base-hostname}/d' api/garden.yml result/garden.yml

# Exit with a success code
exit 0
