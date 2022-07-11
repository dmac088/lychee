FROM node:10-alpine AS builder
RUN apk add g++ make py3-pip python
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm audit fix
COPY . /app
RUN npm run build

# nginx state for serving content
FROM nginx
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
