FROM nginx:1.13.8-alpine
ADD public /usr/share/nginx/html
ADD docs /usr/share/nginx/html
ADD haier.conf /etc/nginx/conf.d
