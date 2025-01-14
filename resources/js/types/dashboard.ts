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
  next_class?: {
    subject: string;
    time: string;
    room: string;
  };
  today?: Array<{
    subject: string;
    time: string;
    room: string;
    status: 'pending' | 'completed';
  }>;
}

export interface Tuition {
  id: number;
  totalbalance: number;
  payment_method: string;
}

export interface AcademicInfo {
  semester: string;
  school_year: string;
  course: string;
  year_standing: string;
}

export interface Financial {
  current_tuition?: {
    balance: number;
    payment_method: string;
  };
}

export interface CurrentEnrollment {
  SubjectsEnrolled?: Array<any>;
}

export interface Post {
  title: string;
  content: string;
  created_at: string;
  user: {
    name: string;
  };
  class: {
    name: string;
  };
}

export interface DashboardProps {
  auth: {
    user: {
      name: string;
      person_id: string;
    };
  };
  current_enrollment?: CurrentEnrollment;
  schedule?: Schedule;
  academic_info?: AcademicInfo;
  financial?: Financial;
  recent_posts?: Array<Post>;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}
