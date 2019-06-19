#!/bin/sh

export APP_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "app version: ${APP_VERSION}"

docker-compose -f docker-compose-dev.yml stop
docker-compose -f docker-compose-dev.yml rm -f
