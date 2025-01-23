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
  current_enrollment?: {
    SubjectsEnrolled?: Array<{
      subject: {
        title: string;
        code: string;
      };
    }>;
  };
  schedule?: {
    today: Array<{
      subject: string;
      time: string;
      room: string;
      status: 'ongoing' | 'upcoming' | 'completed';
    }>;
    next_class?: {
      subject: string;
      time: string;
      room: string;
    };
  };
  academic_info?: {
    course: string;
    year_standing: string;
    semester: string;
    school_year: string;
  };
  financial?: {
    current_tuition?: {
      balance: number;
      payment_method?: string;
    };
    has_clearance?: boolean;
  };
  recent_posts?: Array<{
    title: string;
    content: string;
    created_at: string;
    user: {
      name: string;
    };
    class: {
      name: string;
    };
  }>;
  student_info?: {
    id: number;
    course: {
      code: string;
      title: string;
    };
    academic_year: string;
    status: string;
    clearance_status: boolean;
    personal_info: {
      first_name: string;
      last_name: string;
      middle_name: string;
      email: string;
      gender: string;
      birth_date: string;
    };
  };
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
}
