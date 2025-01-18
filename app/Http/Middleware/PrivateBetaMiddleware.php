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
        if ($this->isCheckPassed($request)) {
            return redirect('/');
        }

        return $next($request);
    }

    public function isCheckPassed(Request $request): bool
    {
        if (!$this->privateBetaService->isEnabled()) {
            return false;
        }

        if ($this->privateBetaService->isIpWhitelisted($request->ip())) {
            return false;
        }

        if (Auth::check()) {
            return false;
        }   

        $cookieAccessCode = $request->cookie('private_beta_access_code');
        if (blank($cookieAccessCode)) {
            return false;
        }

        try {
            $this->privateBetaService->access($cookieAccessCode);
            return false;
        } catch (\Exception $e) {
            return true;
        }
    }
}
