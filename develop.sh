#!/bin/bash

clear

date
echo ""

echo "creating docker network... \c"
docker network create blrd
echo "done"

echo "building from dockerfile.development... \c"
docker build . -t blrd_client:development -f Dockerfile.client_develop
docker build . -t blrd_server:development -f Dockerfile.server_develop
echo "done"

echo "building docker container... \c"
docker-compose -f develop.yml up --force-recreate -d
echo "done"

echo "cleaning up containers... \c"
docker container prune -f
echo "done"

echo "cleaning up images... \c"
docker image prune -f
echo "done"

echo "cleaning up networks... \c"
docker network prune -f
echo "done"

echo "opening browser... \c"
open -a safari https://localhost:4321
echo "done"

echo ""
date

echo ""
echo "ready for development"