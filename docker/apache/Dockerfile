FROM php:7.4-apache as apache


RUN apt-get update && apt-get install -y \
  		libmagickwand-dev --no-install-recommends \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libpng-dev \
    && pecl install imagick \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-enable imagick

RUN a2enmod rewrite

RUN chown -hR 1000:1000 /var/www/html
RUN chmod -R 755 /var/www/html

USER root
RUN echo "1000 ALL=NOPASSWD: ALL" >> /etc/sudoers

EXPOSE 8081