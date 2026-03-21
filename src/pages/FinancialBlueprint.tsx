import { useEffect, useState } from "react";
import { useDownloadReport } from "../hooks/mutations/allMutation";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReportData {
  // Cover
  clientName?: string;
  preparedFor?: string;
  date?: string;
  preparedBy?: string;
  // Profile (nested in "profile" key in the array format)
  name?: string;
  age?: number;
  retirementAgeGoal?: number;
  retirementAge?: number;
  lifeExpectancy?: number;
  maritalStatus?: string;
  annualSalary?: number;
  annualSalaryGrowth?: number;
  currentRetirementSavings?: number;
  monthlyRetirementContribution?: number;
  employerMatch?: number;
  // Cash flow
  monthlyIncome?: number;
  monthlyExpenses?: number;
  monthlySurplus?: number;
  // Net worth
  assets?: { label: string; value: number }[];
  totalAssets?: number;
  totalLiabilities?: number;
  netWorth?: number;
  // Emergency fund
  monthlyCoreExpenses?: number;
  recommendedEFund?: number;
  liquidSavings?: number;
  efundStatus?: number;
  // Debt
  debtToIncomeRatio?: number;
  dtiRatio?: number;
  // Allocation
  allocation?: { label: string; percent: number }[];
  riskProfile?: string;
  // Projection
  projectedPortfolio67?: number | null;
  estimatedAnnualRetIncome?: number | null;
  // Income gap
  projectedNeededIncome?: number;
  targetRetirementIncome?: number;
  projectedIncome?: number | null;
  annualGap?: number;
  retirementIncomeGap?: number;
  // Social Security
  ssa67?: number;
  ssa70?: number;
  breakEvenAge?: number;
  // Tax
  taxRate?: number;
  traditionalPercent?: number;
  rothPercent?: number;
  lifetimeTaxSavings?: number;
  // Inflation
  inflationRate?: number;
  inflation?: number;
  salaryToday?: number;
  // Longevity
  chancePast90?: number;
  chancePast95?: number;
  portfolioLastsTo?: number;
  // Action plan
  actionPlan?: string[];
  stressTestResult?: string;
  // Misc
  contribRate?: number;
  confidenceScore?: number;
  expectedAnnualReturn?: number;
}

// ─── Data helpers ─────────────────────────────────────────────────────────────
const fmt = (n?: number | null): string => {
  if (n == null || !isFinite(n)) return "—";
  return "$" + Math.round(n).toLocaleString();
};

const getRetAge = (d: ReportData): number => d.retirementAgeGoal ?? d.retirementAge ?? 67;

const getYears = (d: ReportData): number => {
  const retAge = getRetAge(d);
  const cur = d.age != null && d.age > 0 && d.age < 110 ? d.age : null;
  return cur != null ? Math.max(retAge - cur, 1) : 32;
};

const calcPortfolio = (d: ReportData): number => {
  if (d.projectedPortfolio67 != null && isFinite(d.projectedPortfolio67)) return d.projectedPortfolio67;
  const pv = d.currentRetirementSavings ?? 0;
  const pmt = (d.monthlyRetirementContribution ?? 633) * 12;
  const r = d.expectedAnnualReturn ?? 0.07;
  const n = getYears(d);
  if (r === 0) return Math.round(pv + pmt * n);
  const f = Math.pow(1 + r, n);
  return Math.round(pv * f + pmt * ((f - 1) / r));
};

const calcAnnualIncome = (d: ReportData): number => {
  if (d.estimatedAnnualRetIncome != null && isFinite(d.estimatedAnnualRetIncome)) return d.estimatedAnnualRetIncome;
  return Math.round(calcPortfolio(d) * 0.04);
};

const calcTarget = (d: ReportData): number => d.projectedNeededIncome ?? d.targetRetirementIncome ?? 85000;
const calcGap = (d: ReportData): number => Math.max(calcTarget(d) - calcAnnualIncome(d), 0);

// ─── Shared Components ────────────────────────────────────────────────────────
const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent"
      style={{ borderBottom: "14px solid #2563eb" }} />
    <span className="font-black text-sm tracking-widest text-gray-900">WINTRICE</span>
  </div>
);

const ExportBtn = ({ onDownload, isDownloading }: { onDownload?: () => void; isDownloading?: boolean }) => (
  <button
    onClick={onDownload ?? (() => window.print())}
    disabled={isDownloading}
    className="flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors print:hidden disabled:opacity-60"
  >
    {isDownloading ? "⏳ Downloading..." : "🖨 Export to PDF"}
  </button>
);

const PageHeader = ({ section, onDownload, isDownloading }: { section?: string; onDownload?: () => void; isDownloading?: boolean }) => (
  <div className="flex justify-between items-center mb-10">
    <Logo />
    <div className="flex items-center gap-6">
      {section && <span className="text-[10px] tracking-[3px] text-gray-400 uppercase">{section}</span>}
      <ExportBtn onDownload={onDownload} isDownloading={isDownloading} />
    </div>
  </div>
);

const PageFooter = ({ page }: { page: number }) => (
  <div className="absolute bottom-6 left-16 right-16 flex justify-between text-[10px] text-gray-300 tracking-widest uppercase">
    <span>WINTRICE WEALTH MANAGEMENT • BLUEPRINT REPORT • CONFIDENTIAL</span>
    <span>PAGE {String(page).padStart(2, "0")}</span>
  </div>
);

const PageWrap = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white min-h-screen px-16 py-12 pb-20 relative box-border">{children}</div>
);

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-8">
    <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">{title}</h1>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

const DarkCard = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gray-900 rounded-xl p-6 text-white">{children}</div>
);

const BlueLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="text-[10px] tracking-[2px] text-blue-500 uppercase font-bold mb-1.5">{children}</div>
);

const DimText = ({ children }: { children: React.ReactNode }) => (
  <p className="text-xs text-gray-400 leading-relaxed">{children}</p>
);

// ─── PAGE 1: Cover ─────────────────────────────────────────────────────────────
const Page1 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => (
  <div className="bg-white min-h-screen px-16 py-12 box-border flex flex-col">
    <div className="flex justify-between items-center"><Logo /><ExportBtn onDownload={onDownload} isDownloading={isDownloading} /></div>
    <div className="flex-1 flex flex-col items-center justify-center text-center">
      <div className="text-6xl font-black text-gray-900 leading-tight">Financial Planning</div>
      <div className="text-6xl font-black text-blue-600 leading-tight mb-10">Blueprint</div>
      <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-12" />
      <div className="flex flex-col gap-6 items-center">
        {([
          ["PREPARED FOR", d.preparedFor ?? d.clientName ?? d.name ?? "—"],
          ["DATE", d.date ?? "—"],
          ["PREPARED BY", d.preparedBy ?? "WINTRICE Retirement Intelligence System"],
        ] as [string, string][]).map(([label, val]) => (
          <div key={label} className="text-center">
            <div className="text-[10px] tracking-[3px] text-gray-400 uppercase mb-1">{label}</div>
            <div className="text-lg text-gray-900 font-normal">{val}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─── PAGE 2: Personal Profile Summary ─────────────────────────────────────────
const Page2 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const retAge = getRetAge(d);
  const curAge = d.age != null && d.age > 0 && d.age < 110 ? String(d.age) : "—";
  const status = d.maritalStatus ? d.maritalStatus.charAt(0).toUpperCase() + d.maritalStatus.slice(1) : "—";
  const growth = d.annualSalaryGrowth != null ? (d.annualSalaryGrowth * 100).toFixed(0) + "%" : "3%";
  const match = d.employerMatch != null ? (d.employerMatch * 100).toFixed(0) + "%" : "4%";
  return (
    <PageWrap>
      <PageHeader section="Section 1.0: Demographic & Financial Profile" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Personal Profile Summary"
        subtitle="Core assumptions and demographic data used for the financial projection model." />
      <div className="grid grid-cols-2 gap-12">
        {([
          {
            heading: "PERSONAL & RETIREMENT",
            rows: [
              ["Current Age", curAge],
              ["Retirement Goal Age", String(retAge)],
              ["Life Expectancy", String(d.lifeExpectancy ?? 92)],
              ["Marital Status", status],
            ] as [string, string][],
          },
          {
            heading: "INCOME & SAVINGS",
            rows: [
              ["Current Annual Salary", fmt(d.annualSalary)],
              ["Projected Salary Growth", growth],
              ["Current Portfolio Value", fmt(d.currentRetirementSavings)],
              ["Monthly Contribution", fmt(d.monthlyRetirementContribution)],
              ["Employer Match", match],
            ] as [string, string][],
          },
        ]).map(({ heading, rows }) => (
          <div key={heading}>
            <div className="text-[11px] tracking-[2px] text-blue-600 uppercase font-bold mb-4">{heading}</div>
            <div className="border-t border-gray-200">
              {rows.map(([label, val]) => (
                <div key={label} className="flex justify-between items-center py-4 border-b border-gray-100">
                  <span className="text-sm text-gray-400">{label}</span>
                  <span className="text-lg text-gray-900 font-bold">{val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <PageFooter page={2} />
    </PageWrap>
  );
};

// ─── PAGE 3: Financial Health Scorecard ───────────────────────────────────────
const Page3 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const efund = Math.min(d.efundStatus ?? 0, 100);
  const savRate = d.monthlySurplus && d.monthlyIncome
    ? Math.min(Math.round((d.monthlySurplus / d.monthlyIncome) * 100 * 3), 90) : 65;
  return (
    <PageWrap>
      <PageHeader section="Section 2.0: Cash Flow" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Financial Health Scorecard"
        subtitle="A comprehensive snapshot of your current liquidity, efficiency, and wealth accumulation." />
      <div className="flex gap-4 mb-8">
        {([
          ["NET WORTH", fmt(d.netWorth), false],
          ["MONTHLY INCOME", fmt(d.monthlyIncome), false],
          ["MONTHLY EXPENSES", fmt(d.monthlyExpenses), false],
          ["MONTHLY SURPLUS", fmt(d.monthlySurplus), true],
        ] as [string, string, boolean][]).map(([label, val, green]) => (
          <div key={label} className={`flex-1 rounded-lg p-5 ${green ? "bg-green-50" : "bg-gray-50"}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className={`text-3xl font-black ${green ? "text-green-800" : "text-gray-900"}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="border border-gray-200 rounded-xl p-7">
        <div className="font-bold text-base text-gray-900 mb-6">Category Score Breakdown</div>
        <div className="grid grid-cols-[1fr_auto] border-b border-gray-100 pb-2 mb-1">
          <span className="text-[10px] tracking-widest text-gray-400 uppercase">CATEGORY</span>
          <span className="text-[10px] tracking-widest text-gray-400 uppercase">SCORE</span>
        </div>
        {([
          ["Savings Rate", savRate],
          ["Debt Ratio", 68],
          ["Investment Allocation", 70],
          ["Emergency Fund", Math.max(efund, 10)],
          ["Retirement Readiness", 72],
        ] as [string, number][]).map(([cat, score]) => (
          <div key={cat} className="grid grid-cols-[1fr_auto] py-3 border-b border-gray-50 text-sm">
            <span className="text-gray-800">{cat}</span>
            <span className="font-bold text-gray-900">{score}</span>
          </div>
        ))}
      </div>
      <PageFooter page={3} />
    </PageWrap>
  );
};

// ─── PAGE 4: Net Worth Statement ───────────────────────────────────────────────
const Page4 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const assets = d.assets ?? [];
  const totalA = d.totalAssets ?? assets.reduce((s, a) => s + a.value, 0);
  const totalL = d.totalLiabilities ?? 0;
  const nw = d.netWorth ?? (totalA - totalL);
  return (
    <PageWrap>
      <PageHeader section="Section 2.0: Cash Flow" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Net Worth Statement" subtitle="Detailed breakdown of assets and liabilities." />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="font-bold text-base text-blue-600 mb-3">📈 Assets Table</div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex justify-between px-4 py-2.5 bg-gray-50 text-xs text-gray-400 font-bold uppercase tracking-wide">
              <span>Type</span><span>Value</span>
            </div>
            {assets.map(({ label, value }) => (
              <div key={label} className="flex justify-between px-4 py-3.5 border-t border-gray-100 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold">{fmt(value)}</span>
              </div>
            ))}
            <div className="flex justify-between px-4 py-3.5 border-t border-gray-200 bg-blue-50">
              <span className="font-bold text-sm">Total Assets</span>
              <span className="font-black text-base text-blue-600">{fmt(totalA)}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="font-bold text-base text-gray-700 mb-3">🏛 Liabilities &amp; Net Worth</div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex justify-between px-4 py-2.5 bg-gray-50 text-xs text-gray-400 font-bold uppercase tracking-wide">
              <span>Type</span><span>Value</span>
            </div>
            <div className="flex justify-between px-4 py-3.5 border-t border-gray-100 text-sm">
              <span className="text-gray-500">Total Liabilities</span>
              <span className="font-semibold">{fmt(totalL)}</span>
            </div>
            <div className="flex justify-between px-4 py-3.5 border-t border-gray-200 bg-gray-50">
              <span className="font-bold text-sm">Net Worth</span>
              <span className="font-black text-base text-gray-900">{fmt(nw)}</span>
            </div>
          </div>
        </div>
      </div>
      <PageFooter page={4} />
    </PageWrap>
  );
};

// ─── PAGE 5: Cash Flow Analysis ───────────────────────────────────────────────
const Page5 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => (
  <PageWrap>
    <PageHeader section="Section 2.0: Cash Flow" onDownload={onDownload} isDownloading={isDownloading} />
    <SectionTitle title="Cash Flow Analysis" subtitle={`Financial performance report · ${d.date ?? "Current Period"}`} />
    <div className="flex gap-4 mb-6">
      {([
        ["MONTHLY INCOME", fmt(d.monthlyIncome), "bg-white border border-gray-200", "text-gray-900", "#16a34a", "bg-green-50 text-green-700"],
        ["MONTHLY EXPENSES", fmt(d.monthlyExpenses), "bg-white border border-gray-200", "text-gray-900", "#dc2626", "bg-red-50 text-red-700"],
        ["MONTHLY SURPLUS", fmt(d.monthlySurplus), "bg-blue-600", "text-white", "rgba(255,255,255,0.4)", "bg-white/20 text-white"],
      ] as [string, string, string, string, string, string][]).map(([label, val, bg, textC, barC]) => (
        <div key={label} className={`flex-1 rounded-xl p-5 ${bg}`}>
          <div className={`text-[10px] tracking-[2px] uppercase mb-2 ${textC === "text-white" ? "text-white/60" : "text-gray-400"}`}>{label}</div>
          <div className={`text-3xl font-black mb-3 ${textC}`}>{val}</div>
          <div className="h-1 bg-black/10 rounded-full">
            <div className="h-1 rounded-full w-3/5" style={{ background: barC }} />
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm text-gray-900 mb-5">Expense Breakdown</div>
        <div className="flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0">
            <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90">
              {([["#2563eb", 50, 0], ["#16a34a", 20, 50], ["#f59e0b", 15, 70], ["#d1d5db", 15, 85]] as [string, number, number][]).map(([color, pct, offset]) => (
                <circle key={color} cx="18" cy="18" r="14" fill="none" stroke={color} strokeWidth="5"
                  strokeDasharray={`${pct * 0.88} ${100 - pct * 0.88}`} strokeDashoffset={`${-offset * 0.88}`} />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-900">
              {d.monthlyExpenses ? "$" + (d.monthlyExpenses / 1000).toFixed(1) + "k" : "—"}
            </div>
          </div>
          <div className="flex-1 space-y-2">
            {([["#2563eb", "Housing & Mortgage", "50%"], ["#16a34a", "Healthcare & Insurance", "20%"], ["#f59e0b", "Lifestyle & Travel", "15%"], ["#d1d5db", "Miscellaneous", "15%"]] as [string, string, string][]).map(([color, label, pct]) => (
              <div key={label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
                <span className="text-[10px] text-gray-400">{pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-3">SMART INSIGHT</div>
        <p className="text-xs text-gray-500 leading-relaxed italic mb-5">
          "Consider reallocating monthly surplus from miscellaneous to your high-yield retirement fund to improve long-term projections."
        </p>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">✦</div>
          <div>
            <div className="font-bold text-xs text-gray-900">AI Advisory Engine</div>
            <div className="text-[10px] text-gray-400">Optimized for Wealth Growth</div>
          </div>
        </div>
      </div>
    </div>
    <PageFooter page={5} />
  </PageWrap>
);

// ─── PAGE 6: Emergency Fund Analysis ──────────────────────────────────────────
const Page6 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const rec = d.recommendedEFund ?? 33348;
  const liquid = d.liquidSavings ?? 0;
  const pct = rec > 0 ? Math.min(Math.round((liquid / rec) * 100), 100) : 0;
  return (
    <PageWrap>
      <PageHeader section="Section 3.0: Liquidity" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Emergency Fund Analysis"
        subtitle="Assessing capital reserves required to sustain operational stability during unforeseen disruptions." />
      <div className="flex gap-4 mb-8">
        {([
          ["MONTHLY CORE EXPENSES", fmt(d.monthlyCoreExpenses), "Includes housing, food, and essentials", false],
          ["RECOMMENDED 6 MONTHS", fmt(rec), "Institutional safety benchmark", false],
          ["CURRENT LIQUID SAVINGS", fmt(liquid), "Readily accessible cash equivalents", true],
        ] as [string, string, string, boolean][]).map(([label, val, sub, green]) => (
          <div key={label} className={`flex-1 rounded-lg p-6 ${green ? "bg-green-50" : "bg-gray-50"}`}>
            <div className={`text-[10px] tracking-[2px] uppercase mb-2 ${green ? "text-green-700 font-bold" : "text-gray-400"}`}>{label}</div>
            <div className={`text-3xl font-black mb-1 ${green ? "text-green-800" : "text-gray-900"}`}>{val}</div>
            <div className="text-xs text-gray-400">{sub}</div>
          </div>
        ))}
      </div>
      <div className="border border-gray-200 rounded-xl p-7">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-lg font-black text-gray-900 mb-1">Fund Status: {pct}% Funded</div>
            <div className="text-xs text-gray-400">Current Capital Allocation vs. Target Reserve</div>
          </div>
          <div className="text-sm text-gray-700"><strong>{fmt(liquid)}</strong> <span className="text-gray-300">/ {fmt(rec)}</span></div>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{ width: `${Math.max(pct, 1)}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-gray-400 uppercase tracking-widest">
          <span>INITIAL RESERVE</span><span>TARGET OBJECTIVE</span>
        </div>
      </div>
      <PageFooter page={6} />
    </PageWrap>
  );
};

// ─── PAGE 7: Debt Analysis ─────────────────────────────────────────────────────
const Page7 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const dti = d.debtToIncomeRatio ?? d.dtiRatio ?? 32;
  return (
    <PageWrap>
      <PageHeader section="Section 4.0: Liabilities & Payoff" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Debt Analysis" subtitle="Detailed breakdown of current liabilities and optimized liquidation strategies." />
      <div className="flex gap-4 mb-6">
        <div className="flex-1 bg-blue-50 border-2 border-blue-600 rounded-xl p-5">
          <div className="text-[10px] tracking-[2px] text-blue-600 uppercase mb-2">DEBT-TO-INCOME (DTI)</div>
          <div className="text-4xl font-black text-gray-900 mb-2">{dti}%</div>
          <div className="text-xs font-bold text-green-600">✓ STABLE RANGE</div>
        </div>
        {([["STUDENT LOAN PAYOFF", "4 Years", "↗ ACCELERATED PLAN"], ["MORTGAGE PAYOFF", "25 Years", "⏱ STANDARD AMORTIZATION"]] as [string, string, string][]).map(([label, val, sub]) => (
          <div key={label} className="flex-1 bg-gray-50 rounded-xl p-5">
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className="text-3xl font-black text-gray-900 mb-2">{val}</div>
            <div className="text-[10px] text-gray-400">{sub}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">DEBT REDUCTION TIMELINE</div>
          <svg viewBox="0 0 280 140" className="w-full h-36">
            <defs><linearGradient id="dg7" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" /><stop offset="100%" stopColor="#2563eb" stopOpacity="0" /></linearGradient></defs>
            <path d="M20,15 L60,40 L110,70 L160,100 L210,118 L260,130" fill="none" stroke="#2563eb" strokeWidth="2.5" />
            <path d="M20,15 L60,40 L110,70 L160,100 L210,118 L260,130 L260,138 L20,138 Z" fill="url(#dg7)" />
            {([[20, 15], [60, 40], [110, 70], [160, 100], [210, 118], [260, 130]] as [number, number][]).map(([x, y], i) => <circle key={i} cx={x} cy={y} r="3.5" fill="#2563eb" />)}
            {(["Year 0", "Year 5", "Year 10", "Year 15", "Year 20", "Year 25"]).map((l, i) => <text key={l} x={20 + i * 48} y="138" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Arial">{l}</text>)}
          </svg>
        </div>
        <DarkCard>
          <BlueLabel>DTI ANALYSIS</BlueLabel>
          <DimText>Your DTI of {dti}% is within the institutional "Comfort Zone." Aggressive liquidation of loans will liberate additional monthly cash flow.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>PAYOFF STRATEGY</BlueLabel>
            <DimText>We recommend the "Snowball Method" for credit lines while maintaining standard mortgage payments to leverage tax-deductible interest benefits.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={7} />
    </PageWrap>
  );
};

// ─── PAGE 8: Investment Allocation ─────────────────────────────────────────────
const Page8 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const alloc = d.allocation ?? [{ label: "U.S. Stocks", percent: 60 }, { label: "International Stocks", percent: 15 }, { label: "Bonds", percent: 20 }, { label: "Cash", percent: 5 }];
  const colors = ["#2563eb", "#7c3aed", "#16a34a", "#f59e0b"];
  return (
    <PageWrap>
      <PageHeader section="Section 3.0: Allocation" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Current Investment Allocation" subtitle="Detailed analytical breakdown of strategic portfolio positioning." />
      <div className="flex justify-end mb-4">
        <span className="bg-green-50 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full">✓ Risk Profile: {d.riskProfile ?? "Moderate Growth"}</span>
      </div>
      <div className="grid grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 200 200" className="w-48 h-48">
            {alloc.map(({ percent }, i) => {
              const toRad = (a: number) => (a * Math.PI) / 180;
              const startAngle = alloc.slice(0, i).reduce((s, a) => s + a.percent * 3.6, 0);
              const sweep = percent * 3.6;
              const cx = 100, cy = 100, rad = 80;
              const x1 = cx + rad * Math.cos(toRad(startAngle)), y1 = cy + rad * Math.sin(toRad(startAngle));
              const x2 = cx + rad * Math.cos(toRad(startAngle + sweep)), y2 = cy + rad * Math.sin(toRad(startAngle + sweep));
              return <path key={i} d={`M${cx} ${cy} L${x1} ${y1} A${rad} ${rad} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}Z`} fill={colors[i] ?? "#ccc"} opacity="0.9" />;
            })}
            <circle cx="100" cy="100" r="52" fill="white" />
            <text x="100" y="97" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="Arial Black" fill="#111">100%</text>
            <text x="100" y="113" textAnchor="middle" fontSize="9" fill="#888" fontFamily="Arial">TOTAL ASSETS</text>
          </svg>
          <div className="flex flex-wrap gap-4 mt-4 justify-center">
            {alloc.map(({ label }, i) => <div key={label} className="flex items-center gap-2 text-xs text-gray-600"><div className="w-2 h-2 rounded-full" style={{ background: colors[i] ?? "#ccc" }} />{label}</div>)}
          </div>
        </div>
        <div className="space-y-5">
          {alloc.map(({ label, percent }, i) => (
            <div key={label} className="flex items-center gap-4">
              <div className="w-32 flex-shrink-0"><div className="text-sm font-bold text-gray-900">{label}</div></div>
              <div className="flex-1 h-1.5 bg-gray-100 rounded-full"><div className="h-1.5 rounded-full" style={{ width: `${percent}%`, background: colors[i] ?? "#ccc" }} /></div>
              <div className="text-sm font-black w-10 text-right">{percent}%</div>
            </div>
          ))}
        </div>
      </div>
      <PageFooter page={8} />
    </PageWrap>
  );
};

// ─── PAGE 9: Risk Tolerance ─────────────────────────────────────────────────────
const Page9 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const conf = d.confidenceScore ?? 3;
  return (
    <PageWrap>
      <PageHeader section="Section 3.0: Risk" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Risk Tolerance Assessment" subtitle="Evaluation of psychological risk behavior and financial risk capacity." />
      <div className="flex gap-4 mt-8">
        {([
          ["🗂", "RISK CAPACITY", conf >= 4 ? "Aggressive" : "Moderate"],
          ["🧠", "RISK BEHAVIOR", conf >= 4 ? "Growth Oriented" : "Slightly Conservative"],
          ["✅", "PORTFOLIO ALIGNMENT", "85% Aligned"],
        ] as [string, string, string][]).map(([icon, label, val]) => (
          <div key={label} className="flex-1 bg-gray-50 rounded-xl p-7">
            <div className="text-2xl mb-4">{icon}</div>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className="text-2xl font-black text-gray-900 leading-snug">{val}</div>
          </div>
        ))}
      </div>
      <PageFooter page={9} />
    </PageWrap>
  );
};

// ─── PAGE 10: Retirement Projection ────────────────────────────────────────────
const Page10 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const pv = d.currentRetirementSavings ?? 82500;
  const pmt = (d.monthlyRetirementContribution ?? 633) * 12;
  const r = d.expectedAnnualReturn ?? 0.07;
  const n = getYears(d);
  const bars = Array.from({ length: Math.min(n, 35) }, (_, i) => {
    if (r === 0) return pv + pmt * i;
    const f = Math.pow(1 + r, i);
    return Math.round(pv * f + pmt * ((f - 1) / r));
  });
  const proj = calcPortfolio(d);
  const annInc = calcAnnualIncome(d);
  const maxVal = Math.max(proj, ...bars, 1);
  const retAge = getRetAge(d);
  const curAge = d.age != null && d.age > 0 && d.age < 110 ? d.age : retAge - n;
  return (
    <PageWrap>
      <PageHeader section="Section 4.0: Retirement" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Retirement Projection"
        subtitle="Visualization of wealth accumulation through retirement age with refined annual growth metrics." />
      <div className="flex gap-4 mb-6">
        {([
          ["PROJECTED RETIREMENT AGE", String(retAge), "border-blue-600"],
          ["PROJECTED PORTFOLIO VALUE", fmt(proj), "border-emerald-500"],
          ["ESTIMATED ANNUAL INCOME", fmt(annInc), "border-purple-500"],
        ] as [string, string, string][]).map(([label, val, border]) => (
          <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-b-4 ${border}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className="text-2xl font-black text-gray-900">{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_220px] gap-4">
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">ANNUAL PORTFOLIO GROWTH PROJECTION</div>
          <div className="flex items-end gap-0.5 h-40">
            {bars.map((v, i) => <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(v / maxVal) * 100}%`, background: i === bars.length - 1 ? "#111" : `rgba(16,185,129,${0.35 + (v / maxVal) * 0.65})` }} />)}
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-gray-400">
            <span>AGE {curAge}</span><span>AGE {Math.round((curAge + retAge) / 2)}</span><span>AGE {retAge}</span>
          </div>
        </div>
        <DarkCard>
          <div className="flex items-center gap-2 mb-4"><span className="bg-blue-600 text-xs px-2 py-1 rounded">📊</span><span className="text-xs font-bold">PROJECTION INSIGHT</span></div>
          <BlueLabel>SUSTAINABLE WITHDRAWAL</BlueLabel>
          <DimText>At age {retAge}, a <strong className="text-white">4.0% safe withdrawal rule</strong> yields {fmt(annInc)}/year.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4 mb-4">
            <BlueLabel>INSTITUTIONAL STRATEGY</BlueLabel>
            <DimText>Note the acceleration in the final decade due to compounding.</DimText>
          </div>
          <div className="bg-white/5 rounded-lg p-3">
            <div className="text-[10px] text-gray-400">SUCCESS PROBABILITY</div>
            <div className="text-3xl font-black text-green-400">92%</div>
            <div className="text-[10px] text-gray-500">Confidence Score</div>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={10} />
    </PageWrap>
  );
};

// ─── PAGE 11: Retirement Income Gap ────────────────────────────────────────────
const Page11 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const tgt = calcTarget(d);
  const proj = calcAnnualIncome(d);
  const g = calcGap(d);
  const pct = tgt > 0 ? Math.round((g / tgt) * 100) : 0;
  const barH = tgt > 0 ? Math.min(Math.round((proj / tgt) * 80), 80) : 50;
  return (
    <PageWrap>
      <PageHeader section="Section 5.0: Retirement Income" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Retirement Income Gap Analysis"
        subtitle="Evaluation of current projected income against target lifestyle requirements." />
      <div className="flex gap-4 mb-6">
        {([
          ["TARGET ANNUAL INCOME", fmt(tgt), "border-blue-600", "text-blue-600"],
          ["PROJECTED ANNUAL INCOME", fmt(proj), "border-emerald-500", "text-emerald-600"],
          ["ANNUAL INCOME GAP", fmt(g), "border-red-500", "text-red-600"],
          ["GAP COVERAGE REQUIRED", pct + "%", "border-gray-900", "text-gray-900"],
        ] as [string, string, string, string][]).map(([label, val, borderCls, textCls]) => (
          <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-l-4 ${borderCls}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className={`text-2xl font-black ${textCls}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-5">NEEDED VS. PROJECTED INCOME</div>
          <div className="flex gap-8 items-end h-52">
            <div className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-800 rounded-t flex items-center justify-center" style={{ height: "100%" }}>
                <span className="text-white font-black text-lg">{fmt(tgt)}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-2 text-center">TARGET INCOME</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              {g > 0 && (
                <div className="border-2 border-dashed border-red-400 bg-red-50 px-3 py-1.5 rounded mb-2 text-center">
                  <div className="text-[10px] text-red-500 font-bold">THE GAP</div>
                  <div className="text-xs font-black text-red-500">-{fmt(g)}</div>
                </div>
              )}
              <div className="w-full bg-emerald-500 rounded-t flex items-center justify-center" style={{ height: `${barH}%`, minHeight: "40%" }}>
                <span className="text-white font-black text-lg">{fmt(proj)}</span>
              </div>
              <div className="text-[10px] text-gray-400 mt-2 text-center">PROJECTED INCOME</div>
            </div>
          </div>
        </div>
        <DarkCard>
          <div className="font-bold text-sm mb-4">📈 STRATEGIC ANALYSIS</div>
          <BlueLabel>CLOSING THE GAP</BlueLabel>
          <DimText>Increasing monthly contributions or deferring retirement by 24 months would align projected income with your target of {fmt(tgt)}.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>SPENDING ADJUSTMENTS</BlueLabel>
            <DimText>Optimizing discretionary spending can reduce the target requirement without compromising core lifestyle essentials.</DimText>
          </div>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>YIELD OPTIMIZATION</BlueLabel>
            <DimText>Shifting toward dividend-generating equities could capture an additional 0.8% in yield.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={11} />
    </PageWrap>
  );
};

// ─── PAGE 12: Savings Adjustment ───────────────────────────────────────────────
const Page12 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const g = calcGap(d);
  const proj = calcAnnualIncome(d);
  const tgt = calcTarget(d);
  return (
    <PageWrap>
      <PageHeader section="Section 6.0: Savings Adjustment" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Savings Adjustment Recommendations"
        subtitle={`Strategic paths to bridge the ${fmt(g)} annual income deficit through optimized planning.`} />
      <div className="flex gap-4 mb-6">
        {([
          ["💰", "SCENARIO A: INCREASE SAVINGS", "Increase monthly savings by $325", "text-blue-600"],
          ["📅", "SCENARIO B: EXTEND TIMELINE", "Delay retirement by 2 years", "text-amber-600"],
        ] as [string, string, string, string][]).map(([icon, label, val, c]) => (
          <div key={label} className="flex-1 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg">{icon}</div>
              <div className={`text-[10px] tracking-[2px] uppercase font-bold ${c}`}>{label}</div>
            </div>
            <div className="text-xl font-black text-gray-900">{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">IMPACT ON RETIREMENT READINESS</div>
          <div className="flex gap-3 items-end h-36">
            {([
              ["Current", fmt(proj), "bg-gray-300"],
              ["Increased Savings", fmt(tgt), "bg-blue-600"],
              ["Delayed Retirement", fmt(Math.round(tgt * 1.07)), "bg-emerald-500"],
            ] as [string, string, string][]).map(([label, val, bg], i) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div className={`w-full ${bg} rounded-t flex items-center justify-center`} style={{ height: `${60 + i * 20}%` }}>
                  <span className="text-white font-black text-xs">{val}</span>
                </div>
                <div className="text-[9px] text-gray-400 mt-1.5 text-center leading-tight">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <DarkCard>
          <div className="flex items-center gap-2 mb-4"><span>✅</span><span className="font-bold text-sm">PROFESSIONAL RECOMMENDATION</span></div>
          <BlueLabel>PRIMARY RECOMMENDATION</BlueLabel>
          <DimText><strong className="text-white">Scenario A (Increase Savings)</strong> is the most sustainable path. Increasing monthly contribution by $325 utilizes existing liquidity without lifestyle sacrifices.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>THE BALANCED APPROACH</BlueLabel>
            <DimText>A hybrid model of increasing savings by <strong className="text-white">$160/mo</strong> and delaying retirement by <strong className="text-white">12 months</strong> provides additional margin of safety.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={12} />
    </PageWrap>
  );
};

// ─── PAGE 13: Social Security Strategy ─────────────────────────────────────────
const Page13 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const s67 = d.ssa67 ?? 27550;
  const s70 = d.ssa70 ?? 34162;
  const be = d.breakEvenAge ?? 81;
  const lifeExp = d.lifeExpectancy ?? 92;
  const ltv = Math.round((s70 - s67) * (lifeExp - be));
  return (
    <PageWrap>
      <PageHeader section="Section 7.0: Social Security" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Social Security Strategy" subtitle="Optimal claiming age analysis to maximize lifetime benefit distribution." />
      <div className="flex gap-4 mb-6">
        {([
          ["ESTIMATED BENEFIT AT 67", fmt(s67) + "/year", "text-gray-900"],
          ["ESTIMATED BENEFIT AT 70", fmt(s70) + "/year", "text-blue-600"],
          ["BREAK-EVEN AGE ANALYSIS", String(be), "text-green-600"],
        ] as [string, string, string][]).map(([label, val, c]) => (
          <div key={label} className="flex-1 bg-gray-50 rounded-lg p-6">
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className={`text-2xl font-black ${c}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">LIFETIME BENEFIT COMPARISON</div>
          {([
            ["Claim at 62", fmt(Math.round(s67 * 0.75)) + "/yr", "w-[35%]", "bg-gray-200"],
            ["Claim at 67 (FRA)", fmt(s67) + "/yr", "w-[55%]", "bg-blue-600"],
            ["Claim at 70 (Max)", fmt(s70) + "/yr", "w-[70%]", "bg-emerald-500"],
          ] as [string, string, string, string][]).map(([label, val, w, bg]) => (
            <div key={label} className="mb-5">
              <div className="flex justify-between text-sm mb-1.5"><span>{label}</span><span className="font-bold">{val}</span></div>
              <div className="h-2 bg-gray-100 rounded-full"><div className={`h-2 rounded-full ${w} ${bg}`} /></div>
            </div>
          ))}
        </div>
        <DarkCard>
          <BlueLabel>STRATEGIC RECOMMENDATION</BlueLabel>
          <div className="font-bold text-white mb-3">Delay to Age 70</div>
          <DimText>Delaying Social Security to age 70 increases your monthly benefit by 24% compared to Full Retirement Age. Break-even occurs at age {be} — well within your life expectancy of {lifeExp}.</DimText>
          <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mt-4">
            <div className="text-xs font-bold text-green-400 mb-1">ADDITIONAL LIFETIME VALUE</div>
            <div className="text-3xl font-black text-green-400">+{fmt(ltv)}</div>
            <div className="text-[10px] text-green-600">vs. claiming at 67 (ages {be}–{lifeExp})</div>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={13} />
    </PageWrap>
  );
};

// ─── PAGE 14: Employer Plan Optimization ───────────────────────────────────────
const Page14 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const cur = d.contribRate ?? 8;
  const rec = Math.max(cur + 4, 12);
  const matchPct = d.employerMatch != null ? (d.employerMatch * 100).toFixed(0) + "%" : "4%";
  const proj = calcPortfolio(d);
  const recProj = Math.round(proj * 1.27);
  return (
    <PageWrap>
      <PageHeader section="Section 7.0: Employer Plan" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Employer Plan Optimization" subtitle="Retirement Intelligence System Analysis & Summary" />
      <div className="flex gap-4 mb-6">
        {([
          ["CURRENT CONTRIBUTION", cur + "%", "📺", "BASE RATE MAINTAINED", "bg-gray-50 border-gray-200", "text-gray-500", "text-gray-400"],
          ["RECOMMENDED CONTRIBUTION", rec + "%", "📈", "+4% Delta Increase", "bg-blue-50 border-blue-600", "text-blue-600", "text-blue-500"],
          ["EMPLOYER MATCH CAPTURE", "Maximized", "✅", "SUCCESS", "bg-green-50 border-green-200", "text-gray-900", "text-green-600"],
        ] as [string, string, string, string, string, string, string][]).map(([label, val, icon, sub, bgBorderCls, valC, subC]) => (
          <div key={label} className={`flex-1 border-2 rounded-xl p-6 ${bgBorderCls}`}>
            <div className="flex justify-between items-start mb-3">
              <div className={`text-[10px] tracking-[2px] uppercase font-bold ${valC}`}>{label}</div>
              <span className="text-xl">{icon}</span>
            </div>
            <div className={`text-3xl font-black mb-2 ${valC}`}>{val}</div>
            <div className={`text-xs font-semibold ${subC}`}>{sub === "SUCCESS" ? "✓ SUCCESS" : sub}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="font-bold text-sm mb-4">Contribution Impact Analysis</div>
          {([
            [cur + "% (Current)", "w-3/4", "bg-gray-300", fmt(proj)],
            [rec + "% (Recommended)", "w-full", "bg-blue-600", fmt(recProj)],
          ] as [string, string, string, string][]).map(([label, w, bg, val]) => (
            <div key={label} className="mb-5">
              <div className="flex justify-between text-sm mb-1.5"><span className="font-semibold">{label}</span><span className="text-blue-600 font-bold">→ {val}</span></div>
              <div className="h-2 bg-gray-100 rounded-full"><div className={`h-2 rounded-full ${w} ${bg}`} /></div>
            </div>
          ))}
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-xs font-bold text-green-800">Net Improvement at Retirement</div>
            <div className="text-2xl font-black text-green-600">+{fmt(recProj - proj)}</div>
          </div>
        </div>
        <DarkCard>
          <BlueLabel>OPTIMIZATION STRATEGY</BlueLabel>
          <DimText>Increasing from {cur}% to {rec}% captures the full {matchPct} employer match and accelerates tax-deferred compounding significantly at retirement.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>IRS CONTRIBUTION LIMITS (2026)</BlueLabel>
            <div className="flex justify-between text-xs text-gray-400 mt-2"><span>401(k) Limit</span><span className="text-white font-bold">$23,500</span></div>
            <div className="flex justify-between text-xs text-gray-400 mt-2"><span>Catch-Up (50+)</span><span className="text-white font-bold">+$7,500</span></div>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={14} />
    </PageWrap>
  );
};

// ─── PAGE 15: Tax Optimization ─────────────────────────────────────────────────
const Page15 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const trad = d.traditionalPercent ?? 60;
  const roth = d.rothPercent ?? 40;
  return (
    <PageWrap>
      <PageHeader section="Section 7.0: Tax Optimization" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Tax Optimization Analysis"
        subtitle="Strategic framework for maximizing after-tax wealth accumulation and distribution efficiency." />
      <div className="flex gap-4 mb-6">
        {([
          ["EFFECTIVE TAX RATE", (d.taxRate ?? 22) + "%", "border-blue-600"],
          ["PROJECTED LIFETIME TAX SAVINGS", fmt(d.lifetimeTaxSavings), "border-emerald-500"],
          ["TAX-ADVANTAGED PORTFOLIO MIX", trad + "/" + roth, "border-purple-500"],
        ] as [string, string, string][]).map(([label, val, border]) => (
          <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-l-4 ${border}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className="text-2xl font-black text-gray-900">{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">ROTH VS. TRADITIONAL ACCOUNT ALLOCATION</div>
          <div className="flex h-12 rounded-lg overflow-hidden mb-4">
            <div className="bg-gray-900 flex items-center justify-center text-white text-xs font-black" style={{ width: trad + "%" }}>{trad}% TRADITIONAL</div>
            <div className="bg-emerald-500 flex items-center justify-center text-white text-xs font-black" style={{ width: roth + "%" }}>{roth}% ROTH</div>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-900" />TAX-DEFERRED GROWTH</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" />TAX-FREE GROWTH</div>
          </div>
        </div>
        <DarkCard>
          <div className="font-bold text-sm mb-4">📈 STRATEGIC TAX INSIGHT</div>
          <BlueLabel>TAX-LOSS HARVESTING</BlueLabel>
          <DimText>A systematic quarterly review can capture at least <strong className="text-white">$3,000</strong> in annual losses to offset ordinary income.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>ROTH CONVERSIONS</BlueLabel>
            <DimText>Executing partial Roth conversions during low-income bridge years can significantly reduce required minimum distributions (RMDs) and long-term tax liability.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={15} />
    </PageWrap>
  );
};

// ─── PAGE 16: Inflation Impact ─────────────────────────────────────────────────
const Page16 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  // ALWAYS recompute salaryFuture locally — the stored value can be astronomically wrong
  const inflRate = d.inflationRate ?? (typeof d.inflation === "number" ? d.inflation : 0.03);
  const years = Math.min(getYears(d), 40);
  const salNow = d.salaryToday ?? d.annualSalary ?? 95000;
  const salFuture = Math.round(salNow * Math.pow(1 + inflRate, years));
  return (
    <PageWrap>
      <PageHeader section="Section 8.0: Inflation & Purchasing Power" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Inflation Impact Analysis"
        subtitle="Evaluating the long-term impact of monetary erosion on lifestyle maintenance and capital preservation." />
      <div className="flex gap-4 mb-6">
        {([
          ["PROJECTED INFLATION RATE", (inflRate * 100).toFixed(1) + "%", "border-blue-600"],
          ["TARGET INCOME TODAY", fmt(salNow), "border-gray-900"],
          ["FUTURE EQUIVALENT (IN " + years + " YEARS)", fmt(salFuture), "border-purple-500"],
        ] as [string, string, string][]).map(([label, val, border]) => (
          <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-l-4 ${border}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className="text-2xl font-black text-gray-900">{val}</div>
          </div>
        ))}
      </div>
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-[10px] tracking-[2px] text-blue-600 uppercase font-bold">PURCHASING POWER OVER TIME</div>
          <div className="flex gap-6 text-[10px] text-gray-400"><span>— REQUIRED INCOME</span><span>— PURCHASING POWER</span></div>
        </div>
        <svg viewBox="0 0 600 160" className="w-full h-40">
          <defs><linearGradient id="ig16" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" /><stop offset="100%" stopColor="#2563eb" stopOpacity="0" /></linearGradient></defs>
          <path d="M40,140 C150,128 300,78 560,18" fill="none" stroke="#111" strokeWidth="2.5" />
          <path d="M40,140 C150,128 300,78 560,18 L560,155 L40,155Z" fill="url(#ig16)" />
          <circle cx="560" cy="18" r="5" fill="#111" />
          {(["$150k", "$200k", "$250k"] as string[]).map((l, i) => <text key={l} x="8" y={136 - i * 55} fontSize="9" fill="#aaa" fontFamily="Arial">{l}</text>)}
          {["Today", "Age 45", "Age 55", "Age 67", "Age 77", "Age 92"].map((l, i) => <text key={l} x={40 + i * 104} y="155" fontSize="8" fill="#aaa" fontFamily="Arial" textAnchor="middle">{l}</text>)}
        </svg>
      </div>
      <PageFooter page={16} />
    </PageWrap>
  );
};

// ─── PAGE 17: Longevity Risk ────────────────────────────────────────────────────
const Page17 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const c90 = d.chancePast90 ?? 38;
  const c95 = d.chancePast95 ?? 16;
  const lasts = d.portfolioLastsTo ?? 93;
  return (
    <PageWrap>
      <PageHeader section="Section 9.0: Longevity" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Longevity Risk Analysis"
        subtitle="Quantifying the probability of portfolio sustainability relative to extended life expectancy projections." />
      <div className="flex gap-4 mb-6">
        {([
          ["PROBABILITY OF AGE 90+", c90 + "%", "border-amber-500", "text-amber-600"],
          ["PROBABILITY OF AGE 95+", c95 + "%", "border-purple-500", "text-purple-600"],
          ["PORTFOLIO SUSTAINABILITY", "Age " + lasts, "border-emerald-500", "text-emerald-600"],
        ] as [string, string, string, string][]).map(([label, val, borderCls, textCls]) => (
          <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-6 border-l-4 ${borderCls}`}>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
            <div className={`text-3xl font-black ${textCls}`}>{val}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="font-bold text-sm mb-4">Portfolio Depletion Scenarios</div>
          {([
            ["Conservative (3% withdrawal)", "Age " + Math.min(lasts + 4, 97), "text-emerald-600"],
            ["Moderate (4% withdrawal)", "Age " + lasts, "text-amber-600"],
            ["Aggressive (5% withdrawal)", "Age " + Math.max(lasts - 7, 80), "text-red-600"],
          ] as [string, string, string][]).map(([label, age, c]) => (
            <div key={label} className="flex justify-between items-center py-3.5 border-b border-gray-100 text-sm">
              <span className="text-gray-700">{label}</span>
              <span className={`font-black text-base ${c}`}>{age}</span>
            </div>
          ))}
        </div>
        <DarkCard>
          <BlueLabel>LONGEVITY HEDGE STRATEGIES</BlueLabel>
          <DimText>With a {c90}% probability of reaching age 90+, consider annuitizing 20–25% of assets to guarantee baseline income regardless of market conditions.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>DYNAMIC WITHDRAWAL STRATEGY</BlueLabel>
            <DimText>Reducing withdrawals by 10% during bear markets (Guardrails Strategy) can extend portfolio life from Age {lasts} to Age {lasts + 4}+, dramatically reducing longevity risk.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={17} />
    </PageWrap>
  );
};

// ─── PAGE 18: Healthcare ────────────────────────────────────────────────────────
const Page18 = ({ onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => (
  <PageWrap>
    <PageHeader section="Healthcare Planning Strategy" onDownload={onDownload} isDownloading={isDownloading} />
    <SectionTitle title="Healthcare Cost Projection"
      subtitle="Modeling medical expenditure and supplemental coverage requirements over the retirement horizon." />
    <div className="flex gap-4 mb-6">
      {([["ESTIMATED ANNUAL COST (AT AGE 67)", "$18,500", "border-red-500"], ["PROJECTED LIFETIME HEALTHCARE COST", "$310,000", "border-purple-500"]] as [string, string, string][]).map(([label, val, border]) => (
        <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-6 border-l-4 ${border}`}>
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
          <div className="text-3xl font-black text-gray-900">{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm mb-4">Cost Breakdown by Category</div>
        {([
          ["Medicare Premiums", "$5,800", "w-[31%]"],
          ["Supplemental Insurance", "$4,200", "w-[23%]"],
          ["Prescription Drugs", "$3,600", "w-[19%]"],
          ["Dental & Vision", "$2,100", "w-[11%]"],
          ["Long-Term Care Reserve", "$2,800", "w-[15%]"],
        ] as [string, string, string][]).map(([label, amt, w]) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between text-sm mb-1.5"><span className="text-gray-700">{label}</span><span className="font-bold">{amt}</span></div>
            <div className="h-1.5 bg-gray-100 rounded-full"><div className={`h-1.5 bg-red-400 rounded-full ${w}`} /></div>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>HSA STRATEGY</BlueLabel>
        <DimText>Maximizing your Health Savings Account creates a triple-tax advantage. With $310,000 in projected lifetime costs, front-loading your HSA during working years provides a dedicated healthcare fund with significant tax savings.</DimText>
        <div className="bg-red-900/20 border border-red-600 rounded-lg p-4 mt-4">
          <div className="text-xs font-bold text-red-300 mb-1">RECOMMENDED HSA ANNUAL CONTRIBUTION</div>
          <div className="text-3xl font-black text-red-400">$4,300 / yr</div>
          <div className="text-[10px] text-red-400">2026 IRS Maximum (Family)</div>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={18} />
  </PageWrap>
);

// ─── PAGE 19: Insurance ─────────────────────────────────────────────────────────
const Page19 = ({ onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => (
  <PageWrap>
    <PageHeader section="Section 12.0: Insurance" onDownload={onDownload} isDownloading={isDownloading} />
    <SectionTitle title="Insurance Coverage Review"
      subtitle="Assessing mortality and morbidity risks to ensure family lifestyle continuity and asset protection." />
    <div className="flex gap-4 mb-6">
      {([
        ["CURRENT LIFE INSURANCE", "$500,000", "border-blue-600", "text-blue-600"],
        ["RECOMMENDED COVERAGE", "$850,000", "border-emerald-500", "text-emerald-600"],
        ["DISABILITY COVERAGE", "60% of Salary", "border-purple-500", "text-purple-600"],
        ["COVERAGE GAP", "$350,000 ▲", "border-red-500", "text-red-600"],
      ] as [string, string, string, string][]).map(([label, val, borderCls, textCls]) => (
        <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-l-4 ${borderCls}`}>
          <div className={`text-[10px] tracking-[2px] uppercase font-bold mb-2 ${textCls}`}>{label}</div>
          <div className={`text-xl font-black ${textCls}`}>{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm mb-5">Coverage Analysis</div>
        <div className="mb-5">
          <div className="flex justify-between text-sm mb-2"><span>Current Coverage</span><span className="font-bold">$500,000</span></div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-3 bg-blue-600 rounded-full w-[59%]" /></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2"><span>Recommended Coverage</span><span className="font-bold text-emerald-600">$850,000</span></div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="flex h-3"><div className="bg-blue-600 h-3 w-[59%]" /><div className="bg-yellow-300 h-3 w-[41%]" /></div>
          </div>
          <div className="text-xs text-red-500 mt-1.5">△ Coverage Gap: $350,000</div>
        </div>
      </div>
      <DarkCard>
        <BlueLabel>COVERAGE RECOMMENDATION</BlueLabel>
        <DimText>Your household needs 10–12x gross income in life coverage. The current policy covers only ~5x. A term policy increase aligns with institutional household protection standards.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>TERM LIFE ESTIMATE</BlueLabel>
          <DimText>A 20-year term policy for $350,000 in additional coverage is estimated at <strong className="text-white">$45–$65/month</strong> — a highly cost-effective solution.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={19} />
  </PageWrap>
);

// ─── PAGE 20: College Planning ──────────────────────────────────────────────────
const Page20 = ({ onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" onDownload={onDownload} isDownloading={isDownloading} />
    <SectionTitle title="College Planning Analysis"
      subtitle="Strategic framework for educational funding and asset accumulation across multi-generational milestones." />
    <div className="flex gap-4 mb-6">
      {([
        ["🎓", "Number of Children", "2", "text-gray-900"],
        ["💰", "Projected 4-Year Cost", "$240,000", "text-blue-600"],
        ["📊", "529 Current Balance", "$15,000", "text-emerald-600"],
        ["⚠️", "Funding Gap", "$180,000", "text-red-600"],
      ] as [string, string, string, string][]).map(([icon, label, val, c]) => (
        <div key={label} className="flex-1 border border-gray-200 rounded-lg p-5">
          <div className="text-sm mb-2">{icon}</div>
          <div className="text-xs text-gray-400 mb-1.5">{label}</div>
          <div className={`text-xl font-black ${c}`}>{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm mb-4">Savings Timeline Per Child</div>
        {([
          ["Child 1 (Age 5)", "13 years to college", "$867/mo needed", "w-[55%]"],
          ["Child 2 (Age 3)", "15 years to college", "$720/mo needed", "w-[40%]"],
        ] as [string, string, string, string][]).map(([name, timeline, monthly, w]) => (
          <div key={name} className="mb-5">
            <div className="flex justify-between text-sm mb-1"><strong>{name}</strong><span className="text-gray-400 text-xs">{timeline}</span></div>
            <div className="text-xs text-blue-600 mb-1.5">{monthly}</div>
            <div className="h-2 bg-gray-100 rounded-full"><div className={`h-2 bg-blue-600 rounded-full ${w}`} /></div>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>529 OPTIMIZATION STRATEGY</BlueLabel>
        <DimText>With a combined funding gap of $180,000, we recommend opening individual 529 plans per child. A combined monthly contribution of <strong className="text-white">$400–$500</strong> today will close the gap.</DimText>
        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4 mt-4">
          <div className="text-xs font-bold text-blue-300 mb-1">RECOMMENDED MONTHLY CONTRIBUTION</div>
          <div className="text-3xl font-black text-blue-400">$450 / mo</div>
          <div className="text-[10px] text-blue-400">Split across both children's 529 plans</div>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={20} />
  </PageWrap>
);

// ─── PAGE 21: Optimistic Scenario ──────────────────────────────────────────────
const Page21 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const base = calcPortfolio(d);
  const optimistic = Math.round(base * 1.25);
  const annInc = Math.round(optimistic * 0.04);
  const tgt = calcTarget(d);
  const replacePct = tgt > 0 ? Math.min(Math.round(((annInc + (d.ssa70 ?? 34162)) / tgt) * 100), 100) : 94;
  const retAge = getRetAge(d);
  return (
    <PageWrap>
      <PageHeader section="Section 11.0: Scenarios" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Scenario Analysis - Optimistic Market"
        subtitle="A strategic projection of retirement outcomes assuming favorable macroeconomic factors and peak performance of core assets." />
      <div className="flex gap-6 mt-6">
        {([
          {
            icon: "📈", badge: "OPTIMISTIC", title: "Portfolio at Age " + retAge,
            val: fmt(optimistic), up: "↗12.5%", sub: "Compared to baseline of " + fmt(base),
            stats: [["Portfolio Growth Rate", "8.5%"], ["Final Decade CAGR", "9.2%"], ["Equity Outperformance", "+2.1%"], ["Annual Income", fmt(annInc)]],
          },
          {
            icon: "💵", badge: "PROJECTED", title: "Income Replacement",
            val: replacePct + "%", up: "↗4.2%", sub: "Surpassing the institutional target of 85%",
            stats: [["Annual Portfolio Income", fmt(annInc)], ["SS Benefit (age 70)", fmt(d.ssa70)], ["Total Income", fmt(annInc + (d.ssa70 ?? 34162))], ["Surplus Buffer", fmt(Math.round(annInc * 0.15))]],
          },
        ]).map(({ icon, badge, title, val, up, sub, stats }) => (
          <div key={title} className="flex-1 border border-gray-200 rounded-xl p-7 relative">
            <div className="absolute top-4 right-4 bg-green-50 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full">{badge}</div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl mb-5">{icon}</div>
            <div className="text-sm text-gray-400 mb-2">{title}</div>
            <div className="flex items-baseline gap-3 mb-2">
              <div className="text-4xl font-black text-gray-900">{val}</div>
              <div className="text-sm font-bold text-emerald-500">{up}</div>
            </div>
            <div className="text-xs text-gray-400 mb-6">{sub}</div>
            <div className="border-t border-gray-100 pt-5 grid grid-cols-2 gap-4">
              {stats.map(([label, v]) => (
                <div key={label}>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-sm font-bold text-emerald-600">{v}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <PageFooter page={21} />
    </PageWrap>
  );
};

// ─── PAGE 22: Conservative Scenario ────────────────────────────────────────────
const Page22 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const base = calcPortfolio(d);
  const conservative = Math.round(base * 0.74);
  const tgt = calcTarget(d);
  const incReplace = tgt > 0 ? Math.round(((conservative * 0.04 + (d.ssa67 ?? 27550)) / tgt) * 100) : 69;
  return (
    <PageWrap>
      <PageHeader section="Section 11.0: Scenarios" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Scenario Analysis - Conservative Market"
        subtitle="Detailed stress test and portfolio projections based on conservative market parameters." />
      <div className="flex gap-4 mt-8">
        {([
          ["🗂", "PORTFOLIO AT 67", fmt(conservative)],
          ["💵", "INCOME REPLACEMENT", incReplace + "%"],
          ["📉", "STRESS TEST RESULT", d.stressTestResult ?? "Moderate Risk Exposure"],
        ] as [string, string, string][]).map(([icon, label, val]) => (
          <div key={label} className="flex-1 border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-blue-50 rounded-md flex items-center justify-center text-blue-600 text-sm">{icon}</div>
              <div className="text-[10px] tracking-[2px] text-gray-400 uppercase">{label}</div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-3 leading-tight">{val}</div>
            <div className="w-8 h-0.5 bg-blue-600" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="border border-gray-200 rounded-xl p-6">
          <div className="font-bold text-sm mb-4">Scenario Assumptions</div>
          {([["Avg. Annual Return", "4.5%"], ["Inflation Rate", "3.5%"], ["Market Correction", "–25% in Year 5"], ["Recovery Period", "3 Years"]] as [string, string][]).map(([l, v]) => (
            <div key={l} className="flex justify-between py-3 border-b border-gray-100 text-sm">
              <span className="text-gray-500">{l}</span><span className="font-bold">{v}</span>
            </div>
          ))}
        </div>
        <DarkCard>
          <BlueLabel>STRESS TEST FINDINGS</BlueLabel>
          <DimText>Under conservative assumptions, the portfolio reaches {fmt(conservative)} — sufficient to sustain a {incReplace}% income replacement rate. A 25% market correction in Year 5 reduces the final balance significantly.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>MITIGATION STRATEGY</BlueLabel>
            <DimText>Maintaining a 2-year cash reserve at retirement and reducing equity exposure to 45% by age 60 provides meaningful downside protection under adverse scenarios.</DimText>
          </div>
        </DarkCard>
      </div>
      <PageFooter page={22} />
    </PageWrap>
  );
};

// ─── PAGE 23: Action Plan ───────────────────────────────────────────────────────
const Page23 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const actions = d.actionPlan ?? [
    "Increase retirement contribution to 12%",
    "Build emergency fund to " + fmt(d.recommendedEFund),
    "Review and optimize life insurance coverage",
    "Rebalance portfolio annually",
  ];
  const icons = ["📈", "🗂", "🛡", "🔄", "💡", "📊"];
  return (
    <PageWrap>
      <PageHeader section="Section 12.0: Action Plan" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Recommendation Action Plan" subtitle="Prioritized steps for your retirement intelligence" />
      <div className="flex flex-col gap-3 mt-4">
        {actions.map((action, i) => (
          <div key={i} className="flex items-start gap-4 px-6 py-5 border border-gray-200 rounded-xl">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icons[i] ?? "✅"}</div>
            <div>
              <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-1">PRIORITY {i + 1}</div>
              <div className="font-bold text-sm text-gray-900">{action}</div>
            </div>
          </div>
        ))}
      </div>
      <PageFooter page={23} />
    </PageWrap>
  );
};

// ─── PAGE 24: Roadmap ───────────────────────────────────────────────────────────
const Page24 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const cur = d.contribRate ?? 8;
  const rec = Math.max(cur + 2, 10);
  return (
    <PageWrap>
      <PageHeader section="Section 12.0: Roadmap" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="12-Month Implementation Roadmap" subtitle="Retirement Intelligence System Strategic Schedule" />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {([
          [1, "QUARTER 1", [["Increase contribution to " + rec + "%", "Boost 401(k) to " + rec + "% immediately to capture partial employer match."], ["Rebalance portfolio", "Realign to 60/20/15/5 target allocation across 401(k), brokerage and cash."]]],
          [2, "QUARTER 2", [["Open Roth IRA", "Establish Roth IRA and contribute $583/month to reach the 2026 annual limit of $7,000."], ["Review budget", "Redirect surplus from miscellaneous to emergency savings account."]]],
          [3, "QUARTER 3", [["Adjust insurance", "Apply for additional term life coverage. Lock in rates while young."], ["Review 529 plans", "Open individual 529 accounts; automate $225/mo per child."]]],
          [4, "QUARTER 4", [["Review tax positioning", "Work with CPA on year-end Roth conversion opportunity and harvest tax losses in brokerage."], ["Annual plan review", "Schedule next annual WINTRICE Blueprint review to track progress against all 25 metrics."]]],
        ] as [number, string, [string, string][]][]).map(([num, title, tasks]) => (
          <div key={String(title)} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-sm">{num}</div>
              <div className="font-black text-sm tracking-wide">{title}</div>
            </div>
            {tasks.map(([t, desc]) => (
              <div key={t} className="flex gap-3 mb-4">
                <span className="text-blue-600 text-base shrink-0">✅</span>
                <div>
                  <div className="font-bold text-sm mb-1">{t}</div>
                  <div className="text-xs text-gray-400 leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <PageFooter page={24} />
    </PageWrap>
  );
};

// ─── PAGE 25: Disclosures ───────────────────────────────────────────────────────
const Page25 = ({ d, onDownload, isDownloading }: { d: ReportData; onDownload?: () => void; isDownloading?: boolean }) => {
  const inflRate = d.inflationRate ?? (typeof d.inflation === "number" ? d.inflation : 0.03);
  const retAge = getRetAge(d);
  const annRet = d.expectedAnnualReturn ?? 0.065;
  return (
    <PageWrap>
      <PageHeader section="Section 13.0: Disclosures" onDownload={onDownload} isDownloading={isDownloading} />
      <SectionTitle title="Disclosures & Assumptions" subtitle="Institutional Financial Planning Blueprint" />
      <div className="mt-4">
        {([
          ["📈", "Assumed Return", (annRet * 100).toFixed(1) + "%"],
          ["🗂", "Inflation", (inflRate * 100).toFixed(1) + "%"],
          ["⏱", "Retirement Age", String(retAge)],
          ["⏳", "Life Expectancy", String(d.lifeExpectancy ?? 92)],
          ["🔒", "Social Security", "Estimated based on current law"],
        ] as [string, string, string][]).map(([icon, label, val]) => (
          <div key={label} className="flex justify-between items-center py-5 border-b border-gray-100">
            <div className="flex items-center gap-4"><span className="text-base">{icon}</span><span className="text-sm text-gray-600">{label}</span></div>
            <span className="font-bold text-sm text-gray-900">{val}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <div className="font-bold text-sm text-gray-900 mb-3">Important Disclosures</div>
        <p className="text-xs text-gray-400 leading-loose">
          This Financial Planning Blueprint is prepared by the WINTRICE Retirement Intelligence System for informational and educational purposes only.
          It does not constitute investment, legal, or tax advice. All projections are based on assumptions that may not materialize.
          Past performance is not indicative of future results. Consult a licensed financial advisor before making any investment decisions.
          The projected portfolio values, income estimates, and scenario analyses are hypothetical and subject to market risk, inflation, and legislative changes.
          Social Security estimates are based on current law and may change. © 2026 WINTRICE WEALTH MANAGEMENT. All rights reserved. LICENSED ADVISORY CONTENT.
        </p>
      </div>
      <PageFooter page={25} />
    </PageWrap>
  );
};

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function FinancialBlueprint() {
  const [current, setCurrent] = useState<number>(0);
  const [reportData, setReportData] = useState<ReportData>({});
  const [rawPayload, setRawPayload] = useState<any>(null);
  const { mutate: downloadReport, isPending: isDownloading } = useDownloadReport();

  // Load and parse localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("reportData");
      if (!raw) return;
      let parsed: any;
      try { parsed = JSON.parse(raw); } catch { return; }

      if (Array.isArray(parsed)) {
        // Flatten the array-of-pages format (doc 9 sample)
        const merged: ReportData = {};
        const skip = new Set(["page", "title", "section", "scorecard", "disclosures"]);
        parsed.forEach((page: any) => {
          Object.keys(page).forEach((k) => {
            if (skip.has(k)) return;
            if (k === "profile") {
              // Flatten nested profile object
              Object.assign(merged, page.profile);
            } else if (k === "footer") {
              if (!merged.clientName && page.footer?.clientName) merged.clientName = page.footer.clientName;
              if (!merged.preparedBy && page.footer?.preparedBy) merged.preparedBy = page.footer.preparedBy;
            } else {
              (merged as any)[k] = page[k];
            }
          });
        });
        setReportData(merged);
        setRawPayload(merged);
      } else {
        // Direct flat object format
        setReportData(parsed);
        setRawPayload(parsed);
      }
    } catch (e) {
      console.error("Failed to parse reportData from localStorage:", e);
    }
  }, []);

  const handleDownload = () => {
    if (!rawPayload) { window.print(); return; }
    downloadReport(rawPayload, {
      onSuccess: () => { alert("Report downloaded successfully!"); },
      onError: () => { alert("Download failed. Please try again."); },
    });
  };

  const pageComponents = [
    Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9, Page10,
    Page11, Page12, Page13, Page14, Page15, Page16, Page17, Page18, Page19, Page20,
    Page21, Page22, Page23, Page24, Page25,
  ];

  const total = pageComponents.length;
  const PageComponent = pageComponents[current];

  const goTo = (n: number) => {
    setCurrent(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-slate-100 min-h-screen w-full">

      {/* ── Sticky Top Navigation ── */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-lg print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">

          {/* Prev */}
          <button
            onClick={() => goTo(Math.max(0, current - 1))}
            disabled={current === 0}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-sm font-bold rounded-lg bg-gray-900 text-white disabled:opacity-30 hover:bg-gray-700 active:scale-95 transition-all"
          >
            ← <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page dots */}
          <div className="flex-1 flex flex-col items-center gap-1.5">
            <span className="text-xs font-bold text-gray-600 tracking-widest uppercase">
              Page {current + 1} / {total}
            </span>
            <div className="flex items-center gap-0.5 flex-wrap justify-center">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-200 ${i === current ? "w-5 h-2 bg-blue-600" : "w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={() => goTo(Math.min(total - 1, current + 1))}
            disabled={current === total - 1}
            className="flex items-center gap-2 px-5 sm:px-6 py-2.5 text-sm font-bold rounded-lg bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 active:scale-95 transition-all"
          >
            <span className="hidden sm:inline">Next</span> →
          </button>
        </div>
      </div>

      {/* ── Centered Page Content ── */}
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-5xl shadow-2xl rounded-lg overflow-hidden">
          <PageComponent d={reportData} onDownload={handleDownload} isDownloading={isDownloading} />
        </div>
      </div>

      {/* ── Bottom Navigation ── */}
      <div className="flex justify-center items-center gap-4 pb-12 print:hidden">
        <button
          onClick={() => goTo(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-6 py-2.5 text-sm font-bold rounded-lg bg-gray-900 text-white disabled:opacity-30 hover:bg-gray-700 transition-colors"
        >← Previous</button>
        <span className="text-xs text-gray-400 font-semibold tracking-widest">{current + 1} / {total}</span>
        <button
          onClick={() => goTo(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          className="px-6 py-2.5 text-sm font-bold rounded-lg bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 transition-colors"
        >Next →</button>
      </div>

    </div>
  );
}