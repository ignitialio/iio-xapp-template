#!/bin/sh

# sets app versions
export APP_VERSION=$(cat ../package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo "get app version..."
cat templates/minikube-app-populate.template.yaml | sed "s/APP_VERSION/$APP_VERSION/g" > app/minikube-app-populate.yaml

# minikube start

. ./set_k8s_env.sh

# docker registry
kubectl create secret generic regcred \
    --from-file=.dockerconfigjson=${IIO_K8S_REGISTRY_CONFIG_PATH} \
    --type=kubernetes.io/dockerconfigjson

# create K8S secrets from credential file
./secrets.sh

# creates persistent volume
./create-pv.sh

# start Redis
./start-redis.sh

# wait for redis
echo "wait for redis ready..."
sleep 5

# start app
./start-populate.sh
