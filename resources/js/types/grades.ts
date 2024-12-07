export interface SubjectGrade {
  id: number;
  subject: {
    id: number;
    code: string;
    title: string;
    units: number;
    academic_year: number;
    semester: number;
    pre_requisites?: string[];
  };
  grade: number | null;
  status: 'Completed' | 'Ongoing' | 'Not taken';
  enrolled_id?: number;
  instructor?: string;
}

export interface AcademicInfo {
  course: string;
  year_standing: number;
  semester: number;
  school_year: string;
}

export interface GradesProps {
  auth: {
    user: {
      id: number;
      name: string;
    };
  };
  grades: SubjectGrade[];
  academic_info: AcademicInfo;
}
