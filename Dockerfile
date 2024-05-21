# nginx state for serving content
FROM nginx:stable-alpine

RUN apk add --no-cache tzdata
ENV TZ=Europe/Moscow

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets over
COPY ./static/ ./
COPY ./nginx.conf /etc/nginx/

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
