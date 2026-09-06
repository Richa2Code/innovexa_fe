import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MapIcon from '@mui/icons-material/Map';
import DirectionsIcon from '@mui/icons-material/Directions';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CircularProgress from '@mui/material/CircularProgress';
import { getSchemeDetails, getChannelPartners, getCountries, getStates, getDistricts } from '../services/api';

export default function SchemeDetailsModal({ schemeId, countryId, stateId, districtId, onClose, onCalculateEMI }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // Channel Partners state
  const [channelPartners, setChannelPartners] = useState([]);
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [partnersFetched, setPartnersFetched] = useState(false);
  const [cpCurrentPage, setCpCurrentPage] = useState(1);
  const cpPerPage = 3;
  const [expandedMapId, setExpandedMapId] = useState(null);

  // Popup Modal state for location search
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  // Location selector state in popup
  const [popCountryId, setPopCountryId] = useState(countryId || '');
  const [popStateId, setPopStateId] = useState(stateId || '');
  const [popDistrictId, setPopDistrictId] = useState(districtId || '');

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [loadingPopStates, setLoadingPopStates] = useState(false);
  const [loadingPopDistricts, setLoadingPopDistricts] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getSchemeDetails(schemeId, districtId);
      setDetails(res);
      setLoading(false);

      // Auto-fetch channel partners if location ids are provided
      if (countryId || stateId || districtId) {
        fetchPartners(countryId, stateId, districtId);
      }
    }
    load();
  }, [schemeId, districtId, countryId, stateId]);

  // Function to query channel partners API
  const fetchPartners = async (cId, sId, dId) => {
    setLoadingPartners(true);
    setPartnersFetched(true);
    setCpCurrentPage(1);
    const res = await getChannelPartners({
      countryId: cId || countryId,
      stateId: sId || stateId,
      districtId: dId || districtId,
      schemeId: schemeId
    });
    setChannelPartners(Array.isArray(res) ? res : []);
    setLoadingPartners(false);
  };

  // Load countries when popup opens
  useEffect(() => {
    if (showLocationPopup) {
      async function loadGeo() {
        const cList = await getCountries();
        setCountries(Array.isArray(cList) ? cList : []);
        if (cList.length > 0 && !popCountryId) {
          setPopCountryId(cList[0].id);
        }
      }
      loadGeo();
    }
  }, [showLocationPopup]);

  // Load states when popup country changes
  useEffect(() => {
    if (!showLocationPopup || !popCountryId) return;
    async function loadS() {
      setLoadingPopStates(true);
      const sList = await getStates(popCountryId);
      setStates(Array.isArray(sList) ? sList : []);
      setLoadingPopStates(false);
    }
    loadS();
  }, [showLocationPopup, popCountryId]);

  // Load districts when popup state changes
  useEffect(() => {
    if (!showLocationPopup || !popStateId) return;
    async function loadD() {
      setLoadingPopDistricts(true);
      const dList = await getDistricts(popStateId);
      setDistricts(Array.isArray(dList) ? dList : []);
      setLoadingPopDistricts(false);
    }
    loadD();
  }, [showLocationPopup, popStateId]);

  const handleSearchFromPopup = () => {
    setShowLocationPopup(false);
    fetchPartners(popCountryId, popStateId, popDistrictId);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white max-w-3xl w-full rounded-3xl border border-slate-200 shadow-2xl overflow-hidden my-8 relative"
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
            <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto">
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

              {/* Find Channel Partners Section */}
              <div className="space-y-4 pt-2 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Channel Partners for this Scheme
                    </h4>
                    <p className="text-xs text-slate-500">
                      Find accredited lending institutions, NBFC-MFIs, or banks for loan application.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (!partnersFetched) {
                        fetchPartners(popCountryId, popStateId, popDistrictId);
                      } else {
                        setShowLocationPopup(true);
                      }
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold rounded-xl text-xs shadow transition-all shrink-0 active:scale-95"
                  >
                    <SearchIcon className="!text-sm" />
                    <span>{partnersFetched ? 'Change Location / Search' : 'Find Channel Partner'}</span>
                  </button>
                </div>

                {/* Loading state for partners */}
                {loadingPartners && (
                  <div className="p-6 text-center text-slate-500 text-xs font-medium space-y-2">
                    <CircularProgress size={24} color="primary" />
                    <p>Searching matching channel partners for this scheme...</p>
                  </div>
                )}

                {/* Found Channel Partners Display */}
                {!loadingPartners && partnersFetched && channelPartners.length > 0 && (() => {
                  const totalCpPages = Math.ceil(channelPartners.length / cpPerPage);
                  const indexOfLastCp = cpCurrentPage * cpPerPage;
                  const indexOfFirstCp = indexOfLastCp - cpPerPage;
                  const currentChannelPartners = channelPartners.slice(indexOfFirstCp, indexOfLastCp);

                  return (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-700">
                          Available Channel Partners ({channelPartners.length})
                        </span>
                        <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Verified Outlets
                        </span>
                      </div>

                      {currentChannelPartners.map((cp, idx) => {
                        const cpKey = cp.id || `cp-${idx}`;
                        const isMapOpen = expandedMapId === cpKey;
                        const hasCoords = cp.latitude != null && cp.longitude != null;
                        const mapQuery = hasCoords
                          ? `${cp.latitude},${cp.longitude}`
                          : encodeURIComponent(`${cp.name}, ${cp.address || ''}`);

                        return (
                          <div key={cpKey} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 hover:border-blue-300 transition-colors">
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <strong className="text-sm text-slate-900 font-[#Public_Sans]">{cp.name}</strong>
                                  <span className="text-[10px] font-bold bg-blue-100 text-[#002869] px-2 py-0.5 rounded-full">
                                    {cp.partner_type || cp.type}
                                  </span>
                                  {hasCoords && (
                                    <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                                      <LocationOnIcon className="!text-xs" />
                                      {cp.latitude.toFixed(4)}, {cp.longitude.toFixed(4)}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                  {cp.address ? `${cp.address}, ` : ''}{cp.pincode ? `PIN - ${cp.pincode}` : 'Branch Office'}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 flex-wrap">
                                <button
                                  onClick={() => setExpandedMapId(isMapOpen ? null : cpKey)}
                                  className={`inline-flex items-center gap-1 px-3 py-1.5 font-bold rounded-xl text-xs shadow transition-all cursor-pointer ${isMapOpen
                                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                                    }`}
                                >
                                  <MapIcon className="!text-xs" />
                                  <span>{isMapOpen ? 'Hide Map' : 'View Map'}</span>
                                </button>

                                <a
                                  href={cp.website || cp.source_url || details.source_url || '#'}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0b3d91] hover:bg-[#07265C] text-white font-bold rounded-xl text-xs shadow transition-all shrink-0 active:scale-95"
                                >
                                  <span>Open Partner</span>
                                </a>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200/60">
                              <span className="text-slate-500">Contact / Toll-Free:</span>
                              <span className="text-emerald-700 font-mono font-bold flex items-center gap-1">
                                <PhoneIcon className="!text-xs" /> {cp.phone || cp.contact || '1800-11-0396'}
                              </span>
                            </div>

                            {/* Embedded Interactive Map Drawer */}
                            {isMapOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 rounded-2xl overflow-hidden border border-slate-300 shadow-md bg-slate-100 relative"
                              >
                                <div className="flex items-center justify-between px-3 py-2 bg-[#07265C] text-white text-[11px]">
                                  <span className="flex items-center gap-1 font-semibold truncate max-w-[70%]">
                                    <LocationOnIcon className="!text-xs text-amber-400 shrink-0" />
                                    <span className="truncate">
                                      {hasCoords ? `Coordinates: ${cp.latitude}, ${cp.longitude}` : cp.address}
                                    </span>
                                  </span>
                                  <a
                                    href={`https://www.google.com/maps?q=${mapQuery}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded-lg font-bold transition-all text-[10px] shrink-0"
                                  >
                                    <DirectionsIcon className="!text-xs" />
                                    <span>Get Directions</span>
                                    <OpenInNewIcon className="!text-[10px]" />
                                  </a>
                                </div>

                                <iframe
                                  title={`Map for ${cp.name}`}
                                  width="100%"
                                  height="220"
                                  frameBorder="0"
                                  scrolling="no"
                                  src={`https://maps.google.com/maps?q=${mapQuery}&hl=en&z=15&output=embed`}
                                  className="w-full border-0 rounded-b-2xl"
                                ></iframe>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}

                      {/* Pagination Controls */}
                      {totalCpPages > 1 && (
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-3 border-t border-slate-200 text-xs">
                          <span className="text-slate-500">
                            Showing <strong className="text-slate-800">{indexOfFirstCp + 1}</strong> to{' '}
                            <strong className="text-slate-800">{Math.min(indexOfLastCp, channelPartners.length)}</strong> of{' '}
                            <strong className="text-slate-800">{channelPartners.length}</strong> partners
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setCpCurrentPage((prev) => Math.max(prev - 1, 1))}
                              disabled={cpCurrentPage === 1}
                              className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
                              title="Previous Page"
                            >
                              <ChevronLeftIcon className="!text-sm" />
                            </button>

                            {Array.from({ length: totalCpPages }, (_, i) => i + 1).map((pageNum) => (
                              <button
                                key={pageNum}
                                onClick={() => setCpCurrentPage(pageNum)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${cpCurrentPage === pageNum
                                    ? 'bg-[#002869] text-white shadow-xs'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                  }`}
                              >
                                {pageNum}
                              </button>
                            ))}

                            <button
                              onClick={() => setCpCurrentPage((prev) => Math.min(prev + 1, totalCpPages))}
                              disabled={cpCurrentPage === totalCpPages}
                              className="p-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer disabled:cursor-not-allowed"
                              title="Next Page"
                            >
                              <ChevronRightIcon className="!text-sm" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* No Channel Partner Found Warning & Prompt for Different Location */}
                {!loadingPartners && partnersFetched && channelPartners.length === 0 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center space-y-3">
                    <p className="text-xs text-amber-900 font-semibold">
                      No channel partners found for the selected location for this scheme.
                    </p>
                    <button
                      onClick={() => setShowLocationPopup(true)}
                      className="px-4 py-2 bg-[#0b3d91] text-white font-bold rounded-xl text-xs shadow hover:bg-[#07265C] transition-all"
                    >
                      Find Channel Partner in Different Location
                    </button>
                  </div>
                )}
              </div>

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

          {/* POPUP MODAL: Location Selection for Channel Partner Search */}
          {showLocationPopup && (
            <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl p-6 max-w-md w-full border border-slate-200 shadow-2xl space-y-5"
              >
                <div className="flex items-center justify-between border-b pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <LocationOnIcon className="text-amber-500" /> Select Location for Channel Partner
                  </h3>
                  <button
                    onClick={() => setShowLocationPopup(false)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
                  >
                    <CloseIcon className="!text-sm" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Scheme info auto-selected note */}
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-[#002869]">
                    <span className="font-bold block">Scheme Selected (Under the Hood):</span>
                    <span>{details?.name} (ID: {schemeId})</span>
                  </div>

                  {/* Country Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Country
                    </label>
                    <select
                      value={popCountryId}
                      onChange={(e) => {
                        setPopCountryId(e.target.value);
                        setPopStateId('');
                        setPopDistrictId('');
                      }}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] outline-none"
                    >
                      {countries.map((c) => (
                        <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                      ))}
                    </select>
                  </div>

                  {/* State Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      State / UT
                    </label>
                    <div className="relative">
                      <select
                        value={popStateId}
                        onChange={(e) => {
                          setPopStateId(e.target.value);
                          setPopDistrictId('');
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] outline-none"
                      >
                        <option value="">-- Select State --</option>
                        {states.map((s) => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                      {loadingPopStates && (
                        <div className="absolute right-2 top-2">
                          <CircularProgress size={16} color="primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* District Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      District
                    </label>
                    <div className="relative">
                      <select
                        value={popDistrictId}
                        onChange={(e) => setPopDistrictId(e.target.value)}
                        disabled={!popStateId}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-[#0b3d91] outline-none disabled:opacity-50"
                      >
                        <option value="">-- Select District --</option>
                        {districts.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      {loadingPopDistricts && (
                        <div className="absolute right-2 top-2">
                          <CircularProgress size={16} color="primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3 border-t">
                  <button
                    onClick={() => setShowLocationPopup(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSearchFromPopup}
                    disabled={!popStateId}
                    className="px-5 py-2 bg-[#0b3d91] hover:bg-[#07265C] disabled:opacity-50 text-white text-xs font-bold rounded-xl shadow transition-all"
                  >
                    Find Channel Partner
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

