FROM nginx:alpine

# Copy static files to nginx web root
COPY . /usr/share/nginx/html

# Remove files that shouldn't be served
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/docker-compose.yml \
          /usr/share/nginx/html/.gitignore

EXPOSE 80
