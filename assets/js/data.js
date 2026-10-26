/**
 * assets/js/data.js - Laboratory Experiments and Profile Data Store
 * Preserved data dictionary for standalone HTML/JS scripts and exports.
 */

window.DS_LAB_DATA = {
  profile: {
    name: 'K. Uday Kiran',
    rollNo: '24102A030055',
    department: 'Computer Science & Engineering (Data Science)',
    email: 'kudaykiran192@gmail.com',
    academicYear: '2025-2026',
    semester: 'Semester VI',
    grade: 'O (Outstanding)'
  },
  experiments: [
    {
      id: 'exp-1',
      expNumber: 1,
      name: 'Python Fundamentals for Data Science',
      moduleId: 1,
      tools: ['Python', 'Standard Library'],
      subExperimentsCount: 3
    },
    {
      id: 'exp-2',
      expNumber: 2,
      name: 'Numerical Operations with NumPy',
      moduleId: 2,
      tools: ['Python', 'NumPy'],
      subExperimentsCount: 3
    },
    {
      id: 'exp-3',
      expNumber: 3,
      name: 'Data Cleaning and Preprocessing with Pandas',
      moduleId: 3,
      tools: ['Python', 'Pandas'],
      subExperimentsCount: 3
    },
    {
      id: 'exp-4',
      expNumber: 4,
      name: 'Exploratory Data Analysis & Visualization',
      moduleId: 4,
      tools: ['Python', 'Matplotlib', 'Seaborn'],
      subExperimentsCount: 3
    },
    {
      id: 'exp-5',
      expNumber: 5,
      name: 'Database Integration & Predictive Modeling',
      moduleId: 5,
      tools: ['Python', 'SQL', 'Scikit-Learn'],
      subExperimentsCount: 3
    }
  ]
};
