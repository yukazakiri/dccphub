<?php

namespace App\Models;

use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Joaopaulolndev\FilamentGeneralSettings\Models\GeneralSetting;

class GeneralSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'site_name',
        'site_description',
        'theme_color',
        'support_email',
        'support_phone',
        'google_analytics_id',
        'posthog_html_snippet',
        'seo_title',
        'seo_keywords',
        'seo_metadata',
        'social_network',
        'email_settings',
        'email_from_name',
        'email_from_address',
        'more_configs',
        'school_portal_enabled',
        'online_enrollment_enabled',
        'school_portal_maintenance',
        'school_portal_url',
        'school_starting_date',
        'school_ending_date',
        'semester',
        'enrollment_courses',
        'school_portal_logo',
        'school_portal_favicon',
        'school_portal_title',
        'school_portal_description',
        'features'
    ];

    protected $casts = [
        'seo_metadata' => 'array',
        'email_settings' => 'array',
        'social_network' => 'array',
        'more_configs' => 'array',
        'school_starting_date' => 'date',
        'school_ending_date' => 'date',
        'school_portal_enabled' => 'boolean',
        'online_enrollment_enabled' => 'boolean',
        'school_portal_maintenance' => 'boolean',
        'semester' => 'integer',
        'enrollment_courses' => 'array',
        'features' => 'json',
    ];
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($settings) {
            self::clearCache();
        });
    }
    public static function getInstance()
    {
        return Cache::rememberForever('general_settings', function () {
            return self::firstOrCreate();
        });
    }

    public static function get($key = null, $default = null)
    {
        $settings = Cache::rememberForever('general_settings', function () {
            return self::first();
        });

        if (!$settings) {
            return $default;
        }

        if ($key === null) {
            return $settings;
        }

        return $settings->$key ?? $default;
    }

    public static function clearCache()
    {
        Cache::forget('general_settings');
    }
    public function getSchoolYear(): string
    {
        return $this->school_starting_date->format('Y') . ' - ' . $this->school_ending_date->format('Y');
    }
    public function getSchoolYearString(): string
    {
        return $this->school_starting_date->format('Y') . '-' . $this->school_ending_date->format('Y');
    }

    public function getSemester(): string
    {
        return match ($this->semester) {
            1 => '1st Semester',
            2 => '2nd Semester',
            default => '1st Semester',
        };
    }

    public function getSchoolLogoUrl(): string
    {
        if ($this->school_portal_logo) {
            return Storage::disk('local')->url($this->school_portal_logo);
        }
        return asset('images/logo.png');
    }

    public function isTuitionFeesPageEnabled()
    {
        return $this->features['student_features']['enable_tuition_fees_page'];
    }
}
