#!/bin/bash

# Force HTTPS for all assets
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan cache:clear

# Update asset URLs to use HTTPS
sed -i 's|http://|https://|g' /var/task/public/build/manifest.json || true
