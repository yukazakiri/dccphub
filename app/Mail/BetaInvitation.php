<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class BetaInvitation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(
        public string $accessCode,
        public string $userType,
        public string $expiresAt
    ) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Welcome to DCCP Hub Beta Access',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.beta-invitation',
            with: [
                'accessCode' => $this->accessCode,
                'userType' => $this->userType,
                'expiresAt' => $this->expiresAt,
                'registrationUrl' => url('register') . '?code=' . $this->accessCode,
            ],
        );
    }
} 