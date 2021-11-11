# For Developing

npm run dev



# DEPLOY::


## Update apt and clone repo

sudo apt update

sudo apt install git

git clone https://github.com/arturkat/mern-url-shortener.git


## Install Node (using nvm)

> NVM Repo: https://github.com/nvm-sh/nvm

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

source ~/.bashrc

nvm install v14.15.0

nvm list

nvm use v14.15.0


## Run npm scripts

npm i

npm run client:install

npm run client:build


## Set up config

cd config

nano production.json

> Update:: port - 80; mongoUri - set up new bd uri; baseUrl: http://mydomain.com

ctrl + o

ctrl + x


## BD ip access

whilelist the hosting ip


## Start

npm run start


## PM2 package

npm i -g pm2

pm2 start npm -- start

pm2 stop 0 [process id]


## Base commands

ls

cd

clear

sudo rm -rf node_modules/