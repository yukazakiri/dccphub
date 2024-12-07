<?php

namespace App\Models;

use Filament\Panel;
use Laravolt\Avatar\Avatar;
use Firefly\FilamentBlog\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Firefly\FilamentBlog\Traits\HasBlog;
use Filament\Models\Contracts\FilamentUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Rawilk\ProfileFilament\Concerns\TwoFactorAuthenticatable;

class Admins extends Authenticatable implements FilamentUser
{
    // use HasBlog;
    use TwoFactorAuthenticatable;
    use HasFactory;

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar_url',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    public function getFilamentAvatarUrl(): ?string
    {
        $avatar = new Avatar();
        return $avatar->create($this->name)->toBase64();
    }
    public function canComment()
    {
        return true;
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@gmail.com');
    }

    // admin Transactions

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function transactions()
    {
        return $this->belongsToMany(Transaction::class, 'admin_transactions', 'admin_id', 'transaction_id');
    }
}
