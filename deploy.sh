#!/bin/bash
cd /var/www/djdg626.com
git pull origin custom-server
docker build -t next .
docker stop next || true
docker rm next || true
docker run -d --restart=always -p 3002:3002 -v /var/www/djdg626.com/shared:/app/shared --name next next