# Home Cloud

*Host your own cloud at home*

#### Table of Contents
- [Development Setup](#development-setup)
  - [Local setup (Linux & Windows)](#local-setup-linux--windows)
  - [Run locally](#run-locally)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Docker (Linux)](#docker-linux)
  - [Run on Docker containers](#run-on-docker-containers)
- [Production Setup](#production-setup)
  - [Local (Linux & Windows)](#local-linux--windows)
    - [Backend](#backend-1)
    - [Frontend](#frontend-1)
  - [Docker (Linux)](#docker-linux-1)


## Development Setup

First, clone the repo and cd into the project:
```bash
git clone https://github.com/antoniosarosi/home-cloud.git
cd home-cloud
```

### Local setup (Linux & Windows)
Install dependencies:
```bash
cd server
npm i
cd ../client # ..\client on Windows
npm i
cd ..
```

### Run locally

#### Backend

Move to the server directory:

```bash
cd server
```

Open **sample.env** and copy its content into a new file named **.env**,
then set the correct value for **HOME_CLOUD_STORAGE**. Now start the server:
```bash
npm run dev
```

#### Frontend

Move to the client directory:

```bash
cd client
```

Open **sample.env** and copy its content into a new file named **.env**,
then set the correct value for **REACT_APP_API_URL**. Finally, start the 
development server:
```bash
npm start
```

Backend will be running on port **5000** and frontend on port **3000** (if not
already in use).

### Docker (Linux)

First, set the correct value for **HOME_CLOUD_STORAGE** env variable:
```bash
export HOME_CLOUD_STORAGE="/home/user/example"
```
Then create a **.env** file in **./client/** and set this value:
```bash
REACT_APP_API_URL="http://localhost:8081"
```

Install dependencies:
```bash
docker-compose run express npm i
docker-compose run react npm i
```

### Run on Docker containers

```bash
docker-compose up
```

Backend will be running on port **8081** and frontend on port **8080** (if not
already in use).

## Production Setup

### Local (Linux & Windows)

#### Backend

Move to **./server/** and set the correct value for **HOME_CLOUD_STORAGE** in
**.env** (see examples in **sample.env**), and then
run npm start:
```bash
npm start
```

#### Frontend
Move to **./client/** and create a file named **.env.production**, set the
correct value for **REACT_APP_API_URL** (see examples in **sample.env**). Then,
install serve globaly:
```bash
npm i -g serve
```

Build the app:

```bash
npm run build # Or yarn build
```

Start the server:

```bash
serve -s build -l 3000 # Or another port of your choice
```

### Docker (Linux)

First, set the correct value for **HOME_CLOUD_STORAGE** env variable:
```bash
export HOME_CLOUD_STORAGE="/home/user/example"
```
Then create a **.env.production** file in **./client/** and set the correct
value for the API URL (your IP address and port 8081):
```bash
REACT_APP_API_URL="http://192.168.1.2:8081"
```

Build images and run containers:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```
