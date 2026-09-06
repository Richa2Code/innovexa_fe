import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates and downloads a beautifully styled PDF EMI Amortization Schedule
 */
export function generateEMIPDF({ loanAmount, interestRate, tenureMonths, emiData, scheme }) {
  if (!emiData || !emiData.schedule) return;

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // 1. Top Header Banner (Deep Navy Blue #002869)
  doc.setFillColor(0, 40, 105); // #002869
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand Name
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('SchemeSetuAI', 14, 13);

  // Portal Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(219, 234, 254); // blue-100
  doc.text('Civic Financial Portal | Official Loan Repayment Schedule', 14, 20);

  // Document Badge on Right
  doc.setFillColor(11, 61, 145);
  doc.roundedRect(pageWidth - 60, 8, 46, 12, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 215, 0); // Amber/Gold
  doc.text('REPAYMENT REPORT', pageWidth - 37, 14.5, { align: 'center' });

  // 2. Indian Tricolor Accent Strip
  const stripeY = 28;
  const stripeWidth = pageWidth / 3;
  // Saffron #FF9933
  doc.setFillColor(255, 153, 51);
  doc.rect(0, stripeY, stripeWidth, 1.5, 'F');
  // White #FFFFFF
  doc.setFillColor(255, 255, 255);
  doc.rect(stripeWidth, stripeY, stripeWidth, 1.5, 'F');
  // Green #138808
  doc.setFillColor(19, 136, 8);
  doc.rect(stripeWidth * 2, stripeY, stripeWidth, 1.5, 'F');

  let currentY = 36;

  // 3. Document Info Bar
  const today = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const docRef = `REF-EMI-${Math.floor(100000 + Math.random() * 900000)}`;

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFont('helvetica', 'normal');
  doc.text(`Generated Date: ${today}`, 14, currentY);
  doc.text(`Reference ID: ${docRef}`, pageWidth - 14, currentY, { align: 'right' });

  currentY += 6;

  // 4. Scheme Info Card
  doc.setFillColor(248, 250, 252); // slate-50
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.roundedRect(14, currentY, pageWidth - 28, scheme ? 18 : 12, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42); // slate-900
  const schemeTitle = scheme ? `Scheme: ${scheme.name} (${scheme.code || 'NSFDC'})` : 'Custom Concessional Loan EMI Simulation';
  doc.text(schemeTitle, 18, currentY + 7);

  if (scheme && scheme.category) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Category: ${scheme.category}`, 18, currentY + 13);
  }

  currentY += scheme ? 22 : 16;

  // 5. Loan Key Metrics Summary Grid (2x3 cards)
  const formatRs = (val) => `Rs. ${(val || 0).toLocaleString('en-IN')}`;

  const metrics = [
    { label: 'Sanctioned Loan Amount', value: formatRs(emiData.loan_amount || loanAmount) },
    { label: 'Beneficiary Interest Rate', value: `${interestRate}% p.a.` },
    { label: 'Repayment Tenure', value: `${tenureMonths} Months (${(tenureMonths / 12).toFixed(1)} Yrs)` },
    { label: 'Monthly EMI Installment', value: formatRs(emiData.monthly_emi) },
    { label: 'Total Interest Payable', value: formatRs(emiData.total_interest_payable) },
    { label: 'Total Payable Amount', value: formatRs(emiData.total_payment) }
  ];

  const colWidth = (pageWidth - 28 - 8) / 3; // 3 columns
  const cardHeight = 16;

  metrics.forEach((m, idx) => {
    const col = idx % 3;
    const row = Math.floor(idx / 3);
    const x = 14 + col * (colWidth + 4);
    const y = currentY + row * (cardHeight + 3);

    doc.setFillColor(idx === 3 ? 240 : 248, idx === 3 ? 249 : 250, idx === 3 ? 255 : 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(x, y, colWidth, cardHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, x + 4, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    if (idx === 3) {
      doc.setTextColor(11, 61, 145); // Deep Blue for EMI
    } else if (idx === 4) {
      doc.setTextColor(180, 83, 9); // Amber for Interest
    } else if (idx === 5) {
      doc.setTextColor(4, 120, 87); // Emerald for Total
    } else {
      doc.setTextColor(15, 23, 42);
    }
    doc.text(m.value, x + 4, y + 12);
  });

  currentY += (cardHeight * 2) + 10;

  // 6. Section Heading for Amortization Schedule
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Complete Monthly Amortization Breakup Schedule', 14, currentY);

  currentY += 4;

  // 7. Generate Table with jspdf-autotable
  const tableRows = (emiData.schedule || []).map(row => [
    row.month.toString(),
    `Rs. ${row.beginning_balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    `Rs. ${row.emi.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    `Rs. ${row.principal_paid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    `Rs. ${row.interest_paid.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`,
    `Rs. ${row.ending_balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Month', 'Opening Bal.', 'Monthly EMI', 'Principal Paid', 'Interest Paid', 'Closing Bal.']],
    body: tableRows,
    theme: 'grid',
    headStyles: {
      fillColor: [0, 40, 105],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'center',
      cellPadding: 2.5
    },
    bodyStyles: {
      fontSize: 7.5,
      textColor: [51, 65, 85],
      cellPadding: 2
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 16 },
      1: { halign: 'right' },
      2: { halign: 'right', fontStyle: 'bold', textColor: [11, 61, 145] },
      3: { halign: 'right', textColor: [4, 120, 87] },
      4: { halign: 'right', textColor: [180, 83, 9] },
      5: { halign: 'right' }
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252]
    },
    margin: { left: 14, right: 14, bottom: 18 },
    didDrawPage: (data) => {
      // Page Footer on every page
      const totalPages = doc.internal.getNumberOfPages();
      const currentPage = data.pageNumber;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(148, 163, 184);

      // Disclaimer
      doc.text(
        'Disclaimer: This EMI calculation is an institutional estimate provided for planning purposes. Final repayment terms are subject to SCA approval.',
        14,
        pageHeight - 8
      );

      // Page numbers
      doc.text(`Page ${currentPage} of ${totalPages}`, pageWidth - 14, pageHeight - 8, { align: 'right' });
    }
  });

  // Save the PDF
  const filename = scheme
    ? `EMI_Schedule_${(scheme.code || 'Scheme').replace(/[^a-zA-Z0-9]/g, '_')}_Rs${loanAmount}.pdf`
    : `EMI_Schedule_Rs${loanAmount}.pdf`;

  doc.save(filename);
}
