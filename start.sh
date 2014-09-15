#!/bin/bash

apt-get update
# Install build tools
apt-get install -y make g++ git curl vim libcairo2-dev libav-tools nfs-common portmap

# Install node js
apt-get update
apt-get install -y python-software-properties python g++ make
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

# Update apt-get to get 10gen stable packages
apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
apt-get update
# Install specific stable version
apt-get install -y mongodb-10gen=2.4.4
# Pin to the exact version above, so it's not auto upgraded by apt-get
echo "mongodb-10gen hold" | dpkg --set-selections


# Install node js packages
cd /app
npm install -g nodemon
npm install -g bower
npm install
bower install --silent
