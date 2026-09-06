import React from 'react';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import CalculateIcon from '@mui/icons-material/Calculate';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PercentIcon from '@mui/icons-material/Percent';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function SchemeCard({ scheme, onViewDetails, onCalculateEMI, onCompare, isSelectedForCompare, hideSuitability }) {
  const hasScore = scheme.suitability_score != null && !hideSuitability;
  const score = Number(scheme.suitability_score);
  const isHighMatch = score >= 80;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-3xl border ${
        isSelectedForCompare ? 'border-amber-500 ring-2 ring-amber-400' : 'border-slate-200'
      } shadow-md hover:shadow-xl overflow-hidden flex flex-col justify-between`}
    >
      {/* Header Banner */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1 flex-1">
            <span className="inline-block text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2.5 py-1 rounded-md">
              {scheme.code || 'NSFDC SCHEME'}
            </span>
            <h3 className="text-xl font-bold text-slate-900 leading-snug font-[#Public_Sans]">
              {scheme.name}
            </h3>
          </div>

          {/* Suitability Score Badge (Only when evaluated & not in View All mode) */}
          {hasScore && (
            <div className={`px-3 py-1.5 rounded-xl border flex flex-col items-center justify-center shrink-0 ${
              isHighMatch 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-blue-50 border-blue-300 text-blue-800'
            }`}>
              <span className="text-xs font-semibold">{scheme.suitability_label || 'Suitable'}</span>
              <span className="text-lg font-extrabold font-mono">{score.toFixed(1)}%</span>
            </div>
          )}
        </div>

        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
          {scheme.description || scheme.purpose}
        </p>

        {/* Category Pill */}
        <div className="flex items-center gap-1.5 text-xs text-blue-900 font-semibold bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
          <AccountBalanceIcon className="!text-sm text-[#0b3d91]" />
          <span className="truncate">{scheme.category}</span>
        </div>

        {/* Highlight Metrics */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block font-medium">Max Loan Amount</span>
            <span className="text-sm font-extrabold text-[#002869] font-mono">
              ₹{(scheme.max_loan_amount || 0).toLocaleString('en-IN')}
            </span>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
            <span className="text-[11px] text-slate-500 block font-medium">Beneficiary Rate</span>
            <span className="text-sm font-extrabold text-emerald-700 font-mono flex items-center gap-0.5">
              <PercentIcon className="!text-xs" />
              {scheme.beneficiary_interest_rate || 5.0}% p.a.
            </span>
          </div>
        </div>

        {/* Score Breakdown Progress Bars */}
        {hasScore && scheme.score_breakdown && (
          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
              Match Factor Breakdown
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              <div className="bg-slate-100 rounded p-1 text-center text-[10px]">
                <div className="text-slate-500">Income</div>
                <div className="font-bold text-blue-800">{scheme.score_breakdown.income_score || 25}</div>
              </div>
              <div className="bg-slate-100 rounded p-1 text-center text-[10px]">
                <div className="text-slate-500">Cost</div>
                <div className="font-bold text-blue-800">{scheme.score_breakdown.project_cost_score || 22}</div>
              </div>
              <div className="bg-slate-100 rounded p-1 text-center text-[10px]">
                <div className="text-slate-500">Purpose</div>
                <div className="font-bold text-blue-800">{scheme.score_breakdown.purpose_score || 25}</div>
              </div>
              <div className="bg-slate-100 rounded p-1 text-center text-[10px]">
                <div className="text-slate-500">Location</div>
                <div className="font-bold text-blue-800">{scheme.score_breakdown.location_score || 10}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Action Strip */}
      <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button
            onClick={() => onCompare(scheme)}
            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
              isSelectedForCompare
                ? 'bg-amber-500 text-white border-amber-600'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <CompareArrowsIcon className="!text-sm" />
            {isSelectedForCompare ? 'Selected' : 'Compare'}
          </button>

          <button
            onClick={() => onCalculateEMI(scheme)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-white text-[#0b3d91] border border-blue-200 hover:bg-blue-50 transition-colors flex items-center gap-1"
          >
            <CalculateIcon className="!text-sm" />
            EMI
          </button>
        </div>

        <button
          onClick={() => onViewDetails(scheme)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#0b3d91] hover:bg-[#07265C] text-white shadow transition-all flex items-center gap-1 active:scale-95"
        >
          <span>Details</span>
          <ArrowForwardIcon className="!text-xs" />
        </button>
      </div>
    </motion.div>
  );
}
