<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DCCP Hub Beta</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .container {
            background: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .code {
            background: #f3f4f6;
            padding: 12px 20px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 18px;
            text-align: center;
            margin: 20px 0;
            letter-spacing: 2px;
        }
        .button {
            display: inline-block;
            background: linear-gradient(to right, #F7AABE, #B57CEC, #E472D1);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to DCCP Hub Beta!</h1>
        </div>

        <p>Thank you for your interest in joining the DCCP Hub beta program as a {{ $userType }}. We're excited to have you on board!</p>

        <p>Here's your unique access code:</p>
        <div class="code">{{ $accessCode }}</div>

        <p>To complete your registration, click the button below:</p>
        <div style="text-align: center;">
            <a href="{{ $registrationUrl }}" class="button">Complete Registration</a>
        </div>

        <p><strong>Important:</strong> This invitation will expire on {{ $expiresAt }}.</p>

        <div class="footer">
            <p>If you did not request this invitation, please ignore this email.</p>
            <p>© {{ date('Y') }} DCCP Hub. All rights reserved.</p>
        </div>
    </div>
</body>
</html> 