<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GuestEnrollment;
use App\Models\Schedule;
use App\Models\GuestTuition;
use App\Models\GeneralSettings;
use App\Models\StudentEnrollment;
use App\Models\StudentTuition;
use App\Models\ClassPost;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $student = $request->user()->student;
        $settings = GeneralSettings::first();

        $data = [
            // Student Information
            'student_info' => [
                'id' => $student->id,
                'course' => [
                    'code' => $student->course->code,
                    'title' => $student->course->title,
                ],
                'academic_year' => $student->academic_year,
                'status' => $student->status,
                'clearance_status' => $student->clearance_status,
                'personal_info' => [
                    'first_name' => $student->first_name,
                    'last_name' => $student->last_name,
                    'middle_name' => $student->middle_name,
                    'email' => $student->email,
                    'gender' => $student->gender,
                    'birth_date' => $student->birth_date,
                ],
            ],

            // Current Enrollment Status
            'current_enrollment' => StudentEnrollment::with(['SubjectsEnrolled.subject'])
                ->where('student_id', $student->id)
                ->where('semester', $settings->semester)
                ->where('school_year', $settings->getSchoolYear())
                ->first(),

            // Class Schedule Information
            'schedule' => [
                // Today's Classes
                'today' => Schedule::with(['class.Subject', 'room'])
                    ->whereHas('class.ClassStudents', fn($q) => $q->where('student_id', $student->id))
                    ->where('day_of_week', now()->format('l'))
                    ->orderBy('start_time')
                    ->get()
                    ->map(fn($schedule) => [
                        'subject' => $schedule->class->Subject->title,
                        'time' => $schedule->start_time->format('h:i A') . ' - ' . $schedule->end_time->format('h:i A'),
                        'room' => $schedule->room->name,
                        'status' => now()->between($schedule->start_time, $schedule->end_time) ? 'ongoing' :
                                   (now()->lt($schedule->start_time) ? 'upcoming' : 'completed')
                    ]),

                // Next Class Today
                'next_class' => Schedule::with(['class.Subject', 'room'])
                    ->whereHas('class.ClassStudents', fn($q) => $q->where('student_id', $student->id))
                    ->where('day_of_week', now()->format('l'))
                    ->where('start_time', '>', now()->format('H:i:s'))
                    ->orderBy('start_time')
                    ->first(),
            ],

            // Academic Progress
            'academic_info' => [
                'course' => $student->course->code,
                'year_standing' => $student->academic_year,
                'semester' => $settings->getSemester(),
                'school_year' => $settings->getSchoolYear(),
            ],

            // Financial Information
            'financial' => [
                'current_tuition' => StudentTuition::where('student_id', $student->id)
                    ->where('semester', $settings->semester)
                    ->where('school_year', $settings->getSchoolYear())
                    ->first(),
                'has_clearance' => $student->clearance_status ?? false,
            ],

            // Class Posts/Announcements
            'recent_posts' => ClassPost::whereIn('class_id',
                $student->classEnrollments->pluck('class_id')
            )
            ->with(['user', 'class'])
            ->latest()
            ->take(5)
            ->get(),
        ];

        return Inertia::render('Dashboard', $data);
    }
}
