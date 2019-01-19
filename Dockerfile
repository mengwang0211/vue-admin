FROM node:8.2.1
RUN apt-get update && apt-get install -y nginx && npm config set registry https://registry.npm.taobao.org
WORKDIR /app
COPY . /app/
EXPOSE 80
RUN  npm install && npm run build && cp -r dist/* /var/www/html && cp ./nginx.conf /etc/nginx/ && cp ./404.html /var/www/html && rm -rf /app
CMD ["nginx","-g","daemon off;"]
