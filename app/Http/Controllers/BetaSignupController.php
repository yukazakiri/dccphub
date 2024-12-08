<?php

namespace App\Http\Controllers;

use App\Models\Students;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BetaSignupController extends Controller
{
    public function verify(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'id' => 'required|string',
            'type' => 'required|in:student,faculty',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid input data',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $model = $request->type === 'student' ? Students::class : Faculty::class;
            $person = $model::where('id', $request->id)
                          ->where('email', $request->email)
                          ->first();

            if (!$person) {
                return response()->json([
                    'message' => $request->type === 'student'
                        ? 'Student ID and email do not match our records'
                        : 'Faculty ID and email do not match our records'
                ], 404);
            }

            // Here you could add additional logic like:
            // - Creating a beta access record
            // - Sending a confirmation email
            // - Adding to a waitlist
            // For now, we'll just return success

            return response()->json([
                'message' => 'Successfully verified',
                'data' => [
                    'name' => $person->first_name . ' ' . $person->last_name,
                    'type' => $request->type,
                ]
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'An error occurred while verifying your credentials',
            ], 500);
        }
    }
}
