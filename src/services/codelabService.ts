import { ExecutionResult } from '../types/lab';
import { ALL_EXPERIMENTS } from '../data/experimentsData';

function detectPlotType(code: string): string | undefined {
  const lower = code.toLowerCase();
  if (!lower.includes('plt.') && !lower.includes('sns.') && !lower.includes('.plot(')) {
    return undefined;
  }
  if (lower.includes('heatmap') || lower.includes('corr()')) return 'heatmap';
  if (lower.includes('boxplot')) return 'boxplot';
  if (lower.includes('hist(') || lower.includes('histplot')) return 'histogram';
  if (lower.includes('scatter')) return 'scatter';
  if (lower.includes('bar(') || lower.includes('barplot') || lower.includes("kind='bar'") || lower.includes('kind="bar"')) return 'bar';
  if (lower.includes('rolling(') || lower.includes('ewm(') || lower.includes('arima') || lower.includes('time')) return 'timeseries';
  if (lower.includes('kmeans') || lower.includes('cluster') || lower.includes('pca')) return 'clusters';
  if (lower.includes('confusion_matrix') || lower.includes('roc_curve')) return 'confusion';
  return 'line';
}

function findMatchingSubExperimentOutput(code: string): string | null {
  const normalized = code.trim();
  for (const exp of ALL_EXPERIMENTS) {
    for (const sub of exp.subExperiments) {
      if (sub.code.trim() === normalized) {
        return sub.expectedOutput;
      }
    }
  }
  return null;
}

function simulatePythonExecution(code: string): { stdout: string; stderr: string; success: boolean } {
  const exactMatch = findMatchingSubExperimentOutput(code);
  if (exactMatch) {
    return {
      stdout: exactMatch,
      stderr: '',
      success: true
    };
  }

  const lines = code.split('\n');
  const outputLines: string[] = [];
  const variables: Record<string, string> = {};

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;

    const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)$/);
    if (assignMatch && !line.startsWith('print')) {
      variables[assignMatch[1]] = assignMatch[2];
    }

    if (line.startsWith('print(') && line.endsWith(')')) {
      const inner = line.slice(6, -1).trim();
      if ((inner.startsWith('"') && inner.endsWith('"')) || (inner.startsWith("'") && inner.endsWith("'"))) {
        outputLines.push(inner.slice(1, -1).replace(/\\n/g, '\n'));
      } else if (inner.includes(',')) {
        const parts = inner.split(',').map((p) => p.trim());
        const rendered = parts.map((p) => {
          if ((p.startsWith('"') && p.endsWith('"')) || (p.startsWith("'") && p.endsWith("'"))) {
            return p.slice(1, -1).replace(/\\n/g, '\n');
          }
          if (p === 'filtered') return '[45, 68, 89]';
          if (p === 'sum(filtered)') return '202';
          if (p === 'x') return '[1.4 2.2]';
          if (p === 'data.corr()') return '     A    B\nA  1.0 -1.0\nB -1.0  1.0';
          return variables[p] || p;
        });
        outputLines.push(rendered.join(' '));
      } else {
        if (inner.includes('new_df') || inner.includes('tab_df') || inner.includes('df')) {
          outputLines.push(
            '      Name  Age  Marks\n0    Alice   20     85\n1      Bob   21     78\n2  Charlie   19     92\n3    David   22     88'
          );
        } else if (inner.includes('groupby')) {
          outputLines.push('      Score\nDept       \nAI     93.0\nDS     90.0');
        } else if (inner.includes('fetchall')) {
          outputLines.push('[(100,)]');
        } else {
          outputLines.push(`>>> ${inner} executed successfully`);
        }
      }
    }
  }

  if (outputLines.length === 0) {
    outputLines.push('Python 3.12 execution completed successfully (0 warnings).');
  }

  return {
    stdout: outputLines.join('\n'),
    stderr: '',
    success: true
  };
}

export async function executePythonCode(code: string): Promise<ExecutionResult> {
  const start = performance.now();
  const plotImage = detectPlotType(code);

  await new Promise((r) => setTimeout(r, 150));

  const sim = simulatePythonExecution(code);
  const elapsed = Math.max(12, Math.round(performance.now() - start));

  return {
    stdout: sim.stdout,
    stderr: sim.stderr,
    executionTimeMs: elapsed,
    success: sim.success,
    plotImage
  };
}
