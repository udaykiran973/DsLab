export interface UploadedPdfItem {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  url?: string;
  dataUri?: string;
  isSample?: boolean;
}

const PDF_STORAGE_KEY = 'ds_lab_uploaded_pdfs_v1';
const runtimeBlobUrls: Record<string, string> = {};
const runtimeDataUris: Record<string, string> = {};

export const DEFAULT_MODULE_PDFS: UploadedPdfItem[] = [
  {
    id: 'pdf-module-1',
    name: 'Module_1_Introduction_Data_Science_22DS102006.pdf',
    size: '13.6 KB',
    uploadedAt: 'Official Curriculum PDF',
    url: '/pdfs/Module_1_Introduction_Data_Science_22DS102006.pdf',
    isSample: true
  },
  {
    id: 'pdf-module-2',
    name: 'Module_2_Data_Extraction_Feature_Selection.pdf',
    size: '10.5 KB',
    uploadedAt: 'Official Curriculum PDF',
    url: '/pdfs/Module_2_Data_Extraction_Feature_Selection.pdf',
    isSample: true
  },
  {
    id: 'pdf-module-3',
    name: 'Module_3_Plotting_and_Visualization.pdf',
    size: '5.8 KB',
    uploadedAt: 'Official Curriculum PDF',
    url: '/pdfs/Module_3_Plotting_and_Visualization.pdf',
    isSample: true
  },
  {
    id: 'pdf-module-4',
    name: 'Module_4_Statistical_Thinking_Distributions.pdf',
    size: '5.2 KB',
    uploadedAt: 'Official Curriculum PDF',
    url: '/pdfs/Module_4_Statistical_Thinking_Distributions.pdf',
    isSample: true
  },
  {
    id: 'pdf-module-5',
    name: 'Module_5_Time_Series_Analysis_Predictive_Modeling.pdf',
    size: '8.0 KB',
    uploadedAt: 'Official Curriculum PDF',
    url: '/pdfs/Module_5_Time_Series_Analysis_Predictive_Modeling.pdf',
    isSample: true
  }
];

export function loadStoredPdfMetadata(): UploadedPdfItem[] {
  try {
    const raw = localStorage.getItem(PDF_STORAGE_KEY);
    if (raw) {
      const parsed: UploadedPdfItem[] = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((item) => ({
          ...item,
          url: runtimeBlobUrls[item.id] || item.url,
          dataUri: runtimeDataUris[item.id] || item.dataUri
        }));
      }
    }
  } catch (e) {
    console.warn('Failed to load stored PDF metadata:', e);
  }
  return DEFAULT_MODULE_PDFS;
}

export function savePdfMetadata(items: UploadedPdfItem[]): void {
  try {
    localStorage.setItem(PDF_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to save PDF metadata:', e);
  }
}

export function registerRuntimePdfBlob(id: string, file: File): string {
  const blobUrl = URL.createObjectURL(file);
  runtimeBlobUrls[id] = blobUrl;
  return blobUrl;
}

export function registerRuntimeDataUri(id: string, dataUri: string): void {
  runtimeDataUris[id] = dataUri;
}

export function getOrCreateSamplePdfUrl(): string {
  return '/pdfs/Module_1_Introduction_Data_Science_22DS102006.pdf';
}
