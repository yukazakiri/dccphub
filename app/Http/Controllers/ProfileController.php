<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Students;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\Features;
use Laravel\Jetstream\Agent;
use App\Models\GeneralSettings;
use Laravel\Jetstream\Jetstream;
use Laravel\Jetstream\Http\Controllers\Inertia\Concerns\ConfirmsTwoFactorAuthentication;

class ProfileController extends Controller
{

    use ConfirmsTwoFactorAuthentication;
    public function show(Request $request)
    {
        $this->validateTwoFactorAuthenticationState($request);

        $user = auth()->user();
        $student = $user->student->load([
            'DocumentLocation',
            'Accounts',
            'Course',
            'subjectEnrolled',
        ]);

        // dd($student);


        return Jetstream::inertia()->render($request, 'Profile/Show', [
            'student' => $student,
            'sessions' => $request->session()->all(),
            'confirmsTwoFactorAuthentication' => $user->hasEnabledTwoFactorAuthentication(),
            'currentSemester' => GeneralSettings::first()->getSemester(),
        ]);
    }
       /**
     * Get the current sessions.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Support\Collection
     */
    public function sessions(Request $request)
    {
        if (config('session.driver') !== 'database') {
            return collect();
        }

        return collect(
            DB::connection(config('session.connection'))->table(config('session.table', 'sessions'))
                    ->where('user_id', $request->user()->getAuthIdentifier())
                    ->orderBy('last_activity', 'desc')
                    ->get()
        )->map(function ($session) use ($request) {
            $agent = $this->createAgent($session);

            return (object) [
                'agent' => [
                    'is_desktop' => $agent->isDesktop(),
                    'platform' => $agent->platform(),
                    'browser' => $agent->browser(),
                ],
                'ip_address' => $session->ip_address,
                'is_current_device' => $session->id === $request->session()->getId(),
                'last_active' => Carbon::createFromTimestamp($session->last_activity)->diffForHumans(),
            ];
        });
    }
     /**
     * Create a new agent instance from the given session.
     *
     * @param  mixed  $session
     * @return \Laravel\Jetstream\Agent
     */
    protected function createAgent($session)
    {
        return tap(new Agent(), fn ($agent) => $agent->setUserAgent($session->user_agent));
    }
}
