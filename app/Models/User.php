<?php

namespace App\Models;

use Filament\Panel;
use Laravolt\Avatar\Avatar;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Jetstream\HasProfilePhoto;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Laravel\Pennant\Concerns\HasFeatures;
use Filament\Models\Contracts\FilamentUser;
use Coderflex\LaravelTicket\Concerns\HasTickets;
use Illuminate\Database\Eloquent\Casts\Attribute;
use JoelButcher\Socialstream\HasConnectedAccounts;
use Coderflex\LaravelTicket\Contracts\CanUseTickets;
use JoelButcher\Socialstream\SetsProfilePhotoFromUrl;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    use HasApiTokens;
    // use HasConnectedAccounts;
    // use HasTickets;
    use HasFactory;
    use HasProfilePhoto {
        HasProfilePhoto::profilePhotoUrl as getPhotoUrl;
    }
    use TwoFactorAuthenticatable;
    use Notifiable;
    // use SetsProfilePhotoFromUrl;
    // use HasRoles;

    protected $table = "accounts";
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
       "name",
        "username",
        "email",
        "password",
        "role",
        "person_id",
        "avatar",
        "cover",
        "person_type",
        "two_factor_secret",
        "two_factor_recovery_codes",
        "two_factor_confirmed_at",
        "otp_code",
        "otp_activated_at",
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }
    /**
     * Get the URL to the user's profile photo.
     */
    public function profilePhotoUrl(): Attribute
    {
        return filter_var($this->profile_photo_path, FILTER_VALIDATE_URL)
            ? Attribute::get(fn() => $this->profile_photo_path)
            : $this->getPhotoUrl();
    }

    public function posts()
    {
        return $this->hasMany(ClassPost::class, 'user_id', 'id');
    }
    public function hasAnyRole(string ...$roles): bool
    {
        foreach ($roles as $role) {
            if ($this->role === $role) {
                return true;
            }
        }
        return false;
    }
    public function canComment(): bool
    {
        // your conditional logic here
        return true;
    }
    public function person()
    {
        return $this->morphTo();
    }

    public function getFilamentAvatarUrl()
    {
        if ($this->profile_photo_url) {
            return $this->profile_photo_url;
        } else {
            $avatar = new Avatar();
            return $avatar->create($this->name)->toBase64();
        }

    }

    public function getAvatarUrlAttribute()
    {
        if ($this->profile_photo_url) {
            return $this->profile_photo_url;
        } else {
            $avatar = new Avatar();
            return $avatar->create($this->name)->toBase64();
        }

    }
    public function getCoverUrlAttribute()
    {
        if ($this->cover) {
            return asset("storage/" . $this->cover);
        } else {
            return "https://picsum.photos/200/300";
        }
    }

    public function UserPerson()
    {
        return $this->morphTo();
    }

    public function student()
    {
        return $this->belongsTo(Students::class, "person_id");
    }

    public function faculty()
    {
        return $this->belongsTo(Faculty::class, "person_id");
    }

    public function shsStudent()
    {
        return $this->belongsTo(ShsStudents::class, "person_id");
    }


    public function getIsStudentAttribute()
    {
        return $this->hasOne(Students::class, "person_id");
    }
    public function getIsFacultyAttribute()
    {
        return $this->hasOne(Faculty::class, "person_id");
    }
}
