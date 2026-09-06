import React from 'react';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ComparisonMatrix({ selectedSchemes, onRemoveScheme, onClearAll, onCalculateEMI }) {
  if (!selectedSchemes || selectedSchemes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4 bg-white rounded-3xl border border-slate-200 shadow-md p-8">
        <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
          <CompareArrowsIcon className="!text-3xl" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 font-[#Public_Sans]">No Schemes Selected for Comparison</h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Click the "Compare" button on any scheme card in the match results to compare up to 3 schemes side-by-side.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-[#002869] text-xs font-semibold">
            <CompareArrowsIcon className="!text-sm" /> Side-by-Side Matrix
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-[#Public_Sans] mt-1">
            Compare Selected Schemes ({selectedSchemes.length})
          </h2>
        </div>

        <button
          onClick={onClearAll}
          className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 bg-red-50 px-4 py-2 rounded-xl border border-red-200"
        >
          <DeleteIcon className="!text-sm" /> Clear All Selections
        </button>
      </div>

      {/* Comparison Grid */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-x-auto">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200">
              <th className="p-4 w-1/4 font-bold text-slate-700 uppercase tracking-wider text-xs">
                Feature / Metric
              </th>
              {selectedSchemes.map((s) => (
                <th key={s.id} className="p-4 w-1/3 border-l border-slate-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase block">{s.code}</span>
                      <strong className="text-base text-[#002869] block leading-tight font-[#Public_Sans]">{s.name}</strong>
                    </div>
                    <button
                      onClick={() => onRemoveScheme(s.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <DeleteIcon className="!text-sm" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {/* Category */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Category</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-medium text-slate-700">
                  {s.category}
                </td>
              ))}
            </tr>

            {/* Suitability Score */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Suitability Match Score</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-mono font-extrabold text-emerald-700 text-sm">
                  {s.suitability_score ? `${s.suitability_score.toFixed(1)}% (${s.suitability_label})` : 'N/A'}
                </td>
              ))}
            </tr>

            {/* Beneficiary Interest Rate */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Beneficiary Interest Rate</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-mono font-bold text-amber-700 text-sm">
                  {s.beneficiary_interest_rate || 5.0}% p.a.
                </td>
              ))}
            </tr>

            {/* Max Project Cost */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Max Project Cost Limit</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-mono font-bold text-[#002869]">
                  ₹{(s.max_project_cost || 0).toLocaleString('en-IN')}
                </td>
              ))}
            </tr>

            {/* Max Loan Amount */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Max Subsidized Loan</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-mono font-bold text-slate-900">
                  ₹{(s.max_loan_amount || 0).toLocaleString('en-IN')}
                </td>
              ))}
            </tr>

            {/* Financing Percentage */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Financing Percentage</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 font-medium text-slate-700">
                  Up to {s.finance_percentage || 90}%
                </td>
              ))}
            </tr>

            {/* Repayment Frequency & Period */}
            <tr>
              <td className="p-4 font-bold text-slate-800 bg-slate-50/50">Repayment Terms</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200 text-slate-700 space-y-1">
                  {s.repayment_rules && s.repayment_rules.length > 0 ? (
                    <div>
                      <div className="font-semibold">{s.repayment_rules[0].repayment_frequency} ({s.repayment_rules[0].max_repayment_period})</div>
                      <div className="text-[11px] text-amber-700">Moratorium: {s.repayment_rules[0].moratorium_period}</div>
                    </div>
                  ) : (
                    <span>Quarterly up to 3-5 Years</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Action Buttons Row */}
            <tr className="bg-slate-50">
              <td className="p-4 font-bold text-slate-800">Action</td>
              {selectedSchemes.map(s => (
                <td key={s.id} className="p-4 border-l border-slate-200">
                  <button
                    onClick={() => onCalculateEMI(s)}
                    className="w-full py-2 bg-[#0b3d91] hover:bg-[#07265C] text-white font-bold rounded-xl text-xs shadow transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Calculate EMI</span>
                    <ArrowForwardIcon className="!text-xs" />
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
