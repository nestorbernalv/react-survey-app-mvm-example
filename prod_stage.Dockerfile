# STAGE: 1 - Base stage with React build
# Arguments
ARG BASE_NODE_VERSION
# Base image
FROM node:$BASE_NODE_VERSION as react-build
ARG LABEL_AUTHOR_NAME
LABEL authors=$LABEL_AUTHOR_NAME
# Set working directory
ARG CONTAINER_APP_CODE_LOCATION
WORKDIR $CONTAINER_APP_CODE_LOCATION
# Copying package.json into CONTAINER_APP_CODE_LOCATION directory, and printing in console the existing files in that directory
COPY . .
RUN file="$(ls -1 /application)" && echo $file
# Installing dependecies from package.json and generating the build of the app
RUN yarn install && yarn build

# STAGE: 2 — Stage with the production environment
# Arguments
ARG BASE_NGINX_VERSION
FROM nginx:stable
ARG LABEL_AUTHOR_NAME
LABEL authors=$LABEL_AUTHOR_NAME
# Copying "build" directory from STAGE: 1 into nginx directory
ARG HOST_NGINX_CONFIG_LOCATION
COPY $HOST_NGINX_CONFIG_LOCATION/nginx.conf /etc/nginx/conf.d/default.conf
ARG CONTAINER_APP_CODE_LOCATION
COPY --from=react-build /application/build /usr/share/nginx/html/
ARG HOST_EXPOSED_PORT_REACT_CRA_PRODUCTION_STAGE
EXPOSE $HOST_EXPOSED_PORT_REACT_CRA_PRODUCTION_STAGE



