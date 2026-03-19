import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface PageHeaderProps {
  section?: string;
}

interface PageFooterProps {
  page: number;
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

interface DarkCardProps {
  children: React.ReactNode;
}

interface BlueLabelProps {
  children: React.ReactNode;
}

interface DimTextProps {
  children: React.ReactNode;
}

interface PageWrapProps {
  children: React.ReactNode;
}

// ─── Shared Components ────────────────────────────────────────────────────────
const Logo = () => (
  <div className="flex items-center gap-2">
    <div
      className="w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent"
      style={{ borderBottom: "14px solid #2563eb" }}
    />
    <span className="font-black text-sm tracking-widest text-gray-900">WINTRICE</span>
  </div>
);

const ExportBtn = () => (
  <button className="flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors">
    🖨 Export to PDF
  </button>
);

const PageHeader = ({ section }: PageHeaderProps) => (
  <div className="flex justify-between items-center mb-10">
    <Logo />
    <div className="flex items-center gap-6">
      {section && (
        <span className="text-[10px] tracking-[3px] text-gray-400 uppercase">{section}</span>
      )}
      <ExportBtn />
    </div>
  </div>
);

const PageFooter = ({ page }: PageFooterProps) => (
  <div className="absolute bottom-6 left-16 right-16 flex justify-between text-[10px] text-gray-300 tracking-widest uppercase">
    <span>WINTRICE WEALTH MANAGEMENT • BLUEPRINT REPORT • CONFIDENTIAL</span>
    <span>PAGE {String(page).padStart(2, "0")}</span>
  </div>
);

const PageWrap = ({ children }: PageWrapProps) => (
  <div className="bg-white min-h-screen px-16 py-12 relative box-border">
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className="mb-8">
    <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">{title}</h1>
    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
  </div>
);

const DarkCard = ({ children }: DarkCardProps) => (
  <div className="bg-gray-900 rounded-xl p-6 text-white">{children}</div>
);

const BlueLabel = ({ children }: BlueLabelProps) => (
  <div className="text-[10px] tracking-[2px] text-blue-500 uppercase font-bold mb-1.5">{children}</div>
);

const DimText = ({ children }: DimTextProps) => (
  <p className="text-xs text-gray-400 leading-relaxed">{children}</p>
);

// ─── PAGE 1: Cover ────────────────────────────────────────────────────────────
const Page1 = () => (
  <div className="bg-white min-h-screen px-16 py-12 flex flex-col justify-between box-border">
    <div className="flex justify-between items-center">
      <Logo />
      <button className="flex items-center gap-2 bg-gray-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full">
        🖨 Generate PDF Report
      </button>
    </div>
    <div className="text-center">
      <div className="text-6xl font-black text-gray-900 leading-tight">Financial Planning</div>
      <div className="text-6xl font-black text-blue-600 leading-tight mb-10">Blueprint</div>
      <div className="w-16 h-0.5 bg-gray-200 mx-auto mb-12" />
      <div className="flex flex-col gap-6 items-center">
        {(
          [
            ["PREPARED FOR", "John A. Employee", false],
            ["EMPLOYER", "Sample Corporation Inc.", false],
            ["DATE", "February 2026", false],
            ["PREPARED BY", "WINTRICE Retirement Intelligence System", true],
          ] as [string, string, boolean][]
        ).map(([label, val, bold]) => (
          <div key={label} className="text-center">
            <div className="text-[10px] tracking-[3px] text-gray-400 uppercase mb-1">{label}</div>
            <div className={`text-lg text-gray-900 ${bold ? "font-bold" : "font-normal"}`}>{val}</div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex justify-between items-end">
      <div className="text-[10px] text-gray-300 leading-relaxed">
        © 2026 WINTRICE WEALTH MANAGEMENT.<br />LICENSED ADVISORY CONTENT.
      </div>
      <div className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded">VERSION 4.2.0</div>
    </div>
  </div>
);

// ─── PAGE 2: Personal Profile Summary ────────────────────────────────────────
const Page2 = () => (
  <PageWrap>
    <PageHeader section="Section 1.0: Demographic & Financial Profile" />
    <SectionTitle
      title="Personal Profile Summary"
      subtitle="Core assumptions and demographic data used for the financial projection model."
    />
    <div className="grid grid-cols-2 gap-12">
      {(
        [
          {
            heading: "PERSONAL & RETIREMENT",
            rows: [
              ["Current Age", "35", false],
              ["Retirement Goal Age", "67", false],
              ["Life Expectancy", "92", false],
              ["Marital Status", "Married", true],
              ["Dependents", "2", false],
            ] as [string, string, boolean][],
          },
          {
            heading: "INCOME & SAVINGS",
            rows: [
              ["Current Annual Salary", "$95,000", false],
              ["Projected Salary Growth", "3%", false],
              ["Current Portfolio Value", "$82,500", false],
              ["Monthly Contribution", "$750", false],
              ["Employer Match", "4%", false],
            ] as [string, string, boolean][],
          },
        ]
      ).map(({ heading, rows }) => (
        <div key={heading}>
          <div className="text-[11px] tracking-[2px] text-blue-600 uppercase font-bold mb-4">{heading}</div>
          <div className="border-t border-gray-200">
            {rows.map(([label, val, bold]) => (
              <div key={label} className="flex justify-between items-center py-4 border-b border-gray-100">
                <span className="text-sm text-gray-400">{label}</span>
                <span className={`text-lg text-gray-900 ${bold ? "font-black" : "font-bold"}`}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    <PageFooter page={2} />
  </PageWrap>
);

// ─── PAGE 3: Financial Health Scorecard ──────────────────────────────────────
const Page3 = () => (
  <PageWrap>
    <PageHeader section="Section 2.0: Cash Flow" />
    <SectionTitle
      title="Financial Health Scorecard"
      subtitle="A comprehensive snapshot of your current liquidity, efficiency, and wealth accumulation."
    />
    <div className="flex gap-4 mb-8">
      {(
        [
          ["NET WORTH", "$151,000", false],
          ["MONTHLY INCOME", "$7,916", false],
          ["MONTHLY EXPENSES", "$6,200", false],
          ["MONTHLY SURPLUS", "$1,716", true],
        ] as [string, string, boolean][]
      ).map(([label, val, green]) => (
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
      {(
        [
          ["Savings Rate", 75],
          ["Debt Ratio", 68],
          ["Investment Allocation", 70],
          ["Emergency Fund", 60],
          ["Retirement Readiness", 72],
        ] as [string, number][]
      ).map(([cat, score]) => (
        <div key={cat} className="grid grid-cols-[1fr_auto] py-3 border-b border-gray-50 text-sm">
          <span className="text-gray-800">{cat}</span>
          <span className="font-bold text-gray-900">{score}</span>
        </div>
      ))}
    </div>
    <PageFooter page={3} />
  </PageWrap>
);

// ─── PAGE 4: Net Worth Statement ──────────────────────────────────────────────
const Page4 = () => (
  <PageWrap>
    <PageHeader section="Section 2.0: Cash Flow" />
    <SectionTitle title="Networth Statement" subtitle="Detailed breakdown of assets and liabilities." />
    <div className="grid grid-cols-2 gap-6">
      {(
        [
          {
            icon: "📈",
            heading: "Assets Table",
            colorCls: "text-blue-600",
            rows: [["401(k)", "$82,500"], ["Checking/Savings", "$18,000"], ["Brokerage", "$12,000"], ["Home Value", "$350,000"]] as [string, string][],
            total: "$462,500",
            totalTextCls: "text-blue-600",
            totalBgCls: "bg-blue-50",
          },
          {
            icon: "🏛",
            heading: "Liabilities Table",
            colorCls: "text-red-600",
            rows: [["Mortgage", "$285,000"], ["Student Loans", "$22,000"], ["Credit Cards", "$4,500"]] as [string, string][],
            total: "$311,500",
            totalTextCls: "text-red-600",
            totalBgCls: "bg-red-50",
          },
        ]
      ).map(({ icon, heading, colorCls, rows, total, totalTextCls, totalBgCls }) => (
        <div key={heading}>
          <div className={`font-bold text-base ${colorCls} mb-3`}>{icon} {heading}</div>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex justify-between px-4 py-2.5 bg-gray-50 text-xs text-gray-400 font-bold uppercase tracking-wide">
              <span>Type</span><span>Value</span>
            </div>
            {rows.map(([label, val]) => (
              <div key={label} className="flex justify-between px-4 py-3.5 border-t border-gray-100 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold">{val}</span>
              </div>
            ))}
            <div className={`flex justify-between px-4 py-3.5 border-t border-gray-200 ${totalBgCls}`}>
              <span className="font-bold text-sm">Total</span>
              <span className={`font-black text-base ${totalTextCls}`}>{total}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    <PageFooter page={4} />
  </PageWrap>
);

// ─── PAGE 5: Cash Flow Analysis ───────────────────────────────────────────────
const Page5 = () => (
  <PageWrap>
    <PageHeader section="Section 2.0: Cash Flow" />
    <SectionTitle title="Cash Flow Analysis" subtitle="Financial performance report for the period ending October 2023" />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["MONTHLY INCOME", "$7,916", "bg-white border border-gray-200", "text-gray-900", "#16a34a", "↑ 2.4%", "bg-green-50 text-green-700"],
          ["MONTHLY EXPENSES", "$6,200", "bg-white border border-gray-200", "text-gray-900", "#dc2626", "↓ 1.2%", "bg-red-50 text-red-700"],
          ["MONTHLY SURPLUS", "$1,716", "bg-blue-600", "text-white", "rgba(255,255,255,0.4)", "↑ 5.8%", "bg-white/20 text-white"],
        ] as [string, string, string, string, string, string, string][]
      ).map(([label, val, bg, textC, barC, badge, badgeCls]) => (
        <div key={label} className={`flex-1 rounded-xl p-5 ${bg}`}>
          <div className="flex justify-between items-center mb-2">
            <span className={`text-[10px] tracking-[2px] uppercase ${textC === "text-white" ? "text-white/60" : "text-gray-400"}`}>{label}</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${badgeCls}`}>{badge}</span>
          </div>
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
              {(
                [
                  ["#2563eb", 50, 0],
                  ["#16a34a", 20, 50],
                  ["#f59e0b", 15, 70],
                  ["#d1d5db", 15, 85],
                ] as [string, number, number][]
              ).map(([color, pct, offset]) => (
                <circle
                  key={color}
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke={color}
                  strokeWidth="5"
                  strokeDasharray={`${pct * 0.88} ${100 - pct * 0.88}`}
                  strokeDashoffset={`${-offset * 0.88}`}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-black text-gray-900">$6.2k</div>
          </div>
          <div className="flex-1 space-y-2">
            {(
              [
                ["#2563eb", "Housing & Mortgage", "$3,100", "50%"],
                ["#16a34a", "Healthcare & Insurance", "$1,240", "20%"],
                ["#f59e0b", "Lifestyle & Travel", "$930", "15%"],
                ["#d1d5db", "Miscellaneous", "$930", "15%"],
              ] as [string, string, string, string][]
            ).map(([color, label, amt, pct]) => (
              <div key={label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-xs text-gray-500">{label}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-900">{amt}</span>
                  <span className="text-[10px] text-gray-400 ml-1">{pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-3">SMART INSIGHT</div>
        <p className="text-xs text-gray-500 leading-relaxed italic mb-5">
          "Your housing costs are optimized at 39% of gross income. Consider reallocating $200 from the miscellaneous budget to your high-yield retirement fund to improve long-term projections by 1.2%."
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

// ─── PAGE 6: Emergency Fund Analysis ─────────────────────────────────────────
const Page6 = () => (
  <PageWrap>
    <PageHeader section="Section 3.0: Liquidity" />
    <SectionTitle
      title="Emergency Fund Analysis"
      subtitle="Assessing capital reserves required to sustain operational stability during unforeseen disruptions."
    />
    <div className="flex gap-4 mb-8">
      {(
        [
          ["MONTHLY CORE EXPENSES", "$5,500", "Includes housing, food, and essentials", false],
          ["RECOMMENDED 6 MONTHS", "$33,000", "Institutional safety benchmark", false],
          ["CURRENT LIQUID SAVINGS", "$18,000", "Readily accessible cash equivalents", true],
        ] as [string, string, string, boolean][]
      ).map(([label, val, sub, green]) => (
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
          <div className="text-lg font-black text-gray-900 mb-1">Fund Status: 55% Funded</div>
          <div className="text-xs text-gray-400">Current Capital Allocation vs. Target Reserve</div>
        </div>
        <div className="text-sm text-gray-700">
          <strong>$18,000</strong> <span className="text-gray-300">/ $33,000</span>
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full w-[55%] bg-gradient-to-r from-blue-600 to-emerald-500" />
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-gray-400 uppercase tracking-widest">
        <span>INITIAL RESERVE</span><span>TARGET OBJECTIVE</span>
      </div>
    </div>
    <PageFooter page={6} />
  </PageWrap>
);

// ─── PAGE 7: Debt Analysis ────────────────────────────────────────────────────
const Page7 = () => (
  <PageWrap>
    <PageHeader section="Section 4.0: Liabilities & Payoff" />
    <SectionTitle title="Debt Analysis" subtitle="Detailed breakdown of current liabilities and optimized liquidation strategies." />
    <div className="flex gap-4 mb-6">
      <div className="flex-1 bg-blue-50 border-2 border-blue-600 rounded-xl p-5">
        <div className="text-[10px] tracking-[2px] text-blue-600 uppercase mb-2">DEBT-TO-INCOME (DTI)</div>
        <div className="text-4xl font-black text-gray-900 mb-2">32%</div>
        <div className="text-xs font-bold text-green-600">✓ STABLE RANGE</div>
      </div>
      {(
        [
          ["STUDENT LOAN PAYOFF", "4 Years", "↗ ACCELERATED PLAN"],
          ["MORTGAGE PAYOFF", "25 Years", "⏱ STANDARD AMORTIZATION"],
        ] as [string, string, string][]
      ).map(([label, val, sub]) => (
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
          <defs>
            <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M20,15 L60,40 L110,70 L160,100 L210,118 L260,130" fill="none" stroke="#2563eb" strokeWidth="2.5" />
          <path d="M20,15 L60,40 L110,70 L160,100 L210,118 L260,130 L260,138 L20,138 Z" fill="url(#dg)" />
          {([[20, 15], [60, 40], [110, 70], [160, 100], [210, 118], [260, 130]] as [number, number][]).map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="3.5" fill="#2563eb" />
          ))}
          {(
            [["Year 0", 20], ["Year 5", 60], ["Year 10", 110], ["Year 15", 160], ["Year 20", 210], ["Year 25", 260]] as [string, number][]
          ).map(([l, x]) => (
            <text key={l} x={x} y="138" textAnchor="middle" fontSize="7" fill="#aaa" fontFamily="Arial">{l}</text>
          ))}
        </svg>
      </div>
      <div className="flex flex-col gap-4">
        <DarkCard>
          <BlueLabel>DTI ANALYSIS</BlueLabel>
          <DimText>Your DTI of 32% is within the institutional "Comfort Zone." Aggressive liquidation of student loans over 4 years will liberate $1,200/month in cash flow.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4">
            <BlueLabel>PAYOFF STRATEGY</BlueLabel>
            <DimText>We recommend the "Snowball Method" for credit lines while maintaining standard payments on the mortgage to leverage tax-deductible interest benefits.</DimText>
          </div>
        </DarkCard>
        <div className="border border-gray-200 rounded-xl p-5">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-3">LIABILITY COMPOSITION</div>
          {(
            [
              ["Real Estate Debt", "$380,000", "w-4/5", "bg-blue-600"],
              ["Educational Loans", "$42,500", "w-2/5", "bg-gray-300"],
            ] as [string, string, string, string][]
          ).map(([label, amt, w, bg]) => (
            <div key={label} className="mb-3">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-700">{label}</span>
                <span className="font-bold">{amt}</span>
              </div>
              <div className="h-1 bg-gray-100 rounded-full">
                <div className={`h-1 rounded-full ${w} ${bg}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <PageFooter page={7} />
  </PageWrap>
);

// ─── PAGE 8: Investment Allocation ────────────────────────────────────────────
const Page8 = () => (
  <PageWrap>
    <PageHeader section="Section 3.0: Liquidity" />
    <SectionTitle title="Current Investment Allocation" subtitle="Detailed analytical breakdown of strategic portfolio positioning." />
    <div className="flex justify-end mb-4">
      <span className="bg-green-50 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full">✓ Risk Profile: Moderate Growth</span>
    </div>
    <div className="grid grid-cols-2 gap-12 items-center">
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {(
            [
              ["#2563eb", 60, 0],
              ["#7c3aed", 15, 216],
              ["#16a34a", 20, 270],
              ["#f59e0b", 5, 342],
            ] as [string, number, number][]
          ).map(([color, pct, startAngle], i) => {
            const toRad = (a: number) => (a * Math.PI) / 180;
            const cx = 100, cy = 100, rad = 80;
            const sweep = pct * 3.6;
            const x1 = cx + rad * Math.cos(toRad(startAngle));
            const y1 = cy + rad * Math.sin(toRad(startAngle));
            const x2 = cx + rad * Math.cos(toRad(startAngle + sweep));
            const y2 = cy + rad * Math.sin(toRad(startAngle + sweep));
            return (
              <path
                key={i}
                d={`M${cx} ${cy} L${x1} ${y1} A${rad} ${rad} 0 ${sweep > 180 ? 1 : 0} 1 ${x2} ${y2}Z`}
                fill={color}
                opacity="0.9"
              />
            );
          })}
          <circle cx="100" cy="100" r="52" fill="white" />
          <text x="100" y="97" textAnchor="middle" fontSize="20" fontWeight="900" fontFamily="Arial Black" fill="#111">100%</text>
          <text x="100" y="113" textAnchor="middle" fontSize="9" fill="#888" fontFamily="Arial">TOTAL ASSETS</text>
        </svg>
        <div className="flex flex-wrap gap-4 mt-4 justify-center">
          {(
            [["#2563eb", "U.S. Stocks"], ["#7c3aed", "Intl Stocks"], ["#16a34a", "Bonds"], ["#f59e0b", "Cash"]] as [string, string][]
          ).map(([c, l]) => (
            <div key={l} className="flex items-center gap-2 text-xs text-gray-600">
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />
              {l}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-5">
        {(
          [
            ["U.S. Stocks", "Equity Market Large Cap", 60, "#2563eb", "+2.4%", "text-green-600"],
            ["International Stocks", "Global Diversified", 15, "#7c3aed", "+1.1%", "text-green-600"],
            ["Bonds", "Fixed Income Securities", 20, "#16a34a", "--", "text-gray-400"],
            ["Cash", "Liquidity & Equivalents", 5, "#f59e0b", "-0.2%", "text-red-500"],
          ] as [string, string, number, string, string, string][]
        ).map(([name, sub, pct, color, trend, tClass]) => (
          <div key={name} className="flex items-center gap-4">
            <div className="w-28 flex-shrink-0">
              <div className="text-sm font-bold text-gray-900">{name}</div>
              <div className="text-[10px] text-gray-400 uppercase tracking-wide">{sub}</div>
            </div>
            <div className="flex-1 h-1.5 bg-gray-100 rounded-full">
              <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: color }} />
            </div>
            <div className="text-sm font-black w-10 text-right">{pct}%</div>
            <div className={`text-xs font-bold w-12 text-right ${tClass}`}>{trend}</div>
          </div>
        ))}
      </div>
    </div>
    <PageFooter page={8} />
  </PageWrap>
);

// ─── PAGE 9: Risk Tolerance ───────────────────────────────────────────────────
const Page9 = () => (
  <PageWrap>
    <PageHeader section="Section 3.0: Liquidity" />
    <SectionTitle title="Risk Tolerance Assessment" subtitle="Evaluation of psychological risk behavior and financial risk capacity." />
    <div className="flex gap-4 mt-8">
      {(
        [
          ["🗂", "RISK CAPACITY", "Moderate"],
          ["🧠", "RISK BEHAVIOR", "Slightly Conservative"],
          ["✅", "PORTFOLIO ALIGNMENT", "85% Aligned"],
        ] as [string, string, string][]
      ).map(([icon, label, val]) => (
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

// ─── PAGE 10: Retirement Projection ──────────────────────────────────────────
const Page10 = () => {
  const bars = Array.from({ length: 32 }, (_, i) =>
    Math.round(82500 * Math.pow(1.075, i) + 9000 * ((Math.pow(1.075, i) - 1) / 0.075))
  );
  const max = 1420000;
  return (
    <PageWrap>
      <PageHeader section="Section 4.0: Retirement" />
      <SectionTitle title="Retirement Projection" subtitle="Visualization of wealth accumulation through age 67 with refined annual growth metrics." />
      <div className="flex gap-4 mb-6">
        {(
          [
            ["PROJECTED RETIREMENT AGE", "67", "border-blue-600"],
            ["PROJECTED PORTFOLIO VALUE", "$1,420,000", "border-emerald-500"],
            ["ESTIMATED ANNUAL INCOME", "$78,000", "border-purple-500"],
          ] as [string, string, string][]
        ).map(([label, val, border]) => (
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
            {bars.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${(v / max) * 100}%`,
                  background: i === 31 ? "#111" : `rgba(16,185,129,${0.35 + (v / max) * 0.65})`,
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[9px] text-gray-400">
            {["AGE 35", "AGE 45", "AGE 55", "AGE 63", "AGE 67"].map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        </div>
        <DarkCard>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-blue-600 text-xs px-2 py-1 rounded">📊</span>
            <span className="text-xs font-bold">PROJECTION INSIGHT</span>
          </div>
          <BlueLabel>SUSTAINABLE WITHDRAWAL</BlueLabel>
          <DimText>At age 67, a <strong className="text-white">4.0% safe withdrawal rule</strong> yields $78k/year, adjusted for 2.5% inflation.</DimText>
          <div className="border-t border-gray-700 mt-4 pt-4 mb-4">
            <BlueLabel>INSTITUTIONAL STRATEGY</BlueLabel>
            <DimText>Note the acceleration in the final decade (ages 57–67) due to compounding.</DimText>
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

// ─── PAGE 11: Retirement Income Gap ──────────────────────────────────────────
const Page11 = () => (
  <PageWrap>
    <PageHeader section="Section 5.0: Retirement Income" />
    <SectionTitle title="Retirement Income Gap Analysis" subtitle="Evaluation of current projected income against target lifestyle requirements." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["TARGET ANNUAL INCOME", "$95,000", "border-blue-600", "text-blue-600"],
          ["PROJECTED ANNUAL INCOME", "$78,000", "border-emerald-500", "text-emerald-600"],
          ["ANNUAL INCOME GAP", "$17,000", "border-red-500", "text-red-600"],
          ["GAP COVERAGE REQUIRED", "18%", "border-gray-900", "text-gray-900"],
        ] as [string, string, string, string][]
      ).map(([label, val, borderCls, textCls]) => (
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
            <div className="w-full bg-gray-800 flex-1 rounded-t flex items-center justify-center">
              <span className="text-white font-black text-lg">$95k</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-2 text-center">TARGET INCOME</div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="border-2 border-dashed border-red-400 bg-red-50 px-3 py-1.5 rounded mb-2 text-center">
              <div className="text-[10px] text-red-500 font-bold">THE GAP</div>
              <div className="text-xs font-black text-red-500">-$17,000</div>
            </div>
            <div className="w-full bg-emerald-500 rounded-t flex items-center justify-center" style={{ height: "80%" }}>
              <span className="text-white font-black text-lg">$78k</span>
            </div>
            <div className="text-[10px] text-gray-400 mt-2 text-center">PROJECTED INCOME</div>
          </div>
        </div>
      </div>
      <DarkCard>
        <div className="font-bold text-sm mb-4">📈 STRATEGIC ANALYSIS</div>
        <BlueLabel>CLOSING THE GAP</BlueLabel>
        <DimText>Increasing monthly contributions by <strong className="text-white">$1,250</strong> or deferring retirement by <strong className="text-white">24 months</strong> would align projected income with your target.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>SPENDING ADJUSTMENTS</BlueLabel>
          <DimText>Optimizing discretionary spending can reduce the target requirement to $78k without compromising core lifestyle essentials.</DimText>
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

// ─── PAGE 12: Savings Adjustment Recommendations ──────────────────────────────
const Page12 = () => (
  <PageWrap>
    <PageHeader section="Section 6.0: Savings Adjustment" />
    <SectionTitle title="Savings Adjustment Recommendations" subtitle="Strategic paths to bridge the $17,000 annual income deficit through optimized planning." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["💰", "SCENARIO A: INCREASE SAVINGS", "Increase monthly savings by $325", "text-blue-600"],
          ["📅", "SCENARIO B: EXTEND TIMELINE", "Delay retirement by 2 years", "text-amber-600"],
        ] as [string, string, string, string][]
      ).map(([icon, label, val, c]) => (
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
        <div className="border-t border-dashed border-amber-400 mb-4 pt-1">
          <div className="text-[10px] text-amber-500 text-right">TARGET: $95,000</div>
        </div>
        <div className="flex gap-3 items-end h-36">
          {(
            [
              ["$78k", "bg-gray-300", "CURRENT PROJECTION"],
              ["$95k", "bg-blue-600", "INCREASED SAVINGS"],
              ["$102k", "bg-emerald-500", "DELAYED RETIREMENT"],
            ] as [string, string, string][]
          ).map(([val, bg, label], i) => (
            <div key={label} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full ${bg} rounded-t flex items-center justify-center`}
                style={{ height: `${60 + i * 20}%` }}
              >
                <span className="text-white font-black text-sm">{val}</span>
              </div>
              <div className="text-[9px] text-gray-400 mt-1.5 text-center leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
      <DarkCard>
        <div className="flex items-center gap-2 mb-4">
          <span>✅</span>
          <span className="font-bold text-sm">PROFESSIONAL RECOMMENDATION</span>
        </div>
        <BlueLabel>PRIMARY RECOMMENDATION</BlueLabel>
        <DimText><strong className="text-white">Scenario A (Increase Savings)</strong> is the most sustainable path. Increasing monthly contribution by $325 utilizes existing liquidity without lifestyle sacrifices.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>THE BALANCED APPROACH</BlueLabel>
          <DimText>A hybrid model of increasing savings by <strong className="text-white">$160/mo</strong> and delaying retirement by <strong className="text-white">12 months</strong> provides additional margin of safety against market volatility.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={12} />
  </PageWrap>
);

// ─── PAGE 13: Social Security Strategy ───────────────────────────────────────
const Page13 = () => (
  <PageWrap>
    <PageHeader section="Section 7.0: Social Security" />
    <SectionTitle title="Social Security Strategy" subtitle="Optimal claiming age analysis to maximize lifetime benefit distribution." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["ESTIMATED BENEFIT AT 67", "$28,000/year", "text-gray-900"],
          ["ESTIMATED BENEFIT AT 70", "$35,200/year", "text-blue-600"],
          ["BREAK-EVEN AGE ANALYSIS", "81", "text-green-600"],
        ] as [string, string, string][]
      ).map(([label, val, c]) => (
        <div key={label} className="flex-1 bg-gray-50 rounded-lg p-6">
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
          <div className={`text-2xl font-black ${c}`}>{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-4">LIFETIME BENEFIT COMPARISON</div>
        {(
          [
            ["Claim at 62", "$21,000/yr", "w-[35%]", "bg-gray-200"],
            ["Claim at 67 (FRA)", "$28,000/yr", "w-[55%]", "bg-blue-600"],
            ["Claim at 70 (Max)", "$35,200/yr", "w-[70%]", "bg-emerald-500"],
          ] as [string, string, string, string][]
        ).map(([label, val, w, bg]) => (
          <div key={label} className="mb-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span>{label}</span><span className="font-bold">{val}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-2 rounded-full ${w} ${bg}`} />
            </div>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>STRATEGIC RECOMMENDATION</BlueLabel>
        <div className="font-bold text-white mb-3">Delay to Age 70</div>
        <DimText>Delaying Social Security to age 70 increases your monthly benefit by 24% compared to claiming at Full Retirement Age. Break-even occurs at age 81 — well within your life expectancy of 92.</DimText>
        <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mt-4">
          <div className="text-xs font-bold text-green-400 mb-1">ADDITIONAL LIFETIME VALUE</div>
          <div className="text-3xl font-black text-green-400">+$147,400</div>
          <div className="text-[10px] text-green-600">vs. claiming at 67 (ages 81–92)</div>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={13} />
  </PageWrap>
);

// ─── PAGE 14: Employer Plan Optimization ─────────────────────────────────────
const Page14 = () => (
  <PageWrap>
    <PageHeader section="Section 7.0: Social Security" />
    <SectionTitle title="Employer Plan Optimization" subtitle="Retirement Intelligence System Analysis & Summary" />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["CURRENT CONTRIBUTION", "8%", "📺", "BASE RATE MAINTAINED", "bg-gray-50 border-gray-200", "text-gray-500", "text-gray-400"],
          ["RECOMMENDED CONTRIBUTION", "12%", "📈", "+4% Delta Increase", "bg-blue-50 border-blue-600", "text-blue-600", "text-blue-500"],
          ["EMPLOYER MATCH CAPTURE", "Maximized", "✅", "SUCCESS", "bg-green-50 border-green-200", "text-gray-900", "text-green-600"],
        ] as [string, string, string, string, string, string, string][]
      ).map(([label, val, icon, sub, bgBorderCls, valC, subC]) => (
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
        {(
          [
            ["Current (8%)", "w-[74%]", "bg-gray-300", "$1,120,000"],
            ["Recommended (12%)", "w-full", "bg-blue-600", "$1,420,000"],
          ] as [string, string, string, string][]
        ).map(([label, w, bg, val]) => (
          <div key={label} className="mb-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="font-semibold">{label}</span>
              <span className="text-blue-600 font-bold">→ {val}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-2 rounded-full ${w} ${bg}`} />
            </div>
          </div>
        ))}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-xs font-bold text-green-800">Net Improvement at Retirement</div>
          <div className="text-2xl font-black text-green-600">+$300,000</div>
        </div>
      </div>
      <DarkCard>
        <BlueLabel>OPTIMIZATION STRATEGY</BlueLabel>
        <DimText>Increasing from 8% to 12% captures the full 4% employer match and accelerates tax-deferred compounding by over $300,000 at retirement.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>IRS CONTRIBUTION LIMITS (2026)</BlueLabel>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>401(k) Limit</span><span className="text-white font-bold">$23,500</span>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Catch-Up (50+)</span><span className="text-white font-bold">+$7,500</span>
          </div>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={14} />
  </PageWrap>
);

// ─── PAGE 15: Tax Optimization Analysis ──────────────────────────────────────
const Page15 = () => (
  <PageWrap>
    <PageHeader section="Section 7.0: Tax Optimization" />
    <SectionTitle title="Tax Optimization Analysis" subtitle="Strategic framework for maximizing after-tax wealth accumulation and distribution efficiency." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["EFFECTIVE TAX RATE", "22%", "border-blue-600"],
          ["PROJECTED LIFETIME TAX SAVINGS", "$112,000", "border-emerald-500"],
          ["TAX-ADVANTAGED PORTFOLIO MIX", "60/40", "border-purple-500"],
        ] as [string, string, string][]
      ).map(([label, val, border]) => (
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
          <div className="w-[60%] bg-gray-900 flex items-center justify-center text-white text-xs font-black">60% TRADITIONAL</div>
          <div className="w-[40%] bg-emerald-500 flex items-center justify-center text-white text-xs font-black">40% ROTH</div>
        </div>
        <div className="flex gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-900" />TAX-DEFERRED GROWTH</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500" />TAX-FREE GROWTH</div>
        </div>
      </div>
      <DarkCard>
        <div className="font-bold text-sm mb-4">📈 STRATEGIC TAX INSIGHT</div>
        <BlueLabel>TAX-LOSS HARVESTING</BlueLabel>
        <DimText>Identify positions with unrealized losses to offset capital gains. A systematic quarterly review can capture at least <strong className="text-white">$3,000</strong> in annual losses to offset ordinary income.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>ROTH CONVERSIONS</BlueLabel>
          <DimText>Executing partial Roth conversions during low-income bridge years (ages 62–72) can significantly reduce required minimum distributions (RMDs) and long-term tax liability.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={15} />
  </PageWrap>
);

// ─── PAGE 16: Inflation Impact Analysis ──────────────────────────────────────
const Page16 = () => (
  <PageWrap>
    <PageHeader section="Section 8.0: Inflation & Purchasing Power" />
    <SectionTitle title="Inflation Impact Analysis" subtitle="Evaluating the long-term impact of monetary erosion on lifestyle maintenance and capital preservation." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["PROJECTED INFLATION RATE", "2.8%", "border-blue-600"],
          ["TARGET INCOME TODAY", "$95,000", "border-gray-900"],
          ["FUTURE EQUIVALENT (IN 32 YEARS)", "$229,000", "border-purple-500"],
        ] as [string, string, string][]
      ).map(([label, val, border]) => (
        <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-5 border-l-4 ${border}`}>
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
          <div className="text-2xl font-black text-gray-900">{val}</div>
        </div>
      ))}
    </div>
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-[10px] tracking-[2px] text-blue-600 uppercase font-bold">PURCHASING POWER OVER TIME</div>
        <div className="flex gap-6 text-[10px] text-gray-400">
          <span>— REQUIRED INCOME</span><span>— PURCHASING POWER</span>
        </div>
      </div>
      <svg viewBox="0 0 600 160" className="w-full h-40">
        <defs>
          <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M40,140 C150,128 300,78 560,18" fill="none" stroke="#111" strokeWidth="2.5" />
        <path d="M40,140 C150,128 300,78 560,18 L560,155 L40,155Z" fill="url(#ig)" />
        <circle cx="560" cy="18" r="5" fill="#111" />
        {(
          [["$150k", 136], ["$200k", 83], ["$250k", 28]] as [string, number][]
        ).map(([l, y]) => (
          <text key={l} x="8" y={y} fontSize="9" fill="#aaa" fontFamily="Arial">{l}</text>
        ))}
        {["Today", "Age 45", "Age 55", "Age 67", "Age 77", "Age 92"].map((l, i) => (
          <text key={l} x={40 + i * 104} y="155" fontSize="8" fill="#aaa" fontFamily="Arial" textAnchor="middle">{l}</text>
        ))}
      </svg>
    </div>
    <PageFooter page={16} />
  </PageWrap>
);

// ─── PAGE 17: Longevity Risk Analysis ────────────────────────────────────────
const Page17 = () => (
  <PageWrap>
    <PageHeader section="Section 9.0: Longevity" />
    <SectionTitle title="Longevity Risk Analysis" subtitle="Quantifying the probability of portfolio sustainability relative to extended life expectancy projections." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["PROBABILITY OF AGE 90+", "38%", "border-amber-500", "text-amber-600"],
          ["PROBABILITY OF AGE 95+", "16%", "border-purple-500", "text-purple-600"],
          ["PORTFOLIO SUSTAINABILITY", "Age 93", "border-emerald-500", "text-emerald-600"],
        ] as [string, string, string, string][]
      ).map(([label, val, borderCls, textCls]) => (
        <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-6 border-l-4 ${borderCls}`}>
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
          <div className={`text-3xl font-black ${textCls}`}>{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm mb-4">Portfolio Depletion Scenarios</div>
        {(
          [
            ["Conservative (3% withdrawal)", "Age 97", "text-emerald-600"],
            ["Moderate (4% withdrawal)", "Age 93", "text-amber-600"],
            ["Aggressive (5% withdrawal)", "Age 86", "text-red-600"],
          ] as [string, string, string][]
        ).map(([label, age, c]) => (
          <div key={label} className="flex justify-between items-center py-3.5 border-b border-gray-100 text-sm">
            <span className="text-gray-700">{label}</span>
            <span className={`font-black text-base ${c}`}>{age}</span>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>LONGEVITY HEDGE STRATEGIES</BlueLabel>
        <DimText>With a 38% probability of reaching age 90+, consider annuitizing 20–25% of assets to guarantee baseline income regardless of market conditions.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>DYNAMIC WITHDRAWAL STRATEGY</BlueLabel>
          <DimText>Reducing withdrawals by 10% during bear markets (Guardrails Strategy) can extend portfolio life from Age 93 to Age 97+, dramatically reducing longevity risk.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={17} />
  </PageWrap>
);

// ─── PAGE 18: Healthcare Cost Projection ─────────────────────────────────────
const Page18 = () => (
  <PageWrap>
    <PageHeader section="Healthcare Planning Strategy" />
    <SectionTitle title="Healthcare Cost Projection" subtitle="Modeling medical expenditure and supplemental coverage requirements over the retirement horizon." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["ESTIMATED ANNUAL COST (AT AGE 67)", "$18,500", "border-red-500"],
          ["PROJECTED LIFETIME HEALTHCARE COST", "$310,000", "border-purple-500"],
        ] as [string, string, string][]
      ).map(([label, val, border]) => (
        <div key={label} className={`flex-1 bg-gray-50 rounded-lg p-6 border-l-4 ${border}`}>
          <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</div>
          <div className="text-3xl font-black text-gray-900">{val}</div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="border border-gray-200 rounded-xl p-6">
        <div className="font-bold text-sm mb-4">Cost Breakdown by Category</div>
        {(
          [
            ["Medicare Premiums", "$5,800", "w-[31%]"],
            ["Supplemental Insurance", "$4,200", "w-[23%]"],
            ["Prescription Drugs", "$3,600", "w-[19%]"],
            ["Dental & Vision", "$2,100", "w-[11%]"],
            ["Long-Term Care Reserve", "$2,800", "w-[15%]"],
          ] as [string, string, string][]
        ).map(([label, amt, w]) => (
          <div key={label} className="mb-3">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-700">{label}</span>
              <span className="font-bold">{amt}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full">
              <div className={`h-1.5 bg-red-400 rounded-full ${w}`} />
            </div>
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

// ─── PAGE 19: Insurance Coverage Review ──────────────────────────────────────
const Page19 = () => (
  <PageWrap>
    <PageHeader section="Section 12.0: Insurance" />
    <SectionTitle title="Insurance Coverage Review" subtitle="Assessing mortality and morbidity risks to ensure family lifestyle continuity and asset protection." />
    <div className="flex gap-4 mb-6">
      {(
        [
          ["CURRENT LIFE INSURANCE", "$500,000", "border-blue-600", "text-blue-600"],
          ["RECOMMENDED COVERAGE", "$850,000", "border-emerald-500", "text-emerald-600"],
          ["DISABILITY COVERAGE", "60% of Salary", "border-purple-500", "text-purple-600"],
          ["COVERAGE GAP", "$350,000 ▲", "border-red-500", "text-red-600"],
        ] as [string, string, string, string][]
      ).map(([label, val, borderCls, textCls]) => (
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
          <div className="flex justify-between text-sm mb-2">
            <span>Current Coverage</span><span className="font-bold">$500,000</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-3 bg-blue-600 rounded-full w-[59%]" />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Recommended Coverage</span><span className="font-bold text-emerald-600">$850,000</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="flex h-3">
              <div className="bg-blue-600 h-3 w-[59%]" />
              <div className="bg-yellow-300 h-3 w-[41%]" />
            </div>
          </div>
          <div className="text-xs text-red-500 mt-1.5">△ Coverage Gap: $350,000</div>
        </div>
      </div>
      <DarkCard>
        <BlueLabel>COVERAGE RECOMMENDATION</BlueLabel>
        <DimText>With 2 dependents and a mortgage of $285,000, your household needs 10–12x gross income in life coverage. The current $500,000 policy covers only 5.3x.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>TERM LIFE ESTIMATE</BlueLabel>
          <DimText>A 20-year term policy for $350,000 in additional coverage is estimated at <strong className="text-white">$45–$65/month</strong> for a healthy 35-year-old — a highly cost-effective solution.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={19} />
  </PageWrap>
);

// ─── PAGE 20: College Planning Analysis ──────────────────────────────────────
const Page20 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight mb-2">College Planning Analysis</h1>
        <p className="text-sm text-gray-500">Strategic framework for educational funding and asset accumulation across multi-generational milestones.</p>
      </div>
      <div className="bg-gray-50 rounded-lg px-4 py-2.5 ml-4 flex-shrink-0">
        <div className="text-[10px] text-gray-400 uppercase tracking-wide mb-0.5">HOUSEHOLD PROFILE</div>
        <div className="font-bold text-sm">2 Children (Ages 3, 5)</div>
      </div>
    </div>
    <div className="flex gap-4 mb-6">
      {(
        [
          ["🎓", "Number of Children", "2", "text-gray-900"],
          ["💰", "Projected 4-Year Cost", "$240,000", "text-blue-600"],
          ["📊", "529 Current Balance", "$15,000", "text-emerald-600"],
          ["⚠️", "Funding Gap", "$180,000", "text-red-600"],
        ] as [string, string, string, string][]
      ).map(([icon, label, val, c]) => (
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
        {(
          [
            ["Child 1 (Age 5)", "13 years to college", "$867/mo needed", "w-[55%]"],
            ["Child 2 (Age 3)", "15 years to college", "$720/mo needed", "w-[40%]"],
          ] as [string, string, string, string][]
        ).map(([name, timeline, monthly, w]) => (
          <div key={name} className="mb-5">
            <div className="flex justify-between text-sm mb-1">
              <strong>{name}</strong><span className="text-gray-400 text-xs">{timeline}</span>
            </div>
            <div className="text-xs text-blue-600 mb-1.5">{monthly}</div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className={`h-2 bg-blue-600 rounded-full ${w}`} />
            </div>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>529 OPTIMIZATION STRATEGY</BlueLabel>
        <DimText>With a combined funding gap of $180,000, we recommend opening individual 529 plans per child. A combined monthly contribution of <strong className="text-white">$400–$500</strong> today will close the gap.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4 mb-4">
          <BlueLabel>TAX BENEFIT</BlueLabel>
          <DimText>Many states offer tax deductions on 529 contributions. Gifting strategies through grandparents can also utilize the annual $18,000 gift exclusion.</DimText>
        </div>
        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
          <div className="text-xs font-bold text-blue-300 mb-1">RECOMMENDED MONTHLY CONTRIBUTION</div>
          <div className="text-3xl font-black text-blue-400">$450 / mo</div>
          <div className="text-[10px] text-blue-400">Split across both children's 529 plans</div>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={20} />
  </PageWrap>
);

// ─── PAGE 21: Scenario Analysis - Optimistic Market ──────────────────────────
interface ScenarioCard {
  icon: string;
  badge: string;
  title: string;
  val: string;
  up: string;
  sub: string;
  stats: [string, string][];
}

const Page21 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <SectionTitle
      title="Scenario Analysis - Optimistic Market"
      subtitle="A strategic projection of retirement outcomes assuming favorable macroeconomic factors and peak performance of core assets."
    />
    <div className="flex gap-6 mt-6">
      {(
        [
          {
            icon: "📈", badge: "OPTIMISTIC", title: "Portfolio at Age 67", val: "$1,780,000", up: "↗12.5%",
            sub: "Compared to baseline projection of $1,582,220",
            stats: [["Portfolio Growth Rate", "8.5%"], ["Equity Outperformance", "+2.1%"], ["Dividend Reinvestment", "$42,000"], ["Final Decade CAGR", "9.2%"]],
          },
          {
            icon: "💵", badge: "PROJECTED", title: "Income Replacement", val: "94%", up: "↗4.2%",
            sub: "Surpassing the institutional target of 85%",
            stats: [["Annual Income", "$89,300"], ["SS Benefit", "$35,200"], ["Portfolio Draw", "$54,100"], ["Surplus Buffer", "+$17,300"]],
          },
        ] as ScenarioCard[]
      ).map(({ icon, badge, title, val, up, sub, stats }) => (
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

// ─── PAGE 22: Scenario Analysis - Conservative Market ─────────────────────────
const Page22 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <SectionTitle
      title="Scenario Analysis - Conservative Market"
      subtitle="Detailed stress test and portfolio projections based on conservative market parameters."
    />
    <div className="flex gap-4 mt-8">
      {(
        [
          ["🗂", "PORTFOLIO AT 67", "$1,050,000"],
          ["💵", "INCOME REPLACEMENT", "69%"],
          ["📉", "STRESS TEST RESULT", "Moderate Risk Exposure"],
        ] as [string, string, string][]
      ).map(([icon, label, val]) => (
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
        {(
          [
            ["Avg. Annual Return", "4.5%"],
            ["Inflation Rate", "3.5%"],
            ["Market Correction", "–25% in Year 5"],
            ["Recovery Period", "3 Years"],
          ] as [string, string][]
        ).map(([l, v]) => (
          <div key={l} className="flex justify-between py-3 border-b border-gray-100 text-sm">
            <span className="text-gray-500">{l}</span><span className="font-bold">{v}</span>
          </div>
        ))}
      </div>
      <DarkCard>
        <BlueLabel>STRESS TEST FINDINGS</BlueLabel>
        <DimText>Under conservative assumptions, the portfolio reaches $1,050,000 — sufficient to sustain a 69% income replacement rate. A 25% market correction in Year 5 reduces the final balance by approximately $180,000.</DimText>
        <div className="border-t border-gray-700 mt-4 pt-4">
          <BlueLabel>MITIGATION STRATEGY</BlueLabel>
          <DimText>Maintaining a 2-year cash reserve at retirement and reducing equity exposure to 45% by age 60 provides meaningful downside protection under adverse scenarios.</DimText>
        </div>
      </DarkCard>
    </div>
    <PageFooter page={22} />
  </PageWrap>
);

// ─── PAGE 23: Recommendation Action Plan ─────────────────────────────────────
const Page23 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <SectionTitle title="Recommendation Action Plan" subtitle="Prioritized steps for your retirement intelligence" />
    <div className="flex flex-col gap-3 mt-4">
      {(
        [
          ["📈", "PRIORITY 1", "Increase retirement contribution to 12%", "Capturing the full employer match unlocks $3,800/year in free compensation and accelerates tax-deferred compounding by an estimated $300,000 at retirement."],
          ["🗂", "PRIORITY 2", "Build emergency fund to $33,000", "Your current liquid reserves cover only 3.3 months of core expenses. Closing this gap to the 6-month institutional benchmark removes financial fragility and protects investment continuity."],
          ["🛡", "PRIORITY 3", "Increase life insurance by $350,000", "Your current $500,000 policy covers only 5.3x gross income. With 2 dependents and a $285,000 mortgage, increasing coverage to $850,000 aligns with institutional household protection standards."],
          ["🔄", "PRIORITY 4", "Rebalance portfolio annually", "Your current allocation shows 60% U.S. equities which may drift significantly in bull markets. Annual rebalancing maintains your target risk profile and systematically sells high/buys low."],
        ] as [string, string, string, string][]
      ).map(([icon, priority, title, detail]) => (
        <div key={priority} className="flex items-start gap-4 px-6 py-5 border border-gray-200 rounded-xl">
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">{icon}</div>
          <div>
            <div className="text-[10px] tracking-[2px] text-gray-400 uppercase mb-1">{priority}</div>
            <div className="font-bold text-sm text-gray-900 mb-1.5">{title}</div>
            <div className="text-xs text-gray-400 leading-relaxed">{detail}</div>
          </div>
        </div>
      ))}
    </div>
    <PageFooter page={23} />
  </PageWrap>
);

// ─── PAGE 24: 12-Month Implementation Roadmap ─────────────────────────────────
const Page24 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <SectionTitle title="12-Month Implementation Roadmap" subtitle="Retirement Intelligence System Strategic Schedule" />
    <div className="grid grid-cols-2 gap-4 mt-4">
      {(
        [
          [1, "QUARTER 1", [["Increase contribution 2%", "Boost 401(k) from 8% to 10% immediately to capture partial employer match."], ["Rebalance portfolio", "Realign to 60/20/15/5 target allocation across 401(k), brokerage and cash."]]],
          [2, "QUARTER 2", [["Open Roth IRA", "Establish Roth IRA and contribute $583/month to reach the 2026 annual limit of $7,000."], ["Review budget", "Redirect $200/mo from miscellaneous to emergency savings account."]]],
          [3, "QUARTER 3", [["Adjust insurance", "Apply for $350,000 additional term life coverage. Lock in rates before age 36."], ["Review 529 plans", "Open individual 529 accounts for both children; automate $225/mo per child."]]],
          [4, "QUARTER 4", [["Review tax positioning", "Work with CPA on year-end Roth conversion opportunity and harvest tax losses in brokerage."], ["Annual plan review", "Schedule next annual WINTRICE Blueprint review to track progress against all 25 metrics."]]],
        ] as [number, string, [string, string][]][]
      ).map(([num, title, tasks]) => (
        <div key={title} className="border border-gray-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center font-black text-blue-600 text-sm">{num}</div>
            <div className="font-black text-sm tracking-wide">{title}</div>
          </div>
          {tasks.map(([t, d]) => (
            <div key={t} className="flex gap-3 mb-4">
              <span className="text-blue-600 text-base shrink-0">✅</span>
              <div>
                <div className="font-bold text-sm mb-1">{t}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{d}</div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
    <PageFooter page={24} />
  </PageWrap>
);

// ─── PAGE 25: Disclosures & Assumptions ──────────────────────────────────────
const Page25 = () => (
  <PageWrap>
    <PageHeader section="Section 11.0: College Planning" />
    <SectionTitle title="Disclosures & Assumptions" subtitle="Institutional Financial Planning Blueprint" />
    <div className="mt-4">
      {(
        [
          ["📈", "Assumed Return", "6.5%"],
          ["🗂", "Inflation", "2.8%"],
          ["⏱", "Retirement Age", "67"],
          ["⏳", "Life Expectancy", "92"],
          ["🔒", "Social Security", "Estimated based on current law"],
        ] as [string, string, string][]
      ).map(([icon, label, val]) => (
        <div key={label} className="flex justify-between items-center py-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <span className="text-base">{icon}</span>
            <span className="text-sm text-gray-600">{label}</span>
          </div>
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

// ─── Main App ─────────────────────────────────────────────────────────────────
const pages = [
  Page1, Page2, Page3, Page4, Page5, Page6, Page7, Page8, Page9, Page10,
  Page11, Page12, Page13, Page14, Page15, Page16, Page17, Page18, Page19, Page20,
  Page21, Page22, Page23, Page24, Page25,
];

const pageTitles: string[] = [
  "Cover", "Personal Profile", "Health Scorecard", "Net Worth", "Cash Flow",
  "Emergency Fund", "Debt Analysis", "Investment Allocation", "Risk Tolerance", "Retirement Projection",
  "Income Gap", "Savings Adjustments", "Social Security", "Employer Plan", "Tax Optimization",
  "Inflation Impact", "Longevity Risk", "Healthcare Costs", "Insurance Review", "College Planning",
  "Optimistic Scenario", "Conservative Scenario", "Action Plan", "Implementation Roadmap", "Disclosures",
];

export default function FinancialBlueprint() {
  const [current, setCurrent] = useState<number>(0);
  const PageComponent = pages[current];

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center py-6 px-4">
      {/* Top bar */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4">
        <div className="text-white text-sm font-bold">
          <span className="text-blue-500">WINTRICE</span> Financial Blueprint
          <span className="text-slate-600 ml-3 font-normal">v4.2.0</span>
        </div>
        <div className="text-slate-400 text-xs">
          Page <strong className="text-white">{current + 1}</strong> of {pages.length} —{" "}
          <span className="text-slate-300">{pageTitles[current]}</span>
        </div>
      </div>

      {/* Page pill nav */}
      <div className="w-full max-w-5xl flex flex-wrap gap-1.5 mb-4">
        {pages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-10 h-7 rounded text-xs font-semibold transition-all ${
              i === current
                ? "bg-blue-600 text-white ring-2 ring-blue-400"
                : "bg-slate-800 text-slate-500 hover:bg-slate-700 hover:text-slate-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Page */}
      <div className="w-full max-w-5xl shadow-2xl rounded overflow-hidden">
        <PageComponent />
      </div>

      {/* Navigation */}
      <div className="flex gap-3 mt-5 items-center">
        <button
          onClick={() => setCurrent(0)}
          disabled={current === 0}
          className="px-3 py-2 text-xs rounded-lg bg-slate-800 text-slate-400 border border-slate-700 disabled:opacity-30 hover:bg-slate-700 transition-colors"
        >
          ⏮ First
        </button>
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="px-6 py-2 text-sm font-bold rounded-lg bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 transition-colors"
        >
          ← Previous
        </button>
        <div className="text-slate-400 text-xs min-w-36 text-center">{pageTitles[current]}</div>
        <button
          onClick={() => setCurrent((c) => Math.min(pages.length - 1, c + 1))}
          disabled={current === pages.length - 1}
          className="px-6 py-2 text-sm font-bold rounded-lg bg-blue-600 text-white disabled:opacity-30 hover:bg-blue-500 transition-colors"
        >
          Next →
        </button>
        <button
          onClick={() => setCurrent(pages.length - 1)}
          disabled={current === pages.length - 1}
          className="px-3 py-2 text-xs rounded-lg bg-slate-800 text-slate-400 border border-slate-700 disabled:opacity-30 hover:bg-slate-700 transition-colors"
        >
          Last ⏭
        </button>
      </div>

      <div className="text-slate-600 text-xs mt-3">
        Complete 25-page Financial Planning Blueprint • WINTRICE v4.2.0
      </div>
    </div>
  );
}