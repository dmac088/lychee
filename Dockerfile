FROM node:10-alpine
RUN apk add g++ make py3-pip python
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm audit fix
COPY . /app
CMD ["npm", "start"]
