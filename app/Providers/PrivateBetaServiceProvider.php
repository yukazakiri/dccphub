<?php 
namespace App\Providers;

use App\Models\PrivateBetaInvitation;
use Illuminate\Support\Str;

class PrivateBetaServiceProvider
{
    public function isEnabled(): bool
    {
        return config('app.private-beta.enabled', false);
    }

    public function isIpWhitelisted(?string $ip): bool
    {
        if (blank($ip)) {
            return false;
        }

        $whitelistIps = config('app.private-beta.whitelist_ips');
        if (blank($whitelistIps)) {
            return false;
        }

        return Str::of($whitelistIps)
            ->split('/[\s,]+/')
            ->contains($ip);
    }

    public function checkAccessCode(string $accessCode): PrivateBetaInvitation
    {
        if (! $this->isEnabled()) {
            throw new \Exception(__('Private Beta is not enabled!'));
        }

        $invitation = PrivateBetaInvitation::query()
            ->where('access_code', $accessCode)
            ->latest()
            ->first();

        if (! $invitation) {
            throw new \Exception(__('The access code you sent is invalid'));
        }

        if ($invitation->status != 'active') {
            $msg = match($invitation->status) {
                'pending'  => __('Your access code is currenty pending.'),
                'waiting'  => __('Your access code is currenty waiting for the staff.'),
                'archived' => __('Your access code has expired.'),
                default    => __('The access code you sent is invalid!')
            };

            throw new \Exception($msg);
        }

        if ($invitation->expire_at && now()->gt($invitation->expire_at)) {
            throw new \Exception(__('Your access code has expired.'));
        }

        return $invitation;
    }

    public function access(string $accessCode): PrivateBetaInvitation
    {
        $invitation = $this->checkAccessCode($accessCode);

        $invitation->num_requests += 1;
        $invitation->last_access_at = now();
        $invitation->save();

        return $invitation;
    }
}