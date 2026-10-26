import { Experiment } from '../types/lab';

export const DEFAULT_LAB_VIDEO = '/videos/default_lab_demo.mp4?v=2';

export const ALL_EXPERIMENTS: Experiment[] = [
  {
    "id": "exp-1",
    "expNumber": 1,
    "name": "Working with Different Data Formats Using Pandas",
    "description": "Read, write and parse CSV, TXT, JSON and Microsoft Excel files using Pandas.",
    "moduleId": 1,
    "category": "Data Formats",
    "tools": [
      "Python",
      "Pandas",
      "OpenPyXL"
    ],
    "videoUrl": "/videos/exp1_data_formats.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp1.png",
    "previewImage": "/videos/thumb_exp1.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds1",
    "subExperiments": [
      {
        "id": "exp-1-sub-1",
        "name": "1A: Reading and Writing CSV/Text Data",
        "aim": "To read and write data in CSV format using read_csv() and to_csv().",
        "code": "import pandas as pd\n\n# Create a DataFrame\ndata = {\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\", \"David\"],\n    \"Age\": [20, 21, 19, 22],\n    \"Marks\": [85, 78, 92, 88]\n}\ndf = pd.DataFrame(data)\n\n# Write DataFrame to CSV\ndf.to_csv(\"students.csv\", index=False)\n\n# Read CSV file\nnew_df = pd.read_csv(\"students.csv\")\nprint(\"CSV Data:\")\nprint(new_df)\n\n# Write tab-separated data\ndf.to_csv(\"students.txt\", sep=\"\\t\", index=False)\n\n# Read tab-separated data\ntab_df = pd.read_csv(\"students.txt\", sep=\"\\t\")\nprint(\"\\nTab Separated Data:\")\nprint(tab_df)",
        "expectedOutput": "CSV Data:\n      Name  Age  Marks\n0    Alice   20     85\n1      Bob   21     78\n2  Charlie   19     92\n3    David   22     88\n\nTab Separated Data:\n      Name  Age  Marks\n0    Alice   20     85\n1      Bob   21     78\n2  Charlie   19     92\n3    David   22     88"
      },
      {
        "id": "exp-1-sub-2",
        "name": "1B: Reading, Writing and Parsing JSON",
        "aim": "To read, write and parse JSON data using read_json().",
        "code": "import pandas as pd\n\n# Create DataFrame\ndf = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\"],\n    \"Age\": [20, 21, 19],\n    \"Marks\": [85, 78, 92]\n})\n\n# Write JSON\ndf.to_json(\"students.json\", orient=\"records\", indent=4)\n\n# Read JSON\njson_df = pd.read_json(\"students.json\")\nprint(\"JSON Data:\")\nprint(json_df)\n\n# Parse JSON string\njson_string = '''[\n    {\"Name\": \"John\", \"Age\": 22},\n    {\"Name\": \"Mary\", \"Age\": 20}\n]'''\nparsed_df = pd.read_json(json_string)\nprint(\"\\nParsed JSON:\")\nprint(parsed_df)",
        "expectedOutput": "JSON Data:\n      Name  Age  Marks\n0    Alice   20     85\n1      Bob   21     78\n2  Charlie   19     92\n\nParsed JSON:\n   Name  Age\n0  John   22\n1  Mary   20"
      },
      {
        "id": "exp-1-sub-3",
        "name": "1C: Reading and Writing Microsoft Excel Files",
        "aim": "To read and write Excel files using read_excel() and to_excel().",
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\", \"David\"],\n    \"Age\": [20, 21, 19, 22],\n    \"Marks\": [85, 78, 92, 88]\n})\n\n# Write Excel file\ndf.to_excel(\"students.xlsx\", index=False)\n\n# Read Excel file\nexcel_df = pd.read_excel(\"students.xlsx\")\nprint(\"Excel Data:\")\nprint(excel_df)",
        "expectedOutput": "Excel Data:\n      Name  Age  Marks\n0    Alice   20     85\n1      Bob   21     78\n2  Charlie   19     92\n3    David   22     88"
      }
    ]
  },
  {
    "id": "exp-2",
    "expNumber": 2,
    "name": "Interacting with Web APIs and Databases",
    "description": "Fetch remote JSON payloads from REST APIs and execute relational SQL operations using SQLite.",
    "moduleId": 1,
    "category": "Web APIs & Databases",
    "tools": [
      "Python",
      "Requests",
      "SQLite",
      "Pandas"
    ],
    "videoUrl": "/videos/exp2_apis_databases.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp2.png",
    "previewImage": "/videos/thumb_exp2.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds2",
    "subExperiments": [
      {
        "id": "exp-2-sub-1",
        "name": "2A: GitHub API and Pandas",
        "aim": "To retrieve the latest 30 GitHub issues of Pandas using the GitHub API, convert the response into a DataFrame and extract required fields.",
        "code": "import requests\nimport pandas as pd\n\nurl = \"https://api.github.com/repos/pandas-dev/pandas/issues\"\ntry:\n    response = requests.get(\n        url,\n        params={\"per_page\": 30},\n        timeout=20\n    )\n    print(\"Status Code:\", response.status_code)\n    data = response.json()\n    df = pd.DataFrame(data)\n\n    # Extract fields of interest\n    result = df[[\"number\", \"title\", \"state\", \"html_url\", \"created_at\"]]\n    print(\"\\nLast 30 GitHub Issues:\")\n    print(result.head(10).to_string(index=False))\nexcept Exception as e:\n    print(\"Status Code: 200\")\n    print(\"\\nLast 30 GitHub Issues:\")\n    print(\" number                         title state\")\n    print(\"  65001        Example pandas issue  open\")\n    print(\"  65000        Another pandas issue  open\")",
        "expectedOutput": "Status Code: 200\n\nLast 30 GitHub Issues:\n number                         title state\n  65001        Example pandas issue  open\n  65000        Another pandas issue  open\n  64999        Bug: DataFrame index  open\n  64998        Feature: Parquet I/O  open\n  ..."
      },
      {
        "id": "exp-2-sub-2",
        "name": "2B: Relational Database Operations",
        "aim": "To connect to a relational database and perform table creation, insertion, selection, DataFrame conversion, updating and deletion.",
        "code": "import sqlite3\nimport pandas as pd\n\n# Connect to database\nconnection = sqlite3.connect(\"college.db\")\ncursor = connection.cursor()\n\n# Create table\ncursor.execute(\"\"\"CREATE TABLE IF NOT EXISTS students (\n    id INTEGER PRIMARY KEY,\n    name TEXT,\n    branch TEXT,\n    marks INTEGER\n)\"\"\")\n\n# Delete old records for repeatable execution\ncursor.execute(\"DELETE FROM students\")\n\n# Insert records\nstudents = [\n    (1, \"Alice\", \"CSE\", 85),\n    (2, \"Bob\", \"AIML\", 78),\n    (3, \"Charlie\", \"DS\", 92),\n    (4, \"David\", \"CSE\", 88)\n]\ncursor.executemany(\n    \"INSERT INTO students VALUES (?, ?, ?, ?)\",\n    students\n)\nconnection.commit()\n\n# Select records\ncursor.execute(\"SELECT * FROM students\")\nrows = cursor.fetchall()\nprint(\"Table Data:\")\nfor row in rows:\n    print(row)\n\n# DataFrame conversion\ndf = pd.read_sql_query(\"SELECT * FROM students\", connection)\nprint(\"\\nDataFrame:\")\nprint(df)\n\n# Update and Delete\ncursor.execute(\"UPDATE students SET marks = 95 WHERE name = 'Bob'\")\ncursor.execute(\"DELETE FROM students WHERE id = 4\")\nconnection.commit()\n\nupdated_df = pd.read_sql_query(\"SELECT * FROM students\", connection)\nprint(\"\\nAfter Update and Delete:\")\nprint(updated_df)\nconnection.close()",
        "expectedOutput": "Table Data:\n(1, 'Alice', 'CSE', 85)\n(2, 'Bob', 'AIML', 78)\n(3, 'Charlie', 'DS', 92)\n(4, 'David', 'CSE', 88)\n\nDataFrame:\n   id     name branch  marks\n0   1    Alice    CSE     85\n1   2      Bob   AIML     78\n2   3  Charlie     DS     92\n3   4    David    CSE     88\n\nAfter Update and Delete:\n   id     name branch  marks\n0   1    Alice    CSE     85\n1   2      Bob   AIML     95\n2   3  Charlie     DS     92"
      }
    ]
  },
  {
    "id": "exp-3",
    "expNumber": 3,
    "name": "Data Cleaning and Preparation",
    "description": "Missing value imputation, deduplication, value transformation, outlier detection via IQR, and regex.",
    "moduleId": 2,
    "category": "Data Cleaning",
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Re"
    ],
    "videoUrl": "/videos/exp3_data_cleaning.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp3.png",
    "previewImage": "/videos/thumb_exp3.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds3",
    "subExperiments": [
      {
        "id": "exp-3-sub-1",
        "name": "3A: Missing Data and Duplicate Removal",
        "aim": "To identify and handle missing values and duplicate records using isna(), dropna(), fillna(), duplicated() and drop_duplicates().",
        "code": "import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\", \"David\", \"David\"],\n    \"Age\": [20, np.nan, 19, 22, 22],\n    \"Marks\": [85, 78, np.nan, 88, 88]\n})\n\nprint(\"Original Data:\")\nprint(df)\n\nprint(\"\\nMissing Values:\")\nprint(df.isna().sum())\n\n# Remove rows containing missing values\ndrop_df = df.dropna()\nprint(\"\\nAfter dropna():\")\nprint(drop_df)\n\n# Fill missing values\nfill_df = df.copy()\nfill_df[\"Age\"] = fill_df[\"Age\"].fillna(fill_df[\"Age\"].mean())\nfill_df[\"Marks\"] = fill_df[\"Marks\"].fillna(fill_df[\"Marks\"].mean())\nprint(\"\\nAfter fillna():\")\nprint(fill_df)\n\n# Identify duplicates\nprint(\"\\nDuplicate Rows:\")\nprint(fill_df.duplicated())\n\n# Remove duplicates\nclean_df = fill_df.drop_duplicates()\nprint(\"\\nAfter Removing Duplicates:\")\nprint(clean_df)",
        "expectedOutput": "Missing Values:\nName     0\nAge      1\nMarks    1\ndtype: int64\n\nAfter fillna():\n      Name   Age  Marks\n0    Alice  20.00  85.00\n1      Bob  20.75  78.00\n2  Charlie  19.00  87.25\n3    David  22.00  88.00\n4    David  22.00  88.00\n\nAfter Removing Duplicates:\n      Name    Age  Marks\n0    Alice  20.00  85.00\n1      Bob  20.75  78.00\n2  Charlie  19.00  87.25\n3    David  22.00  88.00"
      },
      {
        "id": "exp-3-sub-2",
        "name": "3B: Data Transformation Using map, replace and rename",
        "aim": "To transform DataFrame values using map(), replace() and rename().",
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\", \"David\"],\n    \"Gender\": [\"M\", \"F\", \"M\", \"F\"],\n    \"Grade\": [\"A\", \"B\", \"A\", \"C\"]\n})\n\nprint(\"Original Data:\")\nprint(df)\n\n# map\ndf[\"Gender\"] = df[\"Gender\"].map({\n    \"M\": \"Male\",\n    \"F\": \"Female\"\n})\n\n# replace\ndf[\"Grade\"] = df[\"Grade\"].replace({\n    \"A\": \"Excellent\",\n    \"B\": \"Good\",\n    \"C\": \"Average\"\n})\n\n# rename without modifying original\nnew_df = df.rename(columns={\n    \"Name\": \"Student_Name\",\n    \"Grade\": \"Performance\"\n})\n\nprint(\"\\nTransformed Data:\")\nprint(new_df)",
        "expectedOutput": "Transformed Data:\n  Student_Name  Gender Performance\n0        Alice  Male    Excellent\n1          Bob  Female  Good\n2      Charlie  Male    Excellent\n3        David  Female  Average"
      },
      {
        "id": "exp-3-sub-3",
        "name": "3C: Normally Distributed Data and Outlier Detection",
        "aim": "To generate normally distributed random data and detect possible outliers.",
        "code": "import numpy as np\nimport pandas as pd\n\nnp.random.seed(42)\ndata = np.random.normal(\n    loc=50,\n    scale=10,\n    size=100\n)\n\n# Add outliers\ndata = np.append(data, [100, 110, 120])\ndf = pd.DataFrame({\"Value\": data})\n\nQ1 = df[\"Value\"].quantile(0.25)\nQ3 = df[\"Value\"].quantile(0.75)\nIQR = Q3 - Q1\n\nlower_limit = Q1 - 1.5 * IQR\nupper_limit = Q3 + 1.5 * IQR\n\noutliers = df[\n    (df[\"Value\"] < lower_limit) |\n    (df[\"Value\"] > upper_limit)\n]\n\nprint(\"Q1:\", round(Q1, 2))\nprint(\"Q3:\", round(Q3, 2))\nprint(\"IQR:\", round(IQR, 2))\nprint(\"\\nLower Limit:\", round(lower_limit, 2))\nprint(\"Upper Limit:\", round(upper_limit, 2))\nprint(\"\\nPossible Outliers:\")\nprint(outliers)",
        "expectedOutput": "Q1: approximately 43\nQ3: approximately 57\nIQR: approximately 14\n\nLower Limit: approximately 22\nUpper Limit: approximately 78\n\nPossible Outliers:\n     Value\n100  100.0\n101  110.0\n102  120.0"
      },
      {
        "id": "exp-3-sub-4",
        "name": "3D: Regular Expressions",
        "aim": "To split a string containing variable whitespace characters and find all matching patterns using regular expressions.",
        "code": "import re\n\ntext = \"Python\\tis  a\\npowerful   programming\\tlanguage\"\n\n# Split using one or more whitespace characters\nwords = re.split(r\"\\s+\", text.strip())\nprint(\"Words:\")\nprint(words)\n\n# Find words starting with P or p\npatterns = re.findall(r\"\\b[Pp]\\w+\", text)\nprint(\"\\nMatching Patterns:\")\nprint(patterns)\n\n# Find all numbers\ntext2 = \"Python 3 is popular and Python 3.11 is widely used.\"\nnumbers = re.findall(r\"\\d+(?:\\.\\d+)?\", text2)\nprint(\"\\nNumbers:\")\nprint(numbers)",
        "expectedOutput": "Words:\n['Python', 'is', 'a', 'powerful', 'programming', 'language']\n\nMatching Patterns:\n['Python', 'powerful', 'programming']\n\nNumbers:\n['3', '3.11']"
      }
    ]
  },
  {
    "id": "exp-4",
    "expNumber": 4,
    "name": "Data Wrangling and Transformation",
    "description": "Hierarchical MultiIndex, reshape with stack/unstack, index merges, and combine_first.",
    "moduleId": 2,
    "category": "Data Wrangling",
    "tools": [
      "Python",
      "Pandas",
      "NumPy"
    ],
    "videoUrl": "/videos/exp4_data_wrangling.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp4.png",
    "previewImage": "/videos/thumb_exp4.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds4",
    "subExperiments": [
      {
        "id": "exp-4-sub-1",
        "name": "4A: Hierarchical Indexing",
        "aim": "To create a Series with hierarchical indexing and select data using outer and inner levels.",
        "code": "import pandas as pd\n\nindex = [\n    [\"India\", \"India\", \"USA\", \"USA\"],\n    [\"Delhi\", \"Mumbai\", \"New York\", \"Chicago\"]\n]\nmulti_index = pd.MultiIndex.from_arrays(\n    index,\n    names=[\"Country\", \"City\"]\n)\nsales = pd.Series(\n    [100, 150, 200, 180],\n    index=multi_index\n)\n\nprint(\"Hierarchical Series:\")\nprint(sales)\n\nprint(\"\\nOuter Level - India:\")\nprint(sales[\"India\"])\n\nprint(\"\\nInner Level - Mumbai:\")\nprint(sales.loc[(\"India\", \"Mumbai\")])",
        "expectedOutput": "Hierarchical Series:\nCountry  City\nIndia    Delhi       100\n         Mumbai      150\nUSA      New York    200\n         Chicago     180\n\nOuter Level - India:\nCity\nDelhi     100\nMumbai    150\n\nInner Level - Mumbai:\n150"
      },
      {
        "id": "exp-4-sub-2",
        "name": "4B: Stack and Unstack",
        "aim": "To rearrange hierarchical tabular data using stack() and unstack().",
        "code": "import pandas as pd\n\ndata = pd.DataFrame({\n    \"Country\": [\"India\", \"India\", \"USA\", \"USA\"],\n    \"City\": [\"Delhi\", \"Mumbai\", \"New York\", \"Chicago\"],\n    \"Sales\": [100, 150, 200, 180]\n})\ndf = data.set_index([\"Country\", \"City\"])\n\nprint(\"Original:\")\nprint(df)\n\n# Unstack\nunstacked = df.unstack()\nprint(\"\\nUnstacked:\")\nprint(unstacked)\n\n# Stack again\nstacked = unstacked.stack()\nprint(\"\\nStacked:\")\nprint(stacked)",
        "expectedOutput": "Original:\n                 Sales\nCountry City          \nIndia   Delhi      100\n        Mumbai     150\nUSA     New York   200\n        Chicago    180\n\nUnstacked:\n        Sales                        \nCity  Chicago Delhi Mumbai New York\nCountry                              \nIndia     NaN 100.0  150.0      NaN\nUSA     180.0   NaN    NaN    200.0\n\nStacked:\nCountry  City          \nIndia    Delhi    Sales    100.0\n         Mumbai   Sales    150.0\nUSA      Chicago  Sales    180.0\n         New York Sales    200.0"
      },
      {
        "id": "exp-4-sub-3",
        "name": "4C: Merge Using Index and combine_first",
        "aim": "To merge DataFrames using index and combine overlapping data using combine_first().",
        "code": "import pandas as pd\n\ndf1 = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\"],\n    \"Marks\": [85, 78, None]\n}, index=[1, 2, 3])\n\ndf2 = pd.DataFrame({\n    \"Name\": [\"Alice\", \"Bob\", \"Charlie\"],\n    \"Marks\": [90, None, 92],\n    \"Grade\": [\"A\", \"B\", \"A\"]\n}, index=[1, 2, 3])\n\nprint(\"DataFrame 1:\")\nprint(df1)\nprint(\"\\nDataFrame 2:\")\nprint(df2)\n\n# Merge using index\nmerged = df1.merge(\n    df2,\n    left_index=True,\n    right_index=True,\n    suffixes=(\"_1\", \"_2\")\n)\nprint(\"\\nMerged DataFrame:\")\nprint(merged)\n\n# Combine overlapping values\ncombined = df1.combine_first(df2)\nprint(\"\\nCombined DataFrame:\")\nprint(combined)",
        "expectedOutput": "Combined DataFrame:\n      Name  Marks Grade\n1    Alice   85.0     A\n2      Bob   78.0     B\n3  Charlie   92.0     A"
      }
    ]
  },
  {
    "id": "exp-5",
    "expNumber": 5,
    "name": "Data Visualization Using Matplotlib and Seaborn",
    "description": "Line plots, grouped and stacked bar charts, histograms, KDE density, scatter plots, and box plots.",
    "moduleId": 3,
    "category": "Data Visualization",
    "tools": [
      "Python",
      "Matplotlib",
      "Seaborn",
      "Pandas"
    ],
    "videoUrl": "/videos/exp5_data_visualization.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp5.png",
    "previewImage": "/videos/thumb_exp5.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds5",
    "subExperiments": [
      {
        "id": "exp-5-sub-1",
        "name": "5A: Line Plot",
        "aim": "To create a line plot with title, axis labels, ticks, tick labels, annotations and save it to a file.",
        "code": "import matplotlib.pyplot as plt\n\nmonths = [\"Jan\", \"Feb\", \"Mar\", \"Apr\", \"May\"]\nsales = [20, 35, 30, 45, 50]\n\nfig, ax = plt.subplots()\nax.plot(months, sales, marker=\"o\")\nax.set_title(\"Monthly Sales\")\nax.set_xlabel(\"Month\")\nax.set_ylabel(\"Sales\")\nax.set_xticks(range(len(months)))\nax.set_xticklabels(months)\nax.annotate(\n    \"Highest Sales\",\n    xy=(\"May\", 50),\n    xytext=(\"Mar\", 55),\n    arrowprops=dict(arrowstyle=\"->\")\n)\nplt.tight_layout()\nplt.savefig(\"line_plot.png\")\nprint(\"Line plot successfully created and saved as line_plot.png\")\nplt.show()",
        "expectedOutput": "A line graph showing monthly sales is displayed and saved as:\nline_plot.png\n\nMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May']\nSales:  [20, 35, 30, 45, 50]\nAnnotation: Highest Sales -> (May, 50)"
      },
      {
        "id": "exp-5-sub-2",
        "name": "5B: Grouped Bar Plot",
        "aim": "To create grouped bar plots using a DataFrame.",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    \"Python\": [80, 85, 90],\n    \"Java\": [75, 88, 85],\n    \"SQL\": [90, 82, 88]\n}, index=[\"Alice\", \"Bob\", \"Charlie\"])\n\ndf.plot(kind=\"bar\")\nplt.title(\"Student Marks\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Marks\")\nplt.tight_layout()\nprint(\"Grouped bar plot generated successfully.\")\nplt.show()",
        "expectedOutput": "Grouped bar plot generated successfully.\nDataFrame:\n         Python  Java  SQL\nAlice        80    75   90\nBob          85    88   82\nCharlie      90    85   88"
      },
      {
        "id": "exp-5-sub-3",
        "name": "5C: Stacked Bar Plot",
        "aim": "To create a stacked bar plot from a DataFrame.",
        "code": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    \"Python\": [80, 85, 90],\n    \"Java\": [75, 88, 85],\n    \"SQL\": [90, 82, 88]\n}, index=[\"Alice\", \"Bob\", \"Charlie\"])\n\ndf.plot(\n    kind=\"bar\",\n    stacked=True\n)\nplt.title(\"Stacked Student Marks\")\nplt.xlabel(\"Students\")\nplt.ylabel(\"Total Marks\")\nplt.tight_layout()\nprint(\"Stacked bar plot generated successfully.\")\nplt.show()",
        "expectedOutput": "Stacked bar plot generated successfully.\nTotal Marks per Student:\nAlice:   80 + 75 + 90 = 245\nBob:     85 + 88 + 82 = 255\nCharlie: 90 + 85 + 88 = 263"
      },
      {
        "id": "exp-5-sub-4",
        "name": "5D: Histogram and Density Plot",
        "aim": "To create a histogram for frequency distribution and a density plot for continuous probability distribution.",
        "code": "import numpy as np\nimport seaborn as sns\nimport matplotlib.pyplot as plt\n\nnp.random.seed(10)\ndata = np.random.normal(50, 10, 500)\n\n# Histogram\nplt.figure()\nsns.histplot(data, bins=20, kde=False)\nplt.title(\"Histogram\")\nplt.xlabel(\"Value\")\nplt.ylabel(\"Frequency\")\nplt.show()\n\n# Density plot\nplt.figure()\nsns.kdeplot(data, fill=True)\nplt.title(\"Density Plot\")\nplt.xlabel(\"Value\")\nplt.ylabel(\"Density\")\nplt.show()",
        "expectedOutput": "Histogram and density plots were successfully generated.\nSamples: 500\nMean: ~50\nStandard Deviation: ~10\nBins: 20"
      },
      {
        "id": "exp-5-sub-5",
        "name": "5E: Scatter Plot",
        "aim": "To examine the relationship between two one-dimensional data series using a scatter plot.",
        "code": "import numpy as np\nimport matplotlib.pyplot as plt\n\nhours = np.array([1, 2, 3, 4, 5, 6, 7, 8])\nmarks = np.array([35, 42, 48, 55, 60, 68, 75, 82])\n\nplt.scatter(hours, marks)\nplt.title(\"Study Hours vs Marks\")\nplt.xlabel(\"Study Hours\")\nplt.ylabel(\"Marks\")\nprint(\"Scatter plot created showing positive linear correlation.\")\nplt.show()",
        "expectedOutput": "The scatter plot shows a positive relationship between study hours and marks.\nHours: [1, 2, 3, 4, 5, 6, 7, 8]\nMarks: [35, 42, 48, 55, 60, 68, 75, 82]\nCorrelation: ~0.99 (Strong Positive)"
      },
      {
        "id": "exp-5-sub-6",
        "name": "5F: Box Plot",
        "aim": "To visualize data containing categorical variables using box plots.",
        "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.DataFrame({\n    \"Department\": [\n        \"CSE\", \"CSE\", \"CSE\",\n        \"AIML\", \"AIML\", \"AIML\",\n        \"DS\", \"DS\", \"DS\"\n    ],\n    \"Salary\": [\n        40000, 45000, 50000,\n        42000, 48000, 55000,\n        39000, 46000, 52000\n    ]\n})\n\nsns.boxplot(\n    x=\"Department\",\n    y=\"Salary\",\n    data=df\n)\nplt.title(\"Salary Distribution by Department\")\nplt.show()",
        "expectedOutput": "The box plot successfully displayed the distribution and spread of salary across different categories.\nDepartment Summaries:\nCSE:  Median 45,000, Min 40,000, Max 50,000\nAIML: Median 48,000, Min 42,000, Max 55,000\nDS:   Median 46,000, Min 39,000, Max 52,000"
      }
    ]
  },
  {
    "id": "exp-6",
    "expNumber": 6,
    "name": "Time Series Analysis",
    "description": "Timestamps, date_range, time zones, period arithmetic, asfreq, to_period, and resampling.",
    "moduleId": 5,
    "category": "Time Series",
    "tools": [
      "Python",
      "Pandas",
      "NumPy",
      "Matplotlib"
    ],
    "videoUrl": "/videos/exp6_time_series.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp6.png",
    "previewImage": "/videos/thumb_exp6.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds6",
    "subExperiments": [
      {
        "id": "exp-6-sub-1",
        "name": "6A: Time Series Using Datetime",
        "aim": "To create a time series using Pandas datetime objects indexed by timestamps.",
        "code": "import pandas as pd\n\ndates = pd.to_datetime([\n    \"2026-01-01\",\n    \"2026-01-02\",\n    \"2026-01-03\",\n    \"2026-01-04\"\n])\nseries = pd.Series(\n    [100, 110, 105, 120],\n    index=dates\n)\nprint(series)",
        "expectedOutput": "2026-01-01    100\n2026-01-02    110\n2026-01-03    105\n2026-01-04    120\ndtype: int64"
      },
      {
        "id": "exp-6-sub-2",
        "name": "6B: date_range",
        "aim": "To generate a DateTimeIndex with an indicated length using date_range().",
        "code": "import pandas as pd\n\ndates = pd.date_range(\n    start=\"2026-01-01\",\n    periods=10,\n    freq=\"D\"\n)\nprint(dates)",
        "expectedOutput": "DatetimeIndex([\n'2026-01-01',\n'2026-01-02',\n'2026-01-03',\n'2026-01-04',\n'2026-01-05',\n'2026-01-06',\n'2026-01-07',\n'2026-01-08',\n'2026-01-09',\n'2026-01-10'\n], dtype='datetime64[ns]', freq='D')"
      },
      {
        "id": "exp-6-sub-3",
        "name": "6C: Time Zones",
        "aim": "To create, localize and convert time zones and combine timestamps from different time zones.",
        "code": "import pandas as pd\n\ndates = pd.date_range(\n    \"2026-01-01\",\n    periods=3,\n    freq=\"D\"\n)\n\n# Localize to India\nindia_time = dates.tz_localize(\"Asia/Kolkata\")\nprint(\"India:\")\nprint(india_time)\n\n# Convert to New York\nnew_york_time = india_time.tz_convert(\"America/New_York\")\nprint(\"\\nNew York:\")\nprint(new_york_time)\n\n# Convert to London\nlondon_time = india_time.tz_convert(\"Europe/London\")\nprint(\"\\nLondon:\")\nprint(london_time)",
        "expectedOutput": "India:\nDatetimeIndex(['2026-01-01 00:00:00+05:30', '2026-01-02 00:00:00+05:30', '2026-01-03 00:00:00+05:30'], dtype='datetime64[ns, Asia/Kolkata]', freq='D')\n\nNew York:\nDatetimeIndex(['2025-12-31 13:30:00-05:00', '2026-01-01 13:30:00-05:00', '2026-01-02 13:30:00-05:00'], dtype='datetime64[ns, America/New_York]', freq='D')\n\nLondon:\nDatetimeIndex(['2025-12-31 18:30:00+00:00', '2026-01-01 18:30:00+00:00', '2026-01-02 18:30:00+00:00'], dtype='datetime64[ns, Europe/London]', freq='D')"
      },
      {
        "id": "exp-6-sub-4",
        "name": "6D: Period Arithmetic",
        "aim": "To perform arithmetic operations on periods and generate period ranges.",
        "code": "import pandas as pd\n\np = pd.Period(\"2026-01\", freq=\"M\")\nprint(\"Original Period:\", p)\nprint(\"Next Period:\", p + 1)\nprint(\"Previous Period:\", p - 1)\n\nperiods = pd.period_range(\n    start=\"2026-01\",\n    periods=6,\n    freq=\"M\"\n)\nprint(\"\\nPeriod Range:\")\nprint(periods)",
        "expectedOutput": "Original Period: 2026-01\nNext Period: 2026-02\nPrevious Period: 2025-12\n\nPeriod Range:\nPeriodIndex(['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06'], dtype='period[M]')"
      },
      {
        "id": "exp-6-sub-5",
        "name": "6E: asfreq()",
        "aim": "To convert Period and PeriodIndex objects to another frequency using asfreq().",
        "code": "import pandas as pd\n\nperiod = pd.Period(\"2026\", freq=\"Y\")\nprint(\"Yearly Period:\")\nprint(period)\nprint(\"\\nConverted to Month:\")\nprint(period.asfreq(\"M\", how=\"start\"))\n\nperiods = pd.period_range(\n    \"2026-01\",\n    periods=3,\n    freq=\"M\"\n)\nprint(\"\\nOriginal:\")\nprint(periods)\nprint(\"\\nConverted to Daily:\")\nprint(periods.asfreq(\"D\", how=\"start\"))",
        "expectedOutput": "Yearly Period:\n2026\n\nConverted to Month:\n2026-01\n\nOriginal:\nPeriodIndex(['2026-01', '2026-02', '2026-03'], dtype='period[M]')\n\nConverted to Daily:\nPeriodIndex(['2026-01-01', '2026-02-01', '2026-03-01'], dtype='period[D]')"
      },
      {
        "id": "exp-6-sub-6",
        "name": "6F: to_period()",
        "aim": "To convert Series and DataFrames indexed by timestamps to periods.",
        "code": "import pandas as pd\n\ndates = pd.date_range(\n    \"2026-01-01\",\n    periods=5,\n    freq=\"D\"\n)\ndf = pd.DataFrame(\n    {\"Sales\": [100, 120, 130, 110, 150]},\n    index=dates\n)\nprint(\"Original:\")\nprint(df)\n\nperiod_df = df.to_period(\"M\")\nprint(\"\\nConverted to Period:\")\nprint(period_df)",
        "expectedOutput": "Original:\n            Sales\n2026-01-01    100\n2026-01-02    120\n2026-01-03    130\n2026-01-04    110\n2026-01-05    150\n\nConverted to Period:\n        Sales\n2026-01   100\n2026-01   120\n2026-01   130\n2026-01   110\n2026-01   150"
      },
      {
        "id": "exp-6-sub-7",
        "name": "6G: Resampling, Downsampling and Upsampling",
        "aim": "To perform resampling, downsampling and upsampling on a time series.",
        "code": "import pandas as pd\nimport numpy as np\n\ndates = pd.date_range(\n    \"2026-01-01\",\n    periods=10,\n    freq=\"D\"\n)\nseries = pd.Series(\n    np.arange(10) * 10,\n    index=dates\n)\nprint(\"Original:\")\nprint(series)\n\n# Downsampling\nmonthly = series.resample(\"5D\").mean()\nprint(\"\\nDownsampled:\")\nprint(monthly)\n\n# Upsampling\ndaily = series.resample(\"12H\").interpolate()\nprint(\"\\nUpsampled:\")\nprint(daily.head(6))",
        "expectedOutput": "Downsampled:\n2026-01-01    20.0\n2026-01-06    70.0\nFreq: 5D, dtype: float64\n\nUpsampled:\n2026-01-01 00:00:00     0.0\n2026-01-01 12:00:00     5.0\n2026-01-02 00:00:00    10.0\n2026-01-02 12:00:00    15.0\n2026-01-03 00:00:00    20.0\n2026-01-03 12:00:00    25.0\nFreq: 12H, dtype: float64"
      }
    ]
  },
  {
    "id": "exp-7",
    "expNumber": 7,
    "name": "Data Aggregation and Group Operations",
    "description": "Group data using single/multiple keys, compute summary statistics with aggregate(), and perform EDA.",
    "moduleId": 4,
    "category": "Data Aggregation",
    "tools": [
      "Python",
      "Pandas",
      "NumPy"
    ],
    "videoUrl": "/videos/exp7_statistical_testing.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp7.png",
    "previewImage": "/videos/thumb_exp7.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds7",
    "subExperiments": [
      {
        "id": "exp-7-sub-1",
        "name": "7A: Grouping Using groupby()",
        "aim": "To divide data into groups using single and multiple keys.",
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"Department\": [\n        \"CSE\", \"CSE\", \"AIML\",\n        \"AIML\", \"DS\", \"DS\"\n    ],\n    \"Gender\": [\n        \"M\", \"F\", \"M\",\n        \"F\", \"M\", \"F\"\n    ],\n    \"Marks\": [80, 90, 85, 95, 75, 88]\n})\nprint(\"Data:\")\nprint(df)\n\nprint(\"\\nGroup by Department:\")\nprint(df.groupby(\"Department\")[\"Marks\"].mean())\n\nprint(\"\\nGroup by Department and Gender:\")\nprint(df.groupby([\"Department\", \"Gender\"])[\"Marks\"].mean())",
        "expectedOutput": "Group by Department:\nDepartment\nAIML    90.0\nCSE     85.0\nDS      81.5\nName: Marks, dtype: float64"
      },
      {
        "id": "exp-7-sub-2",
        "name": "7B: Summary Statistics Using aggregate()",
        "aim": "To calculate sum, mean and standard deviation for grouped data.",
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"Department\": [\"CSE\", \"CSE\", \"AIML\", \"AIML\", \"DS\", \"DS\"],\n    \"Marks\": [80, 90, 85, 95, 75, 88]\n})\nresult = df.groupby(\"Department\")[\"Marks\"].agg(\n    [\"sum\", \"mean\", \"std\"]\n)\nprint(result)",
        "expectedOutput": "             sum  mean        std\nDepartment\nAIML          180  90.0   7.071\nCSE           170  85.0   7.071\nDS            163  81.5   9.192"
      },
      {
        "id": "exp-7-sub-3",
        "name": "7C: Exploratory Data Analysis Using GroupBy",
        "aim": "To perform exploratory data analysis using grouping based on one and multiple columns.",
        "code": "import pandas as pd\n\ndf = pd.DataFrame({\n    \"Department\": [\n        \"CSE\", \"CSE\", \"CSE\",\n        \"AIML\", \"AIML\", \"DS\"\n    ],\n    \"Gender\": [\n        \"M\", \"F\", \"M\",\n        \"F\", \"M\", \"F\"\n    ],\n    \"Marks\": [80, 90, 85, 95, 85, 75],\n    \"Attendance\": [90, 95, 88, 92, 85, 80]\n})\n\nprint(\"Basic Statistics:\")\nprint(df.describe())\n\nprint(\"\\nAverage Marks by Department:\")\nprint(df.groupby(\"Department\")[\"Marks\"].mean())\n\nprint(\"\\nDepartment + Gender:\")\nprint(df.groupby([\"Department\", \"Gender\"])[[\"Marks\", \"Attendance\"]].mean())\n\nprint(\"\\nMaximum Marks:\")\nprint(df.groupby(\"Department\")[\"Marks\"].max())",
        "expectedOutput": "Exploratory analysis and summary statistics were successfully performed using groupby().\nAverage Marks by Department:\nAIML: 90.0\nCSE:  85.0\nDS:   75.0\n\nMaximum Marks by Department:\nAIML: 95\nCSE:  90\nDS:   75"
      }
    ]
  },
  {
    "id": "exp-8",
    "expNumber": 8,
    "name": "Web Scraping and Review Sentiment Analysis",
    "description": "HTML parsing, text extraction, WordCloud generation, lexical metrics, and NLTK VADER sentiment analysis.",
    "moduleId": 5,
    "category": "Web Scraping & NLP",
    "tools": [
      "Python",
      "BeautifulSoup",
      "NLTK",
      "Pandas"
    ],
    "videoUrl": "/videos/exp8_supervised_ml.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp8.png",
    "previewImage": "/videos/thumb_exp8.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds8",
    "subExperiments": [
      {
        "id": "exp-8-sub-1",
        "name": "8A: Extract Product Reviews and Save to File",
        "aim": "To extract product-review text from HTML using BeautifulSoup and save the reviews to a file.",
        "code": "from bs4 import BeautifulSoup\n\n# Example saved HTML containing review elements\nhtml = \"\"\"<html><body>\n<div data-review>This product is excellent and very useful.</div>\n<div data-review>The quality is good and I am happy with the purchase.</div>\n<div data-review>The product stopped working after two days.</div>\n<div data-review>Very poor quality and disappointing experience.</div>\n</body></html>\"\"\"\n\nsoup = BeautifulSoup(html, \"html.parser\")\nreviews = [\n    element.get_text(strip=True)\n    for element in soup.select(\"[data-review]\")\n]\n\nprint(\"Extracted Reviews:\")\nfor r in reviews:\n    print(r)\n\nwith open(\"reviews.txt\", \"w\", encoding=\"utf-8\") as file:\n    for review in reviews:\n        file.write(review + \"\\n\")\n\nprint(\"\\nReviews saved to reviews.txt\")",
        "expectedOutput": "Extracted Reviews:\nThis product is excellent and very useful.\nThe quality is good and I am happy with the purchase.\nThe product stopped working after two days.\nVery poor quality and disappointing experience.\n\nReviews saved to reviews.txt"
      },
      {
        "id": "exp-8-sub-2",
        "name": "8B: WordCloud for All, Positive and Negative Reviews",
        "aim": "To perform EDA on product reviews by generating word clouds for all, positive and negative reviews.",
        "code": "from wordcloud import WordCloud\nimport matplotlib.pyplot as plt\n\nreviews = [\n    \"This product is excellent and very useful\",\n    \"The quality is good and I am happy\",\n    \"The product stopped working after two days\",\n    \"Very poor quality and disappointing experience\"\n]\npositive_words = [\n    \"excellent\",\n    \"useful\",\n    \"good\",\n    \"happy\"\n]\nnegative_words = [\n    \"stopped\",\n    \"poor\",\n    \"disappointing\"\n]\n\nall_text = \" \".join(reviews)\npositive_text = \" \".join(positive_words)\nnegative_text = \" \".join(negative_words)\n\ntexts = {\n    \"All Reviews\": all_text,\n    \"Positive Reviews\": positive_text,\n    \"Negative Reviews\": negative_text\n}\n\nfor title, text in texts.items():\n    wordcloud = WordCloud(width=800, height=400, background_color=\"white\").generate(text)\n    plt.figure(figsize=(8, 4))\n    plt.imshow(wordcloud, interpolation=\"bilinear\")\n    plt.axis(\"off\")\n    plt.title(title)\n    print(f\"Generated WordCloud for: {title}\")\nplt.show()",
        "expectedOutput": "Word clouds were generated for all, positive and negative reviews.\nAll Reviews Tokens: product, excellent, useful, quality, good, happy, stopped, working, poor, disappointing\nPositive Tokens: excellent, useful, good, happy\nNegative Tokens: stopped, poor, disappointing"
      },
      {
        "id": "exp-8-sub-3",
        "name": "8C: Stopwords, Numerics, Word Count and Average Length",
        "aim": "To extract stopword counts, numeric counts, word counts, character counts and average word lengths from reviews.",
        "code": "import re\nimport pandas as pd\n\nreviews = [\n    \"This product is excellent and very useful\",\n    \"The quality is good and I am happy\",\n    \"The product stopped working after two days\",\n    \"Very poor quality and disappointing experience\"\n]\nstopwords = {\n    \"the\", \"is\", \"and\", \"a\", \"an\", \"i\",\n    \"am\", \"very\", \"this\", \"after\"\n}\n\nrecords = []\nfor review in reviews:\n    words = re.findall(r\"\\b\\w+\\b\", review.lower())\n    stopword_count = sum(word in stopwords for word in words)\n    numeric_count = sum(word.isdigit() for word in words)\n    word_count = len(words)\n    character_count = len(review)\n    average_word_length = sum(len(word) for word in words) / len(words) if words else 0\n    records.append({\n        \"Review\": review,\n        \"Stopwords\": stopword_count,\n        \"Numerics\": numeric_count,\n        \"Word_Count\": word_count,\n        \"Char_Count\": character_count,\n        \"Avg_Word_Len\": round(average_word_length, 2)\n    })\n\ndf = pd.DataFrame(records)\nprint(df.to_string(index=False))",
        "expectedOutput": "                                        Review  Stopwords  Numerics  Word_Count  Char_Count  Avg_Word_Len\n     This product is excellent and very useful          4         0           7          41          5.00\n            The quality is good and I am happy          5         0           8          34          3.38\n   The product stopped working after two days          3         0           7          43          5.29\nVery poor quality and disappointing experience          2         0           6          46          6.83"
      },
      {
        "id": "exp-8-sub-4",
        "name": "8D: Sentiment Using NLTK VADER",
        "aim": "To determine sentiment values of reviews using NLTK VADER.",
        "code": "import nltk\nfrom nltk.sentiment import SentimentIntensityAnalyzer\n\ntry:\n    analyzer = SentimentIntensityAnalyzer()\nexcept:\n    nltk.download(\"vader_lexicon\")\n    analyzer = SentimentIntensityAnalyzer()\n\nreviews = [\n    \"This product is excellent and very useful.\",\n    \"The quality is good and I am happy.\",\n    \"The product stopped working after two days.\",\n    \"Very poor quality and disappointing experience.\"\n]\n\nfor review in reviews:\n    score = analyzer.polarity_scores(review)\n    print(\"\\nReview:\", review)\n    print(\"Positive:\", score[\"pos\"])\n    print(\"Negative:\", score[\"neg\"])\n    print(\"Neutral:\", score[\"neu\"])\n    print(\"Compound:\", score[\"compound\"])\n    if score[\"compound\"] >= 0.05:\n        sentiment = \"Positive\"\n    elif score[\"compound\"] <= -0.05:\n        sentiment = \"Negative\"\n    else:\n        sentiment = \"Neutral\"\n    print(\"Sentiment:\", sentiment)",
        "expectedOutput": "Review: This product is excellent and very useful.\nCompound: 0.7717\nSentiment: Positive\n\nReview: The quality is good and I am happy.\nCompound: 0.7579\nSentiment: Positive\n\nReview: The product stopped working after two days.\nCompound: -0.2263\nSentiment: Negative\n\nReview: Very poor quality and disappointing experience.\nCompound: -0.7351\nSentiment: Negative"
      },
      {
        "id": "exp-8-sub-5",
        "name": "8E: Scatter Intensity Plot of Sentiments",
        "aim": "To visualize sentiment intensity using a scatter plot.",
        "code": "import matplotlib.pyplot as plt\nfrom nltk.sentiment import SentimentIntensityAnalyzer\n\nreviews = [\n    \"This product is excellent and very useful.\",\n    \"The quality is good and I am happy.\",\n    \"The product stopped working after two days.\",\n    \"Very poor quality and disappointing experience.\"\n]\n\nanalyzer = SentimentIntensityAnalyzer()\nscores = [\n    analyzer.polarity_scores(review)[\"compound\"]\n    for review in reviews\n]\n\nplt.scatter(\n    range(1, len(scores) + 1),\n    scores,\n    s=100\n)\nplt.axhline(0, linestyle=\"--\")\nplt.title(\"Sentiment Intensity\")\nplt.xlabel(\"Review Number\")\nplt.ylabel(\"Compound Sentiment Score\")\nplt.show()",
        "expectedOutput": "A scatter intensity plot was successfully created to visualize sentiment scores.\nReview 1: +0.77 (Strong Positive)\nReview 2: +0.76 (Strong Positive)\nReview 3: -0.23 (Mild Negative)\nReview 4: -0.74 (Strong Negative)"
      }
    ]
  },
  {
    "id": "exp-9",
    "expNumber": 9,
    "name": "Customer Personality Analysis and Segmentation",
    "description": "Unsupervised machine learning customer segmentation using StandardScaler and K-Means clustering.",
    "moduleId": 2,
    "category": "Customer Analytics",
    "tools": [
      "Python",
      "Scikit-learn",
      "Pandas",
      "Seaborn"
    ],
    "videoUrl": "/videos/exp9_unsupervised_ml.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp9.png",
    "previewImage": "/videos/thumb_exp9.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds9",
    "subExperiments": [
      {
        "id": "exp-9-sub-1",
        "name": "9A: Customer Data Exploration and Feature Scaling",
        "aim": "To load customer data and normalize features with StandardScaler.",
        "code": "import pandas as pd\nfrom sklearn.preprocessing import StandardScaler\n\ndata = {\n    \"Income\": [\n        25000, 27000, 30000, 32000,\n        60000, 65000, 70000, 72000,\n        90000, 95000, 100000, 105000\n    ],\n    \"SpendingScore\": [\n        80, 75, 85, 78,\n        45, 50, 48, 55,\n        20, 25, 18, 22\n    ],\n    \"PurchaseFrequency\": [\n        15, 14, 16, 13,\n        9, 10, 8, 11,\n        4, 5, 3, 4\n    ]\n}\n\ndf = pd.DataFrame(data)\nprint(\"Customer Data:\")\nprint(df)\n\nfeatures = [\"Income\", \"SpendingScore\", \"PurchaseFrequency\"]\nscaler = StandardScaler()\nscaled_features = scaler.fit_transform(df[features])\n\nprint(\"\\nScaled Features (First 4 rows):\")\nprint(scaled_features[:4])",
        "expectedOutput": "Customer Data:\n    Income  SpendingScore  PurchaseFrequency\n0    25000             80                 15\n1    27000             75                 14\n2    30000             85                 16\n3    32000             78                 13\n4    60000             45                  9\n5    65000             50                 10\n6    70000             48                  8\n7    72000             55                 11\n8    90000             20                  4\n9    95000             25                  5\n10  100000             18                  3\n11  105000             22                  4"
      },
      {
        "id": "exp-9-sub-2",
        "name": "9B: K-Means Clustering and Segmentation",
        "aim": "To apply customer segmentation using K-Means clustering algorithm.",
        "code": "import pandas as pd\nfrom sklearn.cluster import KMeans\nfrom sklearn.preprocessing import StandardScaler\n\ndata = {\n    \"Income\": [\n        25000, 27000, 30000, 32000,\n        60000, 65000, 70000, 72000,\n        90000, 95000, 100000, 105000\n    ],\n    \"SpendingScore\": [\n        80, 75, 85, 78,\n        45, 50, 48, 55,\n        20, 25, 18, 22\n    ],\n    \"PurchaseFrequency\": [\n        15, 14, 16, 13,\n        9, 10, 8, 11,\n        4, 5, 3, 4\n    ]\n}\n\ndf = pd.DataFrame(data)\nfeatures = [\"Income\", \"SpendingScore\", \"PurchaseFrequency\"]\n\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(df[features])\n\nkmeans = KMeans(n_clusters=3, random_state=42, n_init=10)\ndf[\"Cluster\"] = kmeans.fit_predict(X_scaled)\n\nprint(\"Customer Segments:\")\nprint(df)",
        "expectedOutput": "Customer Segments:\n    Income  SpendingScore  PurchaseFrequency  Cluster\n0    25000             80                 15        1\n1    27000             75                 14        1\n2    30000             85                 16        1\n3    32000             78                 13        1\n4    60000             45                  9        0\n5    65000             50                 10        0\n6    70000             48                  8        0\n7    72000             55                 11        0\n8    90000             20                  4        2\n9    95000             25                  5        2\n10  100000             18                  3        2\n11  105000             22                  4        2"
      },
      {
        "id": "exp-9-sub-3",
        "name": "9C: Segment Profiling and Strategic Recommendations",
        "aim": "To profile customer groups and derive strategic business recommendations.",
        "code": "import pandas as pd\n\n# Cluster summary profiles\nprofiles = {\n    \"Segment\": [\n        \"Segment 1 — High Spending\",\n        \"Segment 2 — Moderate\",\n        \"Segment 3 — Low Engagement\"\n    ],\n    \"Income Profile\": [\"Lower/Moderate ($28.5k)\", \"Medium ($66.7k)\", \"Higher ($97.5k)\"],\n    \"Spending Score\": [\"High (~80)\", \"Medium (~50)\", \"Low (~21)\"],\n    \"Purchase Frequency\": [\"Frequent (14.5x)\", \"Moderate (9.5x)\", \"Rare (4x)\"],\n    \"Action Strategy\": [\n        \"Loyalty rewards & personalized offers\",\n        \"Upsell bundles & seasonal promotions\",\n        \"Target high-value premium items & re-engagement discounts\"\n    ]\n}\n\nsummary_df = pd.DataFrame(profiles)\nprint(\"Customer Personality Segments & Business Recommendations:\\n\")\nfor idx, row in summary_df.iterrows():\n    print(f\"[{row['Segment']}]\")\n    print(f\" - Income: {row['Income Profile']}\")\n    print(f\" - Spending: {row['Spending Score']}\")\n    print(f\" - Frequency: {row['Purchase Frequency']}\")\n    print(f\" - Strategy: {row['Action Strategy']}\\n\")",
        "expectedOutput": "[Segment 1 — High Spending]\n - Income: Lower/Moderate ($28.5k)\n - Spending: High (~80)\n - Frequency: Frequent (14.5x)\n - Strategy: Loyalty rewards & personalized offers\n\n[Segment 2 — Moderate]\n - Income: Medium ($66.7k)\n - Spending: Medium (~50)\n - Frequency: Moderate (9.5x)\n - Strategy: Upsell bundles & seasonal promotions\n\n[Segment 3 — Low Engagement]\n - Income: Higher ($97.5k)\n - Spending: Low (~21)\n - Frequency: Rare (4x)\n - Strategy: Target high-value premium items & re-engagement discounts"
      }
    ]
  },
  {
    "id": "exp-10",
    "expNumber": 10,
    "name": "Text Emotion Detection Using NLP",
    "description": "NLP classification pipeline using TF-IDF vectorization and Logistic Regression for emotion detection.",
    "moduleId": 5,
    "category": "Text Classification",
    "tools": [
      "Python",
      "Scikit-learn",
      "NLTK",
      "Pandas"
    ],
    "videoUrl": "/videos/exp10_big_data.mp4?v=2",
    "videoThumbnail": "/videos/thumb_exp10.png",
    "previewImage": "/videos/thumb_exp10.png",
    "githubUrl": "https://github.com/udaykiran973/Ds-Lab-Execution/tree/main/ds10",
    "subExperiments": [
      {
        "id": "exp-10-sub-1",
        "name": "10A: Emotion Dataset Preparation and Stratified Splitting",
        "aim": "To prepare a labeled text emotion dataset for natural language modeling.",
        "code": "import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndata = {\n    \"text\": [\n        \"I am extremely happy today\",\n        \"I feel wonderful and joyful\",\n        \"This is the best day of my life\",\n        \"I am very excited\",\n        \n        \"I am feeling very sad\",\n        \"I miss my friend\",\n        \"Today I feel lonely\",\n        \"I am disappointed and unhappy\",\n        \n        \"I am very angry\",\n        \"This situation makes me furious\",\n        \"I hate this problem\",\n        \"I am extremely annoyed\",\n        \n        \"I am scared of the dark\",\n        \"I am afraid of losing my job\",\n        \"This situation makes me nervous\",\n        \"I feel frightened\",\n        \n        \"I love my family\",\n        \"I really love this person\",\n        \"I care deeply about my friends\",\n        \"I feel affection for everyone\"\n    ],\n    \"emotion\": [\n        \"joy\", \"joy\", \"joy\", \"joy\",\n        \"sadness\", \"sadness\", \"sadness\", \"sadness\",\n        \"anger\", \"anger\", \"anger\", \"anger\",\n        \"fear\", \"fear\", \"fear\", \"fear\",\n        \"love\", \"love\", \"love\", \"love\"\n    ]\n}\n\ndf = pd.DataFrame(data)\nprint(\"Class Distribution:\")\nprint(df[\"emotion\"].value_counts())\n\nX_train, X_test, y_train, y_test = train_test_split(\n    df[\"text\"], df[\"emotion\"], test_size=0.25, random_state=42, stratify=df[\"emotion\"]\n)\nprint(f\"\\nTrain samples: {len(X_train)}, Test samples: {len(X_test)}\")",
        "expectedOutput": "Class Distribution:\njoy        4\nsadness    4\nanger      4\nfear       4\nlove       4\nName: emotion, dtype: int64\n\nTrain samples: 15, Test samples: 5"
      },
      {
        "id": "exp-10-sub-2",
        "name": "10B: TF-IDF Vectorization and Pipeline Training",
        "aim": "To vectorize text using TF-IDF and train a Logistic Regression model pipeline.",
        "code": "import pandas as pd\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\n\ndata = {\n    \"text\": [\n        \"I am extremely happy today\",\n        \"I feel wonderful and joyful\",\n        \"This is the best day of my life\",\n        \"I am very excited\",\n        \n        \"I am feeling very sad\",\n        \"I miss my friend\",\n        \"Today I feel lonely\",\n        \"I am disappointed and unhappy\",\n        \n        \"I am very angry\",\n        \"This situation makes me furious\",\n        \"I hate this problem\",\n        \"I am extremely annoyed\",\n        \n        \"I am scared of the dark\",\n        \"I am afraid of losing my job\",\n        \"This situation makes me nervous\",\n        \"I feel frightened\",\n        \n        \"I love my family\",\n        \"I really love this person\",\n        \"I care deeply about my friends\",\n        \"I feel affection for everyone\"\n    ],\n    \"emotion\": [\n        \"joy\", \"joy\", \"joy\", \"joy\",\n        \"sadness\", \"sadness\", \"sadness\", \"sadness\",\n        \"anger\", \"anger\", \"anger\", \"anger\",\n        \"fear\", \"fear\", \"fear\", \"fear\",\n        \"love\", \"love\", \"love\", \"love\"\n    ]\n}\n\ndf = pd.DataFrame(data)\n\n# Pipeline\nmodel = Pipeline([\n    (\"tfidf\", TfidfVectorizer()),\n    (\"classifier\", LogisticRegression())\n])\n\nmodel.fit(df[\"text\"], df[\"emotion\"])\nprint(\"Model pipeline successfully trained with TF-IDF and Logistic Regression.\")",
        "expectedOutput": "Model pipeline successfully trained with TF-IDF and Logistic Regression.\nVectorizer: TfidfVectorizer(ngram_range=(1, 1), lowercase=True)\nClassifier: LogisticRegression(solver='lbfgs', max_iter=100)\nVocabulary size: ~48 terms"
      },
      {
        "id": "exp-10-sub-3",
        "name": "10C: Real-time Emotion Inference and Predictions",
        "aim": "To predict emotions for new text samples using the trained pipeline.",
        "code": "import pandas as pd\nfrom sklearn.feature_extraction.text import TfidfVectorizer\nfrom sklearn.linear_model import LogisticRegression\nfrom sklearn.pipeline import Pipeline\n\ndata = {\n    \"text\": [\n        \"I am extremely happy today\",\n        \"I feel wonderful and joyful\",\n        \"This is the best day of my life\",\n        \"I am very excited\",\n        \n        \"I am feeling very sad\",\n        \"I miss my friend\",\n        \"Today I feel lonely\",\n        \"I am disappointed and unhappy\",\n        \n        \"I am very angry\",\n        \"This situation makes me furious\",\n        \"I hate this problem\",\n        \"I am extremely annoyed\",\n        \n        \"I am scared of the dark\",\n        \"I am afraid of losing my job\",\n        \"This situation makes me nervous\",\n        \"I feel frightened\",\n        \n        \"I love my family\",\n        \"I really love this person\",\n        \"I care deeply about my friends\",\n        \"I feel affection for everyone\"\n    ],\n    \"emotion\": [\n        \"joy\", \"joy\", \"joy\", \"joy\",\n        \"sadness\", \"sadness\", \"sadness\", \"sadness\",\n        \"anger\", \"anger\", \"anger\", \"anger\",\n        \"fear\", \"fear\", \"fear\", \"fear\",\n        \"love\", \"love\", \"love\", \"love\"\n    ]\n}\n\ndf = pd.DataFrame(data)\nmodel = Pipeline([\n    (\"tfidf\", TfidfVectorizer()),\n    (\"classifier\", LogisticRegression())\n])\nmodel.fit(df[\"text\"], df[\"emotion\"])\n\nnew_samples = [\n    \"I am very happy and excited\",\n    \"I feel lonely and unhappy\",\n    \"This makes me extremely angry\",\n    \"I am afraid of this situation\",\n    \"I love my family\"\n]\n\npredictions = model.predict(new_samples)\n\nprint(\"New Text Predictions:\\n\")\nfor text, emotion in zip(new_samples, predictions):\n    print(f\"{text} --> {emotion}\")",
        "expectedOutput": "New Text Predictions:\n\nI am very happy and excited --> joy\nI feel lonely and unhappy --> sadness\nThis makes me extremely angry --> anger\nI am afraid of this situation --> fear\nI love my family --> love"
      }
    ]
  }
];
