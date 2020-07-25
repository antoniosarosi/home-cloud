# Home Cloud

Host your own cloud at home

## Development Setup

First, clone the repo and cd into the project
```bash
git clone https://github.com/antoniosarosi/home-cloud.git
cd home-cloud
```

### Docker setup
Use the setup script or type the commands in it manually:
```bash
bash docker-setup.sh
```
### Run on Docker containers
First set this environment variable:
```bash
export HOME_CLOUD_STORAGE=/home/user/example
```
Then start the containers:
```bash
docker-compose up
```
Backend will be on port 8081 and frontend on port 8080 (if not already in use)

### Local setup (Linux)
Use the auto setup script or type the commands in it manually:
```bash
bash local-setup.sh
```

### Run locally
First open **server/.env** and set the correct value for **HOME_CLOUD_STORAGE**,
then, in the project directory:
```bash
cd server
npm run dev
```
On another terminal:
```bash
cd client
npm start
```

Backend will be on port 5000 and frontend on port 3000 (if not already in use)

### Local setup (Windows)
Backend:
```
cd server
npm i
```
Create a **.env** file in that directory and set the path where you want to store files in it:
```
HOME_CLOUD_STORAGE="C:\Users\user\example"
```

Frontend:
```
cd ../client
npm i
```
Create a **.env** file in that directory and set the API URL:

```
REACT_APP_API_URL="http://localhost:5000/api"

```

Then just run the scripts, first start the server:
```
cd ../server
npm run dev
```
Then start React app:
```
cd ../client
npm start
```
