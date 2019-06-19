#!/bin/sh

export MONGODB_URI=iiomc1-hvphm.gcp.mongodb.net
export MONGODB_USER=ignitial
export MONGODB_OPTIONS=retryWrites=true
export MONGODB_DBNAME=iioat
# don't forget to add your server to Mongo Atlas white list
# export MONGODB_PASSWORD=<your_password>

./tools/js/populate_db-mongo.js
