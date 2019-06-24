> WARNING!
> WIP: will be available very soon for production

# IgnitialIO app

## What is this ?

IgnitialIO (or ignitial.io, or IIOS) web application template allows you to use
IgnitialIO toolbox for deploying micro-services based web apps.  

It provides the capability to build all your app features as a service, which we
can summarize as below:  

>
> Evertyhing is service
>

More information on IIOS can be found on in the
[IIOS Github repository](https://github.com/ignitialio/iio-services).  

Current template is a bootstrap for accessing IIOS thourgh a web app based
on [VueJS](https://vuejs.org/) front-end side.

Backend uses [connect](https://www.npmjs.com/package/connect) and
[connect-rest](https://www.npmjs.com/package/connect-rest), as well as
[socket.io](https://www.npmjs.com/package/socket.io) for serving static files,
communicate with the front-end and provide additional REST APIs.

Two services must be provided in any case:
- data service allowing database access. Here we use IIOS base _dlake_ service
configured to use MongoDB
- authentication service that controls access to IIO services based on roles. This
is used even if no authentication is required (= anonymous users only). Current
template uses _auth_ base service which implements JSONWebToken based authentication.  

> Note !
>
> UI components provided here do not intend to be production ready. They are just
> an exampleon how we can use simple UI components base on [Tailwind](https://tailwindcss.com).
> As an incremental work, these components could be available for production in
> the future, since they are used in our own developments.

## Creation

An web app based on IIOS can be created as below:

```bash
# installs IIO CLI tool
npm install -g @ignitial/iio-cli

# create an app with name myapp (creates folder as well)
iio create app myapp
```

This bootstraps a folder with a ready to run app that you can modify or incrementally
complete with your own features.

You can implement any feature through IIOS services that allow you to inject new
UI components.

## install dependencies

```bash
npm i
```

## build data lake docker image for data access

```bash
npm run docker:build
```

## Use in development

### Populate database for development

Database and authentication service need a minimum set of info (eg. roles) in
order to run web app. Then, you need to populate database before starting your
app:

```bash
npm run config:populate:mongo
```

Here we use mongodb as primary database (user info is a MongoDB collection), then
we populate a MongoDB whose name is the one defined in the configuration.  

Configuration uses environment variables to overwrite default values. For the db,
you need to update __MONGODB_DBNAME__ env variable. We do this in the script that
executes populate, __scripts/populate_db-mongo.sh__ in our case, since Mongo is
concerned:

```bash
export MONGODB_DBNAME=ignitialio
```

## use bash file create by the previous step to start application server


```bash
npm run dev:start
```

## stop and clean up

```bash
npm run dev:stop
```

## start with minikube

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
