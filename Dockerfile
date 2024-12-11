FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libpq-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN pecl install redis && docker-php-ext-enable redis
RUN docker-php-ext-install pdo_mysql pdo_pgsql mbstring exif pcntl bcmath gd

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www

# Copy composer files first
COPY composer.json composer.lock ./

# Set composer config
RUN composer config --global process-timeout 2000

# Create the script to install dependencies
RUN echo '#!/bin/sh\n\
if [ ! -d "/var/www/vendor" ] || [ ! -f "/var/www/vendor/autoload.php" ]; then\n\
    composer install --no-interaction --optimize-autoloader --no-dev --prefer-dist --no-scripts\n\
    composer dump-autoload --optimize\n\
fi\n\
php-fpm\n\
' > /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy the rest of the application
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www

ENTRYPOINT ["docker-entrypoint.sh"]
