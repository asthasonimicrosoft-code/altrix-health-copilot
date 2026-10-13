export const patientProfile = {
  id: "ALT-89241-EV",
  name: "Elena Vance",
  age: 34,
  biologicalAge: 28.4,
  gender: "Female",
  bloodType: "A+",
  height: "172 cm (5'8\")",
  weight: "62.5 kg (137.8 lbs)",
  bmi: 21.1,
  healthScore: 94,
  healthScoreDelta: "+3.2%",
  ehrProvider: "Epic MyChart (HL7/FHIR Synced)",
  lastSync: "Today, 10:42 AM",
  activeSensors: ["Apple Health Series 9", "Oura Ring Gen 3", "Dexcom G7 Continuous Glucose"],
  primaryPhysician: "Dr. Aris Thorne, MD (Cardiometabolic Specialist)",
  summaryBadge: "Metabolically Resilient",
  riskLevel: "Low Risk • Longevity Optimized"
};

export const organsData = {
  brain: {
    id: "brain",
    name: "Brain & Neurological",
    system: "Neural / Central Nervous System",
    position: [0, 2.7, 0],
    status: "optimal",
    statusText: "Optimal Cognitive Function",
    score: 96,
    color: "#a855f7",
    metrics: [
      { name: "Cognitive Processing Index", value: "98/100", status: "Optimal" },
      { name: "Deep Sleep Ratio", value: "24.2%", status: "Optimal (Target >20%)" },
      { name: "REM Architecture", value: "26.5%", status: "Optimal" },
      { name: "Autonomic Stress Index", value: "22/100", status: "Low Stress" },
      { name: "Circadian Synchronization", value: "96%", status: "High Alignment" }
    ],
    copilotInsight: "REM sleep cycles and prefrontal recovery metrics show steady improvement (+14%) since initiating evening Magnesium L-Threonate protocol.",
    recentLabs: [
      { test: "BDNF (Brain-Derived Neurotrophic Factor)", value: "28.4 ng/mL", normal: "18 - 32 ng/mL", flag: "normal" },
      { test: "Cortisol (Morning 8 AM)", value: "14.2 µg/dL", normal: "6.2 - 19.4 µg/dL", flag: "normal" }
    ]
  },
  heart: {
    id: "heart",
    name: "Cardiovascular System",
    system: "Circulatory & Endothelial",
    position: [0.15, 1.45, 0.15],
    status: "optimal",
    statusText: "Vascular Elasticity Excellent",
    score: 93,
    color: "#ff3b69",
    metrics: [
      { name: "Resting Heart Rate", value: "54 bpm", status: "Athletic Baseline" },
      { name: "Heart Rate Variability (HRV)", value: "72 ms", status: "High Parasympathetic Tone" },
      { name: "Blood Pressure", value: "114 / 74 mmHg", status: "Ideal Homeostasis" },
      { name: "Pulse Wave Velocity (Arterial Age)", value: "5.8 m/s", status: "Equivalent to Age 26" },
      { name: "Cardiorespiratory Fitness (VO2 Max)", value: "46.8 ml/kg/min", status: "Top 10th Percentile" }
    ],
    copilotInsight: "Your resting heart rate dropped from 59 to 54 bpm over the last 90 days. High HRV confirms robust sympathetic recovery from Zone 2 cardio.",
    recentLabs: [
      { test: "Apolipoprotein B (ApoB)", value: "68 mg/dL", normal: "< 80 mg/dL", flag: "optimal" },
      { test: "High-Sensitivity CRP (hs-CRP)", value: "0.42 mg/L", normal: "< 1.0 mg/L", flag: "low-risk" },
      { test: "Lipoprotein(a)", value: "18 nmol/L", normal: "< 75 nmol/L", flag: "normal" }
    ]
  },
  lungs: {
    id: "lungs",
    name: "Respiratory & Gas Exchange",
    system: "Pulmonary System",
    position: [-0.05, 1.5, 0.05],
    status: "optimal",
    statusText: "Peak Gas Exchange & Capacity",
    score: 95,
    color: "#00f2fe",
    metrics: [
      { name: "SpO2 (Blood Oxygen)", value: "99%", status: "Optimal Saturation" },
      { name: "Respiratory Rate", value: "13.4 brpm", status: "Calm / Baseline" },
      { name: "FEV1 / FVC Ratio", value: "84%", status: "Clear Airway Conductance" },
      { name: "Nitric Oxide Pulmonary Flux", value: "Normal", status: "Vasodilated" }
    ],
    copilotInsight: "Zero nocturnal desaturation events recorded on continuous pulse oximetry. Breathing rate during deep sleep averaged a calm 12.8 brpm.",
    recentLabs: [
      { test: "Arterial Oxygen Partial Pressure (PaO2)", value: "96 mmHg", normal: "80 - 100 mmHg", flag: "normal" },
      { test: "Venous Total CO2", value: "25 mEq/L", normal: "23 - 29 mEq/L", flag: "normal" }
    ]
  },
  liver: {
    id: "liver",
    name: "Hepatic & Metabolic Engine",
    system: "Metabolic, Detoxification & Lipid Synthesis",
    position: [-0.3, 0.95, 0.1],
    status: "good",
    statusText: "Metabolic Clearance Stable",
    score: 91,
    color: "#00e699",
    metrics: [
      { name: "Fasting Blood Glucose", value: "84 mg/dL", status: "Optimal Glycemic Control" },
      { name: "Continuous Glucose (Mean GMI)", value: "92 mg/dL", status: "No Postprandial Spikes" },
      { name: "Glycated Hemoglobin (HbA1c)", value: "5.0%", status: "Ideal Longevity Range" },
      { name: "Homeostatic Insulin Resistance (HOMA-IR)", value: "0.85", status: "High Insulin Sensitivity" }
    ],
    copilotInsight: "Hepatic enzyme levels normalized following elimination of ultra-processed seed oils and titration of Milk Thistle & NAC supplementation.",
    recentLabs: [
      { test: "Alanine Aminotransferase (ALT)", value: "19 U/L", normal: "7 - 35 U/L", flag: "normal" },
      { test: "Aspartate Aminotransferase (AST)", value: "18 U/L", normal: "10 - 40 U/L", flag: "normal" },
      { test: "Gamma-Glutamyl Transferase (GGT)", value: "14 U/L", normal: "5 - 38 U/L", flag: "optimal" },
      { test: "Fasting Insulin", value: "3.8 µIU/mL", normal: "2.6 - 15.0 µIU/mL", flag: "optimal" }
    ]
  },
  kidneys: {
    id: "kidneys",
    name: "Renal & Electrolyte Filtration",
    system: "Excretory & Blood Pressure Regulation",
    position: [0.25, 0.7, -0.1],
    status: "optimal",
    statusText: "Glomerular Filtration High",
    score: 97,
    color: "#ffb800",
    metrics: [
      { name: "Estimated GFR (eGFR CKD-EPI)", value: "108 mL/min/1.73m²", status: "Juvenile Clearance" },
      { name: "Serum Creatinine", value: "0.78 mg/dL", normal: "0.50 - 1.10 mg/dL", status: "Optimal" },
      { name: "Blood Urea Nitrogen (BUN)", value: "13 mg/dL", normal: "7 - 20 mg/dL", status: "Optimal" },
      { name: "BUN/Creatinine Ratio", value: "16.6", normal: "10 - 20", status: "Well Hydrated" }
    ],
    copilotInsight: "Electrolyte retention and hydration markers reflect consistent 2.8L daily water intake with trace mineral replenishment.",
    recentLabs: [
      { test: "Cystatin C", value: "0.71 mg/L", normal: "0.53 - 0.95 mg/L", flag: "optimal" },
      { test: "Urine Microalbumin/Creatinine", value: "4.2 mg/g", normal: "< 30 mg/g", flag: "normal" }
    ]
  },
  spine: {
    id: "spine",
    name: "Musculoskeletal & Spinal Axis",
    system: "Skeletal, Articular & Postural Matrix",
    position: [0, 0.9, -0.15],
    status: "good",
    statusText: "Postural Symmetry Restored",
    score: 89,
    color: "#38bdf8",
    metrics: [
      { name: "Bone Mineral Density (DEXA T-Score)", value: "+1.3", status: "Above Age Matched" },
      { name: "Spine Lumbar Range of Motion", value: "Full", status: "No Impingement" },
      { name: "Skeletal Muscle Mass", value: "26.4 kg", status: "Optimal Lean Mass" },
      { name: "Daily Step Volume", value: "11,480 steps", status: "Goal Exceeded" }
    ],
    copilotInsight: "Mild L4-L5 lumbar strain noted on October 2025 MRI is currently asymptomatic. Core stabilization exercises maintain 0 pain incidents.",
    recentLabs: [
      { test: "Serum Alkaline Phosphatase", value: "54 U/L", normal: "30 - 120 U/L", flag: "normal" },
      { test: "Vitamin D3 (25-Hydroxy)", value: "64.2 ng/mL", normal: "30 - 100 ng/mL (Optimal >50)", flag: "optimal" }
    ]
  }
};

export const medicalRecordsTimeline = [
  {
    id: "REC-2026-03",
    date: "March 24, 2026",
    title: "Annual Longevity & Comprehensive Biomarker Panel",
    facility: "Altrix Labs Clinical Center & Quest Diagnostics",
    physician: "Dr. Aris Thorne, MD",
    type: "Diagnostic Lab",
    badgeColor: "emerald",
    summary: "Comprehensive 88-biomarker blood and urine assessment. Cholesterol and glucose metrics demonstrate peak metabolic flexibility. Biological age calculated at 28.4 years.",
    findings: ["ApoB lowered by 14 mg/dL to 68 mg/dL", "hs-CRP maintains ultra-low systemic inflammation at 0.42 mg/L", "Fasting insulin at 3.8 µIU/mL confirms high insulin sensitivity"],
    attachments: ["Full_Lab_Report_88_Biomarkers.pdf", "Genomic_Longevity_Risk_Score.pdf"],
    copilotExplanation: "Your overall blood chemistry matches individuals in the top 5% of healthy 25-29 year olds. Keep your current exercise and supplement regimen."
  },
  {
    id: "REC-2026-01",
    date: "January 14, 2026",
    title: "Cardiopulmonary Exercise Testing (CPET) & VO2 Max",
    facility: "Metabolic Health Institute",
    physician: "Dr. S. Chen, MD (Exercise Physiologist)",
    type: "Cardiovascular",
    badgeColor: "cyan",
    summary: "Graded exercise treadmill protocol. Anaerobic threshold achieved at 168 bpm. Peak VO2 max recorded at 46.8 ml/kg/min, confirming superior aerobic capacity.",
    findings: ["No ST-segment abnormalities", "Blood pressure response normal during peak exertion (164/82 mmHg)", "Resting heart rate recovered to <90 bpm within 90 seconds post-test"],
    attachments: ["CPET_Stress_Test_Report.pdf", "ECG_Telemetry_Strip.pdf"],
    copilotExplanation: "Your heart's recovery speed after intense effort is outstanding, confirming low cardiovascular stiffness and high autonomic resilience."
  },
  {
    id: "REC-2025-10",
    date: "October 18, 2025",
    title: "Lumbar Spine MRI Diagnostic Scan",
    facility: "Advanced Neurological & Orthopedic Imaging",
    physician: "Dr. Marcus Vance, MD (Radiology)",
    type: "Imaging",
    badgeColor: "amber",
    summary: "Targeted 3T MRI of lumbar spine without contrast following brief lower back discomfort during deadlift. Revealed mild L4-L5 disc desiccation without neural impingement.",
    findings: ["No spinal canal stenosis", "Mild L4-L5 disc protrusion without nerve root compression", "Vertebral alignment preserved"],
    attachments: ["Lumbar_MRI_Scan_Series.dicom", "Radiology_Final_Impression.pdf"],
    copilotExplanation: "The disc showed minor wear typical of active individuals, with no nerve pinch. Physical therapy completed successfully with full recovery."
  },
  {
    id: "REC-2025-06",
    date: "June 05, 2025",
    title: "Whole Genome Sequencing & Epigenetic DNA Methylation",
    facility: "Veritas Genetics & Illumina Lab",
    physician: "Dr. Lauren Patel, PhD (Clinical Geneticist)",
    type: "Genomics",
    badgeColor: "purple",
    summary: "30x Whole Genome Sequencing (WGS). Screened for 1,200 actionable disease variants and epigenetic Horvath clock methylation markers.",
    findings: ["APOE-ε3/ε3 genotype: Average cardiovascular & Alzheimer risk baseline", "MTHFR 677C>T variant detected: Compensated via active methylated folate", "Epigenetic age acceleration score: -5.6 years"],
    attachments: ["WGS_Genomic_Variant_Report.pdf", "Epigenetic_Clock_Analysis.pdf"],
    copilotExplanation: "Your genetics reveal strong protective longevity traits. The minor MTHFR methylation efficiency bottleneck is successfully resolved by your active supplement protocol."
  }
];

export const diagnosticLabs = [
  {
    category: "Lipid & Cardiovascular Panel",
    tests: [
      { name: "Apolipoprotein B (ApoB)", value: 68, unit: "mg/dL", min: 40, max: 130, optimalMin: 40, optimalMax: 80, status: "Optimal", change: "-12%" },
      { name: "LDL Cholesterol (Calculated)", value: 82, unit: "mg/dL", min: 50, max: 190, optimalMin: 60, optimalMax: 90, status: "Optimal", change: "-8%" },
      { name: "HDL Cholesterol", value: 64, unit: "mg/dL", min: 40, max: 90, optimalMin: 50, optimalMax: 85, status: "Optimal", change: "+4%" },
      { name: "Triglycerides", value: 68, unit: "mg/dL", min: 40, max: 200, optimalMin: 50, optimalMax: 100, status: "Optimal", change: "-15%" },
      { name: "Lipoprotein(a)", value: 18, unit: "nmol/L", min: 5, max: 150, optimalMin: 10, optimalMax: 75, status: "Normal", change: "0%" },
      { name: "High-Sensitivity CRP", value: 0.42, unit: "mg/L", min: 0.1, max: 3.0, optimalMin: 0.1, optimalMax: 1.0, status: "Low Risk", change: "-0.1" }
    ]
  },
  {
    category: "Metabolic & Glycemic Health",
    tests: [
      { name: "Fasting Plasma Glucose", value: 84, unit: "mg/dL", min: 65, max: 125, optimalMin: 70, optimalMax: 89, status: "Optimal", change: "-3 mg/dL" },
      { name: "Hemoglobin A1c (HbA1c)", value: 5.0, unit: "%", min: 4.5, max: 6.5, optimalMin: 4.8, optimalMax: 5.2, status: "Optimal", change: "-0.1%" },
      { name: "Fasting Serum Insulin", value: 3.8, unit: "µIU/mL", min: 2.0, max: 25.0, optimalMin: 2.5, optimalMax: 6.0, status: "Optimal", change: "-0.6" },
      { name: "HOMA-IR Score", value: 0.85, unit: "ratio", min: 0.5, max: 3.0, optimalMin: 0.5, optimalMax: 1.2, status: "Sensitive", change: "-0.1" }
    ]
  },
  {
    category: "Hormonal, Vitamins & Micronutrients",
    tests: [
      { name: "Vitamin D3 (25-OH)", value: 64.2, unit: "ng/mL", min: 20, max: 100, optimalMin: 50, optimalMax: 80, status: "Optimal", change: "+6.1" },
      { name: "Serum Ferritin (Iron Stores)", value: 78, unit: "ng/mL", min: 15, max: 200, optimalMin: 50, optimalMax: 120, status: "Optimal", change: "+5" },
      { name: "Thyroid Stimulating Hormone (TSH)", value: 1.84, unit: "mIU/L", min: 0.4, max: 4.5, optimalMin: 1.0, optimalMax: 2.5, status: "Optimal", change: "-0.1" },
      { name: "Homocysteine", value: 7.2, unit: "µmol/L", min: 4.0, max: 15.0, optimalMin: 5.0, optimalMax: 8.5, status: "Optimal", change: "-1.1" }
    ]
  }
];

export const prescriptionsAndSupplements = {
  prescriptions: [
    {
      id: "RX-1",
      name: "Atorvastatin Calcium",
      dosage: "10 mg",
      form: "Oral Tablet",
      timing: "Once daily at bedtime",
      prescribedBy: "Dr. Aris Thorne, MD",
      refillsLeft: 3,
      pillCount: 24,
      daysSupply: 30,
      indication: "ApoB / Endothelial Plaque Stabilization",
      aiReasoning: "Low-dose titration chosen to keep ApoB below 70 mg/dL while minimizing CoQ10 mitochondrial depletion. Synergizes with CoQ10 200mg supplement.",
      adherence: "98% (Last 30 Days)"
    },
    {
      id: "RX-2",
      name: "Metformin HCl (Extended Release)",
      dosage: "500 mg",
      form: "Oral Tablet (Glumetza)",
      timing: "Once daily with evening meal",
      prescribedBy: "Dr. Aris Thorne, MD",
      refillsLeft: 4,
      pillCount: 28,
      daysSupply: 30,
      indication: "AMPK Activation & Glycemic Longevity Optimization",
      aiReasoning: "Mild hormetic metabolic agent promoting mitochondrial biogenesis and steady hepatic gluconeogenesis suppression.",
      adherence: "100% (Last 30 Days)"
    }
  ],
  customSupplements: [
    {
      id: "SUP-1",
      name: "Ubiquinol CoQ10 (Liposomal)",
      dosage: "200 mg",
      timing: "Morning with healthy fats",
      purpose: "Mitochondrial Bioenergetics & Statin Balance",
      aiReasoning: "Compensates for HMG-CoA pathway enzyme inhibition from Atorvastatin, protecting heart muscle cellular respiration.",
      takenToday: true
    },
    {
      id: "SUP-2",
      name: "Active Methylfolate (L-5-MTHF) + Methyl-B12",
      dosage: "1000 mcg / 1000 mcg",
      timing: "Morning with breakfast",
      purpose: "MTHFR Variant Support & Homocysteine Clearance",
      aiReasoning: "Bypasses heterozygous MTHFR 677C>T enzyme reduction, ensuring direct methylation substrate supply and lowering homocysteine to 7.2 µmol/L.",
      takenToday: true
    },
    {
      id: "SUP-3",
      name: "Ultra-Purified Omega-3 (EPA 1200mg / DHA 800mg)",
      dosage: "2000 mg total",
      timing: "Evening with dinner",
      purpose: "Anti-Inflammatory & Membrane Fluidity",
      aiReasoning: "Maintains Omega-3 index above 9.2%, reducing vascular shear stress and supporting brain neuroplasticity.",
      takenToday: true
    },
    {
      id: "SUP-4",
      name: "Magnesium L-Threonate (Magtein®)",
      dosage: "144 mg elemental Mg",
      timing: "45 minutes before bedtime",
      purpose: "Blood-Brain Barrier Crossing & Slow-Wave Sleep",
      aiReasoning: "Crosses the blood-brain barrier to upregulate NMDA receptors, directly boosting deep sleep stage duration by 24%.",
      takenToday: false
    },
    {
      id: "SUP-5",
      name: "Vitamin D3 + K2 (MK-7)",
      dosage: "5000 IU / 100 mcg",
      timing: "Morning with fat-containing meal",
      purpose: "Calcium Homeostasis & Immunomodulation",
      aiReasoning: "K2 ensures calcium deposition into bone matrix rather than arterial walls, maintaining clean coronary calcium (CAC = 0).",
      takenToday: true
    }
  ],
  interactionCheck: {
    status: "Verified Safe",
    risk: "No adverse drug-drug or drug-nutrient interactions detected",
    lastChecked: "Automatic scan: 12 minutes ago by Altrix Clinical Engine"
  }
};

export const sampleAIChatMessages = [
  {
    role: "assistant",
    timestamp: "10:43 AM",
    content: "Hello Elena, I've integrated your new laboratory results from Quest Diagnostics (March 24) and synced your Oura Ring sleep cycle from last night. **Your biological age has reduced to 28.4 years** (-5.6 years vs chronological age 34). Your cardiovascular markers (ApoB at 68 mg/dL) are in the top 5th percentile. How can I assist your health journey today?"
  }
];

export const prebuiltQuestions = [
  "Explain my recent lipid panel in plain English",
  "Do my supplements clash with my prescriptions?",
  "Why is my biological age 5.6 years younger than chronological age?",
  "Prepare a summary report for my doctor consultation",
  "How can I optimize my deep sleep ratio tonight?"
];
