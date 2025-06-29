"use client";

export default function TranscriptSummary({ transcript, summary, clauses }) {
  const getRowColor = (label) => {
    switch (label) {
      case "Risky":
        return "bg-red-400/10";
      case "Duration":
        return "bg-blue-400/10";
      case "Payment Clause":
        return "bg-green-400/10";
      case "Liability":
        return "bg-yellow-400/10";
      case "Obligation":
        return "bg-purple-400/10";
      default:
        return "bg-white/5";
    }
  };

  return (
    <div className="space-y-10 text-white">
      {/* Transcript + Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 style={{ fontFamily: 'var(--font-manrope)' }} className="text-2xl font-bold mb-2">📝 Transcript Text</h2>
          <div style={{ fontFamily: 'var(--font-nunito)' }} className="bg-white/10 p-4 rounded h-full">
            {transcript}
          </div>
        </div>

        <div>
          <h2 style={{ fontFamily: 'var(--font-manrope)' }} className="text-2xl font-bold mb-2">🧠 Summary</h2>
          <div style={{ fontFamily: 'var(--font-nunito)' }} className="bg-white/10 p-4 rounded h-full">
            {summary || "No summary available"}
          </div>
        </div>
      </div>

      {/* Clause Table */}
      <div className="mt-15">
        <h2 style={{ fontFamily: 'var(--font-manrope)' }} className="text-2xl font-bold mb-2">📜 Identified Clauses</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm bg-white/10 rounded">
            <thead style={{ fontFamily: 'var(--font-manrope)' }} className="bg-white/20 text-left">
              <tr>
                <th className="py-2 px-4">Clause</th>
                <th className="py-2 px-4">Label</th>
                <th className="py-2 px-4">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {clauses.map((item, index) => (
                <tr key={index} style={{ fontFamily: 'var(--font-nunito)' }} className={`border-t border-white/10 ${getRowColor(item.label)}`}>
                  <td className="py-2 px-4">{item.clause}</td>
                  <td className="py-2 px-4 font-semibold">{item.label}</td>
                  <td className="py-2 px-4">{(item.score * 100).toFixed(0)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
