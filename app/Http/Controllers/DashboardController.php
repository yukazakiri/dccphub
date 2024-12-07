<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GuestEnrollment;
use App\Models\Schedule;
use App\Models\GuestTuition;
use App\Models\GeneralSettings;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $student = $request->user()->student;

        return Inertia::render('Dashboard', [
            'enrollments' => GuestEnrollment::with('SubjectsEnrolled')
                ->where('student_id', $student->id)
                ->where('semester', GeneralSettings::first()->semester)
                ->where('school_year', GeneralSettings::first()->getSchoolYear())
                ->first(),

            'schedule' => [
                'today_classes' => Schedule::with(['class.Subject', 'room'])
                    ->whereHas('class', function($query) use ($student) {
                        $query->whereHas('ClassStudents', function($q) use ($student) {
                            $q->where('student_id', $student->id);
                        });
                    })
                    ->where('day_of_week', now()->format('l'))
                    ->get()
                    ->map(function($schedule) {
                        return [
                            'subject' => $schedule->class->Subject->title,
                            'time' => $schedule->start_time->format('h:i A') . ' - ' . $schedule->end_time->format('h:i A'),
                            'room' => $schedule->room->name,
                            'status' => 'ongoing'
                        ];
                    }),

                'next_class' => Schedule::with(['class.Subject', 'room'])
                    ->whereHas('class', function($query) use ($student) {
                        $query->whereHas('ClassStudents', function($q) use ($student) {
                            $q->where('student_id', $student->id);
                        });
                    })
                    ->where('day_of_week', now()->format('l'))
                    ->where('start_time', '>', now()->format('H:i:s'))
                    ->orderBy('start_time')
                    ->first(),
            ],

            'tuition' => GuestTuition::where('id', function($query) use ($student) {
                $query->select('guest_tuition_id')
                    ->from('guest_enrollments')
                    ->where('student_id', $student->id)
                    ->where('semester', GeneralSettings::first()->semester)
                    ->where('school_year', GeneralSettings::first()->getSchoolYear())
                    ->latest()
                    ->limit(1);
            })->first(),
        ]);
    }
}
