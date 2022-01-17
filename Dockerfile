FROM node:16.6.2-alpine

ARG WORKDIR=/app/

WORKDIR ${WORKDIR}

COPY package*.json ${WORKDIR}

RUN npm i

COPY . ${WORKDIR}

# RUN npm run build