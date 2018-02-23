FROM node

RUN mkdir /frontend

ADD ./package.json /frontend

WORKDIR /frontend
RUN yarn install

ADD ./ /frontend
