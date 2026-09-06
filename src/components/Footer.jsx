import React from 'react';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-[#07265C] text-slate-300 pt-12 pb-8 border-t-4 border-[#0b3d91]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Institutional Intro */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <AccountBalanceIcon className="text-amber-400 !text-2xl" />
              <span className="text-xl font-bold text-white tracking-tight">SchemeSetuAI</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              National AI-assisted Concessional Credit & Micro-Finance Scheme Recommendation Infrastructure. Engineered for Digital Public Infrastructure (DPI) compliance.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-2">
              <VerifiedUserIcon className="!text-sm" />
              <span>WCAG 2.1 Level AA Compliant</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  Overview & Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('eligibility')} className="hover:text-amber-400 transition-colors">
                  Check Eligibility Form
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('calculator')} className="hover:text-amber-400 transition-colors">
                  Concessional Loan Calculator
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('comparison')} className="hover:text-amber-400 transition-colors">
                  Scheme Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-amber-400 transition-colors">
                  System Architecture
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Channelising Institutions */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Partner Ecosystem</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>National Scheduled Castes Finance & Dev. Corp (NSFDC)</li>
              <li>State Channelising Agencies (SCAs)</li>
              <li>Selected NBFC-MFIs & SFBs</li>
              <li>Cooperative Banks & Societies</li>
              <li>Regional Rural Banks (RRBs)</li>
            </ul>
          </div>

          {/* Col 4: Trust & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Grievance & Support</h4>
            <p className="text-xs text-slate-300">
              Toll-Free National Helpline:<br />
              <strong className="text-white text-sm">1800-11-0396</strong> (9:30 AM - 6:00 PM)
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400">
              <SecurityIcon className="!text-sm text-blue-400" />
              <span>AES-256 Encrypted Session</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-700/60 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Government of India — SchemeSetuAI Platform. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
            <a href="#disclaimer" className="hover:underline">Hyperlinking Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
