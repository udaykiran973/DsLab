export const OFFICIAL_DEFAULT_VIDEO = '/videos/default_lab_demo.mp4?v=2';

const CUSTOM_DEFAULT_VIDEO_KEY = 'ds_lab_custom_default_video_v2';

export interface ExperimentVideoConfig {
  expNumber: number;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

export const RESPECTIVE_EXPERIMENT_VIDEOS: ExperimentVideoConfig[] = [
  {
    expNumber: 1,
    title: 'Working with Different Data Formats Using Pandas',
    videoUrl: '/videos/exp1_data_formats.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp1.png'
  },
  {
    expNumber: 2,
    title: 'Interacting with Web APIs and Databases',
    videoUrl: '/videos/exp2_apis_databases.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp2.png'
  },
  {
    expNumber: 3,
    title: 'Data Cleaning and Preparation',
    videoUrl: '/videos/exp3_data_cleaning.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp3.png'
  },
  {
    expNumber: 4,
    title: 'Data Wrangling and Transformation',
    videoUrl: '/videos/exp4_data_wrangling.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp4.png'
  },
  {
    expNumber: 5,
    title: 'Data Visualization Using Matplotlib and Seaborn',
    videoUrl: '/videos/exp5_data_visualization.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp5.png'
  },
  {
    expNumber: 6,
    title: 'Time Series Analysis and Resampling',
    videoUrl: '/videos/exp6_time_series.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp6.png'
  },
  {
    expNumber: 7,
    title: 'Statistical Hypothesis Testing and Distributions',
    videoUrl: '/videos/exp7_statistical_testing.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp7.png'
  },
  {
    expNumber: 8,
    title: 'Supervised Machine Learning: Regression & Classification',
    videoUrl: '/videos/exp8_supervised_ml.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp8.png'
  },
  {
    expNumber: 9,
    title: 'Unsupervised Learning: Clustering & PCA',
    videoUrl: '/videos/exp9_unsupervised_ml.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp9.png'
  },
  {
    expNumber: 10,
    title: 'Big Data Analytics & Predictive Modeling Pipeline',
    videoUrl: '/videos/exp10_big_data.mp4?v=2',
    thumbnailUrl: '/videos/thumb_exp10.png'
  }
];

export function getCustomDefaultVideo(): { videoUrl: string; thumbnailUrl?: string } {
  try {
    const saved = localStorage.getItem(CUSTOM_DEFAULT_VIDEO_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.videoUrl) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Could not read custom default video:', e);
  }
  return {
    videoUrl: OFFICIAL_DEFAULT_VIDEO,
    thumbnailUrl: '/videos/thumb_exp1.png'
  };
}

export function saveCustomDefaultVideo(videoUrl: string, thumbnailUrl?: string): void {
  try {
    localStorage.setItem(
      CUSTOM_DEFAULT_VIDEO_KEY,
      JSON.stringify({ videoUrl, thumbnailUrl })
    );
  } catch (e) {
    console.warn('Could not save custom default video:', e);
  }
}
