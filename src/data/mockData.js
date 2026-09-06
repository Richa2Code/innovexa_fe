export const MOCK_COUNTRIES = [
  {
    id: "6e17c519-e964-4d25-9763-d371b2692617",
    name: "India",
    code: "IN"
  }
];

export const MOCK_STATES = [
  { id: "03bf89e4-2e82-4978-8da3-4cd97aacf51a", name: "Andhra Pradesh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "8313c703-26ca-4055-a465-498c5e15e4fd", name: "Arunachal Pradesh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "b510cd9d-dac6-4595-bda0-244829a15c2a", name: "Assam", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "a2a34363-956f-4a16-93a5-76f3f3b0030e", name: "Bihar", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "b945dcf3-1bb8-4673-97a6-cd6f27b26c1f", name: "Chhattisgarh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "10d53ec1-ab9d-4763-a58f-eada42e680fb", name: "Goa", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "e97f1521-8f64-4de5-943d-0ab2fff603bd", name: "Gujarat", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "8354eedf-a437-454e-a6ef-348c747b9ea7", name: "Haryana", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "22ec30d5-7eac-41e5-8457-07ff90d2f8fc", name: "Himachal Pradesh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "5a396a83-579c-462d-91a5-c7b26363b834", name: "Jharkhand", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "c7afeede-9ab1-4047-9ca5-43ae2175c220", name: "Karnataka", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "e3198818-bee0-4da6-ae17-045be8cb9e2c", name: "Kerala", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "fb1f3952-349d-4b46-b5e5-2208f76711e9", name: "Madhya Pradesh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "4c081d9a-749b-47d9-90a5-cbc84b9343db", name: "Maharashtra", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "1b473505-36ea-4ae5-a660-387d39bec260", name: "Uttar Pradesh", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "cfc02c62-8288-48d9-a2b2-24c854c7e2d4", name: "West Bengal", country_id: "6e17c519-e964-4d25-9763-d371b2692617" },
  { id: "09be603c-cefc-4ea4-acf6-d79aa9c3a847", name: "Delhi", country_id: "6e17c519-e964-4d25-9763-d371b2692617" }
];

export const MOCK_DISTRICTS = [
  { id: "9735dd54-23f2-4387-a743-8152ee50c5ed", name: "Ahmedabad", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "21bbd450-a510-4fc5-95b8-ec197e5659c9", name: "Amreli", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "fd7378c9-9ecd-4783-95e1-d9ff2de5df2a", name: "Anand", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "afa08cda-2bae-4ccc-b272-390fe890bf3e", name: "Gandhinagar", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "79099f66-847b-4b89-8ab0-0120e46ff864", name: "Jamnagar", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "ed92ca9d-8c89-4f43-a78d-18d2ca69f5a8", name: "Rajkot", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "b3e8116f-df4b-465f-bad3-b7d61abcc88f", name: "Surat", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" },
  { id: "13aed27d-6fb3-4bf7-871f-7f3d07e4bbeb", name: "Vadodara", state_id: "e97f1521-8f64-4de5-943d-0ab2fff603bd" }
];

export const MOCK_SCHEMES = [
  {
    id: "1d885c0b-371f-4a76-9358-cb6de0c4e8ea",
    name: "Aajeevika Micro-Finance Yojana",
    code: "NSFDC-AMY",
    category: "Micro Finance (via NBFC-MFI)",
    purpose: "Need-based micro finance for small/micro business activities through NBFC-MFIs",
    description: "NSFDC provides prompt, need-based micro finance to eligible Scheduled Caste persons at reasonable interest rates through selected NBFC-MFIs to pursue small/micro business activities, for projects costing up to Rs. 1.40 lakh.",
    min_project_cost: 0.0,
    max_project_cost: 140000.0,
    finance_percentage: 90.0,
    max_loan_amount: 125000.0,
    nsfdc_interest_rate: 5.0,
    beneficiary_interest_rate: 15.0,
    source_url: "https://nsfdc.nic.in/scheme",
    suitability_score: 82.3,
    suitability_label: "Suitable",
    recommendation_reason: "General purpose scheme match; Priority financial tier (Income ₹100,000); Project cost ₹100,000 fits scheme cost range (₹0 - ₹140,000); Direct channel partner availability in user district.",
    score_breakdown: { purpose_score: 25.0, income_score: 25.0, project_cost_score: 22.3, location_score: 10.0 },
    repayment_rules: [
      {
        id: "8615026c-be8b-4ab1-9dad-05c58cd579f4",
        repayment_frequency: "Quarterly",
        max_repayment_period: "3 years",
        moratorium_period: "3 months",
        condition: "Repaid in quarterly instalments of up to three years from the date of each disbursement, including a 3-month moratorium period."
      }
    ],
    channel_partners: [
      {
        name: "SKS Microfinance / Bharat Financial Inclusion Ltd",
        type: "NBFC-MFI",
        address: "Plot No. 221, Ashram Road, Near Income Tax Circle, Navrangpura",
        pincode: "380009",
        contact: "1800-102-3456",
        website: "https://www.bfil.co.in",
        latitude: 23.0396,
        longitude: 72.5695
      },
      {
        name: "Muthoot Microfin Ltd",
        type: "NBFC-MFI",
        address: "3rd Floor, Silicon Tower, Near Samartheshwar Mahadev Temple, Law Garden, Ellisbridge",
        pincode: "380006",
        contact: "1800-270-0900",
        website: "https://muthootmicrofin.com",
        latitude: 23.0215,
        longitude: 72.5601
      }
    ]
  },
  {
    id: "304dc305-5a58-4736-a310-143097cd24b8",
    name: "Udyam Nidhi Yojana (UNY)",
    code: "NSFDC-UNY",
    category: "Micro Finance (via Cooperative Banks/Societies & Small Finance Banks)",
    purpose: "To support small/micro activities for projects/units costing up to Rs. 5 lakh",
    description: "NSFDC provides loans under Udyam Nidhi Yojana for projects/units costing up to Rs. 5 lakh through Cooperative Societies, Cooperative Banks, and Small Finance Banks (SFBs). NSFDC charges 5% p.a. from the channelising institution; beneficiaries pay 13% - 15% p.a.",
    min_project_cost: 0.0,
    max_project_cost: 500000.0,
    finance_percentage: 90.0,
    max_loan_amount: 450000.0,
    nsfdc_interest_rate: 5.0,
    beneficiary_interest_rate: 13.0,
    source_url: "https://nsfdc.nic.in/scheme",
    suitability_score: 81.2,
    suitability_label: "Suitable",
    recommendation_reason: "General purpose scheme match; Priority financial tier (Income ₹100,000); Project cost ₹100,000 fits scheme cost range (₹0 - ₹500,000); Direct channel partner availability in user district.",
    score_breakdown: { purpose_score: 25.0, income_score: 25.0, project_cost_score: 21.2, location_score: 10.0 },
    repayment_rules: [
      {
        id: "7715026c-be8b-4ab1-9dad-05c58cd579a1",
        repayment_frequency: "Quarterly",
        max_repayment_period: "5 years",
        moratorium_period: "6 months",
        condition: "Repaid in quarterly instalments of up to five years, including a 6-month moratorium period."
      }
    ],
    channel_partners: [
      {
        name: "Gujarat State Co-operative Bank Ltd",
        type: "Cooperative Bank",
        address: "Sahakar Bhavan, Near Shastri Stadium, Relief Road",
        pincode: "380001",
        contact: "079-27544000",
        website: "https://gscbank.co.in",
        latitude: 23.0287,
        longitude: 72.5841
      },
      {
        name: "AU Small Finance Bank",
        type: "SFB",
        address: "Ground Floor, Zodiac Square, Opposite Gurudwara, SG Highway, Bodakdev",
        pincode: "380054",
        contact: "1800-1200-1200",
        website: "https://www.aubank.in",
        latitude: 23.0332,
        longitude: 72.5118
      }
    ]
  },
  {
    id: "456dc305-5a58-4736-a310-993097cd24c9",
    name: "Laghu Vyapari Samriddhi Yojana",
    code: "NSFDC-LVSY",
    category: "Term Loan Scheme",
    purpose: "Financial assistance for establishing retail, transport, and service micro-enterprises",
    description: "Concessional term loans designed to empower rural and urban artisans, traders, and small business entrepreneurs with subsidized credit and training support.",
    min_project_cost: 50000.0,
    max_project_cost: 1000000.0,
    finance_percentage: 95.0,
    max_loan_amount: 950000.0,
    nsfdc_interest_rate: 3.5,
    beneficiary_interest_rate: 6.0,
    source_url: "https://nsfdc.nic.in/scheme",
    suitability_score: 94.5,
    suitability_label: "Highly Recommended",
    recommendation_reason: "High priority match for small traders; Income under threshold; Low interest tier.",
    score_breakdown: { purpose_score: 28.0, income_score: 28.0, project_cost_score: 28.5, location_score: 10.0 },
    repayment_rules: [
      {
        id: "9915026c-be8b-4ab1-9dad-05c58cd579b2",
        repayment_frequency: "Monthly",
        max_repayment_period: "7 years",
        moratorium_period: "6 months",
        condition: "Repayable over 7 years in equal monthly installments with a 6-month moratorium."
      }
    ],
    channel_partners: [
      {
        name: "Bank of Baroda - Lead District Branch",
        type: "Public Sector Bank",
        address: "Baroda Bhavan, R.C. Dutt Road, Alkapuri",
        pincode: "390007",
        contact: "1800-180-2222",
        website: "https://www.bankofbaroda.in",
        latitude: 22.3107,
        longitude: 73.1702
      }
    ]
  }
];
