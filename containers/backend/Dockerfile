FROM node

RUN mkdir /backend

ADD ./package.json /backend

WORKDIR /backend
RUN yarn install

ADD ./ /backend
