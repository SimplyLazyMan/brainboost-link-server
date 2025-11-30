export interface Faculty {
  id: string;
  name: string;
  abbreviation: string;
}

export interface Department {
  id: string;
  name: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  level: string;
}

export interface QuestionPaper {
  id: string;
  academicYear: string;
  semester: string;
  courseType: string;
  solutionPrice?: number;
  createdAt: string;
  updatedAt: string;
  faculty: Faculty;
  department: Department;
  course: Course;
  questionPath: string;
  thumbnail?: string | null;
  hasSolution: boolean;
  hasPaid: boolean;
  paymentExpiresAt?: string | null;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
}
