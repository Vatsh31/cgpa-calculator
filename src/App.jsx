import React, { useState, useMemo } from 'react';

// CGPA Calculator - Single-file React component (Tailwind CSS)
// Default export a React component so it can be dropped into a Vite/Next app
// Features:
// - Add semesters, either as "Quick" (enter semester total credits + credit-points)
//   or "Detailed" (enter subjects with credit and grade-point -> calculates credit-points)
// - Calculates SGPA for each semester, running cumulative CGPA, and converts to %
// - Default conversion: if CGPA >= 7 then % = 7.4 * CGPA + 12, otherwise % = 7.1 * CGPA + 12
// - Export results as CSV
// - Input validation and helpful UI hints

export default function CgpaCalculatorApp() {
  const [semesters, setSemesters] = useState([
    // sample pre-filled to illustrate usage
    // { id: 1, name: 'Sem 3', mode: 'quick', credits: 23, creditPoints: 170, subjects: [] }
  ]);

  function addSemester(mode = 'quick') {
    const id = Date.now();
    setSemesters(s => [
      ...s,
      {
        id,
        name: `Semester ${s.length + 1}`,
        mode, // 'quick' or 'detailed'
        credits: mode === 'quick' ? 0 : 0,
        creditPoints: mode === 'quick' ? 0 : 0,
        subjects: mode === 'detailed' ? [{ id: Date.now() + 1, name: '', credits: 3, gradePoint: 10 }] : []
      }
    ]);
  }

  function removeSemester(id) {
    setSemesters(s => s.filter(x => x.id !== id));
  }

  function updateSemester(id, changes) {
    setSemesters(s => s.map(x => (x.id === id ? { ...x, ...changes } : x)));
  }

  function addSubject(semId) {
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, subjects: [...sem.subjects, { id: Date.now(), name: '', credits: 3, gradePoint: 10 }] } : sem ));
  }

  function updateSubject(semId, subjId, changes) {
    setSemesters(s => s.map(sem => {
      if (sem.id !== semId) return sem;
      return { ...sem, subjects: sem.subjects.map(sub => sub.id === subjId ? { ...sub, ...changes } : sub) };
    }));
  }

  function removeSubject(semId, subjId) {
    setSemesters(s => s.map(sem => sem.id === semId ? { ...sem, subjects: sem.subjects.filter(sub => sub.id !== subjId) } : sem));
  }

  // compute SGPA per semester and cumulative results
  const results = useMemo(() => {
    let cumulativeCredits = 0;
    let cumulativeCreditPoints = 0;
    return semesters.map(sem => {
      let credits = 0;
      let creditPoints = 0;
      if (sem.mode === 'quick') {
        credits = Number(sem.credits || 0);
        creditPoints = Number(sem.creditPoints || 0);
      } else {
        // detailed
        credits = sem.subjects.reduce((a, b) => a + Number(b.credits || 0), 0);
        creditPoints = sem.subjects.reduce((a, b) => a + (Number(b.credits || 0) * Number(b.gradePoint || 0)), 0);
      }

      const sgpa = credits > 0 ? (creditPoints / credits) : 0;
      cumulativeCredits += credits;
      cumulativeCreditPoints += creditPoints;
      const cgpa = cumulativeCredits > 0 ? (cumulativeCreditPoints / cumulativeCredits) : 0;
      const percentage = cgpa >= 7 ? (7.4 * cgpa + 12) : (7.1 * cgpa + 12);

      return {
        id: sem.id,
        name: sem.name,
        credits,
        creditPoints,
        sgpa: Number(sgpa.toFixed(2)),
        cumulativeCredits,
        cumulativeCreditPoints,
        cgpa: Number(cgpa.toFixed(2)),
        percentage: Number(percentage.toFixed(2))
      };
    });
  }, [semesters]);

  function downloadCSV() {
    const headers = ['Semester', 'Semester Credits', 'Semester Credit Points', 'SGPA', 'Cumulative Credits', 'Cumulative Credit Points', 'CGPA', 'Percentage'];
    const rows = results.map(r => [r.name, r.credits, r.creditPoints, r.sgpa, r.cumulativeCredits, r.cumulativeCreditPoints, r.cgpa, r.percentage]);
    const csvContent = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cgpa_results.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function importSample() {
    // Example: put Sem 3 & 4 from the screenshots and Sem 5/6 as earlier
    const sample = [
      { id: 1, name: 'Sem 3', mode: 'quick', credits: 23, creditPoints: 170, subjects: [] },
      { id: 2, name: 'Sem 4', mode: 'quick', credits: 23, creditPoints: 200, subjects: [] },
      { id: 3, name: 'Sem 5', mode: 'quick', credits: 22, creditPoints: 208, subjects: [] },
      { id: 4, name: 'Sem 6', mode: 'quick', credits: 22, creditPoints: 192, subjects: [] }
    ];
    setSemesters(sample.map(s => ({ ...s, id: Date.now() + Math.random() })));
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl font-semibold">CGPA / SGPA Calculator</h1>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button onClick={() => addSemester('quick')} className="w-full sm:w-auto px-3 py-2 rounded-md border text-sm sm:text-base">Add Quick Semester</button>
            <button onClick={() => addSemester('detailed')} className="w-full sm:w-auto px-3 py-2 rounded-md border text-sm sm:text-base">Add Detailed Semester</button>
            <button onClick={importSample} className="w-full sm:w-auto px-3 py-2 rounded-md bg-blue-600 text-white text-sm sm:text-base">Load Example</button>
          </div>
        </header>

        <main className="space-y-6">
          {semesters.length === 0 && (
            <div className="text-gray-600">No semesters yet — click "Add Quick Semester" or "Load Example" to begin.</div>
          )}

          {semesters.map((sem, idx) => (
            <section key={sem.id} className="border rounded-lg p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <input value={sem.name} onChange={e => updateSemester(sem.id, { name: e.target.value })} className="font-semibold text-lg border rounded px-2 py-1 w-full max-w-[220px] sm:max-w-none focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  <span className="text-sm text-gray-500">Mode: {sem.mode}</span>
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select value={sem.mode} onChange={e => updateSemester(sem.id, { mode: e.target.value })} className="w-full sm:w-auto border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="quick">Quick (totals)</option>
                    <option value="detailed">Detailed (subjects)</option>
                  </select>
                  <button onClick={() => removeSemester(sem.id)} className="w-full sm:w-auto px-3 py-2 border rounded text-red-600">Remove</button>
                </div>
              </div>

              {sem.mode === 'quick' ? (
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex flex-col">
                    Semester Credits
                    <input type="number" min="0" value={sem.credits} onChange={e => updateSemester(sem.id, { credits: Number(e.target.value) })} className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </label>
                  <label className="flex flex-col">
                    Semester Credit Points
                    <input type="number" min="0" value={sem.creditPoints} onChange={e => updateSemester(sem.id, { creditPoints: Number(e.target.value) })} className="mt-1 p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </label>
                  <div className="flex items-end">
                    <div className="text-sm text-gray-600">Quick mode lets you paste the total credits & credit-points (like on your grade card).</div>
                  </div>
                </div>
              ) : (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-600">Add subjects (credit × grade-point). Grade-point is e.g. 10 for O, 9 for A+, etc.</div>
                    <button onClick={() => addSubject(sem.id)} className="px-2 py-1 border rounded">Add Subject</button>
                  </div>
                  <div className="space-y-2">
                    {sem.subjects.map(sub => (
                      <div key={sub.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-end">
                        <input placeholder="Subject name" value={sub.name} onChange={e => updateSubject(sem.id, sub.id, { name: e.target.value })} className="p-2 border rounded md:col-span-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <input type="number" min="0" value={sub.credits} onChange={e => updateSubject(sem.id, sub.id, { credits: Number(e.target.value) })} className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Credits" />
                        <input type="number" min="0" value={sub.gradePoint} onChange={e => updateSubject(sem.id, sub.id, { gradePoint: Number(e.target.value) })} className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Grade point" />
                        <div className="flex gap-2">
                          <button onClick={() => removeSubject(sem.id, sub.id)} className="text-red-600">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-3 text-sm text-gray-700">
                Preview (calculated):
                <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="p-2 bg-gray-50 rounded">Credits: <strong>{results.find(r => r.id === sem.id)?.credits ?? 0}</strong></div>
                  <div className="p-2 bg-gray-50 rounded">Credit Points: <strong>{results.find(r => r.id === sem.id)?.creditPoints ?? 0}</strong></div>
                  <div className="p-2 bg-gray-50 rounded">SGPA: <strong>{results.find(r => r.id === sem.id)?.sgpa ?? '0.00'}</strong></div>
                  <div className="p-2 bg-gray-50 rounded">CGPA (running): <strong>{results.find(r => r.id === sem.id)?.cgpa ?? '0.00'}</strong></div>
                </div>
              </div>
            </section>
          ))}

          {semesters.length > 0 && (
            <section className="border rounded-lg p-3 sm:p-4">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto text-xs sm:text-sm min-w-[600px]">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="p-2">Semester</th>
                      <th className="p-2">Credits</th>
                      <th className="p-2">Credit Points</th>
                      <th className="p-2">SGPA</th>
                      <th className="p-2">Cumulative Credits</th>
                      <th className="p-2">Cumulative Credit Points</th>
                      <th className="p-2">CGPA</th>
                      <th className="p-2">% (converted)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map(r => (
                      <tr key={r.id} className="border-t">
                        <td className="p-2">{r.name}</td>
                        <td className="p-2">{r.credits}</td>
                        <td className="p-2">{r.creditPoints}</td>
                        <td className="p-2">{r.sgpa}</td>
                        <td className="p-2">{r.cumulativeCredits}</td>
                        <td className="p-2">{r.cumulativeCreditPoints}</td>
                        <td className="p-2">{r.cgpa}</td>
                        <td className="p-2">{r.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button onClick={downloadCSV} className="w-full sm:w-auto px-3 py-2 bg-green-600 text-white rounded">Export CSV</button>
                <button onClick={() => { navigator.clipboard?.writeText(JSON.stringify(results, null, 2)); }} className="w-full sm:w-auto px-3 py-2 border rounded">Copy JSON</button>
                <button onClick={() => { setSemesters([]); }} className="w-full sm:w-auto px-3 py-2 border rounded text-red-600">Clear All</button>
              </div>
            </section>
          )}

        </main>

        <footer className="mt-6 text-sm text-gray-500">
          <div>Notes:</div>
          <ul className="list-disc ml-6">
            <li>Default percentage conversion: <code>% = 7.4 × CGPA + 12</code> when CGPA ≥ 7, otherwise <code>% = 7.1 × CGPA + 12</code>. You can change this rule in the source if your handbook uses a different conversion.</li>
            <li>Quick mode is useful when you already have the semester total credits and credit-points from your grade card. Detailed mode calculates credit-points from subject credits × grade-point (enter grade points like 10/9/8 etc.).</li>
            <li>This is a client-side React component — no server required. See run instructions below.</li>
          </ul>
        </footer>
      </div>

      <div className="max-w-4xl w-full mt-4 text-xs text-gray-600">
        <div className="bg-white p-3 rounded shadow-sm">
          <strong>How to run:</strong>
          <ol className="list-decimal ml-6 mt-2">
            <li>Create a new React app (Vite recommended): <code>npm create vite@latest my-cgpa-app -- --template react</code></li>
            <li>Install Tailwind (or use your existing global styles). The component uses Tailwind utility classes — you can swap for plain CSS if you prefer.</li>
            <li>Copy this file as <code>src/App.jsx</code> and run <code>npm install</code> then <code>npm run dev</code>.</li>
            <li>Optional: integrate with Next/Vercel for hosting or wrap into a single-page static site.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
