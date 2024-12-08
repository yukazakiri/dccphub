<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BetaSignupController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/check-student-id', App\Http\Controllers\Api\StudentCheckController::class)
    ->name('api.check-student-id');

Route::post('/beta-signup/verify', [BetaSignupController::class, 'verify']);
