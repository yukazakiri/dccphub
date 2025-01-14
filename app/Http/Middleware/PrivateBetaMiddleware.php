<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Providers\PrivateBetaServiceProvider;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class PrivateBetaMiddleware
{
    public function __construct(
        protected PrivateBetaServiceProvider $privateBetaService
    ) {}

    public function handle(Request $request, Closure $next): Response
    {
        // Allow authenticated users to bypass beta check
        if (Auth::check()) {
            return $next($request);
        }

        // Skip beta check for these paths
        $excludedPaths = [
            'login',
            'register',
            'forgot-password',
            'reset-password',
            'email/verify',
            'sanctum/csrf-cookie',
            '_ignition',
            'api',
            'livewire',
            'private-beta',
            'auth',
            'terms-of-service',
            'privacy-policy',
        ];

        // Check if current path starts with any excluded path
        foreach ($excludedPaths as $path) {
            if (str_starts_with($request->path(), $path)) {
                return $next($request);
            }
        }

        if (!$this->isCheckPassed($request)) {
            return redirect('/')
                ->setIntendedUrl(url()->current());
        }

        return $next($request);
    }

    public function isCheckPassed(Request $request): bool
    {
        if (!$this->privateBetaService->isEnabled()) {
            return true;
        }

        if ($this->privateBetaService->isIpWhitelisted($request->ip())) {
            return true;
        }

        $cookieAccessCode = $request->cookie('private_beta_access_code');
        if (blank($cookieAccessCode)) {
            return false;
        }

        try {
            $this->privateBetaService->access($cookieAccessCode);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
