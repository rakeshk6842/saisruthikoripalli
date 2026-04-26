const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -20px 0px',
  }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 80, 320)}ms`;
  observer.observe(item);
});

function buildResumePdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert('PDF library failed to load. Please refresh and try again.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = 174;
  const sectionGap = 5.5;
  const lineGap = 4.7;
  const bulletGap = 4.9;
  let y = margin;

  const ensureSpace = (required = 10) => {
    if (y + required > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
  };

  const drawTextBlock = (text, x = margin, width = contentWidth, gap = lineGap) => {
    const lines = doc.splitTextToSize(text, width);
    lines.forEach((line) => {
      ensureSpace(gap + 1);
      doc.text(line, x, y);
      y += gap;
    });
  };

  const drawSection = (title) => {
    ensureSpace(12);
    y += 1;
    doc.setFont('times', 'bold');
    doc.setFontSize(11.7);
    doc.text(title.toUpperCase(), margin, y);
    y += 1.4;
    doc.setLineWidth(0.35);
    doc.line(margin, y, margin + contentWidth, y);
    y += sectionGap;
  };

  const drawRole = (text) => {
    ensureSpace(8);
    doc.setFont('times', 'bold');
    doc.setFontSize(10.8);
    drawTextBlock(text, margin, contentWidth, lineGap);
    y += 0.3;
  };

  const drawBullet = (text) => {
    const bulletX = margin + 1.2;
    const textX = margin + 5;
    const maxWidth = contentWidth - 5;
    const lines = doc.splitTextToSize(text, maxWidth);

    ensureSpace(bulletGap + 1);
    doc.setFont('times', 'normal');
    doc.setFontSize(10.4);
    doc.text('-', bulletX, y);
    lines.forEach((line, idx) => {
      if (idx > 0) {
        ensureSpace(bulletGap + 1);
      }
      doc.text(line, textX, y);
      y += bulletGap;
    });
  };

  doc.setFont('times', 'bold');
  doc.setFontSize(18.5);
  doc.text('SAI SRUTHI KORIPALLI', margin, y);
  y += 6.2;

  doc.setFont('times', 'normal');
  doc.setFontSize(10.2);
  drawTextBlock(
    'Biotechnologist | Saisruthik96@gmail.com | +91 93815 08688 | linkedin.com/in/saisruthikoripalli',
    margin,
    contentWidth,
    4.5
  );
  y += 1.8;

  drawSection('Professional Summary');
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  drawTextBlock(
    'Biotechnologist with a Master of Science in Biotechnology and 3+ years of hands-on laboratory experience across molecular workflows, automation, and GMP-compliant operations. Skilled in media preparation, serial dilutions, DNA/RNA extraction, PCR/qPCR, sample processing, and high-quality documentation that supports reproducible outcomes.'
  );

  drawSection('Core Skills');
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  drawTextBlock(
    'Media Preparation, Serial Dilutions, Automated Robotic Systems, Pipetting and Calibration, Centrifugation, Sample Processing, Data Analysis, LIMS Documentation, DNA/RNA Extraction, PCR and qPCR, GMP/SOP/GDP, Troubleshooting'
  );

  drawSection('Professional Experience');
  drawRole('Laboratory Scientist | Weatherbys Scientific | Kildare, Ireland | Jan 2024 - May 2024');
  drawBullet('Performed DNA isolation, genotyping, and PCR workflows with precision.');
  drawBullet('Conducted sample preparation, pipetting, and calibration checks.');
  drawBullet('Maintained compliance with GMP and QMS in daily lab activities.');
  drawBullet('Supported troubleshooting and root cause analysis for deviations.');
  y += 1.2;

  drawRole('Laboratory Technician | Nonacus Ltd | Birmingham, UK | Apr 2021 - Apr 2022');
  drawBullet('Conducted serial dilutions, nucleic acid extraction, and qPCR analysis.');
  drawBullet('Managed media preparation and sample labeling/storage workflows.');
  drawBullet('Recorded accurate, traceable data in LIMS.');
  drawBullet('Handled automated robotic systems for high-throughput processing.');
  y += 1.2;

  drawRole('Specimen Processor | Perkin Elmer Ltd | Loughborough, UK | Dec 2020 - Mar 2021');
  drawBullet('Operated centrifuges, robotic systems, and autoclaves at scale.');
  drawBullet('Performed accessioning, dilution preparation, and equipment calibration.');
  drawBullet('Maintained lab inventory and upheld safe chemical handling standards.');

  drawSection('Education');
  doc.setFont('times', 'bold');
  doc.setFontSize(10.8);
  drawTextBlock('Master of Science (MSc) in Biotechnology - Nottingham Trent University', margin, contentWidth, lineGap);
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  drawTextBlock('Classification: Commendation', margin + 3, contentWidth - 3, lineGap);
  drawTextBlock('Grade: 11/12 (approx. 91.67%)', margin + 3, contentWidth - 3, lineGap);
  drawTextBlock('Credits: 180', margin + 3, contentWidth - 3, lineGap);
  drawTextBlock('Completed: February 2022', margin + 3, contentWidth - 3, lineGap);
  y += 0.9;

  doc.setFont('times', 'bold');
  doc.setFontSize(10.8);
  drawTextBlock("Bachelor of Technology (B.Tech) in Biotechnology - Vignan's University", margin, contentWidth, lineGap);
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  drawTextBlock('Classification: Grade B / Good', margin + 3, contentWidth - 3, lineGap);
  drawTextBlock('CGPA: 7.13/10', margin + 3, contentWidth - 3, lineGap);
  drawTextBlock('Completed: September 2017', margin + 3, contentWidth - 3, lineGap);
  y += 0.9;

  doc.setFont('times', 'bold');
  doc.setFontSize(10.7);
  drawTextBlock('Intermediate', margin, contentWidth, lineGap);
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  drawTextBlock('Score: 71.3%', margin + 3, contentWidth - 3, lineGap);

  doc.setFont('times', 'bold');
  doc.setFontSize(10.7);
  drawTextBlock('SSC', margin, contentWidth, lineGap);
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  drawTextBlock('Score: 80%', margin + 3, contentWidth - 3, lineGap);

  drawSection('Certifications');
  drawBullet('Artificial Intelligence in Drug Discovery - SilicoScientia (2025)');
  drawBullet('Next Generation Sequencing (NGS) - WHO (2023)');
  drawBullet('Antimicrobial Resistance and Infection Control - WHO (2023)');
  drawBullet('ICH Good Clinical Practice (E6 R2) - Global Health Network (2022)');

  drawSection('Interpersonal Skills');
  drawBullet('Punctuality, Honesty, Flexibility.');
  drawBullet('Good Team-worker.');
  drawBullet('Ability to learn fast and deliver.');
  drawBullet('Good Communication Skills.');

  drawSection('Personal Information');
  doc.setFont('times', 'normal');
  doc.setFontSize(10.4);
  drawTextBlock('Date of Birth:');
  drawTextBlock("Father's name: Satyanarayana Koripella");
  drawTextBlock('Languages Known: English, Hindi and Telugu.');
  drawTextBlock('Permanent Address:');

  drawSection('Declaration');
  drawTextBlock('I hereby declare that the above information provided by me is true to the best of my knowledge.');
  y += 3;
  ensureSpace(8);
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  doc.text('Place: Hyderabad', margin, y);
  doc.setFont('times', 'bold');
  doc.setFontSize(10.8);
  doc.text('(Sai Sruthi Koripalli)', margin + contentWidth, y, { align: 'right' });

  doc.save('Sai_Sruthi_Koripalli_Resume.pdf');
}

function buildResumeDoc() {
  const resumeHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Sai Sruthi Koripalli Resume</title>
  <style>
    @page { size: A4; margin: 1in; }
    body {
      font-family: "Times New Roman", serif;
      font-size: 12pt;
      line-height: 1.35;
      color: #111111;
      margin: 0;
    }
    h1 {
      font-size: 20pt;
      margin: 0 0 6pt;
      letter-spacing: 0.4pt;
    }
    .contact {
      font-size: 10.5pt;
      margin-bottom: 14pt;
    }
    h2 {
      font-size: 12pt;
      text-transform: uppercase;
      margin: 12pt 0 6pt;
      border-bottom: 1px solid #222222;
      padding-bottom: 2pt;
      letter-spacing: 0.2pt;
    }
    p {
      margin: 0 0 6pt;
    }
    .role {
      font-weight: bold;
      margin-top: 7pt;
      margin-bottom: 2pt;
    }
    ul {
      margin: 2pt 0 8pt 18pt;
      padding: 0;
    }
    li {
      margin-bottom: 3pt;
    }
    .edu-item {
      margin-bottom: 8pt;
    }
    .space-top {
      margin-top: 14pt;
    }
    .declaration-row {
      width: 100%;
      border-collapse: collapse;
      margin-top: 14pt;
    }
    .declaration-row td {
      padding: 0;
      vertical-align: top;
    }
    .declaration-row .right {
      text-align: right;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>SAI SRUTHI KORIPALLI</h1>
  <div class="contact">
    Biotechnologist | Email: Saisruthik96@gmail.com | Phone: +91 93815 08688 | LinkedIn: linkedin.com/in/saisruthikoripalli
  </div>

  <h2>Professional Summary</h2>
  <p>
    Biotechnologist with a Master of Science in Biotechnology and 3+ years of hands-on laboratory experience across molecular workflows,
    automation, and GMP-compliant operations. Skilled in media preparation, serial dilutions, DNA/RNA extraction, PCR/qPCR, sample processing,
    and high-quality documentation that supports reproducible outcomes.
  </p>

  <h2>Core Skills</h2>
  <p>
    Media Preparation, Serial Dilutions, Automated Robotic Systems, Pipetting and Calibration, Centrifugation, Sample Processing,
    Data Analysis, LIMS Documentation, DNA/RNA Extraction, PCR and qPCR, GMP/SOP/GDP, Troubleshooting
  </p>

  <h2>Professional Experience</h2>
  <p class="role">Laboratory Scientist | Weatherbys Scientific | Kildare, Ireland | Jan 2024 - May 2024</p>
  <ul>
    <li>Performed DNA isolation, genotyping, and PCR workflows with precision.</li>
    <li>Conducted sample preparation, pipetting, and calibration checks.</li>
    <li>Maintained compliance with GMP and QMS in daily lab activities.</li>
    <li>Supported troubleshooting and root cause analysis for deviations.</li>
  </ul>

  <p class="role">Laboratory Technician | Nonacus Ltd | Birmingham, UK | Apr 2021 - Apr 2022</p>
  <ul>
    <li>Conducted serial dilutions, nucleic acid extraction, and qPCR analysis.</li>
    <li>Managed media preparation and sample labeling/storage workflows.</li>
    <li>Recorded accurate, traceable data in LIMS.</li>
    <li>Handled automated robotic systems for high-throughput processing.</li>
  </ul>

  <p class="role">Specimen Processor | Perkin Elmer Ltd | Loughborough, UK | Dec 2020 - Mar 2021</p>
  <ul>
    <li>Operated centrifuges, robotic systems, and autoclaves at scale.</li>
    <li>Performed accessioning, dilution preparation, and equipment calibration.</li>
    <li>Maintained lab inventory and upheld safe chemical handling standards.</li>
  </ul>

  <h2>Education</h2>
  <div class="edu-item">
    <p><strong>Master of Science (MSc) in Biotechnology</strong> - Nottingham Trent University</p>
    <p><strong>Classification:</strong> Commendation</p>
    <p><strong>Grade:</strong> 11/12 (approx. 91.67%)</p>
    <p><strong>Credits:</strong> 180</p>
    <p><strong>Completed:</strong> February 2022</p>
  </div>
  <div class="edu-item">
    <p><strong>Bachelor of Technology (B.Tech) in Biotechnology</strong> - Vignan's University</p>
    <p><strong>Classification:</strong> Grade B / Good</p>
    <p><strong>CGPA:</strong> 7.13/10</p>
    <p><strong>Completed:</strong> September 2017</p>
  </div>
  <div class="edu-item">
    <p><strong>Intermediate:</strong> 71.3%</p>
    <p><strong>SSC:</strong> 80%</p>
  </div>

  <h2>Certifications</h2>
  <ul>
    <li>Artificial Intelligence in Drug Discovery - SilicoScientia (2025)</li>
    <li>Next Generation Sequencing (NGS) - WHO (2023)</li>
    <li>Antimicrobial Resistance and Infection Control - WHO (2023)</li>
    <li>ICH Good Clinical Practice (E6 R2) - Global Health Network (2022)</li>
  </ul>

  <h2>Interpersonal Skills</h2>
  <ul>
    <li>Punctuality, Honesty, Flexibility.</li>
    <li>Good Team-worker.</li>
    <li>Ability to learn fast and deliver.</li>
    <li>Good Communication Skills.</li>
  </ul>

  <h2>Personal Information</h2>
  <p><strong>Date of Birth:</strong></p>
  <p><strong>Father's name:</strong> Satyanarayana Koripella</p>
  <p><strong>Languages Known:</strong> English, Hindi and Telugu.</p>
  <p><strong>Permanent Address:</strong></p>

  <h2>Declaration</h2>
  <p>I hereby declare that the above information provided by me is true to the best of my knowledge.</p>
  <table class="declaration-row" role="presentation">
    <tr>
      <td>Place: Hyderabad</td>
      <td class="right">(Sai Sruthi Koripalli)</td>
    </tr>
  </table>
</body>
</html>`;

  const blob = new Blob(['\ufeff', resumeHtml], {
    type: 'application/msword;charset=utf-8',
  });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'Sai_Sruthi_Koripalli_Resume.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

const downloadResumePdfButton = document.getElementById('download-resume-pdf');
const downloadResumeDocButton = document.getElementById('download-resume-doc');

if (downloadResumePdfButton) {
  downloadResumePdfButton.addEventListener('click', buildResumePdf);
}

if (downloadResumeDocButton) {
  downloadResumeDocButton.addEventListener('click', buildResumeDoc);
}
