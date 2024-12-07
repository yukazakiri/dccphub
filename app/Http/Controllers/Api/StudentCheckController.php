<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\ShsStudents;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class StudentCheckController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
            'student_id' => ['required', 'string'],
        ]);

        $id = $request->student_id;
        $person = null;
        $personType = null;

        // Check each model for the ID
        if ($student = Student::find($id)) {
            $person = $student;
            $personType = Student::class;
        } elseif ($faculty = Faculty::find($id)) {
            $person = $faculty;
            $personType = Faculty::class;
        } elseif ($shsStudent = ShsStudents::where('student_lrn', $id)->first()) {
            $person = $shsStudent;
            $personType = ShsStudents::class;
        }

        if (!$person) {
            throw ValidationException::withMessages([
                'student_id' => ['The provided ID was not found in our records.'],
            ]);
        }

        // Check if user already exists
        $existingUser = User::where('person_id', $id)->first();
        if ($existingUser) {
            throw ValidationException::withMessages([
                'student_id' => ['An account already exists for this ID.'],
            ]);
        }

        return response()->json([
            'exists' => true,
            'person' => [
                'id' => $person->id ?? $person->student_lrn,
                'first_name' => $person->first_name ?? $person->fullname,
                'email' => $person->email,
            ],
        ]);
    }
}
