<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\GeneralSettings;
use App\Models\Subject;
use App\Models\SubjectEnrolled;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GradesController extends Controller
{
    public function index(Request $request)
    {
        $student = auth()->user()->student;
        $settings = GeneralSettings::first();

        // Get all subjects from the student's course
        $courseSubjects = $student->course->Subjects;

        // Get all enrolled subjects
        $enrolledSubjects = $student->subjectEnrolled;

        // Transform and compare subjects
        $grades = $courseSubjects->map(function ($subject) use ($enrolledSubjects) {
            // Find if the subject is enrolled
            $enrolledSubject = $enrolledSubjects->first(function ($enrolled) use ($subject) {
                return $enrolled->subject_id === $subject->id;
            });

            // Determine status
            $status = 'Not taken';
            $grade = null;

            if ($enrolledSubject) {
                if ($enrolledSubject->grade !== null) {
                    $status = 'Completed';
                    $grade = $enrolledSubject->grade;
                } else {
                    $status = 'Ongoing';
                }
            }

            return [
                'id' => $subject->id,
                'subject' => [
                    'id' => $subject->id,
                    'code' => $subject->code,
                    'title' => $subject->title,
                    'units' => $subject->units,
                    'academic_year' => $subject->academic_year,
                    'semester' => $subject->semester,
                    'pre_requisites' => $subject->getAllPreRequisitesAttribute(),
                ],
                'grade' => $grade,
                'status' => $status,
                'enrolled_id' => $enrolledSubject?->id,
                'instructor' => $enrolledSubject?->instructor,
            ];
        })->values();

        return Inertia::render('Grades', [
            'auth' => [
                'user' => [
                    'id' => Auth::id(),
                    'name' => Auth::user()->name,
                ],
            ],
            'grades' => $grades,
            'academic_info' => [
                'course' => $student->course->code,
                'year_standing' => $student->academic_year,
                'semester' => $settings->semester,
                'school_year' => $settings->getSchoolYear(),
            ],
        ]);
    }
}
