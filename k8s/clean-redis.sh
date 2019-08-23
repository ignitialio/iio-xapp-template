#!/bin/sh

kubectl delete -f redis/
# kubectl delete -f ./helm/manifests/redis-ha/templates
# helm delete iioat --purge
