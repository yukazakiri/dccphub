export interface Student {
  id: number;
  name: string;
  person_id: string;
}

export interface Auth {
  user: Student;
}

export interface SubjectEnrolled {
  id: number;
  subject_id: number;
  title: string;
}

export interface Enrollment {
  id: number;
  student_id: number;
  semester: string;
  school_year: string;
  SubjectsEnrolled: SubjectEnrolled[];
}

export interface ClassSchedule {
  subject: string;
  time: string;
  room: string;
  status: 'ongoing' | 'completed';
}

export interface Schedule {
  today_classes: ClassSchedule[];
  next_class: ClassSchedule | null;
}

export interface Tuition {
  id: number;
  totalbalance: number;
  payment_method: string;
}

export interface DashboardProps {
  auth: Auth;
  enrollments: Enrollment;
  schedule: Schedule;
  tuition: Tuition;
  notifications?: Notification[];
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}
