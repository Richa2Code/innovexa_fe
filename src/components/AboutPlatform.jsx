import React from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import SecurityIcon from '@mui/icons-material/Security';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';

export default function AboutPlatform() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#002869] text-xs font-semibold">
          <VerifiedIcon className="!text-sm" /> Institutional Trust & Architecture
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-[#Public_Sans]">
          About SchemeSetuAI Platform
        </h2>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">
          Digital Public Infrastructure for concessional credit recommendation under the Ministry of Social Justice & Empowerment.
        </p>
      </div>

      {/* Grid of Key Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0b3d91] flex items-center justify-center">
            <AccountTreeIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900">AI Scoring & Match Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Computes multi-tier suitability vectors based on income limits, project cost boundaries, purpose classification, and localized district channel partner availability.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <SecurityIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Institutional Security & Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Fully compliant with Indian Digital Personal Data Protection (DPDP) standards. No user personal identification data is stored during public eligibility screening.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <AccessibilityNewIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Universal Accessibility Baseline</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Strict adherence to WCAG 2.1 Level AA color contrast, screen-reader semantic markup, keyboard accessibility navigation, and high-contrast color palettes.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#002869] text-white flex items-center justify-center">
            <StorageIcon />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Digital Public Infrastructure (DPI)</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Seamless API integrations connecting State Channelising Agencies (SCAs), Micro-Finance Institutions (NBFC-MFIs), Small Finance Banks (SFBs), and Rural Cooperative Banks.
          </p>
        </div>
      </div>

      {/* System Architecture Diagram / Box */}
      <div className="bg-[#07265C] text-white p-8 rounded-3xl space-y-6 shadow-xl border border-blue-900">
        <h3 className="text-xl font-bold text-white font-[#Public_Sans]">Technical System Stack</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-800 space-y-2">
            <span className="text-amber-400 font-bold block uppercase">Client Layer</span>
            <ul className="space-y-1 text-slate-300">
              <li>• React 19 SPA</li>
              <li>• Tailwind CSS v4</li>
              <li>• Framer Motion</li>
              <li>• Material UI Icons</li>
            </ul>
          </div>

          <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-800 space-y-2">
            <span className="text-amber-400 font-bold block uppercase">API / Backend Layer</span>
            <ul className="space-y-1 text-slate-300">
              <li>• FastAPI / Python 3.11</li>
              <li>• PostgreSQL + PostGIS</li>
              <li>• REST v1 Public Endpoints</li>
              <li>• Dynamic Amortization Math</li>
            </ul>
          </div>

          <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-800 space-y-2">
            <span className="text-amber-400 font-bold block uppercase">Data & Integrations</span>
            <ul className="space-y-1 text-slate-300">
              <li>• NSFDC National Registry</li>
              <li>• Census District Geo Data</li>
              <li>• SCA & MFI Directory</li>
              <li>• Real-time Scoring Matrix</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
