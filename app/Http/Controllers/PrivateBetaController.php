<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\PrivateBetaService;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

class PrivateBetaController extends Controller
{
    public function __construct(
        protected PrivateBetaService $privateBetaService
    ) {}

    public function index()
    {
        if (!$this->privateBetaService->isEnabled()) {
            return redirect('/');
        }

        return Inertia::render('Welcome', [
            'canLogin' => Route::has('login'),
            'canRegister' => Route::has('register'),
            'laravelVersion' => Application::VERSION,
            'phpVersion' => PHP_VERSION,
            'isEnabled' => true,
            'isWhitelisted' => $this->privateBetaService->isIpWhitelisted(request()->ip()),
        ]);
    }

    public function access(Request $request)
    {
        if (!$this->privateBetaService->isEnabled()) {
            return redirect('/');
        }

        $request->validate([
            'access_code' => ['required', 'string'],
        ]);

        try {
            $this->privateBetaService->access($request->access_code);
            return redirect()->intended('/');
        } catch (\Exception $e) {
            return back()->withErrors(['access_code' => $e->getMessage()]);
        }
    }
}
