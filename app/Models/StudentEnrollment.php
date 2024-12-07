<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StudentEnrollment extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'student_enrollment';

    protected $fillable = ['student_id', 'course_id', 'downpayment', 'semester','academic_year', 'school_year'];

    // protected $dates = ['enrollment_date', 'completion_date'];

    public static function boot()
    {
        parent::boot();

        static::creating(function (self $model) {
            $model->status = 'Pending';
        });
    }

    public function student()
    {
        return $this->belongsTo(Students::class, 'student_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(Courses::class);
    }

    public function subjectsEnrolled()
    {
        return $this->hasMany(SubjectEnrolled::class, 'enrollment_id', 'id');
    }

    public function studentTuition()
    {
        return $this->hasOne(StudentTuition::class, 'enrollment_id', 'id');
    }
}
