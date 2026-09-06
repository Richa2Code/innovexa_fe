import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CalculateIcon from '@mui/icons-material/Calculate';
import TableChartIcon from '@mui/icons-material/TableChart';
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CircularProgress from '@mui/material/CircularProgress';
import { calculateEMI } from '../services/api';
import { generateEMIPDF } from '../utils/pdfGenerator';

export default function EMICalculator({ preselectedScheme, initialProjectCost }) {
  const defaultAmount = initialProjectCost || preselectedScheme?.max_loan_amount || 100000;
  const [loanAmount, setLoanAmount] = useState(defaultAmount);
  const [interestRate, setInterestRate] = useState(preselectedScheme?.beneficiary_interest_rate || 13.0);
  const [tenureMonths, setTenureMonths] = useState(36); // 3 years default
  const [emiData, setEmiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 12 months (1 year) per page

  useEffect(() => {
    setCurrentPage(1);
  }, [emiData, tenureMonths]);

  useEffect(() => {
    if (initialProjectCost) {
      setLoanAmount(Number(initialProjectCost));
    } else if (preselectedScheme?.max_loan_amount) {
      setLoanAmount(Number(preselectedScheme.max_loan_amount));
    }
  }, [initialProjectCost, preselectedScheme]);

  useEffect(() => {
    if (preselectedScheme?.beneficiary_interest_rate) {
      setInterestRate(Number(preselectedScheme.beneficiary_interest_rate));
    }
  }, [preselectedScheme]);

  useEffect(() => {
    async function runCalc() {
      setLoading(true);
      const res = await calculateEMI({
        loan_amount: parseFloat(loanAmount),
        interest_rate: parseFloat(interestRate),
        tenure_months: parseInt(tenureMonths)
      });
      setEmiData(res);
      setLoading(false);
    }
    runCalc();
  }, [loanAmount, interestRate, tenureMonths]);

  const handleDownloadPDF = () => {
    if (!emiData) return;
    generateEMIPDF({
      loanAmount,
      interestRate,
      tenureMonths,
      emiData,
      scheme: preselectedScheme
    });
  };

  const maxSliderAmount = Math.max(500000, Number(loanAmount) || 0, Number(preselectedScheme?.max_loan_amount) || 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <CalculateIcon className="!text-sm text-amber-600" /> Financial Planning & Repayment Engine
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-[#Public_Sans]">
          Concessional Loan EMI & Repayment Calculator
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Simulate monthly EMI installments and total interest burden under government subsidized interest tiers.
        </p>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center justify-between">
            <span>Loan Parameters</span>
            {preselectedScheme && (
              <span className="text-xs bg-blue-50 text-[#0b3d91] px-2.5 py-1 rounded-md font-semibold border border-blue-100">
                Preset: {preselectedScheme.code}
              </span>
            )}
          </h3>

          {/* Slider 1: Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Sanctioned Loan Amount (₹)
              </label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Math.max(10000, Number(e.target.value)))}
                className="w-36 text-right font-mono text-base font-extrabold text-[#002869] border border-slate-300 rounded-lg px-2 py-1 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="10000"
              max={maxSliderAmount}
              step="5000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b3d91]"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>₹10,000</span>
              <span>₹{Math.round(maxSliderAmount / 2).toLocaleString('en-IN')}</span>
              <span>₹{maxSliderAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Beneficiary Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                step="0.5"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-24 text-right font-mono text-base font-extrabold text-emerald-700 border border-slate-300 rounded-lg px-2 py-1 bg-slate-50 focus:bg-white focus:outline-none"
              />
            </div>
            <input
              type="range"
              min="3.0"
              max="18.0"
              step="0.5"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>3.0% (Subsidized)</span>
              <span>10.0%</span>
              <span>18.0% (Standard)</span>
            </div>
          </div>

          {/* Slider 3: Tenure Months */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Repayment Tenure ({Math.floor(tenureMonths / 12)} years {tenureMonths % 12 > 0 ? `${tenureMonths % 12} mos` : ''})
              </label>
              <span className="font-mono text-base font-extrabold text-amber-600">
                {tenureMonths} Months
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="120"
              step="6"
              value={tenureMonths}
              onChange={(e) => setTenureMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono">
              <span>12 Mos (1 Yr)</span>
              <span>60 Mos (5 Yrs)</span>
              <span>120 Mos (10 Yrs)</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t">
            <span>Includes 3-Month Moratorium Buffer Calculation</span>
            <button
              onClick={() => {
                setLoanAmount(initialProjectCost || preselectedScheme?.max_loan_amount || 100000);
                setInterestRate(preselectedScheme?.beneficiary_interest_rate || 13.0);
                setTenureMonths(36);
              }}
              className="text-[#0b3d91] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <RefreshIcon className="!text-sm" /> Reset
            </button>
          </div>
        </div>

        {/* Right Summary Card (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#002869] to-[#07265C] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
              Monthly Repayment Projection
            </span>

            {loading ? (
              <div className="py-12 flex justify-center">
                <CircularProgress color="warning" />
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <span className="text-slate-300 text-xs font-medium block">Monthly EMI</span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    ₹{(emiData?.monthly_emi || 0).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-blue-900/60">
                  <div>
                    <span className="text-slate-400 text-xs block">Principal Loan</span>
                    <span className="font-mono text-sm font-bold text-white">
                      ₹{(emiData?.loan_amount || loanAmount).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-400 text-xs block">Total Interest</span>
                    <span className="font-mono text-sm font-bold text-amber-400">
                      ₹{(emiData?.total_interest_payable || 0).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="col-span-2 pt-2 border-t border-blue-900/60">
                    <span className="text-slate-400 text-xs block">Total Payable Amount</span>
                    <span className="font-mono text-xl font-extrabold text-emerald-400">
                      ₹{(emiData?.total_payment || 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl shadow transition-all flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer"
            >
              <TableChartIcon className="!text-lg" />
              <span>{showSchedule ? 'Hide Monthly Schedule' : 'View Full Amortization Schedule'}</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              disabled={!emiData || loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow border border-emerald-500/40 transition-all flex items-center justify-center gap-2 text-sm active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <PictureAsPdfIcon className="!text-lg text-white" />
              <span>Download Repayment Schedule PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Amortization Table Modal / Expanded Drawer */}
      {showSchedule && emiData?.schedule && (() => {
        const totalPages = Math.ceil(emiData.schedule.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const displayedSchedule = emiData.schedule.slice(startIndex, endIndex);

        return (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 font-[#Public_Sans]">
                  Monthly Repayment Breakup Schedule
                </h4>
                <span className="text-xs font-mono text-slate-500">
                  Total Tenure: {emiData.tenure_months} Months ({Math.ceil(emiData.tenure_months / 12)} {Math.ceil(emiData.tenure_months / 12) === 1 ? 'Year' : 'Years'}) | Repayment Method: Reducing Balance
                </span>
              </div>

              <button
                onClick={handleDownloadPDF}
                className="bg-[#0b3d91] hover:bg-[#002869] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition-all flex items-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
              >
                <DownloadIcon className="!text-base" />
                <span>Download Full PDF</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b">
                  <tr>
                    <th className="p-3">Month</th>
                    <th className="p-3">Opening Balance (₹)</th>
                    <th className="p-3">EMI (₹)</th>
                    <th className="p-3">Principal (₹)</th>
                    <th className="p-3">Interest (₹)</th>
                    <th className="p-3">Ending Balance (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {displayedSchedule.map((row) => (
                    <tr key={row.month} className="hover:bg-blue-50/50">
                      <td className="p-3 font-bold text-slate-900">{row.month}</td>
                      <td className="p-3 text-slate-600">{row.beginning_balance.toLocaleString('en-IN')}</td>
                      <td className="p-3 font-bold text-[#002869]">{row.emi.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-emerald-700">{row.principal_paid.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-amber-700">{row.interest_paid.toLocaleString('en-IN')}</td>
                      <td className="p-3 text-slate-800 font-semibold">{row.ending_balance.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-100 text-xs">
                <div className="text-slate-600 font-medium">
                  Showing months <span className="font-bold text-slate-900">{startIndex + 1}</span> to{' '}
                  <span className="font-bold text-slate-900">{Math.min(endIndex, emiData.schedule.length)}</span> of{' '}
                  <span className="font-bold text-slate-900">{emiData.schedule.length}</span> (Page {currentPage} of {totalPages})
                </div>

                <div className="flex items-center gap-1.5 flex-wrap justify-center">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-[#0b3d91] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      Year {page} (Mos { (page - 1) * itemsPerPage + 1 }-{ Math.min(page * itemsPerPage, emiData.schedule.length) })
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        );
      })()}
    </div>
  );
}
