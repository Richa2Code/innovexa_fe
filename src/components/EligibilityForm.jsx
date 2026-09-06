import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CircularProgress from '@mui/material/CircularProgress';
import { getCountries, getStates, getDistricts } from '../services/api';

export default function EligibilityForm({ onSubmit, initialValues, t }) {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [formData, setFormData] = useState({
    country_id: initialValues?.country_id || '',
    state_id: initialValues?.state_id || '',
    district_id: initialValues?.district_id || '',
    annual_income: initialValues?.annual_income || 100000,
    project_cost: initialValues?.project_cost || 100000,
    purpose: initialValues?.purpose || 'Term Loan'
  });

  // Load countries on mount
  useEffect(() => {
    async function loadC() {
      setLoadingCountries(true);
      const data = await getCountries();
      const countryList = Array.isArray(data) ? data : [];
      setCountries(countryList);

      if (countryList.length > 0) {
        setFormData(prev => {
          const exists = countryList.some(c => c.id === prev.country_id);
          const nextCountryId = exists ? prev.country_id : countryList[0].id;
          return { ...prev, country_id: nextCountryId };
        });
      }
      setLoadingCountries(false);
    }
    loadC();
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (!formData.country_id) return;
    async function loadS() {
      setLoadingStates(true);
      const data = await getStates(formData.country_id);
      const stateList = Array.isArray(data) ? data : [];
      setStates(stateList);

      if (stateList.length > 0) {
        setFormData(prev => {
          const exists = stateList.some(s => s.id === prev.state_id);
          const nextStateId = exists ? prev.state_id : stateList[0].id;
          return {
            ...prev,
            state_id: nextStateId,
            district_id: exists ? prev.district_id : ''
          };
        });
      } else {
        setFormData(prev => ({ ...prev, state_id: '', district_id: '' }));
      }
      setLoadingStates(false);
    }
    loadS();
  }, [formData.country_id]);

  // Load districts when state changes
  useEffect(() => {
    if (!formData.state_id) return;
    async function loadD() {
      setLoadingDistricts(true);
      const data = await getDistricts(formData.state_id);
      const districtList = Array.isArray(data) ? data : [];
      setDistricts(districtList);

      if (districtList.length > 0) {
        setFormData(prev => {
          const exists = districtList.some(d => d.id === prev.district_id);
          const nextDistrictId = exists ? prev.district_id : districtList[0].id;
          return { ...prev, district_id: nextDistrictId };
        });
      } else {
        setFormData(prev => ({ ...prev, district_id: '' }));
      }
      setLoadingDistricts(false);
    }
    loadD();
  }, [formData.state_id]);

  const handleCountryChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      country_id: val,
      state_id: '',
      district_id: ''
    }));
  };

  const handleStateChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({
      ...prev,
      state_id: val,
      district_id: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#002869] text-xs font-semibold">
          <LocationOnIcon className="!text-sm" /> National Eligibility Assessment
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-[#Public_Sans]">
          {t?.formTitle || 'Check Your Scheme Eligibility'}
        </h2>
        <p className="text-slate-600 text-sm">
          {t?.formSubtitle || 'Provide your location & financial requirements to fetch AI-recommended concessional loan options.'}
        </p>
      </div>

      {/* Stepper Progress Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className={`flex items-center gap-2 text-sm font-bold ${step >= 1 ? 'text-[#0b3d91]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-[#0b3d91] text-white' : 'bg-slate-200 text-slate-600'}`}>
            1
          </div>
          <span>{t?.step1Label || 'Location Profile'}</span>
        </div>

        <div className="h-0.5 w-12 bg-slate-200 hidden sm:block" />

        <div className={`flex items-center gap-2 text-sm font-bold ${step >= 2 ? 'text-[#0b3d91]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-[#0b3d91] text-white' : 'bg-slate-200 text-slate-600'}`}>
            2
          </div>
          <span>{t?.step2Label || 'Financial Details'}</span>
        </div>

        <div className="h-0.5 w-12 bg-slate-200 hidden sm:block" />

        <div className={`flex items-center gap-2 text-sm font-bold ${step >= 3 ? 'text-[#0b3d91]' : 'text-slate-400'}`}>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-[#0b3d91] text-white' : 'bg-slate-200 text-slate-600'}`}>
            3
          </div>
          <span>{t?.step3Label || 'Review & Submit'}</span>
        </div>
      </div>

      {/* Main Form Box */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: Geographic Location */}
          {step === 1 && (
            <div className="space-y-5">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                <LocationOnIcon className="text-amber-500" /> Geographic Jurisdiction
              </h3>

              {/* Country Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Country
                </label>
                <select
                  value={formData.country_id}
                  onChange={handleCountryChange}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] focus:bg-white transition-all outline-none"
                >
                  {loadingCountries ? (
                    <option>Loading countries...</option>
                  ) : (
                    countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                    ))
                  )}
                </select>
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  State / Union Territory
                </label>
                <div className="relative">
                  <select
                    value={formData.state_id}
                    onChange={handleStateChange}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] focus:bg-white transition-all outline-none"
                  >
                    <option value="">Select State</option>
                    {states.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {loadingStates && (
                    <div className="absolute right-3 top-3">
                      <CircularProgress size={20} color="primary" />
                    </div>
                  )}
                </div>
              </div>

              {/* District Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  District
                </label>
                <div className="relative">
                  <select
                    value={formData.district_id}
                    onChange={(e) => setFormData({ ...formData, district_id: e.target.value })}
                    disabled={!formData.state_id}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] focus:bg-white transition-all outline-none disabled:opacity-50"
                  >
                    <option value="">Select District</option>
                    {districts.map((d) => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                  {loadingDistricts && (
                    <div className="absolute right-3 top-3">
                      <CircularProgress size={20} color="primary" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1.5">
                  Districts determine channel partner availability (e.g. NBFC-MFIs or SFBs).
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.state_id || !formData.district_id}
                  className="bg-[#0b3d91] hover:bg-[#07265C] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 text-sm"
                >
                  <span>Next: Financial Profile</span>
                  <ArrowForwardIcon className="!text-base" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Financial Requirements */}
          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                <AccountBalanceWalletIcon className="text-amber-500" /> Financial Parameters
              </h3>

              {/* Annual Income */}
              <div className="space-y-2">
                <div className="flex justify-between items-center gap-4">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Annual Family Income (₹)
                  </label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#0b3d91] focus-within:bg-white">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="5000"
                      value={formData.annual_income}
                      onChange={(e) => setFormData({ ...formData, annual_income: Math.max(0, Number(e.target.value)) })}
                      className="w-28 text-right font-mono text-sm font-extrabold text-[#002869] bg-transparent outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="1000000"
                  step="10000"
                  value={Math.min(formData.annual_income, 1000000)}
                  onChange={(e) => setFormData({ ...formData, annual_income: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b3d91]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>₹20,000</span>
                  <span>₹5,00,000</span>
                  <span>₹10,00,000+ (Custom Input Allowed)</span>
                </div>
              </div>

              {/* Loan Purpose Selection */}
              <div className="space-y-2 pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Loan Purpose
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {['Term Loan', 'Education Loan', 'Micro Finance'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, purpose: opt })}
                      className={`p-3 rounded-xl border text-center transition-all font-semibold text-xs sm:text-sm ${
                        formData.purpose === opt
                          ? 'border-[#0b3d91] bg-blue-50/80 text-[#0b3d91] shadow-sm ring-2 ring-[#0b3d91]/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Project Cost */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center gap-4">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Estimated Business / Project Cost (₹)
                  </label>
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white">
                    <span className="text-xs font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="10000"
                      value={formData.project_cost}
                      onChange={(e) => setFormData({ ...formData, project_cost: Math.max(0, Number(e.target.value)) })}
                      className="w-32 text-right font-mono text-sm font-extrabold text-amber-600 bg-transparent outline-none"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="2000000"
                  step="10000"
                  value={Math.min(formData.project_cost, 2000000)}
                  onChange={(e) => setFormData({ ...formData, project_cost: Number(e.target.value) })}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>₹10,000</span>
                  <span>₹10,000,00</span>
                  <span>₹20,00,000+ (Custom Input Allowed)</span>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-sm"
                >
                  <ArrowBackIcon className="!text-base" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#0b3d91] hover:bg-[#07265C] text-white font-bold px-6 py-3 rounded-xl shadow transition-all flex items-center gap-2 text-sm"
                >
                  <span>Review Application</span>
                  <ArrowForwardIcon className="!text-base" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Review & Submit */}
          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-3 flex items-center gap-2">
                <CheckCircleIcon className="text-emerald-500" /> Review Input Summary
              </h3>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-xs text-slate-500 block">Selected State</span>
                    <strong className="text-slate-900">
                      {states.find(s => s.id === formData.state_id)?.name || 'Not Selected'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Selected District</span>
                    <strong className="text-slate-900">
                      {districts.find(d => d.id === formData.district_id)?.name || 'Not Selected'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Loan Purpose</span>
                    <strong className="text-indigo-700 font-semibold">
                      {formData.purpose}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Annual Income</span>
                    <strong className="text-[#002869] font-mono">
                      ₹{formData.annual_income.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Project Cost</span>
                    <strong className="text-amber-600 font-mono">
                      ₹{formData.project_cost.toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-5 py-3 rounded-xl transition-all flex items-center gap-2 text-sm"
                >
                  <ArrowBackIcon className="!text-base" />
                  <span>Modify Parameters</span>
                </button>

                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm active:scale-95"
                >
                  <span>Fetch Eligible Schemes</span>
                  <ArrowForwardIcon className="!text-base" />
                </button>
              </div>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
