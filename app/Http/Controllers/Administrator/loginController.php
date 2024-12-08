<?php

namespace App\Http\Controllers\Administrator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class loginController extends Controller
{
    public function index()
    {
        return Inertia::render('Administrator/Login');
    }
}
