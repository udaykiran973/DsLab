export type ResourceType = 'video' | 'doc' | 'book';

export interface ModuleResourceItem {
  id: string;
  title: string;
  source: string;
  url: string;
  type: ResourceType;
  duration_or_read_time: string;
  description?: string;
}

export const MODULE_CURATED_RESOURCES: Record<number, ModuleResourceItem[]> = {
  // ==========================================
  // MODULE 1: INTRODUCTION & DATA INGESTION
  // ==========================================
  1: [
    {
      id: 'm1-res-1',
      title: 'Python for Data Analysis Full Course',
      source: 'YouTube - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=r-uOLxNrNk8',
      type: 'video',
      duration_or_read_time: '4h 20m',
      description: 'Foundations of numerical computing, NumPy arrays, Pandas DataFrames, and data cleaning.'
    },
    {
      id: 'm1-res-2',
      title: 'Pandas Data Analysis Tutorial Playlist',
      source: 'YouTube - Corey Schafer',
      url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTsWRelO5INc_wvKEElKG555',
      type: 'video',
      duration_or_read_time: '11 Videos',
      description: 'Comprehensive step-by-step masterclass covering data ingestion, filtering, and aggregation.'
    },
    {
      id: 'm1-res-3',
      title: 'Pandas Official Getting Started & Tutorials',
      source: 'Official Documentation',
      url: 'https://pandas.pydata.org/docs/getting_started/index.html',
      type: 'doc',
      duration_or_read_time: '15 min read',
      description: 'Official introduction to DataFrame structures, series, and multi-format I/O operations.'
    },
    {
      id: 'm1-res-4',
      title: 'Project Open Data Guidelines & Principles',
      source: 'Official Docs - CIO.gov',
      url: 'https://project-open-data.cio.gov/',
      type: 'doc',
      duration_or_read_time: '10 min read',
      description: 'Federal data architecture standards, metadata specifications, and open data access protocols.'
    }
  ],

  // ==========================================
  // MODULE 2: DATA EXTRACTION & FEATURE SELECTION
  // ==========================================
  2: [
    {
      id: 'm2-res-1',
      title: 'Decision Trees & Random Forests Playlist',
      source: 'YouTube - StatQuest',
      url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF',
      type: 'video',
      duration_or_read_time: '8 Videos',
      description: 'Intuitive visual explanations of Information Gain, Gini Impurity, Bagging, and Random Forests.'
    },
    {
      id: 'm2-res-2',
      title: 'Principal Component Analysis (PCA) Step-by-Step',
      source: 'YouTube - StatQuest with Josh Starmer',
      url: 'https://www.youtube.com/watch?v=FgakZw6K1QQ',
      type: 'video',
      duration_or_read_time: '21 min',
      description: 'Clear geometric interpretation of eigenvectors, eigenvalues, variance maximization, and PCA.'
    },
    {
      id: 'm2-res-3',
      title: 'Singular Value Decomposition (SVD) Video Series',
      source: 'YouTube - Steve Brunton (Univ of Washington)',
      url: 'https://www.youtube.com/playlist?list=PLMrJAkhIeNNR6DzTftbDa89hkbm0wW91n',
      type: 'video',
      duration_or_read_time: '9 Videos',
      description: 'Rigorous mathematical foundations of matrix factorization, low-rank approximation, and SVD.'
    },
    {
      id: 'm2-res-4',
      title: 'Feature Selection Methods & User Guides',
      source: 'Scikit-Learn Official Documentation',
      url: 'https://scikit-learn.org/stable/modules/feature_selection.html',
      type: 'doc',
      duration_or_read_time: '20 min read',
      description: 'Filter methods, recursive feature elimination (RFE), and L1-based embedded feature selection.'
    },
    {
      id: 'm2-res-5',
      title: 'Decision Trees Classifier API & Mathematics',
      source: 'Scikit-Learn Official Documentation',
      url: 'https://scikit-learn.org/stable/modules/tree.html',
      type: 'doc',
      duration_or_read_time: '25 min read',
      description: 'Algorithmic formulations, cost-complexity pruning, and classification tree hyperparameters.'
    }
  ],

  // ==========================================
  // MODULE 3: DATA VISUALIZATION
  // ==========================================
  3: [
    {
      id: 'm3-res-1',
      title: 'Matplotlib Full Tutorial Playlist',
      source: 'YouTube - Corey Schafer',
      url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTvipOqomVEeZ1HRrcEvtZB',
      type: 'video',
      duration_or_read_time: '10 Videos',
      description: 'Master Matplotlib Figure & Axes APIs, bar charts, histograms, scatter plots, subplots, and styling.'
    },
    {
      id: 'm3-res-2',
      title: 'Seaborn Full Tutorial Guide & Visuals',
      source: 'YouTube - Derek Banas',
      url: 'https://www.youtube.com/watch?v=6GUZXDef2U0',
      type: 'video',
      duration_or_read_time: '42 min',
      description: 'Hands-on guide to statistical plotting, KDE plots, distribution graphs, pairplots, and heatmaps.'
    },
    {
      id: 'm3-res-3',
      title: 'Matplotlib Official Plot Types Gallery',
      source: 'Matplotlib Documentation',
      url: 'https://matplotlib.org/stable/plot_types/index.html',
      type: 'doc',
      duration_or_read_time: '15 min read',
      description: 'Interactive visual index of 2D/3D plots, lines, bars, contours, and statistical visualizations.'
    },
    {
      id: 'm3-res-4',
      title: 'Seaborn Official Examples & Aesthetic Themes Gallery',
      source: 'Seaborn Documentation',
      url: 'https://seaborn.pydata.org/examples/index.html',
      type: 'doc',
      duration_or_read_time: '20 min read',
      description: 'High-level aesthetic code recipes for FacetGrids, categorical scatter plots, and multi-plots.'
    }
  ],

  // ==========================================
  // MODULE 4: STATISTICAL THINKING & DISTRIBUTIONS
  // ==========================================
  4: [
    {
      id: 'm4-res-1',
      title: 'Statistics Fundamentals Playlist',
      source: 'YouTube - StatQuest',
      url: 'https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9',
      type: 'video',
      duration_or_read_time: '14 Videos',
      description: 'P-values, hypothesis tests, Central Limit Theorem, variance, standard errors, and confidence intervals.'
    },
    {
      id: 'm4-res-2',
      title: 'The Normal Distribution & Central Limit Theorem',
      source: 'YouTube - 3Blue1Brown',
      url: 'https://www.youtube.com/watch?v=zeJD6dqJ5lo',
      type: 'video',
      duration_or_read_time: '24 min',
      description: 'Stunning mathematical animation revealing why the Gaussian bell curve appears throughout nature.'
    },
    {
      id: 'm4-res-3',
      title: 'Think Stats: Exploratory Data Analysis in Python',
      source: 'Free Online Book - Allen B. Downey (Green Tea Press)',
      url: 'https://greenteapress.com/wp/think-stats-2e/',
      type: 'book',
      duration_or_read_time: 'Full Textbook',
      description: 'Essential textbook covering PMFs, CDFs, percentile ranks, and distribution modeling.'
    },
    {
      id: 'm4-res-4',
      title: 'SciPy Statistical Functions (scipy.stats)',
      source: 'SciPy Documentation',
      url: 'https://docs.scipy.org/doc/scipy/reference/stats.html',
      type: 'doc',
      duration_or_read_time: 'Reference Guide',
      description: 'Continuous and discrete probability distributions, summary statistics, and hypothesis test functions.'
    }
  ],

  // ==========================================
  // MODULE 5: TIME SERIES ANALYSIS & PREDICTIVE MODELING
  // ==========================================
  5: [
    {
      id: 'm5-res-1',
      title: 'Time Series Forecasting in Python Full Course',
      source: 'YouTube - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=fxx_E0ojKrc',
      type: 'video',
      duration_or_read_time: '1h 55m',
      description: 'End-to-end temporal forecasting, rolling moving averages, stationarity tests, and ARIMA models.'
    },
    {
      id: 'm5-res-2',
      title: 'Autocorrelation & Time Series Analysis Playlist',
      source: 'YouTube - Ritvikmath',
      url: 'https://www.youtube.com/playlist?list=PLvcbYUQ5t9UCOLk3Jp22wA1u2-iSbhq8a',
      type: 'video',
      duration_or_read_time: '12 Videos',
      description: 'Serial correlation, Autocorrelation Function (ACF), Partial ACF (PACF), and lag mechanics.'
    },
    {
      id: 'm5-res-3',
      title: 'ROC, AUC & Confusion Matrix Metrics Step-by-Step',
      source: 'YouTube - StatQuest',
      url: 'https://www.youtube.com/watch?v=4jRBRDbJemM',
      type: 'video',
      duration_or_read_time: '18 min',
      description: 'True positive rate, false positive rate, sensitivity, specificity, and ROC-AUC curve interpretation.'
    },
    {
      id: 'm5-res-4',
      title: 'Statsmodels Time Series Analysis (statsmodels.tsa)',
      source: 'Statsmodels Documentation',
      url: 'https://www.statsmodels.org/stable/tsa.html',
      type: 'doc',
      duration_or_read_time: 'Reference Guide',
      description: 'Autoregressive (AR), Moving Average (MA), ARIMA, and SARIMAX model estimation in Python.'
    },
    {
      id: 'm5-res-5',
      title: 'Classification & Regression Evaluation Metrics',
      source: 'Scikit-Learn Documentation',
      url: 'https://scikit-learn.org/stable/modules/model_evaluation.html',
      type: 'doc',
      duration_or_read_time: '30 min read',
      description: 'Comprehensive guide to F1-Score, Mean Squared Error (MSE), R², and classification reports.'
    }
  ]
};
