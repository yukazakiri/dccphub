<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Factories\HasFactory;
/* CREATE  TABLE `laravel-v1`.students (
	id                   INT    NOT NULL   PRIMARY KEY,
	first_name           VARCHAR(50)   COLLATE utf8mb4_general_ci NOT NULL   ,
	last_name            VARCHAR(50)   COLLATE utf8mb4_general_ci NOT NULL   ,
	middle_name          VARCHAR(20)   COLLATE utf8mb4_general_ci NOT NULL   ,
	gender               VARCHAR(10)   COLLATE utf8mb4_general_ci NOT NULL   ,
	birth_date           DATE    NOT NULL   ,
	age                  INT    NOT NULL   ,
	address              VARCHAR(255)   COLLATE utf8mb4_general_ci NOT NULL   ,
	contacts             TEXT   COLLATE utf8mb4_general_ci NOT NULL   ,
	course_id            INT    NOT NULL   ,
	academic_year        INT    NOT NULL   ,
	email                VARCHAR(255)   COLLATE utf8mb4_general_ci NOT NULL   ,
	remarks              TEXT   COLLATE utf8mb4_general_ci    ,
	created_at           TIMESTAMP  DEFAULT (CURRENT_TIMESTAMP)  NOT NULL   ,
	updated_at           TIMESTAMP  DEFAULT (CURRENT_TIMESTAMP) ON UPDATE CURRENT_TIMESTAMP NOT NULL   ,
	profile_url          VARCHAR(255)   COLLATE utf8mb4_general_ci NOT NULL   ,
	student_contact_id   INT       ,
	student_parent_info  INT       ,
	student_education_id INT       ,
	student_personal_id  INT       ,
	document_location_id INT
 );

CREATE INDEX fk_students_courses ON `laravel-v1`.students ( course_id );

CREATE INDEX fk_students_student_contacts ON `laravel-v1`.students ( student_contact_id );

CREATE INDEX idx_students_student_parent_info ON `laravel-v1`.students ( student_parent_info );

CREATE INDEX idx_students_student_education_id ON `laravel-v1`.students ( student_education_id );

CREATE INDEX idx_students_student_personal_id ON `laravel-v1`.students ( student_personal_id );

CREATE INDEX idx_students_document_location_id ON `laravel-v1`.students ( document_location_id );

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_courses FOREIGN KEY ( course_id ) REFERENCES `laravel-v1`.courses( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_document_locations FOREIGN KEY ( document_location_id ) REFERENCES `laravel-v1`.document_locations( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_student_contacts FOREIGN KEY ( student_contact_id ) REFERENCES `laravel-v1`.student_contacts( id ) ON DELETE NO ACTION ON UPDATE NO ACTION;

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_student_education_info FOREIGN KEY ( student_education_id ) REFERENCES `laravel-v1`.student_education_info( id ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_student_parents_info FOREIGN KEY ( student_parent_info ) REFERENCES `laravel-v1`.student_parents_info( id ) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `laravel-v1`.students ADD CONSTRAINT fk_students_students_personal_info FOREIGN KEY ( student_personal_id ) REFERENCES `laravel-v1`.students_personal_info( id ) ON DELETE CASCADE ON UPDATE CASCADE;

 */
class Student extends Model
{
    use HasFactory;
protected $table = 'students';

protected $fillable = [
    'id',
    'first_name', 'last_name', 'middle_name', 'gender', 'birth_date', 'age', 'address', 'contacts', 'course_id', 'academic_year', 'email', 'remarks', 'profile_url', 'student_contact_id', 'student_parent_info', 'student_education_id', 'student_personal_id', 'document_location_id', 'clearance_status'
];

public function account(){
    return $this->hasOne(User::class, 'person_id', 'id');
}

public function course()
{
    return $this->belongsTo(Courses::class, 'course_id');
}

public function studentContact()
{
    return $this->belongsTo(StudentContact::class);
}

public function studentParentInfo()
{
    return $this->belongsTo(StudentParentInfo::class);
}

public function studentEducation()
{
    return $this->belongsTo(StudentEducationInfo::class);
}


public function subjectEnrolled()
{
    return $this->hasMany(SubjectEnrolled::class, 'student_id', 'id');
}

public function studentPersonal()
{
    return $this->belongsTo(StudentPersonal::class);
}

public function documentLocation()
{
    return $this->belongsTo(DocumentLocation::class);
}
public function StudentTransactions()
    {
        return $this->hasMany(StudentTransactions::class, 'student_id', 'id');
    }


public function classEnrollments()
{
	return $this->hasMany(class_enrollments::class, 'student_id', 'id');
}
// Full_name
public function getFullNameAttribute()
{
    return $this->first_name . ' ' . $this->middle_name . ' ' . $this->last_name;
}
public function StudentTuition()
{
	return $this->hasMany(StudentTuition::class, 'student_id', 'id');
}

public function getYearStandingAttribute()
{
    switch ($this->academic_year) {
        case 1:
            return '1st Year';
        case 2:
            return '2nd Year';
        case 3:
            return '3rd Year';
        case 4:
            return '4th Year';
        default:
            return 'Unknown Year';
    }
}
public function getProfileUrlAttribute()
{
    return $this->profile_url ?? 'https://placehold.co/60x60.png';
}
public function subjects()
{
	return $this->hasManyThrough(
		Subject::class,
		Courses::class,
		'id', // Foreign key on Course table
		'course_id', // Foreign key on Subject table
		'course_id', // Local key on Students table
		'id' // Local key on Course table
	);
}
public function getStudentChecklistAttribute()
{
    $checklist = [];
    $subjects = $this->subjects;
    $subjectsEnrolled = $this->hasMany(SubjectEnrolled::class, 'student_id', 'id')->get();

    foreach ($subjects as $subject) {
        $enrolledSubject = $subjectsEnrolled->firstWhere('subject_id', $subject->id);

        if ($enrolledSubject) {
            $status = $enrolledSubject->grade !== null ? 'Completed' : 'Ongoing';
        } else {
            $status = 'Not taken';
        }
        $checklist[] = [
            'subject' => $subject,
            'status' => $status,
			'grade' => $enrolledSubject->grade ?? 'N/A',
        ];
    }

    return $checklist;
}

public function getStudentIdNoAttribute()
{
    return $this->id;
}

public function getCodeAttribute()
{
    return $this->course->code;
}

public function getCourseTitleAttribute()
{
    return $this->course->title;
}

public function hasRequestedEnrollment()
{
    return $this->StudentTuition()
                ->where('semester', GeneralSettings::first()->semester)
                ->where('school_year', GeneralSettings::first()->getSchoolYear())
                ->exists();
}
}
