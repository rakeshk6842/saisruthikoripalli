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

function addWrappedLines(doc, text, x, y, maxWidth, lineHeight) {
  const lines = doc.splitTextToSize(text, maxWidth);
  lines.forEach((line) => {
    doc.text(line, x, y);
    y += lineHeight;
  });
  return y;
}

function addSectionTitle(doc, title, y) {
  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.text(title.toUpperCase(), 20, y);
  doc.setLineWidth(0.4);
  doc.line(20, y + 1.5, 190, y + 1.5);
  return y + 7;
}

function addBullet(doc, text, y) {
  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  doc.text('-', 22, y);
  return addWrappedLines(doc, text, 26, y, 160, 5.2);
}

function buildResumePdf() {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    window.alert('PDF library failed to load. Please refresh and try again.');
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  let y = 20;

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.text('SAI SRUTHI KORIPALLI', 20, y);
  y += 6;

  doc.setFont('times', 'normal');
  doc.setFontSize(10.5);
  y = addWrappedLines(
    doc,
    'Biotechnologist | Email: Saisruthik96@gmail.com | Phone: +91 93815 08688 | LinkedIn: linkedin.com/in/saisruthikoripalli',
    20,
    y,
    170,
    4.8
  );
  y += 2;

  y = addSectionTitle(doc, 'Professional Summary', y);
  y = addWrappedLines(
    doc,
    'Biotechnologist with a Master of Science in Biotechnology and 3+ years of laboratory experience in molecular workflows, automation, and GMP-compliant operations. Skilled in DNA/RNA extraction, PCR/qPCR, serial dilutions, media preparation, sample handling, documentation, and reproducible data delivery.',
    20,
    y,
    170,
    5.2
  );
  y += 2;

  y = addSectionTitle(doc, 'Core Skills', y);
  y = addWrappedLines(
    doc,
    'Media Preparation, Serial Dilutions, Automated Robotic Systems, Pipetting and Calibration, Centrifugation, Sample Processing, Data Analysis, LIMS Documentation, DNA/RNA Extraction, PCR and qPCR, GMP/SOP/GDP, Troubleshooting',
    20,
    y,
    170,
    5.2
  );
  y += 2;

  y = addSectionTitle(doc, 'Professional Experience', y);

  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.text('Laboratory Scientist | Weatherbys Scientific | Jan 2024 - May 2024', 20, y);
  y += 5.2;
  y = addBullet(doc, 'Performed DNA isolation, genotyping, and PCR workflows with precision.', y);
  y = addBullet(doc, 'Conducted sample preparation, pipetting, and calibration checks.', y);
  y = addBullet(doc, 'Maintained compliance with GMP and QMS in daily laboratory activities.', y);
  y += 1.2;

  doc.setFont('times', 'bold');
  doc.text('Laboratory Technician | Nonacus Ltd | Apr 2021 - Apr 2022', 20, y);
  y += 5.2;
  y = addBullet(doc, 'Conducted serial dilutions, nucleic acid extraction, and qPCR analysis.', y);
  y = addBullet(doc, 'Managed media preparation and sample labeling/storage workflows.', y);
  y = addBullet(doc, 'Recorded accurate, traceable data in LIMS and handled robotic systems.', y);
  y += 1.2;

  doc.setFont('times', 'bold');
  doc.text('Specimen Processor | Perkin Elmer Ltd | Dec 2020 - Mar 2021', 20, y);
  y += 5.2;
  y = addBullet(doc, 'Operated centrifuges, robotic systems, and autoclaves at scale.', y);
  y = addBullet(doc, 'Performed accessioning, dilution preparation, and equipment calibration.', y);

  y += 2;
  y = addSectionTitle(doc, 'Education', y);
  y = addWrappedLines(doc, 'Master of Science (MSc) in Biotechnology, Nottingham Trent University', 20, y, 170, 5);
  y = addWrappedLines(doc, 'Classification: Commendation | Grade: 11/12 (approx. 91.67%) | Credits: 180 | Completed: February 2022', 20, y, 170, 5);
  y += 0.5;
  y = addWrappedLines(doc, 'Bachelor of Technology (B.Tech) in Biotechnology, Vignan\'s University', 20, y, 170, 5);
  y = addWrappedLines(doc, 'Classification: Grade B/Good | CGPA: 7.13/10 | Completed: September 2017', 20, y, 170, 5);
  y += 0.5;
  y = addWrappedLines(doc, 'Intermediate: 71.3% | SSC: 80%', 20, y, 170, 5);

  y += 2;
  y = addSectionTitle(doc, 'Certifications', y);
  y = addBullet(doc, 'Artificial Intelligence in Drug Discovery, SilicoScientia (2025)', y);
  y = addBullet(doc, 'Next Generation Sequencing (NGS), WHO (2023)', y);
  y = addBullet(doc, 'Antimicrobial Resistance and Infection Control, WHO (2023)', y);
  y = addBullet(doc, 'ICH Good Clinical Practice (E6 R2), Global Health Network (2022)', y);

  doc.save('Sai_Sruthi_Koripalli_Resume.pdf');
}

const downloadResumeButton = document.getElementById('download-resume');

if (downloadResumeButton) {
  downloadResumeButton.addEventListener('click', buildResumePdf);
}
