#!/bin/bash

error() {
  echo $1
  exit 1
}

echo '# Set the path for your local cloud' > server/.env
echo 'HOME_CLOUD_STORAGE="/home/user/example"' >> server/.env

echo 'REACT_APP_API_URL="http://localhost:5000/api"' >> client/.env

cd server
npm i || error -e "\nError installing backend dependencies"
cd ../client
npm i || error -e "\nError installing frontend dependencies"

echo -e "\nSetup completed"
