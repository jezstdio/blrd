#!/bin/bash

clear

date
echo ""

echo "building production project... \c"
cd client
npm run build
cd ..
echo "done"

echo "creating production build... \c"
rm -rf build/*

mkdir -p build/client
mkdir -p build/server

cp -r client/build/* build/client/
cp -r server/* build/server/

rm -rf build/server/node_modules build/server/.env build/server/database build/server/certificates
echo "done"

echo "uploading production build... \c"
ssh morzsa "rm -rf /volume1/docker/blrd/client"
ssh morzsa "rm -rf /volume1/docker/blrd/server"
scp -r build/* morzsa:/volume1/docker/blrd
echo "done"

echo "uploading production.yml... \c"
scp production.yml morzsa:/volume1/docker/blrd
echo "done"

echo "uploading dockerfile.production... \c"
scp Dockerfile.production morzsa:/volume1/docker/blrd
echo "done"

echo "building from dockerfile.production... \c"
ssh morzsa "/usr/local/bin/docker build -t blrd:production -f /volume1/docker/blrd/Dockerfile.production /volume1/docker/blrd/."
echo "done"

echo "creating docker network... \c"
ssh morzsa "/usr/local/bin/docker network create blrd"
echo "done"

echo "building production.yml... \c"
ssh morzsa "/usr/local/bin/docker-compose -f /volume1/docker/blrd/production.yml up --force-recreate -d"
echo "done"

echo ""
date

echo ""
echo "production deploy is ready"