<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BetaSignupController;
use App\Http\Controllers\Api\StudentCheckController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/hello', function () {
    return response()->json(['message' => 'Hello World!']);
});

Route::get('/users', function () {
    return response()->json(['users' => User::all()]);
});

Route::post('/check-student-id', StudentCheckController::class)
    ->name('api.check-student-id');

Route::post('/beta-signup/verify', BetaSignupController::class)
    ->name('api.beta-signup.verify');
