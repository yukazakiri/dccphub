<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\BetaInvitation;
use App\Models\PrivateBetaInvitation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;

class BetaSignupController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'id' => ['required', 'string'],
            'type' => ['required', 'string', 'in:student,faculty'],
            'resend' => ['sometimes', 'boolean'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check for existing active invitation
        $existingInvitation = PrivateBetaInvitation::where('email', $request->email)
            ->where('expire_at', '>', now())
            ->first();

        if ($existingInvitation && !$request->boolean('resend')) {
            return response()->json([
                'success' => false,
                'hasExistingInvitation' => true,
                'message' => 'An invitation has already been sent to this email.',
            ], 200);
        }

        try {
            // Generate a new access code
            $accessCode = Str::random(8);
            $expiresAt = now()->addDays(7);

            // Create or update the invitation
            $invitation = PrivateBetaInvitation::updateOrCreate(
                ['email' => $request->email],
                [
                    'access_code' => $accessCode,
                    'expire_at' => $expiresAt,
                    'user_type' => $request->type,
                    'user_id' => $request->id,
                ]
            );

            // Send the invitation email
            Mail::to($request->email)
                ->send(new BetaInvitation(
                    accessCode: $accessCode,
                    userType: $request->type,
                    expiresAt: $expiresAt->format('F j, Y \a\t g:i A')
                ));

            $message = $request->boolean('resend')
                ? 'Invitation link has been resent successfully.'
                : 'Verification successful! Please check your email for the invitation link.';

            return response()->json([
                'success' => true,
                'message' => $message,
            ], 200);

        } catch (\Exception $e) {
            Log::error('Failed to send beta invitation email: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to send invitation email. Please try again later.',
            ], 500);
        }
    }
}
