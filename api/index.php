<?php

// Check if the request is for a static file
$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// List of common static file extensions
$staticExtensions = ['css', 'js', 'png', 'jpg', 'jpeg', 'gif', 'ico', 'svg', 'woff', 'woff2', 'ttf', 'eot'];
$extension = pathinfo($uri, PATHINFO_EXTENSION);

if (in_array(strtolower($extension), $staticExtensions)) {
    $publicPath = __DIR__ . '/../public' . $uri;

    if (file_exists($publicPath)) {
        // Set the appropriate content type
        $contentTypes = [
            'css' => 'text/css',
            'js' => 'application/javascript',
            'png' => 'image/png',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'ico' => 'image/x-icon',
            'svg' => 'image/svg+xml',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'eot' => 'application/vnd.ms-fontobject'
        ];

        if (isset($contentTypes[strtolower($extension)])) {
            header('Content-Type: ' . $contentTypes[strtolower($extension)]);
        }

        // Output the file contents
        readfile($publicPath);
        exit;
    }
}

// For all other requests, use the normal Laravel handling
require __DIR__ . '/../public/index.php';
