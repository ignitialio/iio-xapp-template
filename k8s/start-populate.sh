#!/bin/sh

kubectl apply -f app/minikube-app-populate.yaml
kubectl wait --for=condition=complete --timeout=300s job/iioat-populate
