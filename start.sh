#!/bin/bash

set -e

# Install rsync if it's not already installed
command -v rsync &> /dev/null || sudo apt-get install -y rsync

# Install Garden if it's not already installed
command -v garden &> /dev/null || (curl -sSL https://github.com/garden-io/garden/releases/download/edge-bonsai/garden-bonsai-linux-amd64.tar.gz | tar xz && mv linux-amd64/* /usr/local/bin/garden)

# Install k3d if it's not already installed
command -v k3d &> /dev/null || (curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash)

# Check if a k3d cluster with the name k3s-default already exists
if k3d cluster list | grep -q k3s-default; then
  echo "A k3d cluster with the name k3s-default already exists. Skipping cluster creation."
else
  # Create a k3d cluster
  k3d cluster create --k3s-arg '--disable=traefik@server:0' --network host
fi

sed -i 's/\(providers:\)/\1\n  - name: local-kubernetes\n    environments: [local]\n    namespace: ${environment.namespace}\n    defaultHostname: ${var.base-hostname}\n    setupIngressController: null/' project.garden.yml

# Update the garden.yml file for the vote container
sed -i 's/servicePort: 80/nodePort: 30000/' vote/garden.yml
sed -i 's/vote.${var.base-hostname}/http:\/\/localhost:30000/' vote/garden.yml
sed -i 's/hostname:/linkUrl:/' vote/garden.yml

# Exit with a success code
exit 0