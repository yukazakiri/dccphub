<?php

declare(strict_types=1);

namespace App\Actions\Fortify;

use App\Models\User;
use App\Models\Student;
use App\Models\Faculty;
use App\Models\ShsStudents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     * @throws ValidationException
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => $this->passwordRules(),
            'student_id' => ['required', 'string'],
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ])->validate();

        // Determine person type
        $personType = $this->determinePersonType($input['student_id']);

        if (!$personType) {
            throw ValidationException::withMessages([
                'student_id' => ['The selected ID does not exist.']
            ]);
        }

        // Check for existing user
        $this->validateUniqueUser($input['student_id'], $input['email']);

        // Create the user
        return User::create([
            'name' => $input['name'],
            'username' => $input['name'],
            'email' => $input['email'],
            'password' => Hash::make($input['password']),
            'person_id' => $input['student_id'],
            'role' => $personType === Faculty::class ? 'faculty' : 'student',
            'person_type' => $personType,
        ]);
    }

    /**
     * Determine the person type based on the ID.
     */
    private function determinePersonType(string $studentId): ?string
    {
        if (Student::where('id', $studentId)->exists()) {
            return Student::class;
        }

        if (Faculty::where('id', $studentId)->exists()) {
            return Faculty::class;
        }

        if (ShsStudents::where('student_lrn', $studentId)->exists()) {
            return ShsStudents::class;
        }

        return null;
    }

    /**
     * Validate that the user doesn't already exist.
     *
     * @throws ValidationException
     */
    private function validateUniqueUser(string $personId, string $email): void
    {
        $existingUser = User::where('person_id', $personId)
            ->where('email', $email)
            ->first();

        if ($existingUser) {
            throw ValidationException::withMessages([
                'student_id' => ['A user with this ID and email already has an account.'],
                'email' => ['An account already exists for this email.']
            ]);
        }
    }
}
