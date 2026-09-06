import React from 'react';
import { motion } from 'framer-motion';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PercentIcon from '@mui/icons-material/Percent';
import SecurityIcon from '@mui/icons-material/Security';

export default function HomeOverview({ setActiveTab, onQuickSearch, onViewAllSchemes, t }) {
  const stats = [
    { label: t.statActiveSchemes, value: '45+', sub: t.statActiveSchemesSub },
    { label: t.statMaxCost, value: '₹5.00 Lakh', sub: t.statMaxCostSub },
    { label: t.statInterest, value: '3.5% - 15%', sub: t.statInterestSub },
    { label: t.statPartners, value: '700+', sub: t.statPartnersSub },
  ];

  const categories = [
    { title: 'Micro Finance (NBFC-MFI)', desc: 'Need-based micro loans for small business activities up to ₹1.40 Lakh.' },
    { title: 'Udyam Nidhi Yojana', desc: 'Support for projects up to ₹5.00 Lakh through SFBs & Cooperative Banks.' },
    { title: 'Term Loan Schemes', desc: 'Subsidized long-term credit for small traders, artisans & service units.' },
    { title: 'Women Entrepreneurship', desc: 'Specialized low-interest credit facilities for women micro-entrepreneurs.' }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002869] via-[#0b3d91] to-[#07265C] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-blue-800/50">
        {/* Background Decorative Graphic Pattern */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/30"
          >
            <VerifiedIcon className="!text-sm" />
            <span>{t.dpiHeroBadge}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white font-[#Public_Sans]"
          >
            {t.heroTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-200 text-base sm:text-lg leading-relaxed"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => setActiveTab('eligibility')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-sm active:scale-95"
            >
              <span>{t.quickCheckBtn}</span>
              <ArrowForwardIcon className="!text-lg" />
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className="bg-blue-900/60 hover:bg-blue-900/90 text-white font-semibold px-6 py-3.5 rounded-xl border border-blue-400/30 transition-all flex items-center gap-2 text-sm active:scale-95"
            >
              <CalculateIcon className="!text-lg text-amber-400" />
              <span>{t.calculateEmiBtn}</span>
            </button>

            <button
              onClick={onQuickSearch}
              className="bg-white/10 hover:bg-white/20 text-blue-100 font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition-all text-sm"
            >
              {t.quickTestSearchBtn}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-2xl sm:text-3xl font-extrabold text-[#002869] font-mono mb-1">
              {stat.value}
            </div>
            <div className="text-sm font-semibold text-slate-800 mb-1">{stat.label}</div>
            <div className="text-xs text-slate-500">{stat.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Category Explorer */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Scheme Categories</h2>
            <p className="text-sm text-slate-600">Explore financial assistance tailored by financing channel and purpose</p>
          </div>
          <button
            onClick={onViewAllSchemes || onQuickSearch}
            className="text-sm font-bold text-[#0b3d91] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Schemes <ArrowForwardIcon className="!text-sm" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              whileHover={{ y: -4 }}
              className="bg-slate-50 hover:bg-blue-50/50 p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0b3d91] flex items-center justify-center mb-4">
                  {idx === 0 && <AccountBalanceIcon />}
                  {idx === 1 && <PercentIcon />}
                  {idx === 2 && <CalculateIcon />}
                  {idx === 3 && <SecurityIcon />}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>

              <button
                onClick={() => setActiveTab('eligibility')}
                className="mt-6 text-xs font-bold text-[#0b3d91] hover:text-amber-600 flex items-center gap-1"
              >
                Apply under category <ArrowForwardIcon className="!text-xs" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Institutional Process Steps */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">How SchemeSetuAI Works</h2>
          <p className="text-slate-400 text-sm">3 simple steps to discover eligible concessional loan programs in your district</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-3 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-100">Enter Location & Budget</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Select your Country, State, and District along with your estimated project cost and annual family income.
            </p>
          </div>

          <div className="space-y-3 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-100">AI Recommendation Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our algorithm computes suitability scores based on scheme financial caps, location availability, and interest rates.
            </p>
          </div>

          <div className="space-y-3 bg-slate-800/60 p-6 rounded-2xl border border-slate-700">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold text-sm flex items-center justify-center">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-100">Connect with Channel Partners</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Review repayment terms, calculate monthly EMIs, and contact designated Banks or NBFC-MFIs in your district.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
