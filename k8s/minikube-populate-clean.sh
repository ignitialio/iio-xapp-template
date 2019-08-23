#!/bin/sh

./clean-populate.sh
./clean-redis.sh

kubectl delete secret iiosecrets
kubectl delete secret regcred
