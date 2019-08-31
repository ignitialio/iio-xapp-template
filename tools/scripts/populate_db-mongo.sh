#!/bin/sh

if command -v iio 2>/dev/null; then
  iio infra dev
  if [ $? -ne 0 ]
  then
    echo "iio version must be >=2.2.1: 'npm i -g @ignitial/iio-cli'"
    exit 1
  fi
else
  echo "iio not installed: 'npm i -g @ignitial/iio-cli'"
  exit 1
fi

export POPULATE_ALL=true
export IIOS_NAMESPACE=ignitialio
export IIOS_MONGODB_DBNAME=ignitialio
./tools/js/populate_db-mongo.js > tools/logs/populate.log
