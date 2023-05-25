#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Install Garden and dependencies (Git is already included)
sudo apt-get install -y rsync

# Check if Garden is already installed
if ! command -v garden &> /dev/null
then
    # Install Garden if it's not already installed
    curl -sSL https://github.com/garden-io/garden/releases/download/0.13.0/garden-0.13.0-linux-amd64.tar.gz | tar xz && \
    sudo mv linux-amd64/garden /usr/local/bin
fi

curl -s https://raw.githubusercontent.com/k3d-io/k3d/main/install.sh | bash
k3d cluster create --k3s-arg '--disable=traefik@server:0' --network host

# Exit with a success code
exit 0