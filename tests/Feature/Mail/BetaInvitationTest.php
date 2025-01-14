<?php

namespace Tests\Feature\Mail;

use App\Mail\BetaInvitation;
use Tests\TestCase;
use Illuminate\Support\Facades\Mail;

class BetaInvitationTest extends TestCase
{
    public function test_beta_invitation_email_contains_correct_data(): void
    {
        Mail::fake();

        $accessCode = 'TEST123';
        $userType = 'student';
        $expiresAt = now()->addDays(7)->format('F j, Y \a\t g:i A');

        // Create the mailable
        $mailable = new BetaInvitation(
            accessCode: $accessCode,
            userType: $userType,
            expiresAt: $expiresAt
        );

        // Assert that the mailable has the correct data
        $mailable->assertHasSubject('Welcome to DCCP Hub Beta Access');
        
        $mailable->assertSee($accessCode);
        $mailable->assertSee($userType);
        $mailable->assertSee($expiresAt);
        
        // Test sending the email
        Mail::to('test@example.com')->send($mailable);
        
        Mail::assertSent(BetaInvitation::class, function ($mail) use ($accessCode, $userType) {
            return $mail->accessCode === $accessCode &&
                   $mail->userType === $userType;
        });
    }

    public function test_beta_signup_endpoint_sends_email(): void
    {
        Mail::fake();

        $response = $this->postJson('/api/beta-signup/verify', [
            'email' => 'test@example.com',
            'id' => '12345',
            'type' => 'student'
        ]);

        $response->assertStatus(200);
        
        Mail::assertSent(BetaInvitation::class, function ($mail) {
            return $mail->hasTo('test@example.com');
        });
    }
} 