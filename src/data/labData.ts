import { CurriculumModule, Experiment, StudentProfile, ToolInfo } from '../types/lab';
import { ALL_EXPERIMENTS } from './experimentsData';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  name: 'K. Uday Kiran',
  rollNo: '24102A030055',
  department: 'Data Science',
  classSection: 'Section 1',
  status: 'ACTIVE',
  institution: 'Mohan Babu University',
  semester: 'Semester VI',
  academicYear: '2025 - 2026',
  email: 'kudaykiran192@gmail.com',
  githubUrl: 'https://github.com/udaykiran973/Ds-Lab-Execution',
  facultyMentor: 'Mr. S. Bosubabu',
  facultyDesignation: 'Assistant Professor',
  labBatch: 'Batch DS-1 (Tuesday 1:30 PM - 4:30 PM)',
  attendance: '98.5%',
  overallGrade: 'O (Outstanding)',
  avatarUrl: '/profile.jpg'
};

export const INITIAL_MODULES: CurriculumModule[] = [
  {
    id: 1,
    title: 'Module 1: Introduction to Data Science (22DS102006)',
    hours: 14,
    description: 'Data Science definitions, 3Vs of Big Data, applications in finance, public policy, politics, healthcare; core skillsets, structured vs unstructured data, collection formats (CSV, TSV, XML, RSS), preprocessing tasks, and the six analytical disciplines.',
    topics: [
      'Definition of data science & the 3Vs: Volume, Velocity, Variety (Figure 1.1)',
      'Cross-domain applications: Finance, Public Policy, Politics, Healthcare, Urban Planning',
      'Essential skillsets: Willingness to experiment, mathematical reasoning, data literacy',
      'Industry roles: Data Analyst, Data Engineer, Product Data Scientist, Generalist (Figure 1.2)',
      'Data types: Structured vs Unstructured, storage formats (CSV, TSV, XML, RSS)',
      'Preprocessing: Cleaning, munging, missing values, smoothing, discretization',
      'The 6 analytics tiers: Descriptive, Diagnostic, Predictive, Prescriptive, Exploratory, Mechanistic'
    ],
    pdfFileName: 'Module_1_Introduction_Data_Science_22DS102006.pdf',
    pdfTitle: 'Module 1: Introduction to Data Science (22DS102006)',
    pdfPages: 18,
    pdfUrl: '/pdfs/Module_1_Introduction_Data_Science_22DS102006.pdf',
    experimentsCount: 1
  },
  {
    id: 2,
    title: 'Module 2: Data Extraction & Feature Selection',
    hours: 16,
    description: 'Kaggle framework & crowdsourced modeling, feature selection strategies (Filter, Wrapper, Embedded), stepwise regression, model criteria (AIC, BIC, Adjusted R²), user retention, Entropy, Decision Trees, Random Forests, SVD, and PCA.',
    topics: [
      'Extracting meaning: William Cukierski (Kaggle) & David Huffaker (Google)',
      'Feature Selection: Filter, Wrapper (RFE), Embedded (Lasso), Stepwise regression',
      'Model selection criteria: AIC, BIC, Entropy, Adjusted R-squared, P-values',
      'Information Theory & Entropy: Formula H(X), maximum entropy curve, information gain',
      'Decision Tree algorithms: Splitting architecture, continuous threshold variables',
      'Random Forests & Bagging: Bootstrap sampling, hyperparameter tuning, R/Python scripts',
      'Singular Value Decomposition (SVD): X = U Σ V^T, low-rank approximation & compression',
      'Principal Component Analysis (PCA): Dimensionality reduction, variance maximization'
    ],
    pdfFileName: 'Module_2_Data_Extraction_Feature_Selection.pdf',
    pdfTitle: 'Module 2: Data Extraction & Feature Selection',
    pdfPages: 17,
    pdfUrl: '/pdfs/Module_2_Data_Extraction_Feature_Selection.pdf',
    experimentsCount: 1
  },
  {
    id: 3,
    title: 'Module 3: Plotting and Visualization (Matplotlib & Seaborn)',
    hours: 16,
    description: 'Matplotlib object-oriented API, Figures and Subplots, tick customization, labels, legends, annotations, drawing geometric patches, exporting visuals, Pandas .plot() methods, Seaborn statistical graphics, heatmaps, and categorical visual analytics.',
    topics: [
      'Matplotlib primer: Figures, Subplots, %matplotlib inline / notebook',
      'Subplots adjustment: subplots_adjust, wspace, hspace, shared axes',
      'Styling: Colors, markers, line styles, drawstyles (steps-post)',
      'Axes customization: xticks, set_xticklabels, rotation, set_title, legends',
      'Annotations: text, arrows, drawing patches (Rectangle, Circle, Polygon)',
      'Saving plots: plt.savefig, dpi, bbox_inches, BytesIO memory export',
      'Plotting with Pandas: Series.plot, DataFrame.plot, bar and stacked barplots',
      'Seaborn graphics: barplot, hue options, scatter plots, FacetGrids, heatmaps'
    ],
    pdfFileName: 'Module_3_Plotting_and_Visualization.pdf',
    pdfTitle: 'Module 3: Plotting and Visualization',
    pdfPages: 22,
    pdfUrl: '/pdfs/Module_3_Plotting_and_Visualization.pdf',
    experimentsCount: 1
  },
  {
    id: 4,
    title: 'Module 4: Statistical Thinking & Distributions',
    hours: 16,
    description: 'Histogram distributions, central tendency and dispersion metrics, population vs sample variance, Probability Mass Functions (PMF), Cumulative Distribution Functions (CDF), percentiles, random numbers, and continuous distributions (Normal, Lognormal, Exponential).',
    topics: [
      'Distributions: Representing and plotting histograms with plt.hist',
      'Outlier detection: Sorting, visualization, statistical tests (Z-score, IQR)',
      'Central tendency & dispersion: Mean, Median, Mode, Range, Variance, Std Dev, Skewness, Kurtosis',
      'Probability Mass Function (PMF): Normalization, ggplot2 and matplotlib plotting',
      'Data visualization types: Line graph, Bar chart, Column chart, Pie chart, Area chart, Scatter plot, Bubble chart',
      'DataFrame indexing: .loc, .iloc, boolean indexing, set_index in Pandas',
      'Cumulative Distribution Functions (CDF): Percentile rank, limits of PMF, EvalCdf',
      'Theoretical continuous distributions: Exponential, Normal (Gaussian), Lognormal'
    ],
    pdfFileName: 'Module_4_Statistical_Thinking_Distributions.pdf',
    pdfTitle: 'Module 4: Statistical Thinking & Distributions',
    pdfPages: 21,
    pdfUrl: '/pdfs/Module_4_Statistical_Thinking_Distributions.pdf',
    experimentsCount: 1
  },
  {
    id: 5,
    title: 'Module 5: Time Series Analysis And Predictive Modeling',
    hours: 18,
    description: 'Time series properties, components (Trend, Seasonality, Cyclical, Irregularity), forecasting models (AR, ARIMA, SARIMA, VAR, Holt-Winters, LSTM), moving averages (SMA, EMA), missing value imputation, autocorrelation, and predictive modeling evaluation (Confusion Matrix, ROC-AUC, RMSE, MAE).',
    topics: [
      'Foundations of Time Series: Temporal order, regular intervals, line representations',
      'Four primary elements: Trend, Seasonality, Cyclical, Irregularity',
      'Forecasting algorithms: AR(p), ARIMA(p,d,q), SARIMA, Exponential Smoothing, State Space, RNN/LSTM',
      'Data preparation & moving averages: SMA rolling window, EMA ewm span, asfreq, resample',
      'Missing values strategies: ffill, bfill, linear interpolation, missingno',
      'Serial correlation & Autocorrelation (+1 persistence, -1 opposing oscillation)',
      'Predictive modeling evaluation: Confusion Matrix (TP, TN, FP, FN), Accuracy, Precision, Recall, F1-Score, ROC-AUC',
      'Regression diagnostics: RMSE, MAE, Mean Squared Error (MSE), Adjusted R²',
      'Predictive model solution lifecycle: Feature engineering, 80/20 train/test split, sentiment analysis'
    ],
    pdfFileName: 'Module_5_Time_Series_Analysis_Predictive_Modeling.pdf',
    pdfTitle: 'Module 5: Time Series Analysis And Predictive Modeling',
    pdfPages: 16,
    pdfUrl: '/pdfs/Module_5_Time_Series_Analysis_Predictive_Modeling.pdf',
    experimentsCount: 1
  }
];

export const INITIAL_EXPERIMENTS: Experiment[] = ALL_EXPERIMENTS;

export const INITIAL_TOOLS: ToolInfo[] = [
  {
    id: 'tool-python',
    name: 'Python 3',
    category: 'Core Language',
    version: '3.10+',
    description: 'The premier open-source language for data science, machine learning, and numerical research with an extensive ecosystem.',
    docsUrl: 'https://docs.python.org/3/',
    iconType: 'python',
    keyFunctions: [
      { name: 'List Comprehensions', desc: 'Concise syntax to generate lists from iterables', syntax: '[f(x) for x in seq if cond]' },
      { name: 'Lambda Expressions', desc: 'Anonymous inline functions for quick callbacks', syntax: 'lambda x, y: x + y' },
      { name: 'json.loads / dumps', desc: 'Serialize and parse JSON data structures', syntax: 'json.loads(string_data)' }
    ],
    sampleCode: `# Test Python Fundamentals
items = [12, 45, 68, 23, 89, 34]
filtered = [x for x in items if x > 40]
print("Items greater than 40:", filtered)
print("Sum total:", sum(filtered))
`
  },
  {
    id: 'tool-numpy',
    name: 'NumPy',
    category: 'Numerical Computing',
    version: '1.26+',
    description: 'Fundamental package for scientific computing in Python, providing N-dimensional arrays, vectorization, and linear algebra routines.',
    docsUrl: 'https://numpy.org/doc/',
    iconType: 'numpy',
    keyFunctions: [
      { name: 'np.array / np.arange', desc: 'Creates multi-dimensional array structures', syntax: 'np.arange(start, stop, step)' },
      { name: 'np.linalg.solve', desc: 'Solves linear matrix equations Ax = b', syntax: 'np.linalg.solve(A, b)' },
      { name: 'np.mean / np.std', desc: 'Computes statistical measures along specified axes', syntax: 'np.mean(arr, axis=0)' }
    ],
    sampleCode: `import numpy as np
A = np.array([[2, 1], [1, 3]])
b = np.array([5, 8])
x = np.linalg.solve(A, b)
print("Solution vector x:", x)
`
  },
  {
    id: 'tool-pandas',
    name: 'Pandas',
    category: 'Data Wrangling',
    version: '2.2+',
    description: 'Fast, powerful, and flexible open source data analysis and manipulation tool built on top of the Python programming language.',
    docsUrl: 'https://pandas.pydata.org/docs/',
    iconType: 'pandas',
    keyFunctions: [
      { name: 'pd.DataFrame', desc: 'Two-dimensional tabular data structure with labeled axes', syntax: 'pd.DataFrame(data_dict)' },
      { name: 'df.fillna / isna', desc: 'Identifies and fills missing value entries', syntax: 'df.fillna(df.mean())' },
      { name: 'df.groupby', desc: 'Split-apply-combine operation across categorical columns', syntax: 'df.groupby("col").agg({"v": "sum"})' }
    ],
    sampleCode: `import pandas as pd
df = pd.DataFrame({"Dept": ["DS", "DS", "AI", "AI"], "Score": [92, 88, 95, 91]})
print(df.groupby("Dept").mean())
`
  },
  {
    id: 'tool-matplotlib',
    name: 'Matplotlib',
    category: 'Data Visualization',
    version: '3.8+',
    description: 'Comprehensive library for creating static, animated, and interactive visualizations in Python with pixel-perfect figure control.',
    docsUrl: 'https://matplotlib.org/stable/contents.html',
    iconType: 'matplotlib',
    keyFunctions: [
      { name: 'plt.subplots', desc: 'Creates a Figure and a set of subplots', syntax: 'fig, ax = plt.subplots(rows, cols)' },
      { name: 'ax.scatter / plot', desc: 'Plots data points or connecting line series', syntax: 'ax.scatter(x, y, color="blue")' },
      { name: 'plt.tight_layout', desc: 'Automatically adjusts subplot parameters for snug fit', syntax: 'plt.tight_layout()' }
    ],
    sampleCode: `import matplotlib.pyplot as plt
import numpy as np
x = np.linspace(0, 10, 50)
y = np.sin(x)
plt.plot(x, y, label="sin(x)")
plt.legend()
plt.show()
`
  },
  {
    id: 'tool-seaborn',
    name: 'Seaborn',
    category: 'Statistical Graphics',
    version: '0.13+',
    description: 'High-level interface based on Matplotlib for drawing attractive and informative statistical graphics with integrated dataframe support.',
    docsUrl: 'https://seaborn.pydata.org/',
    iconType: 'seaborn',
    keyFunctions: [
      { name: 'sns.heatmap', desc: 'Plots rectangular data as a color-encoded matrix', syntax: 'sns.heatmap(corr_matrix, annot=True)' },
      { name: 'sns.boxplot', desc: 'Draws a box plot to show distributions with respect to categories', syntax: 'sns.boxplot(x="grp", y="val", data=df)' },
      { name: 'sns.pairplot', desc: 'Plots pairwise relationships across an entire dataset', syntax: 'sns.pairplot(df, hue="class")' }
    ],
    sampleCode: `import seaborn as sns
import pandas as pd
data = pd.DataFrame({"A": [1, 2, 3], "B": [3, 2, 1]})
print("Correlation:\\n", data.corr())
`
  },
  {
    id: 'tool-sql',
    name: 'SQL & SQLite',
    category: 'Relational Database',
    version: 'SQLite 3',
    description: 'Structured Query Language for managing data held in relational database management systems and querying embedded data stores.',
    docsUrl: 'https://www.sqlite.org/docs.html',
    iconType: 'sql',
    keyFunctions: [
      { name: 'sqlite3.connect', desc: 'Opens a connection to an SQLite database file or memory', syntax: 'conn = sqlite3.connect(":memory:")' },
      { name: 'pd.read_sql_query', desc: 'Reads SQL query results directly into a Pandas DataFrame', syntax: 'pd.read_sql_query(query, conn)' },
      { name: 'INNER / LEFT JOIN', desc: 'Combines rows from two or more tables based on related columns', syntax: 'SELECT * FROM A JOIN B ON A.id = B.a_id' }
    ],
    sampleCode: `import sqlite3
conn = sqlite3.connect(":memory:")
conn.execute("CREATE TABLE test (val INT)")
conn.execute("INSERT INTO test VALUES (100)")
print(conn.execute("SELECT * FROM test").fetchall())
`
  },
  {
    id: 'tool-scikit',
    name: 'Scikit-Learn',
    category: 'Machine Learning',
    version: '1.4+',
    description: 'Simple and efficient tools for predictive data analysis, accessible to everybody, and reusable in various contexts.',
    docsUrl: 'https://scikit-learn.org/stable/',
    iconType: 'scikit',
    keyFunctions: [
      { name: 'LinearRegression', desc: 'Ordinary least squares Linear Regression', syntax: 'model = LinearRegression().fit(X, y)' },
      { name: 'confusion_matrix', desc: 'Computes confusion matrix to evaluate classification accuracy', syntax: 'confusion_matrix(y_true, y_pred)' },
      { name: 'train_test_split', desc: 'Splits arrays or matrices into random train and test subsets', syntax: 'train_test_split(X, y, test_size=0.2)' }
    ],
    sampleCode: `# Model Diagnostics Evaluation
print("Scikit-Learn evaluation metrics configured for lab experiments.")
`
  }
];
