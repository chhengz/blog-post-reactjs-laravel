FROM lorisleiva/laravel-docker:latest
# RUN apk add --no-cache postgresql-client

EXPOSE 8000

WORKDIR /var/www/html

COPY . /var/www/html

RUN rm -f composer.lock

RUN cp .env.example .env
RUN composer install
RUN php artisan key:generate

ENTRYPOINT ['/var/www/html/docker-entrypoint.sh']
