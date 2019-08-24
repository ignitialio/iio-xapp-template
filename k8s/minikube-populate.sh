#!/bin/sh

RED='\033[0;31m'
ORANGE='\033[0;33m'
NC='\033[0m' # No Color

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
echo "${ORANGE}wait for redis ready...${NC}"
sleep 5

echo "${ORANGE}start iioat container...${NC}"

# start app
kubectl apply -f app/minikube-app-populate.yaml

# wait for job to be completed
kubectl wait --for=condition=complete --timeout=600s job/iioat-populate

echo "${ORANGE}save logs to [tools/logs/populate-atlas.log]...${NC}"

# save and show logs
kubectl logs job/iioat-populate > ../tools/logs/populate-atlas.log
kubectl logs job/iioat-populate

# delete populate job
kubectl delete -f app/minikube-app-populate.yaml

# remove redis deployment
./clean-redis.sh

# clean secrets
kubectl delete secret iiosecrets
kubectl delete secret regcred
