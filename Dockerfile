FROM oven/bun:1 as frontend

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy frontend source
COPY resources/ resources/
COPY vite.config.js tsconfig.json postcss.config.js tailwind.config.js ./

# Build frontend
RUN bun run build

FROM php:8.3-fpm as backend

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

# Copy composer files
COPY composer.json composer.lock ./

# Set composer config
RUN composer config --global process-timeout 2000

# Install dependencies
RUN composer install --no-interaction --optimize-autoloader --no-dev --prefer-dist

# Copy the rest of the application
COPY . .

# Copy built frontend assets from frontend stage
COPY --from=frontend /app/public/build public/build

# Set permissions
RUN chown -R www-data:www-data /var/www

# Create and set permissions for the entrypoint script
RUN echo '#!/bin/sh\n\
php-fpm\n\
' > /usr/local/bin/docker-entrypoint.sh \
    && chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
