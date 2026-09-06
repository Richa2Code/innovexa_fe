import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LanguageIcon from '@mui/icons-material/Language';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function Header({ activeTab, setActiveTab, lang, setLang, t }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.overviewNav },
    { id: 'eligibility', label: t.checkEligibilityNav },
    { id: 'results', label: t.schemeMatchesNav },
    { id: 'calculator', label: t.emiCalcNav },
    { id: 'comparison', label: t.comparisonNav },
    { id: 'about', label: t.aboutNav }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#002869] text-white shadow-lg">
      {/* Official Government Top Bar */}
      <div className="bg-[#07265C] border-b border-blue-900/50 py-1.5 px-4 sm:px-8 text-xs font-medium text-slate-300 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {/* Ashoka Lion Emblem Placeholder SVG */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-400">
              <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="currentColor" opacity="0.9"/>
            </svg>
            <span className="font-semibold text-white tracking-wide">{t.govIndia}</span>
          </div>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-300">{t.ministryName}</span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="hidden sm:flex items-center gap-1 text-emerald-400">
            <VerifiedIcon className="!text-sm" /> {t.dpiBadge}
          </span>

          {/* Language Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-blue-950/80 border border-amber-400/40 rounded-lg px-2 py-0.5 text-amber-300">
            <LanguageIcon className="!text-sm text-amber-400" />
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="bg-transparent text-white text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="en" className="bg-[#07265C] text-white">English (EN)</option>
              <option value="hi" className="bg-[#07265C] text-white">हिन्दी (HI)</option>
              <option value="gu" className="bg-[#07265C] text-white">ગુજરાતી (GU)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3px Indian Flag Tricolor Ribbon */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Main Masthead Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center shadow-md border border-blue-400/30 group-hover:scale-105 transition-transform">
            <AccountBalanceIcon className="text-amber-400 !text-2xl" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white font-[#Public_Sans]">
                SchemeSetuAI
              </h1>
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-400/30">
                Civic Portal
              </span>
            </div>
            <p className="text-xs text-blue-200 hidden sm:block">{t.portalSubtitle}</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-blue-950/60 p-1.5 rounded-xl border border-blue-800/40">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-blue-200 hover:text-white hover:bg-blue-900/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute inset-0 bg-[#0b3d91] rounded-lg border border-blue-400/40 shadow-inner"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setActiveTab('eligibility')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 active:scale-95"
          >
            <span>{t.checkEligibilityBtn}</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-lg bg-blue-900/50 text-blue-200 hover:text-white"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#07265C] border-t border-blue-900 px-4 py-4 space-y-2 overflow-hidden"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === item.id
                    ? 'bg-[#0b3d91] text-white font-semibold border-l-4 border-amber-400'
                    : 'text-blue-200 hover:bg-blue-900/40'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-blue-900">
              <button
                onClick={() => {
                  setActiveTab('eligibility');
                  setMobileOpen(false);
                }}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg shadow"
              >
                Check My Eligibility Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
