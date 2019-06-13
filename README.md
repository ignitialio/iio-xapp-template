> WARNING!
> WIP: will be available very soon for production

# IgnitialIO app

# Creation

This folder has been created as below:

```bash
# installs IIO CLI tool
npm install -g @ignitial/iio-cli

# create an app with name iioat (creates folder as well)
iio create app iioat
```

# install dependencies

```bash
npm i
```

# build data lake docker image for data access

```bash
npm run build:dlake:image
```

# use bash file create by the previous step to start application server

```bash
./dev_start.sh
```

> WARNING
> Pay attention not to store _dev_start.sh_ in the git repo if you store there actual
> credantials.

## clean up

```bash
./clean.sh
```

# start with minikube

First, you need to create app and dlake images and publish them to your current private
docker registry (default: registry.ignitial.io, but this is not available for public
usage, so create/define your own)

```bash
npm run publish:dlake:docker && npm run publish:docker
```

> __Note__
>   
> dlake image uses _registry.ignitial.io/ignitial/dlake_ base image. You need as
> well to create your own base image (see _dlake_ repository) if you do not have
> access to _registry.ignitial.io_.

Once done, you can start your clustered app (start minikube first, if not already
  done):

```bash
minikube start

cd k8s
./minikube_cluster.sh
```

## clean up

```bash
cd k8s
./minikube_clean.sh
```
