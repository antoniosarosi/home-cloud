#!/bin/bash

docker-compose build &&
docker-compose run express npm i &&
docker-compose run react npm i
