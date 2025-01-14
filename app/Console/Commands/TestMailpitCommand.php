<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\BetaInvitation;

class TestMailpitCommand extends Command
{
    protected $signature = 'mail:test-mailpit {email?}';
    protected $description = 'Test Mailpit configuration by sending a test email';

    public function handle()
    {
        $email = $this->argument('email') ?? 'test@example.com';
        
        $this->info('Testing Mailpit configuration...');
        $this->info('Current mail settings:');
        $this->table(
            ['Setting', 'Value'],
            [
                ['MAIL_MAILER', config('mail.default')],
                ['MAIL_HOST', config('mail.mailers.smtp.host')],
                ['MAIL_PORT', config('mail.mailers.smtp.port')],
                ['MAIL_USERNAME', config('mail.mailers.smtp.username')],
                ['MAIL_ENCRYPTION', config('mail.mailers.smtp.encryption')],
                ['MAIL_FROM_ADDRESS', config('mail.from.address')],
            ]
        );

        try {
            $this->info("Attempting to send test email to: {$email}");
            
            Mail::to($email)->send(new BetaInvitation(
                accessCode: 'TEST123',
                userType: 'student',
                expiresAt: now()->addDays(7)->format('F j, Y \a\t g:i A')
            ));

            $this->info('✓ Test email sent successfully!');
            $this->info('Please check Mailpit interface at: http://localhost:8025');
            
            return Command::SUCCESS;
        } catch (\Exception $e) {
            $this->error('Failed to send test email!');
            $this->error('Error: ' . $e->getMessage());
            $this->newLine();
            $this->info('Troubleshooting steps:');
            $this->info('1. Ensure Mailpit is running');
            $this->info('2. Check your .env configuration');
            $this->info('3. Verify Mailpit is running on the correct port');
            $this->info('4. Try accessing Mailpit interface at: http://localhost:8025');
            
            return Command::FAILURE;
        }
    }
} 