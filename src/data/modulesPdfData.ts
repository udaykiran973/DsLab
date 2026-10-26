export interface ModulePdfSection {
  heading?: string;
  subheading?: string;
  paragraphs?: string[];
  bulletPoints?: string[];
  mathFormula?: string;
  diagramType?: string;
  codeBlock?: {
    language: string;
    code: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface ModulePdfPage {
  pageNumber: number;
  title?: string;
  sections: ModulePdfSection[];
}

export interface ModulePdfDocument {
  moduleId: number;
  courseCode: string;
  moduleTitle: string;
  subtitle: string;
  totalPages: number;
  pages: ModulePdfPage[];
}

export const MODULE_PDF_DOCUMENTS: Record<number, ModulePdfDocument> = {
  1: {
    moduleId: 1,
    courseCode: '22DS102006',
    moduleTitle: 'Module 1: Introduction to Data Science',
    subtitle: 'Foundations, 3Vs of Big Data, Skillsets, Data Formats & Analytical Taxonomy',
    totalPages: 4,
    pages: [
      {
        pageNumber: 1,
        title: '1.1 Foundations of Data Science & The 3Vs of Big Data',
        sections: [
          {
            heading: 'Definition of Data Science',
            paragraphs: [
              'Data Science is an interdisciplinary academic and empirical discipline that combines statistical inference, algorithmic computation, data engineering, and domain-specific knowledge to extract actionable insights from structured and unstructured datasets.',
              'Modern enterprise and scientific systems generate massive streams of data characterized by the three foundational dimensions known as the 3Vs of Big Data: Volume, Velocity, and Variety.'
            ],
            bulletPoints: [
              'Volume: Scale of data ranging from gigabytes of tabular records to petabytes of distributed sensor telemetry.',
              'Velocity: Speed at which new observations are generated, ingested, and processed in real-time pipelines.',
              'Variety: Structural diversity spanning relational tables (SQL), semi-structured logs (JSON/XML), and unstructured media.'
            ],
            diagramType: '3vs'
          },
          {
            heading: 'Cross-Domain Applications',
            table: {
              headers: ['Domain', 'Primary Data Sources', 'Core Analytical Application'],
              rows: [
                ['Finance', 'Market tick streams, credit ledgers', 'Algorithmic risk scoring & fraud detection'],
                ['Healthcare', 'EHR records, genomic sequences', 'Clinical outcome prediction & diagnostics'],
                ['Public Policy', 'Census surveys, urban telemetry', 'Resource allocation & traffic optimization'],
                ['E-Commerce', 'Clickstream logs, transaction history', 'Collaborative filtering & churn modeling']
              ]
            }
          }
        ]
      },
      {
        pageNumber: 2,
        title: '1.2 Core Skillsets & Industry Roles',
        sections: [
          {
            heading: 'Essential Data Science Competencies',
            paragraphs: [
              'A practicing Data Scientist operates at the intersection of mathematics, software engineering, and analytical curiosity. Willingness to experiment and formulate falsifiable hypotheses is central to empirical modeling.'
            ],
            bulletPoints: [
              'Data Analyst: Focuses on SQL querying, business intelligence dashboards, and descriptive reporting.',
              'Data Engineer: Architects fault-tolerant ETL/ELT pipelines, data warehouses, and distributed storage.',
              'Product Data Scientist: Designs A/B experiments, conversion funnels, and user retention metrics.',
              'ML Engineer / Generalist: Builds end-to-end predictive models and deploys inference microservices.'
            ],
            diagramType: 'roles'
          }
        ]
      },
      {
        pageNumber: 3,
        title: '1.3 Structured vs Unstructured Data & Storage Formats',
        sections: [
          {
            heading: 'Data Collection & Serialization Formats',
            paragraphs: [
              'Data ingestion requires parsing heterogeneous file formats into standardized in-memory DataFrames for cleaning, munging, missing value imputation, smoothing, and discretization.'
            ],
            bulletPoints: [
              'CSV / TSV: Delimiter-separated plain text tabular records ideal for high-throughput batch ingestion.',
              'JSON (JavaScript Object Notation): Hierarchical key-value documents ubiquitous in RESTful Web APIs.',
              'XML & RSS: Markup-based schemas with explicit tag hierarchies used in enterprise syndication feeds.'
            ],
            codeBlock: {
              language: 'python',
              code: `import pandas as pd\n\n# Reading structured CSV and exporting to TSV\ndf = pd.DataFrame({"ID": [101, 102], "Score": [94.5, 88.0]})\ndf.to_csv("metrics.tsv", sep="\\t", index=False)\nprint(df.describe())`
            }
          }
        ]
      },
      {
        pageNumber: 4,
        title: '1.4 The Six Analytical Disciplines',
        sections: [
          {
            heading: 'Taxonomy of Data Analysis & Analytics',
            paragraphs: [
              'Analytical workflows progress along an increasing spectrum of complexity and causal rigor across six tiers:'
            ],
            bulletPoints: [
              '1. Descriptive Analysis: Summarizes historical data using central tendency and dispersion ("What happened?").',
              '2. Exploratory Analysis (EDA): Discovers hidden patterns, anomalies, and variable correlations visually.',
              '3. Diagnostic Analytics: Isolates root causes of observed shifts via drill-down and correlation ("Why did it happen?").',
              '4. Predictive Analytics: Forecasts future outcomes using supervised statistical and ML models ("What will happen?").',
              '5. Prescriptive Analytics: Recommends optimal decisions under constraints via optimization ("What should we do?").',
              '6. Mechanistic Analysis: Models exact physical or deterministic equations governing variable changes.'
            ]
          }
        ]
      }
    ]
  },
  2: {
    moduleId: 2,
    courseCode: '22DS102006',
    moduleTitle: 'Module 2: Data Extraction & Feature Selection',
    subtitle: 'Filter/Wrapper/Embedded Selection, AIC/BIC, Entropy, Decision Trees, SVD & PCA',
    totalPages: 4,
    pages: [
      {
        pageNumber: 1,
        title: '2.1 Feature Selection Paradigms & Model Criteria',
        sections: [
          {
            heading: 'Filter, Wrapper, and Embedded Feature Selection',
            paragraphs: [
              'High-dimensional datasets often suffer from the curse of dimensionality, multicollinearity, and overfitting. Feature selection isolates the most informative subset of predictors.'
            ],
            bulletPoints: [
              'Filter Methods: Rank features independently of any model using Pearson correlation, Chi-square, or Mutual Information.',
              'Wrapper Methods: Evaluate feature subsets iteratively using Recursive Feature Elimination (RFE), Forward Selection, or Backward Elimination.',
              'Embedded Methods: Perform variable selection intrinsically during training (e.g., L1 Lasso regularization and Tree importance).'
            ]
          },
          {
            heading: 'Statistical Model Selection Criteria',
            mathFormula: 'AIC = 2k - 2 ln(L)   |   BIC = k ln(n) - 2 ln(L)',
            paragraphs: [
              'Akaike Information Criterion (AIC), Bayesian Information Criterion (BIC), and Adjusted R-Squared penalize excessive model complexity (k parameters) to prevent overfitting.'
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: '2.2 Information Theory, Entropy & Decision Trees',
        sections: [
          {
            heading: 'Shannon Entropy & Information Gain',
            mathFormula: 'H(X) = - Σ P(x_i) log2 P(x_i)   |   IG(S, A) = H(S) - Σ (|S_v| / |S|) H(S_v)',
            paragraphs: [
              'Decision Trees partition the feature space recursively by selecting the attribute threshold that maximizes Information Gain (or minimizes Gini Impurity).'
            ],
            diagramType: 'entropy'
          }
        ]
      },
      {
        pageNumber: 3,
        title: '2.3 Ensemble Learning: Random Forests & Bootstrap Aggregation',
        sections: [
          {
            heading: 'Random Forests & Bagging Architecture',
            paragraphs: [
              'Random Forests construct an ensemble of decorrelated Decision Trees trained on bootstrap samples with random feature subspaces at each split, dramatically reducing variance.'
            ],
            codeBlock: {
              language: 'python',
              code: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import load_iris\n\nX, y = load_iris(return_X_y=True)\nrf = RandomForestClassifier(n_estimators=100, random_state=42).fit(X, y)\nprint("Feature Importances:", rf.feature_importances_.round(3))`
            }
          }
        ]
      },
      {
        pageNumber: 4,
        title: '2.4 Matrix Factorization: SVD & Principal Component Analysis (PCA)',
        sections: [
          {
            heading: 'Singular Value Decomposition (SVD) & PCA',
            mathFormula: 'X = U Σ V^T   |   Cov(X) v_i = λ_i v_i',
            paragraphs: [
              'Singular Value Decomposition factors any matrix X into orthogonal left/right singular vectors and singular values. Principal Component Analysis (PCA) projects correlated variables onto orthogonal axes maximizing explained variance.'
            ],
            diagramType: 'pca'
          }
        ]
      }
    ]
  },
  3: {
    moduleId: 3,
    courseCode: '22DS102006',
    moduleTitle: 'Module 3: Plotting and Visualization (Matplotlib & Seaborn)',
    subtitle: 'Figures, Subplots, Annotations, Pandas Plotting & Seaborn Statistical Graphics',
    totalPages: 3,
    pages: [
      {
        pageNumber: 1,
        title: '3.1 Matplotlib Architecture: Figures, Axes & Subplots',
        sections: [
          {
            heading: 'Object-Oriented Matplotlib Hierarchy',
            paragraphs: [
              'Matplotlib organizes visual graphics into a top-level Figure container holding one or more Axes subplots. Explicit control over ticks, labels, legends, and spacing is achieved via plt.subplots() and subplots_adjust().'
            ],
            codeBlock: {
              language: 'python',
              code: `import matplotlib.pyplot as plt\nimport numpy as np\n\nfig, axes = plt.subplots(1, 2, figsize=(10, 4))\nx = np.linspace(0, 2 * np.pi, 100)\naxes[0].plot(x, np.sin(x), color="#2563eb", linestyle="--", label="sin(x)")\naxes[0].set_title("Trigonometric Wave")\naxes[0].legend()\nplt.tight_layout()`
            },
            diagramType: 'matplotlib'
          }
        ]
      },
      {
        pageNumber: 2,
        title: '3.2 Annotations, Geometric Patches & Figure Export',
        sections: [
          {
            heading: 'Customizing Ticks, Annotations & Saving High-DPI Outputs',
            bulletPoints: [
              'ax.set_xticks() & ax.set_xticklabels(rotation=45): Controls axis tick marks and label orientation.',
              'ax.annotate(text, xy, xytext, arrowprops): Highlights key inflection points or anomalies on plots.',
              'plt.savefig("chart.png", dpi=300, bbox_inches="tight"): Exports publication-quality graphics with minimal whitespace.'
            ]
          }
        ]
      },
      {
        pageNumber: 3,
        title: '3.3 Pandas Plotting & Seaborn Statistical Visualizations',
        sections: [
          {
            heading: 'Multivariate Graphics with Seaborn',
            paragraphs: [
              'Seaborn integrates directly with Pandas DataFrames to produce statistical plots with confidence intervals, categorical hue grouping, FacetGrids, pairplots, and correlation heatmaps.'
            ],
            codeBlock: {
              language: 'python',
              code: `import seaborn as sns\nimport pandas as pd\n\ndf = pd.DataFrame({"Dept": ["DS", "DS", "AI", "AI"], "Score": [88, 94, 91, 96]})\nsns.boxplot(data=df, x="Dept", y="Score")`
            }
          }
        ]
      }
    ]
  },
  4: {
    moduleId: 4,
    courseCode: '22DS102006',
    moduleTitle: 'Module 4: Statistical Thinking & Distributions',
    subtitle: 'Central Tendency, Dispersion, PMF, CDF, Percentiles & Continuous Distributions',
    totalPages: 3,
    pages: [
      {
        pageNumber: 1,
        title: '4.1 Summary Statistics, Variance & Outlier Detection',
        sections: [
          {
            heading: 'Central Tendency and Dispersion Metrics',
            mathFormula: 'μ = (1/N) Σ x_i   |   s² = [1 / (n - 1)] Σ (x_i - x̄)²   |   Z = (x - μ) / σ',
            paragraphs: [
              'Empirical distributions are characterized by location (Mean, Median, Mode), spread (Range, Interquartile Range, Variance, Standard Deviation), and shape (Skewness and Kurtosis).'
            ],
            diagramType: 'normal'
          }
        ]
      },
      {
        pageNumber: 2,
        title: '4.2 Probability Mass Functions (PMF) & Cumulative Distribution Functions (CDF)',
        sections: [
          {
            heading: 'From Histograms to PMF and CDF',
            mathFormula: 'PMF: P(X = x)   |   CDF: F_X(x) = P(X ≤ x)',
            paragraphs: [
              'While a Probability Mass Function (PMF) normalizes discrete frequencies into probabilities summing to 1, the Cumulative Distribution Function (CDF) maps each value x to its percentile rank P(X <= x), scaling cleanly across large sample sizes without binning artifacts.'
            ]
          }
        ]
      },
      {
        pageNumber: 3,
        title: '4.3 Continuous Analytical Distributions',
        sections: [
          {
            heading: 'Gaussian, Lognormal & Exponential Distributions',
            bulletPoints: [
              'Normal (Gaussian) Distribution: Symmetric bell curve arising from additive random effects (Central Limit Theorem).',
              'Lognormal Distribution: Right-skewed distribution where log(X) is normally distributed (common in income and latency).',
              'Exponential Distribution: Models inter-arrival times between independent Poisson events with rate parameter lambda.'
            ],
            codeBlock: {
              language: 'python',
              code: `import numpy as np\nfrom scipy import stats\n\nsamples = np.random.normal(loc=50, scale=10, size=1000)\nprint("95th Percentile:", np.percentile(samples, 95).round(2))`
            }
          }
        ]
      }
    ]
  },
  5: {
    moduleId: 5,
    courseCode: '22DS102006',
    moduleTitle: 'Module 5: Time Series Analysis And Predictive Modeling',
    subtitle: 'Decomposition, ARIMA, Moving Averages, Autocorrelation & Model Evaluation Metrics',
    totalPages: 4,
    pages: [
      {
        pageNumber: 1,
        title: '5.1 Time Series Components & Decomposition',
        sections: [
          {
            heading: 'Four Structural Elements of Time Series',
            mathFormula: 'Additive: Y_t = T_t + S_t + C_t + I_t   |   Multiplicative: Y_t = T_t × S_t × C_t × I_t',
            bulletPoints: [
              'Trend (T_t): Long-term secular upward or downward trajectory.',
              'Seasonality (S_t): Fixed-period calendar fluctuations (daily, weekly, quarterly).',
              'Cyclical (C_t): Multi-year macroeconomic or business expansions and contractions.',
              'Irregularity (I_t): Unpredictable white-noise residuals.'
            ],
            diagramType: 'timeseries'
          }
        ]
      },
      {
        pageNumber: 2,
        title: '5.2 Smoothing, Resampling & Missing Value Imputation',
        sections: [
          {
            heading: 'Simple Moving Average (SMA) & Exponential Moving Average (EMA)',
            paragraphs: [
              'Temporal noise is smoothed using rolling window aggregations (.rolling(window=k).mean()) or exponentially weighted moving averages (.ewm(span=k).mean()), alongside forward-fill (ffill), backward-fill (bfill), and linear interpolation.'
            ],
            codeBlock: {
              language: 'python',
              code: `import pandas as pd\n\nts = pd.Series([110, None, 118, 125, 130, 128, 136])\nts_clean = ts.interpolate(method="linear")\nprint("SMA(3):\\n", ts_clean.rolling(3).mean().round(2))`
            }
          }
        ]
      },
      {
        pageNumber: 3,
        title: '5.3 Autocorrelation & Forecasting Models (AR, ARIMA, SARIMA)',
        sections: [
          {
            heading: 'Serial Correlation & ARIMA(p, d, q)',
            paragraphs: [
              'Autocorrelation measures linear dependence between Y_t and lagged observations Y_{t-k}. ARIMA combines Autoregressive lags (p), I(d) differencing for stationarity, and Moving Average error terms (q).'
            ]
          }
        ]
      },
      {
        pageNumber: 4,
        title: '5.4 Predictive Model Evaluation: Classification & Regression',
        sections: [
          {
            heading: 'Confusion Matrix, ROC-AUC, RMSE & MAE',
            mathFormula: 'F1 = 2 · (Precision · Recall) / (Precision + Recall)   |   RMSE = √[ (1/n) Σ (y_i - ŷ_i)² ]',
            table: {
              headers: ['Metric', 'Formula / Definition', 'Primary Use Case'],
              rows: [
                ['Accuracy', '(TP + TN) / (TP + TN + FP + FN)', 'Balanced binary/multi-class classification'],
                ['Precision & Recall', 'TP / (TP + FP)  and  TP / (TP + FN)', 'Imbalanced fraud or medical screening'],
                ['ROC-AUC', 'Area under TPR vs FPR curve', 'Threshold-invariant classifier ranking'],
                ['RMSE & MAE', 'Root Mean Squared / Mean Absolute Error', 'Continuous regression diagnostics']
              ]
            }
          }
        ]
      }
    ]
  }
};
