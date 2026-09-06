import { MOCK_COUNTRIES, MOCK_STATES, MOCK_DISTRICTS, MOCK_SCHEMES } from '../data/mockData';

const API_HOST = import.meta.env.VITE_API_BASE_URL || (import.meta.env.DEV ? '' : 'https://innovexa-be.onrender.com');
const BASE_URL = `${API_HOST}/api/v1/public`;

/**
 * Fetch all countries
 */
export async function getCountries() {
  try {
    const response = await fetch(`${BASE_URL}/countries`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch countries failed, fallback to mock:', error);
    return MOCK_COUNTRIES;
  }
}

/**
 * Fetch states for a given country ID
 */
export async function getStates(countryId) {
  try {
    const response = await fetch(`${BASE_URL}/states?country_id=${countryId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch states failed, fallback to mock:', error);
    return MOCK_STATES;
  }
}

/**
 * Fetch districts for a given state ID
 */
export async function getDistricts(stateId) {
  try {
    const response = await fetch(`${BASE_URL}/districts?state_id=${stateId}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch districts failed, fallback to mock:', error);
    return MOCK_DISTRICTS.filter(d => d.state_id === stateId) || MOCK_DISTRICTS;
  }
}

/**
 * Fetch eligible schemes based on user input (project_cost, annual_income, state_id, district_id)
 */
export async function getEligibleSchemes(payload) {
  try {
    const response = await fetch(`${BASE_URL}/schemes/eligible`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch eligible schemes failed, fallback to mock:', error);
    return MOCK_SCHEMES;
  }
}

/**
 * Fetch all public schemes
 */
export async function getAllSchemes() {
  try {
    const response = await fetch(`${BASE_URL}/schemes`, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch all schemes failed, fallback to mock:', error);
    return MOCK_SCHEMES;
  }
}


/**
 * Fetch scheme details by scheme ID and district ID
 */
export async function getSchemeDetails(schemeId, districtId) {
  try {
    const url = districtId
      ? `${BASE_URL}/schemes/${schemeId}?district_id=${districtId}`
      : `${BASE_URL}/schemes/${schemeId}`;
    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API fetch scheme details failed, fallback to mock:', error);
    return MOCK_SCHEMES.find(s => s.id === schemeId) || MOCK_SCHEMES[0];
  }
}

/**
 * Calculate EMI schedule
 */
export async function calculateEMI(payload) {
  try {
    const response = await fetch(`${BASE_URL}/schemes/emi-calculator`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const json = await response.json();
    return json.data || json;
  } catch (error) {
    console.warn('API calculate EMI failed, fallback to local math calculation:', error);
    return computeLocalEMI(payload.loan_amount, payload.interest_rate, payload.tenure_months);
  }
}

/**
 * Client-side EMI fallback calculation
 */
function computeLocalEMI(amount, rate, months) {
  const P = parseFloat(amount) || 0;
  const r = (parseFloat(rate) || 0) / 12 / 100;
  const n = parseInt(months) || 12;

  let emi = 0;
  if (r > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else {
    emi = P / n;
  }

  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  let balance = P;
  const schedule = [];
  for (let m = 1; m <= Math.min(n, 120); m++) {
    const interestPaid = balance * r;
    const principalPaid = emi - interestPaid;
    balance = Math.max(0, balance - principalPaid);
    schedule.push({
      month: m,
      beginning_balance: Math.round((balance + principalPaid) * 100) / 100,
      emi: Math.round(emi * 100) / 100,
      principal_paid: Math.round(principalPaid * 100) / 100,
      interest_paid: Math.round(interestPaid * 100) / 100,
      ending_balance: Math.round(balance * 100) / 100
    });
  }

  return {
    loan_amount: P,
    annual_interest_rate: parseFloat(rate),
    tenure_months: n,
    moratorium_months: 0,
    monthly_emi: Math.round(emi * 100) / 100,
    total_interest_payable: Math.round(totalInterest * 100) / 100,
    total_payment: Math.round(totalPayment * 100) / 100,
    schedule
  };
}
