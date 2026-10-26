export interface CurriculumSection {
  heading: string;
  topics: string[];
}

export interface RelatedExperimentLink {
  id: string;
  expNumber: number;
  displayNumber: string;
  title: string;
  description: string;
  technology: string;
}

export interface CurriculumModule {
  id: string;
  number: number;
  code: string;
  title: string;
  periods: number;
  syllabusRaw: string;
  overview: string;
  sections: CurriculumSection[];
  allTopics: string[];
  relatedExperiments: RelatedExperimentLink[];
  learningOutcomes: string[];
  theme: {
    accent: string;
    accentLight: string;
    accentDark: string;
    badgeBg: string;
    badgeText: string;
    tagBg: string;
    tagText: string;
    borderHover: string;
    glow: string;
  };
  pdfUrl?: string;
  pdfPages?: number;
  pdfTitle?: string;
}

export const CURRICULUM_MODULES: CurriculumModule[] = [
  // ==========================================
  // MODULE 1: INTRODUCTION (9 Periods)
  // ==========================================
  {
    id: 'module-1',
    number: 1,
    code: 'MODULE 1',
    title: 'INTRODUCTION',
    periods: 9,
    syllabusRaw:
      'Definition of data science, Skills for data science, Tools for data science, Data types, Data collections, Data preprocessing, Data analysis and data analytics, Descriptive analysis, Diagnostic analytics, Predictive analytics, Prescriptive analytics, Exploratory analysis, Mechanistic analysis..',
    overview:
      'Foundational definitions, modern data science workflows, essential analytical toolchains, data collection and preprocessing strategies, and the comprehensive taxonomy of analytical paradigms from descriptive to mechanistic analysis.',
    sections: [
      {
        heading: 'Foundations & Toolchain',
        topics: [
          'Definition of data science',
          'Skills for data science',
          'Tools for data science'
        ]
      },
      {
        heading: 'Data Ingestion & Hygiene',
        topics: [
          'Data types',
          'Data collections',
          'Data preprocessing'
        ]
      },
      {
        heading: 'Analytical Taxonomy & Paradigms',
        topics: [
          'Data analysis and data analytics',
          'Descriptive analysis',
          'Diagnostic analytics',
          'Predictive analytics',
          'Prescriptive analytics',
          'Exploratory analysis',
          'Mechanistic analysis'
        ]
      }
    ],
    allTopics: [
      'Definition of data science',
      'Skills for data science',
      'Tools for data science',
      'Data types',
      'Data collections',
      'Data preprocessing',
      'Data analysis and data analytics',
      'Descriptive analysis',
      'Diagnostic analytics',
      'Predictive analytics',
      'Prescriptive analytics',
      'Exploratory analysis',
      'Mechanistic analysis'
    ],
    relatedExperiments: [
      {
        id: 'exp-1',
        expNumber: 1,
        displayNumber: '01',
        title: 'Import and Export in CSV, JSON and Excel Formats',
        description: 'Creating DataFrames, working with structured file formats, and data ingestion using pandas.',
        technology: 'Pandas'
      },
      {
        id: 'exp-2',
        expNumber: 2,
        displayNumber: '02',
        title: 'Data Cleaning with NumPy',
        description: 'Handling missing values, outlier elimination, array normalization, and vectorized preprocessing.',
        technology: 'NumPy'
      }
    ],
    learningOutcomes: [
      'Articulate the end-to-end data science lifecycle and identify essential software toolchains.',
      'Classify structured vs. unstructured data types and execute rigorous data preprocessing.',
      'Distinguish and select appropriate analytical approaches: descriptive, diagnostic, predictive, prescriptive, exploratory, or mechanistic.'
    ],
    theme: {
      accent: '#0284C7',
      accentLight: '#E0F2FE',
      accentDark: '#0369A1',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
      badgeText: 'text-sky-700 dark:text-sky-300',
      tagBg: 'bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 border-sky-200/60 dark:border-sky-800/50',
      tagText: 'text-sky-700 dark:text-sky-300',
      borderHover: 'hover:border-sky-400 dark:hover:border-sky-500',
      glow: 'from-sky-500/10 to-transparent'
    },
    pdfUrl: '/pdfs/module_1.pdf',
    pdfPages: 18,
    pdfTitle: 'Module 1: Introduction'
  },

  // ==========================================
  // MODULE 2: DATA EXTRACTION (9 Periods)
  // ==========================================
  {
    id: 'module-2',
    number: 2,
    code: 'MODULE 2',
    title: 'DATA EXTRACTION',
    periods: 9,
    syllabusRaw:
      'Extracting meaning from data – Feature selection, User retention, Filters, Wrappers, Entropy, Decision tree algorithm; Random forests, The dimensionality problem, Single value decomposition, Principal component analysis.',
    overview:
      'Techniques for extracting actionable signals from raw data, feature selection heuristics including filter and wrapper methods, information entropy, decision tree and random forest ensembles, and tackling high dimensionality using SVD and PCA.',
    sections: [
      {
        heading: 'Feature Selection & Meaning Extraction',
        topics: [
          'Extracting meaning from data',
          'Feature selection',
          'User retention metrics',
          'Filters',
          'Wrappers'
        ]
      },
      {
        heading: 'Tree Algorithms & Ensemble Learning',
        topics: [
          'Entropy & Information Gain',
          'Decision tree algorithm',
          'Random forests'
        ]
      },
      {
        heading: 'Dimensionality Reduction',
        topics: [
          'The dimensionality problem (Curse of Dimensionality)',
          'Single value decomposition (SVD)',
          'Principal component analysis (PCA)'
        ]
      }
    ],
    allTopics: [
      'Extracting meaning from data',
      'Feature selection',
      'User retention',
      'Filters',
      'Wrappers',
      'Entropy',
      'Decision tree algorithm',
      'Random forests',
      'The dimensionality problem',
      'Single value decomposition (SVD)',
      'Principal component analysis (PCA)'
    ],
    relatedExperiments: [
      {
        id: 'exp-5',
        expNumber: 5,
        displayNumber: '05',
        title: 'Exploratory Data Analysis & Feature Engineering',
        description: 'Correlation matrices, feature scaling, encoding categorical variables, and preparing feature sets.',
        technology: 'Scikit-Learn'
      },
      {
        id: 'exp-4',
        expNumber: 4,
        displayNumber: '04',
        title: 'SQL Relational Queries with SQLite & Python',
        description: 'Structured database extraction, schema joins, filtering, and aggregate analytical extraction.',
        technology: 'SQLite / SQL'
      }
    ],
    learningOutcomes: [
      'Formulate and execute feature selection pipelines using filter and wrapper strategies.',
      'Quantify information entropy and train decision trees and random forest ensembles.',
      'Diagnose the curse of dimensionality and project high-dimensional data via SVD and PCA.'
    ],
    theme: {
      accent: '#0D9488',
      accentLight: '#CCFBF1',
      accentDark: '#0F766E',
      badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
      badgeText: 'text-teal-700 dark:text-teal-300',
      tagBg: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200/60 dark:border-teal-800/50',
      tagText: 'text-teal-700 dark:text-teal-300',
      borderHover: 'hover:border-teal-400 dark:hover:border-teal-500',
      glow: 'from-teal-500/10 to-transparent'
    },
    pdfUrl: '/pdfs/module_2.pdf',
    pdfPages: 17,
    pdfTitle: 'Module 2: Data Extraction'
  },

  // ==========================================
  // MODULE 3: DATA VISUALIZATION (8 Periods)
  // ==========================================
  {
    id: 'module-3',
    number: 3,
    code: 'MODULE 3',
    title: 'DATA VISUALIZATION',
    periods: 8,
    syllabusRaw:
      'A Brief matplotlib API primer, Plotting with Pandas and Seaborn – Line plots, Bar plots, Histograms and density plots, Scatter plots, Facet grids and Categorical data; Other Python visualization tools',
    overview:
      'Grammar of graphics and visual storytelling in Python: architectural breakdown of the Matplotlib API, multi-chart plotting with Pandas and Seaborn, density estimation, faceted categorical panels, and an exploration of modern interactive visualization libraries.',
    sections: [
      {
        heading: 'Matplotlib Primer & Canvas Architecture',
        topics: [
          'A Brief matplotlib API primer',
          'Figure and Axes object hierarchy',
          'Other Python visualization tools'
        ]
      },
      {
        heading: 'Core Plotting with Pandas & Seaborn',
        topics: [
          'Line plots (trend and series)',
          'Bar plots (discrete counts and aggregations)',
          'Histograms and density plots (KDE)',
          'Scatter plots (bivariate relationships)'
        ]
      },
      {
        heading: 'Advanced Multi-Panel & Categorical Graphics',
        topics: [
          'Facet grids (conditional multi-plots)',
          'Categorical data visualization (boxplots, violin plots)',
          'Color palettes & aesthetic styling'
        ]
      }
    ],
    allTopics: [
      'A Brief matplotlib API primer',
      'Plotting with Pandas and Seaborn',
      'Line plots',
      'Bar plots',
      'Histograms and density plots',
      'Scatter plots',
      'Facet grids',
      'Categorical data',
      'Other Python visualization tools'
    ],
    relatedExperiments: [
      {
        id: 'exp-3',
        expNumber: 3,
        displayNumber: '03',
        title: 'Data Visualization with Matplotlib & Seaborn',
        description: 'Hands-on generation of line plots, bar charts, histograms, scatter plots, and customized subplots.',
        technology: 'Matplotlib / Seaborn'
      }
    ],
    learningOutcomes: [
      'Master the Matplotlib object-oriented plotting API (Figure, Axes, Canvas).',
      'Synthesize rich visual plots using Pandas DataFrames and Seaborn aesthetic themes.',
      'Construct FacetGrid layouts to visualize multivariate distributions across categorical splits.'
    ],
    theme: {
      accent: '#8B5CF6',
      accentLight: '#EDE9FE',
      accentDark: '#7C3AED',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
      badgeText: 'text-purple-700 dark:text-purple-300',
      tagBg: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200/60 dark:border-purple-800/50',
      tagText: 'text-purple-700 dark:text-purple-300',
      borderHover: 'hover:border-purple-400 dark:hover:border-purple-500',
      glow: 'from-purple-500/10 to-transparent'
    },
    pdfUrl: '/pdfs/module_3.pdf',
    pdfPages: 22,
    pdfTitle: 'Module 3: Data Visualization'
  },

  // ==========================================
  // MODULE 4: STATISTICAL THINKING (11 Periods)
  // ==========================================
  {
    id: 'module-4',
    number: 4,
    code: 'MODULE 4',
    title: 'STATISTICAL THINKING',
    periods: 11,
    syllabusRaw:
      'Distributions – Representing and plotting histograms, Outliers, Summarizing distributions, Variance, Reporting results; Probability mass function – Plotting PMFs, Other visualizations, The class size paradox, Data frame indexing; Cumulative distribution functions - Limits of PMFs, Representing CDFs, Percentile based statistics, Random numbers, Comparing percentile ranks; Modeling distributions - Exponential distribution, Normal distribution, Lognormal distribution.',
    overview:
      'Rigorous quantitative foundations of Data Science: empirical distributions, variance, outlier identification, probability mass functions (PMF), the class size paradox, cumulative distribution functions (CDF), percentile statistics, and mathematical distribution modeling (Exponential, Normal, and Lognormal).',
    sections: [
      {
        heading: 'Distributions & Descriptive Statistics',
        topics: [
          'Representing and plotting histograms',
          'Outlier detection and handling',
          'Summarizing distributions',
          'Variance and standard deviation',
          'Reporting statistical results'
        ]
      },
      {
        heading: 'Probability Mass Functions (PMF)',
        topics: [
          'Probability mass function definition',
          'Plotting PMFs',
          'Other probability visualizations',
          'The class size paradox',
          'Data frame indexing in probability contexts'
        ]
      },
      {
        heading: 'Cumulative Distribution Functions (CDF)',
        topics: [
          'Limits of PMFs',
          'Representing CDFs',
          'Percentile based statistics',
          'Random numbers generation',
          'Comparing percentile ranks'
        ]
      },
      {
        heading: 'Parametric Distribution Modeling',
        topics: [
          'Modeling distributions',
          'Exponential distribution',
          'Normal (Gaussian) distribution',
          'Lognormal distribution'
        ]
      }
    ],
    allTopics: [
      'Distributions',
      'Representing and plotting histograms',
      'Outliers',
      'Summarizing distributions',
      'Variance',
      'Reporting results',
      'Probability mass function (PMF)',
      'Plotting PMFs',
      'The class size paradox',
      'Data frame indexing',
      'Cumulative distribution functions (CDF)',
      'Limits of PMFs',
      'Representing CDFs',
      'Percentile based statistics',
      'Random numbers',
      'Comparing percentile ranks',
      'Modeling distributions',
      'Exponential distribution',
      'Normal distribution',
      'Lognormal distribution'
    ],
    relatedExperiments: [
      {
        id: 'exp-6',
        expNumber: 6,
        displayNumber: '06',
        title: 'Hypothesis Testing & Statistical Significance',
        description: 'T-tests, Chi-square independence tests, p-value calculations, and hypothesis validation with SciPy.',
        technology: 'SciPy / Stats'
      },
      {
        id: 'exp-2',
        expNumber: 2,
        displayNumber: '02',
        title: 'Data Cleaning with NumPy',
        description: 'Numerical variance, outlier masking, standard deviation, and array vectorization.',
        technology: 'NumPy'
      }
    ],
    learningOutcomes: [
      'Compute variance, evaluate skewness, detect outliers, and generate distribution summaries.',
      'Plot and contrast PMFs and CDFs to resolve statistical anomalies such as the class size paradox.',
      'Fit empirical data to theoretical probability models (Normal, Exponential, and Lognormal).'
    ],
    theme: {
      accent: '#D97706',
      accentLight: '#FEF3C7',
      accentDark: '#B45309',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
      badgeText: 'text-amber-700 dark:text-amber-300',
      tagBg: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/50',
      tagText: 'text-amber-700 dark:text-amber-300',
      borderHover: 'hover:border-amber-400 dark:hover:border-amber-500',
      glow: 'from-amber-500/10 to-transparent'
    },
    pdfUrl: '/pdfs/module_4.pdf',
    pdfPages: 21,
    pdfTitle: 'Module 4: Statistical Thinking'
  },

  // ==========================================
  // MODULE 5: TIME SERIES ANALYSIS AND PREDICTIVE MODELING (8 Periods)
  // ==========================================
  {
    id: 'module-5',
    number: 5,
    code: 'MODULE 5',
    title: 'TIME SERIES ANALYSIS AND PREDICTIVE MODELING',
    periods: 8,
    syllabusRaw:
      'Time series analysis – Importing and cleaning, Plotting, Moving averages, Missing values, Serial correlation, Autocorrelation; Predictive modeling – Overview, Evaluating predictive models, Building predictive model solutions, Sentiment analysis.',
    overview:
      'End-to-end temporal data handling and machine learning predictive solutions: importing and cleaning time-series, computing moving averages, analyzing serial correlation and autocorrelation, evaluating predictive ML models, and deploying sentiment analysis solutions.',
    sections: [
      {
        heading: 'Time Series Foundations & Cleaning',
        topics: [
          'Time series analysis overview',
          'Importing and cleaning temporal data',
          'Plotting time series',
          'Moving averages (rolling windows)',
          'Handling missing values in time sequences'
        ]
      },
      {
        heading: 'Serial Correlation & Autocorrelation',
        topics: [
          'Serial correlation mechanics',
          'Autocorrelation function (ACF)',
          'Lagged temporal dependencies'
        ]
      },
      {
        heading: 'Predictive Modeling & Applied Analytics',
        topics: [
          'Predictive modeling overview',
          'Evaluating predictive models (MSE, R², F1-Score, ROC-AUC)',
          'Building predictive model solutions',
          'Sentiment analysis text classification'
        ]
      }
    ],
    allTopics: [
      'Time series analysis',
      'Importing and cleaning time series',
      'Plotting time series',
      'Moving averages',
      'Missing values in temporal data',
      'Serial correlation',
      'Autocorrelation',
      'Predictive modeling overview',
      'Evaluating predictive models',
      'Building predictive model solutions',
      'Sentiment analysis'
    ],
    relatedExperiments: [
      {
        id: 'exp-5',
        expNumber: 5,
        displayNumber: '05',
        title: 'Exploratory Data Analysis & Feature Engineering',
        description: 'Feature modeling pipelines, model training preparation, and evaluation metrics.',
        technology: 'Scikit-Learn'
      },
      {
        id: 'exp-1',
        expNumber: 1,
        displayNumber: '01',
        title: 'Import and Export in CSV, JSON and Excel Formats',
        description: 'Handling time-series CSV exports and structured DateTime index operations in pandas.',
        technology: 'Pandas'
      }
    ],
    learningOutcomes: [
      'Import, clean, and smooth temporal time-series datasets using moving averages.',
      'Quantify lagged dependencies through serial correlation and autocorrelation analysis.',
      'Design, train, and validate predictive model solutions including text sentiment analysis.'
    ],
    theme: {
      accent: '#4F46E5',
      accentLight: '#E0E7FF',
      accentDark: '#4338CA',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      tagBg: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/50',
      tagText: 'text-indigo-700 dark:text-indigo-300',
      borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-500',
      glow: 'from-indigo-500/10 to-transparent'
    },
    pdfUrl: '/pdfs/module_5.pdf',
    pdfPages: 16,
    pdfTitle: 'Module 5: Time Series Analysis & Predictive Modeling'
  }
];

export const TOTAL_CURRICULUM_PERIODS = CURRICULUM_MODULES.reduce(
  (acc, mod) => acc + mod.periods,
  0
); // 45 Periods
