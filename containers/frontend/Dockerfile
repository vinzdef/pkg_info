FROM node
RUN apt-get update && apt-get install -y inotify-tools

RUN mkdir /frontend

ADD ./package.json /frontend

WORKDIR /frontend
RUN yarn install

ADD ./ /frontend
