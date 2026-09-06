import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularProgress from '@mui/material/CircularProgress';
import TuneIcon from '@mui/icons-material/Tune';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeOverview from './components/HomeOverview';
import EligibilityForm from './components/EligibilityForm';
import SchemeCard from './components/SchemeCard';
import EMICalculator from './components/EMICalculator';
import SchemeDetailsModal from './components/SchemeDetailsModal';
import ComparisonMatrix from './components/ComparisonMatrix';
import AboutPlatform from './components/AboutPlatform';

import { getEligibleSchemes, getAllSchemes } from './services/api';

import { translations } from './data/translations';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;

  const [activeTab, setActiveTab] = useState('home');
  const [loadingSchemes, setLoadingSchemes] = useState(false);
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [isViewAllMode, setIsViewAllMode] = useState(false);

  // Filter & Search states
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Scheme for Modal & EMI Preset
  const [detailScheme, setDetailScheme] = useState(null);
  const [emiPresetScheme, setEmiPresetScheme] = useState(null);

  // Schemes selected for Side-by-Side Comparison
  const [comparisonSchemes, setComparisonSchemes] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    country_id: '',
    state_id: '',
    district_id: '',
    annual_income: 100000,
    project_cost: 100000
  });

  // Scroll to top whenever activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  // Execute Eligibility Search
  const handleFetchEligibility = async (data) => {
    setFormData(data);
    setIsViewAllMode(false);
    setLoadingSchemes(true);
    setActiveTab('results');
    const schemes = await getEligibleSchemes(data);
    setEligibleSchemes(schemes);
    setLoadingSchemes(false);
  };

  // Fetch All Public Schemes
  const handleFetchAllSchemes = async () => {
    setIsViewAllMode(true);
    setLoadingSchemes(true);
    setActiveTab('results');
    const schemes = await getAllSchemes();
    setEligibleSchemes(schemes);
    setLoadingSchemes(false);
  };

  // Quick Test Search
  const handleQuickSearch = () => {
    handleFetchEligibility(formData);
  };

  // Compare Toggle
  const handleToggleCompare = (scheme) => {
    if (comparisonSchemes.some(s => s.id === scheme.id)) {
      setComparisonSchemes(comparisonSchemes.filter(s => s.id !== scheme.id));
    } else {
      if (comparisonSchemes.length >= 3) {
        alert('You can compare a maximum of 3 schemes simultaneously.');
        return;
      }
      setComparisonSchemes([...comparisonSchemes, scheme]);
    }
  };

  // Open EMI Calculator with Scheme Preset
  const handleOpenEMIWithScheme = (scheme) => {
    setEmiPresetScheme(scheme);
    setActiveTab('calculator');
  };

  // Filter schemes
  const filteredSchemes = eligibleSchemes.filter(s => {
    const matchesCategory = categoryFilter === 'ALL' || s.category.includes(categoryFilter);
    const matchesQuery = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-900">
      {/* Global Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lang={lang}
        setLang={setLang}
        t={t}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <AnimatePresence mode="wait">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <HomeOverview
                setActiveTab={setActiveTab}
                onQuickSearch={handleQuickSearch}
                onViewAllSchemes={handleFetchAllSchemes}
                t={t}
              />
            </motion.div>
          )}

          {/* TAB 2: ELIGIBILITY FORM */}
          {activeTab === 'eligibility' && (
            <motion.div
              key="eligibility"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <EligibilityForm
                onSubmit={handleFetchEligibility}
                initialValues={formData}
                t={t}
              />
            </motion.div>
          )}

          {/* TAB 3: SCHEME MATCH RESULTS */}
          {activeTab === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="space-y-8"
            >
              {/* Header Filter Bar */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 font-[#Public_Sans]">
                      {isViewAllMode ? 'All Available Schemes' : 'Eligible Scheme Recommendations'}
                    </h2>
                    {!isViewAllMode ? (
                      <p className="text-xs text-slate-500">
                        Showing results for Project Cost: <strong className="text-[#002869]">₹{formData.project_cost.toLocaleString('en-IN')}</strong> | Annual Income: <strong className="text-[#002869]">₹{formData.annual_income.toLocaleString('en-IN')}</strong>
                      </p>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Showing all available schemes
                      </p>
                    )}
                  </div>

                  {/* Search Bar */}
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search schemes by name or code..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0b3d91] w-full sm:w-64"
                    />

                    <button
                      onClick={() => setActiveTab('eligibility')}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                      Change Parameters
                    </button>
                  </div>
                </div>

                {/* Filter Category Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t text-xs">
                  <span className="text-slate-400 font-bold flex items-center gap-1 shrink-0">
                    <TuneIcon className="!text-sm" /> Filter:
                  </span>
                  {['ALL', 'Micro Finance', 'Udyam Nidhi', 'Term Loan'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all shrink-0 ${categoryFilter === cat
                          ? 'bg-[#0b3d91] text-white shadow'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid / Loader */}
              {loadingSchemes ? (
                <div className="py-20 text-center space-y-4">
                  <CircularProgress size={40} color="primary" />
                  <p className="text-slate-600 font-semibold text-sm">
                    Evaluating suitability metrics against NSFDC scheme rules...
                  </p>
                </div>
              ) : filteredSchemes.length === 0 ? (
                <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
                  <h3 className="text-xl font-bold text-slate-800">No matching schemes found</h3>
                  <p className="text-slate-500 text-xs max-w-md mx-auto">
                    Try adjusting your search query or parameter limits in the eligibility form.
                  </p>
                  <button
                    onClick={() => {
                      setCategoryFilter('ALL');
                      setSearchQuery('');
                      if (eligibleSchemes.length === 0) handleQuickSearch();
                    }}
                    className="bg-[#0b3d91] text-white font-bold px-6 py-2.5 rounded-xl text-xs"
                  >
                    Reset Filters & Load Default Demo Data
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredSchemes.map((scheme) => (
                    <SchemeCard
                      key={scheme.id}
                      scheme={scheme}
                      onViewDetails={(s) => setDetailScheme(s)}
                      onCalculateEMI={handleOpenEMIWithScheme}
                      onCompare={handleToggleCompare}
                      isSelectedForCompare={comparisonSchemes.some(c => c.id === scheme.id)}
                      hideSuitability={isViewAllMode}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: EMI CALCULATOR */}
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <EMICalculator
                preselectedScheme={emiPresetScheme}
                initialProjectCost={formData?.project_cost}
              />
            </motion.div>
          )}

          {/* TAB 5: COMPARISON MATRIX */}
          {activeTab === 'comparison' && (
            <motion.div
              key="comparison"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <ComparisonMatrix
                selectedSchemes={comparisonSchemes}
                onRemoveScheme={(id) => setComparisonSchemes(comparisonSchemes.filter(c => c.id !== id))}
                onClearAll={() => setComparisonSchemes([])}
                onCalculateEMI={handleOpenEMIWithScheme}
              />
            </motion.div>
          )}

          {/* TAB 6: ABOUT PLATFORM */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <AboutPlatform />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Scheme Details Modal Overlay */}
      {detailScheme && (
        <SchemeDetailsModal
          schemeId={detailScheme.id}
          countryId={formData.country_id}
          stateId={formData.state_id}
          districtId={formData.district_id}
          onClose={() => setDetailScheme(null)}
          onCalculateEMI={handleOpenEMIWithScheme}
        />
      )}

      {/* Floating Comparison Drawer Badge if schemes selected */}
      {comparisonSchemes.length > 0 && activeTab !== 'comparison' && (
        <div className="fixed bottom-6 right-6 z-40">
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setActiveTab('comparison')}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold px-5 py-3 rounded-2xl shadow-2xl border-2 border-amber-300 flex items-center gap-2 text-xs"
          >
            <span>Compare Schemes ({comparisonSchemes.length})</span>
          </motion.button>
        </div>
      )}

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
