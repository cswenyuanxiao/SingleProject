#!/bin/bash


echo "Stopping any running Hugo servers..."
pkill -f "hugo server" || true


sleep 1


echo "Starting Hugo server on port 1313..."
hugo server --disableFastRender --port=1313 --bind=127.0.0.1 


lsof -i :1313 

kill -9 PID 