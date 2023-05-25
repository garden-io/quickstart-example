#!/bin/sh

# Exit immediately if a command exits with a non-zero status
set -e

# Install Garden and dependencies (Git is already included)
sudo apt-get install -y rsync

# Check if Garden is already installed
if ! command -v garden &> /dev/null
then
    # Install Garden if it's not already installed
    curl -sL https://get.garden.io/install.sh | bash
    echo 'export PATH=$PATH:$HOME/.garden/bin' >> ~/.bashrc
    export PATH=$PATH:$HOME/.garden/bin
fi

# Exit with a success code
exit 0