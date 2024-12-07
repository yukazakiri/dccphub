<?php

namespace App\Http\Controllers;

use App\Models\GeneralSettings;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Students;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = auth()->user();
        $student = $user->student->load([
            'DocumentLocation',
            'Accounts',
            'Course',
            'subjectEnrolled',
        ]);


        return Inertia::render('Profile/Show', [
            'student' => $student,
            'sessions' => $request->session()->all(),
            'confirmsTwoFactorAuthentication' => $user->hasEnabledTwoFactorAuthentication(),
            'currentSemester' => GeneralSettings::first()->getSemester(),
        ]);
    }
}
