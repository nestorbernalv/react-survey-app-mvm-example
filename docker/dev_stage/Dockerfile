# IMPORTANT! : This DockerFile must be use it only in DEV stage.

#Arguments
ARG BASE_NODE_VERSION

# base image
FROM node:$BASE_NODE_VERSION

ARG LABEL_AUTHOR_NAME
LABEL authors=$LABEL_AUTHOR_NAME

#installing create-react-app
RUN npm install -g create-react-app && \
rm -rf /var/lib/apt/lists/* && \
npm cache clean --force

ARG CONTAINER_APP_CODE_LOCATION
# add `/<CONTAINER_APP_CODE_LOCATION>/node_modules/.bin` to $PATH
ENV PATH $CONTAINER_APP_CODE_LOCATION/node_modules/.bin:$PATH

# set working directory
WORKDIR $CONTAINER_APP_CODE_LOCATION


