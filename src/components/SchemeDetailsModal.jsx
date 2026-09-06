import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import PercentIcon from '@mui/icons-material/Percent';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CircularProgress from '@mui/material/CircularProgress';
import { getSchemeDetails } from '../services/api';

export default function SchemeDetailsModal({ schemeId, districtId, onClose, onCalculateEMI }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getSchemeDetails(schemeId, districtId);
      setDetails(res);
      setLoading(false);
    }
    load();
  }, [schemeId, districtId]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white max-w-3xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8"
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-[#002869] to-[#07265C] text-white p-6 sm:p-8 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <CloseIcon />
            </button>

            {loading ? (
              <div className="py-4">
                <CircularProgress color="warning" size={28} />
              </div>
            ) : (
              <div className="space-y-3 pr-10">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-500 text-slate-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                    {details.code || 'NSFDC SCHEME'}
                  </span>
                  <span className="text-xs text-blue-200">{details.category}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-[#Public_Sans]">
                  {details.name}
                </h2>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {details.purpose}
                </p>
              </div>
            )}
          </div>

          {/* Body Details */}
          {loading ? (
            <div className="p-12 text-center text-slate-500 font-medium">
              Fetching complete scheme guidelines and repayment rules...
            </div>
          ) : (
            <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Program Overview & Objectives
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {details.description}
                </p>
              </div>

              {/* Financial Constraints Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs text-slate-500 block">Max Project Cost</span>
                  <span className="text-base font-extrabold text-[#002869] font-mono">
                    ₹{(details.max_project_cost || 0).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100">
                  <span className="text-xs text-slate-500 block">Beneficiary Rate</span>
                  <span className="text-base font-extrabold text-emerald-700 font-mono">
                    {details.beneficiary_interest_rate}% p.a.
                  </span>
                </div>

                <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-100">
                  <span className="text-xs text-slate-500 block">Finance Covered</span>
                  <span className="text-base font-extrabold text-amber-700 font-mono">
                    Up to {details.finance_percentage}%
                  </span>
                </div>
              </div>

              {/* Repayment Rules */}
              {details.repayment_rules && details.repayment_rules.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <EventAvailableIcon className="!text-base text-[#0b3d91]" /> Repayment Rules & Moratorium
                  </h4>
                  {details.repayment_rules.map((rule) => (
                    <div key={rule.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                      <div className="flex flex-wrap gap-4 text-slate-800 font-semibold">
                        <span>Frequency: <strong className="text-[#002869]">{rule.repayment_frequency}</strong></span>
                        <span>Max Period: <strong className="text-[#002869]">{rule.max_repayment_period}</strong></span>
                        <span>Moratorium: <strong className="text-amber-700">{rule.moratorium_period}</strong></span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{rule.condition}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Designated Channel Partners */}
              {details.channel_partners && details.channel_partners.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Designated Channel Partners in Your District ({details.channel_partners.length})
                    </h4>
                    <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified Outlets
                    </span>
                  </div>

                  <div className="space-y-3">
                    {details.channel_partners.map((cp, idx) => (
                      <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <strong className="text-sm text-slate-900 font-[#Public_Sans]">{cp.name}</strong>
                              <span className="text-[10px] font-bold bg-blue-100 text-[#002869] px-2 py-0.5 rounded-full">
                                {cp.type}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">
                              {cp.address ? `${cp.address}, ` : ''}{cp.pincode ? `PIN - ${cp.pincode}` : 'District Branch'}
                            </p>
                          </div>

                          {/* Open Channel Partner Button */}
                          <a
                            href={cp.website || cp.source_url || details.source_url || '#'}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0b3d91] hover:bg-[#07265C] text-white font-bold rounded-xl text-xs shadow transition-all shrink-0 active:scale-95"
                          >
                            <span>Open Partner Portal</span>
                            <OpenInNewIcon className="!text-xs" />
                          </a>
                        </div>

                        {/* Contact details bar */}
                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                          <span className="text-slate-500">Official Contact / Toll-Free:</span>
                          <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                            <PhoneIcon className="!text-xs" /> {cp.contact || '1800-11-0396'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Official Source Link */}
              {details.source_url && (
                <div className="pt-2">
                  <a
                    href={details.source_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[#0b3d91] font-bold hover:underline flex items-center gap-1"
                  >
                    <span>View Official Ministry Circular (NSFDC Portal)</span>
                    <OpenInNewIcon className="!text-xs" />
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="p-4 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-white text-slate-700 border border-slate-300 font-bold rounded-xl text-xs hover:bg-slate-50 transition-colors"
            >
              Close Window
            </button>

            {details && (
              <button
                onClick={() => {
                  onClose();
                  onCalculateEMI(details);
                }}
                className="px-6 py-2.5 bg-[#0b3d91] hover:bg-[#07265C] text-white font-bold rounded-xl text-xs shadow transition-all active:scale-95"
              >
                Calculate EMI for this Scheme
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
