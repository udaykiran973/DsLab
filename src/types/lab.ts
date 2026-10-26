export interface StudentProfile {
  name: string;
  rollNo: string;
  department: string;
  classSection?: string;
  status?: string;
  institution?: string;
  semester?: string;
  academicYear?: string;
  email?: string;
  githubUrl?: string;
  facultyMentor?: string;
  facultyDesignation?: string;
  labBatch?: string;
  attendance?: string;
  overallGrade?: string;
  avatarUrl?: string;
}

export interface CurriculumModule {
  id: number;
  title: string;
  hours: number;
  description: string;
  topics: string[];
  pdfFileName: string;
  pdfTitle: string;
  pdfPages: number;
  pdfUrl: string;
  experimentsCount: number;
}

export interface SubExperimentFile {
  name: string;
  size: string;
}

export interface SubExperiment {
  id: string;
  name: string;
  aim: string;
  code: string;
  expectedOutput: string;
  tools?: string[];
  lastModified?: string;
  files?: SubExperimentFile[];
}

export interface Experiment {
  id: string;
  expNumber: number;
  name: string;
  description: string;
  moduleId: number;
  category: string;
  tools: string[];
  videoUrl: string;
  videoThumbnail?: string;
  previewImage?: string;
  githubUrl?: string;
  subExperiments: SubExperiment[];
}

export interface ToolFunctionInfo {
  name: string;
  desc: string;
  syntax: string;
}

export interface ToolInfo {
  id: string;
  name: string;
  category: string;
  version: string;
  description: string;
  docsUrl: string;
  iconType: string;
  keyFunctions: ToolFunctionInfo[];
  sampleCode: string;
}

export interface ExecutionResult {
  stdout: string;
  stderr: string;
  executionTimeMs: number;
  success: boolean;
  plotImage?: string;
}
