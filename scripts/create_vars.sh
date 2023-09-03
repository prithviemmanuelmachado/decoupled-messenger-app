#!/bin/sh
echo "REACT_APP_SERVER_REQ_QUEUE="$SERVER_REQ_QUEUE >> ./messenger/.env
echo "REACT_APP_SERVER_RES_QUEUE="$SERVER_RES_QUEUE >> ./messenger/.env
echo "REACT_APP_ACCESS_KEY="$ACCESS_KEY >> ./messenger/.env
echo "REACT_APP_SECRET_ACCESS_KEY="$SECRET_ACCESS_KEY >> ./messenger/.env
echo "REACT_APP_REGION="$REGION >> ./messenger/.env
echo "REACT_APP_BUCKET="$BUCKET >> ./messenger/.env
cd ./messenger
npm install
npm run build
