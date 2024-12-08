<?php

// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// For static files, serve them directly
if (php_sapi_name() === 'cli-server') {
    $url = parse_url($_SERVER['REQUEST_URI']);
    $file = __DIR__ . $url['path'];
    if (is_file($file)) {
        return false;
    }
}

// Require Composer's autoloader
require __DIR__ . '/../vendor/autoload.php';

// Load environment variables
$app = require_once __DIR__ . '/../bootstrap/app.php';

// Run the application
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

// Create the request
$request = Illuminate\Http\Request::capture();

// Handle the request
$response = $kernel->handle($request);
$response->send();

$kernel->terminate($request, $response);
