<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CoursesController extends Controller
{
    public function index()
    {
        return Inertia::render('Courses');
    }
}
