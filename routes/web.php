<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\CoursesController;
use App\Http\Controllers\ScheduleController;
use App\Http\Controllers\GradesController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/courses', [CoursesController::class, 'index'])->name('courses.index');
    Route::get('/schedule', [ScheduleController::class, 'index'])->name('schedule.index');
    Route::get('/grades', [GradesController::class, 'index'])->name('grades.index');
    // Route::get('/profile', [ProfileController::class, 'show'])->name('profile');
});

Route::post('/login/verify-email', [AuthenticatedSessionController::class, 'verifyEmail'])
    ->middleware(['guest'])
    ->name('login.verify-email');

require __DIR__.'/jetstream.php';
