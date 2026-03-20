import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGenerateReport } from "../hooks/mutations/allMutation";

let NAVY = "#1a3260";
let NAVYLT = "#eef1f8";
let NAVYBD = "#d4dcee";

let P = {
  user: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  dollar: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  check: "M5 13l4 4L19 7",
  arrowR: "M17 8l4 4m0 0l-4 4m4-4H3",
  arrowL: "M7 16l-4-4m0 0l4-4m-4 4h18",
  shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  calendar: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  people: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
  clock: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  card: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
  plus: "M12 6v6m0 0v6m0-6h6m-6 0H6",
  trend: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  chevDown: "M19 9l-7 7-7-7",
  chart: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  help: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  cog: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  lock: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 18L18 6M6 6l12 12",
};

let STEPS = [
  { id: "profile", label: "Personal Profile" },
  { id: "income", label: "Income Details" },
  { id: "plans", label: "Employer Plans" },
  { id: "iras", label: "IRAs & Savings" },
  { id: "goals", label: "Retirement Goals" },
  { id: "review", label: "Review & Generate" },
];

function Ico(props: any) {
  return (
    <svg className={props.sz || "w-4 h-4"} fill={props.fl || "none"} stroke={props.st || "currentColor"} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={props.sw || 2} d={props.d} />
    </svg>
  );
}

function fmtNum(v: any) {
  let n = (v || "").replace(/[^0-9.]/g, "");
  let parts = n.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.length > 1 ? parts[0] + "." + parts[1] : parts[0];
}

function parseMoney(v: any) {
  return parseFloat((v || "0").replace(/,/g, "")) || 0;
}

// Fixed: returns null when DOB is empty or produces invalid age (prevents -17978 bug)
function calcAge(dob: any) {
  if (!dob) return null;
  let birth = new Date(dob);
  if (isNaN(birth.getTime())) return null;
  let today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  let m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  if (age <= 0 || age > 110) return null;
  return age;
}

let INP_BASE = "w-full py-3 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none bg-white transition-colors";
function focusNavy(e: any) { e.target.style.borderColor = NAVY; }
function blurGray(e: any) { e.target.style.borderColor = "#e5e7eb"; }

function Card(props: any) {
  return <div className={"bg-white rounded-2xl shadow-sm " + (props.cls || "")}>{props.children}</div>;
}

function SecHead(props: any) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-900">{props.title}</h2>
      <div className="mt-1.5 h-0.5 w-10 rounded-full" style={{ backgroundColor: NAVY }} />
    </div>
  );
}

function InfoBox(props: any) {
  return (
    <div className="flex items-start gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: NAVYLT, border: "1px solid " + NAVYBD }}>
      <div className="shrink-0 mt-0.5" style={{ color: NAVY }}><Ico d={P.shield} sz="w-5 h-5" /></div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: NAVY }}>{props.title}</p>
        <p className="text-xs text-gray-500 leading-relaxed">{props.children}</p>
      </div>
    </div>
  );
}

function FootNote() {
  return (
    <p className="text-xs text-gray-400 text-center mt-5 flex items-center justify-center gap-1.5">
      <Ico d={P.shield} sz="w-3.5 h-3.5" />
      Your data is encrypted and securely stored for your personal report only.
    </p>
  );
}

function FieldWrap(props: any) {
  return (
    <div>
      <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">{props.label}</label>
      <div className="relative">{props.children}</div>
      {props.hint && <p className="text-xs text-gray-400 mt-1.5">{props.hint}</p>}
    </div>
  );
}

function InpIcon(props: any) {
  return <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Ico d={props.d} sz="w-4 h-4" /></span>;
}

function NavRow(props: any) {
  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2 gap-4">
      {props.showPrev !== false ? (
        <button type="button" onClick={props.onPrev} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
          <Ico d={P.arrowL} sz="w-4 h-4" /> Previous Step
        </button>
      ) : <div />}
      <button type="submit" className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: NAVY }}>
        <span className="hidden sm:inline">{props.label || "Next Step"}</span>
        <span className="sm:hidden">Next</span>
        <Ico d={P.arrowR} sz="w-4 h-4" st="white" />
      </button>
    </div>
  );
}

function RadioToggle(props: any) {
  return (
    <button type="button" onClick={props.onClick}
      className="flex items-center justify-between px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all"
      style={props.on ? { borderColor: NAVY, backgroundColor: NAVYLT, color: NAVY } : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#6b7280" }}>
      <span className="truncate">{props.label}</span>
      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2" style={{ borderColor: props.on ? NAVY : "#d1d5db" }}>
        {props.on && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: NAVY }} />}
      </div>
    </button>
  );
}

function RadioInline(props: any) {
  return (
    <button type="button" onClick={props.onClick} className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: props.on ? NAVY : "#6b7280" }}>
      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: props.on ? NAVY : "#d1d5db" }}>
        {props.on && <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: NAVY }} />}
      </div>
      {props.label}
    </button>
  );
}

function CheckBtn(props: any) {
  return (
    <button type="button" onClick={props.onClick} className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: props.on ? NAVY : "#6b7280" }}>
      <div className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
        style={props.on ? { backgroundColor: NAVY, borderColor: NAVY } : { backgroundColor: "white", borderColor: "#d1d5db" }}>
        {props.on && <Ico d={P.check} sz="w-2.5 h-2.5" st="white" sw={3} />}
      </div>
      {props.label}
    </button>
  );
}

function SideBar(props: any) {
  let currentIndex = STEPS.findIndex(function (s) { return s.id === props.currentStep; });
  return (
    <div className="bg-white h-full flex flex-col shadow-sm border-r border-gray-100">
      <div className="px-6 pt-8 pb-6 border-b border-gray-100 flex items-start justify-between">
        <div>
          <h2 className="text-[#0f1f3d] text-base font-bold tracking-tight">Retirement Planner</h2>
          <p className="text-gray-400 text-[10px] font-semibold tracking-widest uppercase">Enterprise Financial Tool</p>
        </div>
        {props.onClose && (
          <button onClick={props.onClose} className="lg:hidden p-1 rounded-lg hover:bg-gray-100 text-gray-500"><Ico d={P.close} sz="w-5 h-5" /></button>
        )}
      </div>
      <nav className="px-3 flex-1 overflow-y-auto pt-3">
        <ul className="space-y-2">
          {STEPS.map(function (step, index) {
            let isActive = step.id === props.currentStep;
            let isCompleted = props.completedSteps.indexOf(step.id) !== -1;
            let isPast = index < currentIndex;
            return (
              <li key={step.id}>
                <div className={"flex items-center gap-3 py-2.5 px-3 rounded-md transition-all duration-200 " + (isActive ? "bg-blue-50" : isPast || isCompleted ? "opacity-80" : "opacity-40")}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: isActive ? NAVY : isCompleted || isPast ? "#22c55e" : "#e5e7eb" }}>
                    {isCompleted || (isPast && !isActive) ? <Ico d={P.check} sz="w-3 h-3" st="white" sw={3} /> : <span style={{ fontSize: "9px", fontWeight: "bold", color: isActive ? "white" : "#9ca3af" }}>{index + 1}</span>}
                  </div>
                  <span className="text-xs font-semibold block truncate" style={{ color: isActive ? NAVY : isPast || isCompleted ? "#374151" : "#9ca3af" }}>{step.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="px-5 pb-6 border-t border-gray-100 pt-4 space-y-3">
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"><Ico d={P.help} sz="w-4 h-4" /><span className="text-xs font-medium">Help Center</span></button>
        <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"><Ico d={P.cog} sz="w-4 h-4" /><span className="text-xs font-medium">Settings</span></button>
      </div>
    </div>
  );
}

// ─── Step 1: Profile ──────────────────────────────────────────────────────────
function Profile(props: any) {
  let data = props.data;
  let setData = props.setData;
  function handleSubmit(e: any) { e.preventDefault(); props.onNext(); }
  // Max date = 18 years ago (prevents future/invalid DOB that causes -17978 age)
  let maxDob = new Date();
  maxDob.setFullYear(maxDob.getFullYear() - 18);
  let maxDobStr = maxDob.toISOString().split("T")[0];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Personal Profile</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">Let's start with the basics. This information allows us to customize your retirement projections based on your unique life situation.</p>
      <Card cls="p-6 sm:p-10">
        <SecHead title="Basic Information" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <FieldWrap label="Full Name" hint="Enter your full legal name as it appears on documents.">
              <InpIcon d={P.user} />
              <input type="text" value={data.fullName} required placeholder="John Doe"
                onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { fullName: e.target.value }); }); }}
                className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
            <FieldWrap label="Date of Birth" hint="Used to calculate your current age and retirement timeline.">
              <InpIcon d={P.calendar} />
              {/* max attribute prevents invalid future dates that cause negative age */}
              <input type="date" value={data.dob} required max={maxDobStr}
                onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { dob: e.target.value }); }); }}
                className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-7">
            <FieldWrap label="Marital Status" hint="Affects Social Security and tax calculations.">
              <InpIcon d={P.people} />
              <select value={data.maritalStatus} required
                onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { maritalStatus: e.target.value }); }); }}
                className={INP_BASE + " pl-10 pr-10 appearance-none"} onFocus={focusNavy} onBlur={blurGray}>
                <option value="" disabled>Select status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="divorced">Divorced</option>
                <option value="widowed">Widowed</option>
                <option value="domestic_partner">Domestic Partner</option>
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Ico d={P.chevDown} sz="w-4 h-4" /></span>
            </FieldWrap>
            <FieldWrap label="Planned Retirement Age" hint="The age you ideally hope to stop working full-time.">
              <InpIcon d={P.clock} />
              <input type="number" value={data.retireAge} required min="40" max="80" placeholder="67"
                onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { retireAge: e.target.value }); }); }}
                className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
          </div>
          <div className="mb-7">
            <InfoBox title="Privacy Guaranteed">Your personal details are used solely for generating your retirement report. We use enterprise-grade encryption to protect all your data.</InfoBox>
          </div>
          <NavRow showPrev={false} label="Next Step: Income" />
        </form>
      </Card>
      <FootNote />
    </div>
  );
}

// ─── Step 2: Income ───────────────────────────────────────────────────────────
function Income(props: any) {
  let data = props.data;
  let setData = props.setData;
  function handleSubmit(e: any) { e.preventDefault(); props.onNext(); }
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Your Income Details</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xl">Enter your current earnings to help us estimate your retirement lifestyle and calculate your projected Social Security benefits.</p>
      <Card cls="p-6 sm:p-10">
        <SecHead title="Current Annual Earnings" />
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <FieldWrap label="Annual Gross Salary" hint="Total yearly earnings before taxes and deductions.">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none">$</span>
              <input type="text" value={data.grossSalary} required placeholder="95,000"
                onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { grossSalary: v }); }); }}
                className={INP_BASE + " pl-8 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
            <FieldWrap label="Other Annual Income" hint="Rental income, dividends, side businesses, or other sources.">
              <InpIcon d={P.card} />
              <input type="text" value={data.otherIncome} placeholder="0"
                onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { otherIncome: v }); }); }}
                className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
          </div>
          <div className="mb-8">
            <InfoBox title="Social Security Impact">Accurate income reporting is critical for your retirement plan. We use these figures to estimate your future Social Security payments based on your current tax contributions.</InfoBox>
          </div>
          <NavRow onPrev={props.onPrev} label="Next Step: Employer Plans" />
        </form>
      </Card>
      <FootNote />
    </div>
  );
}

// ─── Step 3: Plans ────────────────────────────────────────────────────────────
function Plans(props: any) {
  let data = props.data;
  let setData = props.setData;
  function togglePlan(type: any) {
    setData(function (p: any) {
      let next = p.planTypes.indexOf(type) !== -1 ? p.planTypes.filter(function (t: any) { return t !== type; }) : p.planTypes.concat(type);
      return Object.assign({}, p, { planTypes: next });
    });
  }
  function handleSubmit(e: any) { e.preventDefault(); props.onNext(); }
  let planOptions = [{ id: "401k", label: "401(k)" }, { id: "403b", label: "403(b)" }, { id: "457", label: "457" }, { id: "other", label: "Other" }];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Employer Retirement Plans</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">Workplace retirement accounts are often the foundation of financial security. Tell us about your current employer-sponsored plans.</p>
      <Card cls="p-6 sm:p-8">
        <div className="mb-8">
          <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Do you currently participate in an employer-sponsored retirement plan?</label>
          <div className="grid grid-cols-2 gap-3">
            <RadioToggle label="Yes, I participate" on={data.participates === true} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { participates: true }); }); }} />
            <RadioToggle label="No, I do not" on={data.participates === false} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { participates: false }); }); }} />
          </div>
        </div>
        {data.participates && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-5 pb-3" style={{ borderLeft: "3px solid " + NAVY, paddingLeft: "12px" }}>
              <h2 className="text-base font-bold text-gray-900">Plan Details</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">Plan Type (select all that apply)</label>
                <div className="grid grid-cols-2 gap-2">
                  {planOptions.map(function (opt) {
                    let on = data.planTypes.indexOf(opt.id) !== -1;
                    return (
                      <button key={opt.id} type="button" onClick={function () { togglePlan(opt.id); }}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium transition-all"
                        style={on ? { borderColor: NAVY, backgroundColor: NAVYLT, color: NAVY } : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#6b7280" }}>
                        <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 border"
                          style={on ? { backgroundColor: NAVY, borderColor: NAVY } : { backgroundColor: "white", borderColor: "#d1d5db" }}>
                          {on && <Ico d={P.check} sz="w-2.5 h-2.5" st="white" sw={3} />}
                        </div>
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <FieldWrap label="Current Total Balance ($)" hint="Total saved amount across all selected plans.">
                <InpIcon d={P.card} />
                <input type="text" value={data.planBalance} placeholder="0"
                  onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { planBalance: v }); }); }}
                  className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
              </FieldWrap>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">Contribution Rate</label>
                <div className="flex">
                  <div className="flex border border-gray-200 rounded-l-lg overflow-hidden shrink-0" style={{ borderRight: "none" }}>
                    {["%", "$"].map(function (unit) {
                      return (
                        <button key={unit} type="button" onClick={function () { setData(function (p: any) { return Object.assign({}, p, { contribUnit: unit }); }); }}
                          className="px-3 py-3 text-xs font-semibold transition-all"
                          style={data.contribUnit === unit ? { backgroundColor: NAVY, color: "white" } : { backgroundColor: "#f9fafb", color: "#6b7280" }}>
                          {unit}
                        </button>
                      );
                    })}
                  </div>
                  <input type="number" value={data.contribRate} min="0"
                    max={data.contribUnit === "%" ? "100" : undefined} step="0.5" placeholder="8"
                    onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { contribRate: e.target.value }); }); }}
                    className="flex-1 pl-4 pr-4 py-3 border border-gray-200 rounded-r-lg text-sm text-gray-700 focus:outline-none bg-white"
                    onFocus={focusNavy} onBlur={blurGray} />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">Your periodic contribution amount.</p>
              </div>
              <FieldWrap label="Employer Match" hint="Match percentage based on your deferral.">
                <InpIcon d={P.dollar} />
                <select value={data.empMatch}
                  onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { empMatch: e.target.value }); }); }}
                  className={INP_BASE + " pl-10 pr-10 appearance-none"} onFocus={focusNavy} onBlur={blurGray}>
                  <option value="no_match">No match</option>
                  <option value="0.25">25% match</option>
                  <option value="0.50">50% match</option>
                  <option value="0.75">75% match</option>
                  <option value="1.00">100% match</option>
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Ico d={P.chevDown} sz="w-4 h-4" /></span>
              </FieldWrap>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <FieldWrap label="Expected Annual Return (%)" hint="Projected long-term growth rate.">
                <InpIcon d={P.trend} />
                <input type="number" value={data.annReturn} step="0.1" min="0" max="20" placeholder="7.0"
                  onChange={function (e) { setData(function (p: any) { return Object.assign({}, p, { annReturn: e.target.value }); }); }}
                  className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
              </FieldWrap>
              <div>
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2">Contributions Duration</label>
                <div className="rounded-lg border border-gray-200 px-4 py-3" style={{ backgroundColor: "#fafafa" }}>
                  <p className="text-xs text-gray-500 mb-2">Continue contributions until retirement?</p>
                  <div className="flex items-center gap-4">
                    <RadioInline label="Yes, until then" on={data.contUntilRet === true} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { contUntilRet: true }); }); }} />
                    <RadioInline label="No" on={data.contUntilRet === false} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { contUntilRet: false }); }); }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-7">
              <div className="flex items-start gap-3 rounded-xl px-5 py-4" style={{ backgroundColor: NAVYLT, border: "1px solid " + NAVYBD }}>
                <div className="shrink-0 mt-0.5" style={{ color: NAVY }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a7 7 0 017 7c0 2.6-1.4 4.9-3.5 6.2V17a1 1 0 01-1 1h-5a1 1 0 01-1-1v-1.8A7 7 0 0112 2zm1 18h-2v1a1 1 0 002 0v-1z" /></svg>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: NAVY }}>Expert Tip: Maximize Your Match</p>
                  <p className="text-xs text-gray-500 leading-relaxed">Financial advisers recommend contributing at least enough to capture your full employer match — effectively a 100% or 50% guaranteed return before market performance.</p>
                </div>
              </div>
            </div>
            <NavRow onPrev={props.onPrev} label="Continue to IRAs" />
          </form>
        )}
        {data.participates === false && (
          <div className="flex items-center justify-between mt-4">
            <button type="button" onClick={props.onPrev} className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"><Ico d={P.arrowL} sz="w-4 h-4" /> Previous Step</button>
            <button type="button" onClick={props.onNext} className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm hover:opacity-90 transition-opacity" style={{ backgroundColor: NAVY }}>
              Continue to IRAs <Ico d={P.arrowR} sz="w-4 h-4" st="white" />
            </button>
          </div>
        )}
      </Card>
      <FootNote />
    </div>
  );
}

// ─── Step 4: IRAs ─────────────────────────────────────────────────────────────
function IRAs(props: any) {
  let data = props.data;
  let setData = props.setData;
  function toggleIraType(type: any) {
    setData(function (p: any) {
      let next = p.iraTypes.indexOf(type) !== -1 ? p.iraTypes.filter(function (t: string) { return t !== type; }) : p.iraTypes.concat(type);
      return Object.assign({}, p, { iraTypes: next });
    });
  }
  function toggleSrc(src: any) {
    setData(function (p: any) {
      if (src === "none") return Object.assign({}, p, { incomeSrc: ["none"] });
      let without = p.incomeSrc.filter(function (s: string) { return s !== "none"; });
      let next = without.indexOf(src) !== -1 ? without.filter(function (s: string) { return s !== src; }) : without.concat(src);
      return Object.assign({}, p, { incomeSrc: next.length ? next : ["none"] });
    });
  }
  function handleSubmit(e: any) { e.preventDefault(); props.onNext(); }
  let iraOpts = [{ id: "traditional", label: "Traditional IRA" }, { id: "roth", label: "Roth IRA" }, { id: "sep", label: "SEP IRA" }];
  let srcOpts = [{ id: "rental", label: "Rental" }, { id: "business", label: "Business" }, { id: "other", label: "Other" }, { id: "none", label: "None" }];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">IRAs & Other Savings</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">Manage your individual retirement accounts and additional savings to get a complete picture of your financial future.</p>
      <Card cls="p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-800 mb-3">Do you have any Individual Retirement Accounts (IRAs)?</p>
            <div className="flex items-center gap-6">
              <RadioInline label="Yes" on={data.hasIRA === true} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { hasIRA: true }); }); }} />
              <RadioInline label="No" on={data.hasIRA === false} onClick={function () { setData(function (p: any) { return Object.assign({}, p, { hasIRA: false }); }); }} />
            </div>
          </div>
          {data.hasIRA && (
            <div className="mb-8">
              <div className="mb-5">
                <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">IRA Types</label>
                <div className="flex flex-wrap items-center gap-4">
                  {iraOpts.map(function (opt) {
                    return <CheckBtn key={opt.id} label={opt.label} on={data.iraTypes.indexOf(opt.id) !== -1} onClick={function () { toggleIraType(opt.id); }} />;
                  })}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FieldWrap label="Total IRA Balance" hint="Current combined value of all your IRAs.">
                  <InpIcon d={P.card} />
                  <input type="text" value={data.iraBal} placeholder="0"
                    onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { iraBal: v }); }); }}
                    className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
                </FieldWrap>
                <FieldWrap label="Annual IRA Contributions" hint="Planned yearly contributions for this calendar year.">
                  <InpIcon d={P.plus} />
                  <input type="text" value={data.iraContrib} placeholder="0"
                    onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { iraContrib: v }); }); }}
                    className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
                </FieldWrap>
              </div>
            </div>
          )}
          <div className="border-t border-gray-100 my-6" />
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Other Savings & Income</h2>
            <div className="h-0.5 w-10 rounded-full mb-5" style={{ backgroundColor: NAVY }} />
            <FieldWrap label="Taxable Savings or Brokerage Accounts (optional)" hint="Enter value of non-retirement investment accounts.">
              <InpIcon d={P.trend} />
              <input type="text" value={data.taxSavings} placeholder="0"
                onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { taxSavings: v }); }); }}
                className={INP_BASE + " pl-10 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </FieldWrap>
            <div className="mt-5">
              <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-3">Additional Income Sources</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {srcOpts.map(function (opt) {
                  let on = data.incomeSrc.indexOf(opt.id) !== -1;
                  return (
                    <button key={opt.id} type="button" onClick={function () { toggleSrc(opt.id); }}
                      className="flex items-center gap-2 px-3 py-3 rounded-lg border text-sm font-medium transition-all"
                      style={on ? { borderColor: NAVY, backgroundColor: NAVYLT, color: NAVY } : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#6b7280" }}>
                      <div className="w-4 h-4 rounded border flex items-center justify-center shrink-0"
                        style={on ? { backgroundColor: NAVY, borderColor: NAVY } : { backgroundColor: "white", borderColor: "#d1d5db" }}>
                        {on && <Ico d={P.check} sz="w-2.5 h-2.5" st="white" sw={3} />}
                      </div>
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <NavRow onPrev={props.onPrev} label="Next Step: Goals" />
        </form>
      </Card>
      <FootNote />
    </div>
  );
}

// ─── Step 5: Goals ────────────────────────────────────────────────────────────
function Goals(props: any) {
  let data = props.data;
  let setData = props.setData;
  function handleSubmit(e: any) { e.preventDefault(); props.onNext(); }
  let lifestyleOpts = [
    { id: "basic", label: "Basic", desc: "Focus on essentials, simple living, and modest travel or entertainment.", d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { id: "moderate", label: "Moderate", desc: "Comfortable living, regular vacations, and maintaining current lifestyle habits.", d: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { id: "enhanced", label: "Enhanced", desc: "Luxury travel, secondary property, and legacy gifting for family.", d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
  ];
  let inflationOpts = [
    { id: "conservative", label: "Conservative (2%)", rate: 0.02 },
    { id: "standard", label: "Standard (3%)", rate: 0.03 },
    { id: "optimistic", label: "Optimistic (4%+)", rate: 0.04 },
  ];

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">Define Your Retirement Goals</h1>
      <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-lg">Visualizing your future helps us create a more accurate roadmap. Tell us about the lifestyle you envision and your current outlook.</p>
      <Card cls="p-6 sm:p-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-7">
            <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Desired Annual Retirement Income ($)</label>
            <p className="text-xs text-gray-400 mb-3">Estimated annual spend in today's dollars.</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none">$</span>
              <input type="text" value={data.retirementIncome} required placeholder="85,000"
                onChange={function (e) { let v = fmtNum(e.target.value); setData(function (p: any) { return Object.assign({}, p, { retirementIncome: v }); }); }}
                className={INP_BASE + " pl-9 pr-4"} onFocus={focusNavy} onBlur={blurGray} />
            </div>
          </div>
          <div className="mb-7">
            <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Preferred Retirement Lifestyle</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {lifestyleOpts.map(function (opt) {
                let on = data.lifestyle === opt.id;
                return (
                  <button key={opt.id} type="button" onClick={function () { setData(function (p: any) { return Object.assign({}, p, { lifestyle: opt.id }); }); }}
                    className="flex flex-col items-start text-left p-4 rounded-xl border-2 transition-all"
                    style={on ? { borderColor: NAVY, backgroundColor: NAVYLT } : { borderColor: "#e5e7eb", backgroundColor: "white" }}>
                    <span className="mb-3" style={{ color: on ? NAVY : "#9ca3af" }}><Ico d={opt.d} sz="w-5 h-5" /></span>
                    <p className="text-sm font-bold mb-1.5" style={{ color: on ? NAVY : "#1f2937" }}>{opt.label}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{opt.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="mb-7">
            <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Retirement Readiness Confidence</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(function (n) {
                return (
                  <button key={n} type="button" onClick={function () { setData(function (p: any) { return Object.assign({}, p, { confidence: n }); }); }}
                    className="flex-1 py-3.5 rounded-lg border-2 text-sm font-bold transition-all"
                    style={data.confidence === n ? { borderColor: NAVY, backgroundColor: NAVYLT, color: NAVY } : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#6b7280" }}>
                    {n}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-gray-400 px-1">
              <span>Not confident</span><span>Very confident</span>
            </div>
          </div>
          <div className="mb-7">
            <label className="block text-xs font-semibold tracking-widest text-gray-500 uppercase mb-1">Inflation Sensitivity</label>
            <p className="text-xs text-gray-400 mb-3">How would you like to model future cost-of-living increases?</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {inflationOpts.map(function (opt) {
                return (
                  <button key={opt.id} type="button" onClick={function () { setData(function (p: any) { return Object.assign({}, p, { inflation: opt.id, inflationRate: opt.rate }); }); }}
                    className="flex-1 py-3 px-3 rounded-lg border-2 text-sm font-semibold transition-all text-center"
                    style={data.inflation === opt.id ? { borderColor: NAVY, backgroundColor: NAVYLT, color: NAVY } : { borderColor: "#e5e7eb", backgroundColor: "white", color: "#6b7280" }}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
          <NavRow onPrev={props.onPrev} label="Next Step: Review" />
        </form>
      </Card>
      <FootNote />
    </div>
  );
}

// ─── Step 6: Review ───────────────────────────────────────────────────────────
function Review(props: any) {
  let [stage, setStage] = useState("acknowledge");
  let [agreed, setAgreed] = useState(false);
  let [progress, setProgress] = useState(0);
  let [stepIdx, setStepIdx] = useState(0);
  let [reportReady, setReportReady] = useState(false);
  let navigate = useNavigate();

  let generateReport = props.generateReport;
  let isLoading = props.isLoading;

  let loadSteps = [
    "Analyzing your financial profile...",
    "Calculating tax projections...",
    "Modeling Social Security scenarios...",
    "Projecting investment growth...",
    "Generating your personalized report...",
  ];

  // Once API returns success (reportReady=true), start loading animation, then navigate
  useEffect(function () {
    if (!reportReady) return;
    setStage("loading");
    setProgress(0);
    let interval = setInterval(function () {
      setProgress(function (prev) {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(function () { navigate("/financial-blueprint"); }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 55);
    return function () { clearInterval(interval); };
  }, [reportReady]);

  useEffect(function () {
    setStepIdx(Math.min(Math.floor(progress / 20), loadSteps.length - 1));
  }, [progress]);

  function handleGenerate() {
    if (!agreed || isLoading) return;
    generateReport(props.payload, {
      onSuccess: function (response: any) {
        console.log("Report generation successful:", response);
        let data = typeof response.data === "string" ? response.data : JSON.stringify(response.data);
        localStorage.setItem("reportData", data);
        setReportReady(true); // triggers loading animation → then navigate
      },
      onError: function (err: any) {
        console.error("Report generation failed:", err);
        alert("Something went wrong. Please try again.");
      },
    });
  }

  // Loading animation screen — stays visible until navigation
  if (stage === "loading") {
    let circ = 2 * Math.PI * 28;
    return (
      <div className="flex flex-col items-center justify-center min-h-64 py-12 w-full">
        <Card cls="w-full max-w-2xl p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="4" />
                <circle cx="32" cy="32" r="28" fill="none" stroke={NAVY} strokeWidth="4"
                  strokeDasharray={circ} strokeDashoffset={circ * (1 - progress / 100)}
                  strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.08s linear" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-gray-400"><Ico d={P.clock} sz="w-6 h-6" /></div>
            </div>
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3">Building your personalized 25-page<br />retirement plan...</h2>
          <p className="text-sm text-gray-400 leading-relaxed mb-2">Calculating your tax projections and analyzing social security scenarios.</p>
          <p className="text-xs font-medium mb-6" style={{ color: NAVY }}>{loadSteps[stepIdx]}</p>
          <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: progress + "%", backgroundColor: NAVY }} />
          </div>
          <div className="flex items-center justify-center divide-x divide-gray-200">
            <span className="flex items-center gap-1.5 text-xs text-gray-400 px-4"><Ico d={P.lock} sz="w-3.5 h-3.5" /> Securing Your Data</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400 px-4"><Ico d={P.shield} sz="w-3.5 h-3.5" /> Institutional Grade</span>
          </div>
        </Card>
      </div>
    );
  }

  // Submitting spinner (API call in flight before reportReady)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-64 py-12 w-full">
        <Card cls="w-full max-w-2xl p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full border-4 border-gray-200 border-t-[#1a3260] animate-spin" />
          </div>
          <h2 className="text-lg font-extrabold text-gray-900 mb-2">Submitting your information...</h2>
          <p className="text-sm text-gray-400">Please wait while we prepare your retirement blueprint.</p>
        </Card>
      </div>
    );
  }

  // Acknowledgment screen
  return (
    <div className="flex flex-col items-center justify-center py-10 w-full">
      <div className="w-full max-w-xl">
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: NAVYLT }}>
            <Ico d={P.shield} sz="w-7 h-7" st={NAVY} />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 text-center mb-2">Final Review & Acknowledgment</h1>
        <p className="text-sm text-gray-400 text-center mb-8">Please review the following disclosure to finalize your retirement plan.</p>
        <Card cls="p-6 sm:p-8">
          <div className="rounded-xl px-5 sm:px-6 py-5 mb-6 text-center" style={{ backgroundColor: "#f7f9fc", border: "1px solid #e4e9f2" }}>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "I understand this plan is for educational and planning purposes only and does not constitute individualized investment advice."
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 cursor-pointer mb-8"
            onClick={function () { setAgreed(function (v) { return !v; }); }}>
            <div className="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all"
              style={agreed ? { backgroundColor: NAVY, borderColor: NAVY } : { backgroundColor: "white", borderColor: "#d1d5db" }}>
              {agreed && <Ico d={P.check} sz="w-3 h-3" st="white" sw={3} />}
            </div>
            <span className="text-sm font-medium text-gray-700 select-none">I agree to the terms above</span>
          </div>
          <button type="button" onClick={handleGenerate} disabled={!agreed}
            className="w-full py-4 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2 transition-opacity hover:opacity-90 mb-4"
            style={{ backgroundColor: NAVY, opacity: agreed ? 1 : 0.4, cursor: agreed ? "pointer" : "not-allowed" }}>
            Generate My Retirement Plan
            <Ico d={P.chart} sz="w-4 h-4" st="white" />
          </button>
          <button type="button" onClick={props.onPrev}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
            <Ico d={P.arrowL} sz="w-4 h-4" /> Previous
          </button>
        </Card>
        <div className="mt-6 text-center space-y-2">
          <div className="flex items-center justify-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-gray-400"><Ico d={P.chart} sz="w-3.5 h-3.5" /><span className="uppercase tracking-widest font-semibold">Institutional Grade</span></span>
            <span className="flex items-center gap-1.5 text-xs text-gray-400"><Ico d={P.lock} sz="w-3.5 h-3.5" /><span className="uppercase tracking-widest font-semibold">Secure Transmission</span></span>
          </div>
          <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">Your data is protected by bank-level 256-bit encryption. We do not share your personal financial details with third parties without explicit consent.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function RetirementPlan() {
  let [currentStep, setCurrentStep] = useState("profile");
  let [completedSteps, setCompletedSteps] = useState<any>([]);
  let [sidebarOpen, setSidebarOpen] = useState(false);

  let [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    maritalStatus: "",
    retireAge: "67",
    // Income — empty strings (no pre-fill) to avoid red invalid-input highlighting
    grossSalary: "",
    otherIncome: "",
    // Plans
    participates: true as boolean | null,
    planTypes: ["401k"],
    planBalance: "",
    contribRate: "8",
    contribUnit: "%",
    empMatch: "0.50",
    annReturn: "7.0",
    contUntilRet: true,
    // IRAs
    hasIRA: false as boolean | null,
    iraTypes: [],
    iraBal: "",
    iraContrib: "",
    taxSavings: "",
    incomeSrc: ["none"],
    // Goals
    retirementIncome: "",
    lifestyle: "moderate",
    confidence: 3,
    inflation: "standard",
    inflationRate: 0.03,
  });

  let { mutate: generateReport, isPending: isLoading } = useGenerateReport();
  let stepIds = STEPS.map(function (s) { return s.id; });
  let currentIndex = stepIds.indexOf(currentStep);

  function buildPayload(fd: any) {
    let salary = parseMoney(fd.grossSalary);
    let otherInc = parseMoney(fd.otherIncome);
    let planBal = parseMoney(fd.planBalance);
    let iraBal = parseMoney(fd.iraBal);
    let taxSav = parseMoney(fd.taxSavings);
    let retIncome = parseMoney(fd.retirementIncome) || 85000;
    let contribRateNum = parseFloat(fd.contribRate) || 8;
    let monthlyContrib = fd.contribUnit === "%" ? Math.round((salary * contribRateNum / 100) / 12) : contribRateNum;
    let empMatchNum = fd.empMatch === "no_match" ? 0 : parseFloat(fd.empMatch) || 0;
    let currentAge = calcAge(fd.dob); // null-safe
    let retireAgeNum = parseInt(fd.retireAge) || 67;
    let yearsToRetire = currentAge != null ? Math.max(retireAgeNum - currentAge, 1) : 32;
    let annReturnNum = parseFloat(fd.annReturn) / 100 || 0.07;

    function fv(pv: any, pmt: any, rate: any, n: any) {
      if (n <= 0) return pv;
      if (rate === 0) return pv + pmt * n;
      let f = Math.pow(1 + rate, n);
      return pv * f + pmt * 12 * ((f - 1) / rate);
    }

    let projectedPortfolio = Math.round(fv(planBal + iraBal + taxSav, monthlyContrib, annReturnNum, yearsToRetire));
    let estimatedAnnualRetIncome = Math.round(projectedPortfolio * 0.04);
    let retirementIncomeGap = Math.max(retIncome - estimatedAnnualRetIncome, 0);
    let ssa67 = salary > 0 ? Math.round(salary * 0.29) : 27550;
    let ssa70 = Math.round(ssa67 * 1.24);
    // Compute salaryFuture safely (cap years at 40 to avoid overflow)
    let safeYears = Math.min(yearsToRetire, 40);
    let salaryFuture = Math.round(salary * Math.pow(1 + fd.inflationRate, safeYears));
    let totalAssets = planBal + iraBal + taxSav;
    let monthlyIncome = Math.round((salary + otherInc) / 12);
    let monthlyExpenses = Math.round(monthlyIncome * 0.78);
    let monthlySurplus = monthlyIncome - monthlyExpenses;
    let monthlyCoreExp = Math.round(monthlyExpenses * 0.9);
    let recommendedEFund = monthlyCoreExp * 6;
    let today = new Date();
    let monthStr = today.toLocaleDateString("en-US", { month: "long", year: "numeric" });

    return {
      clientName: fd.fullName || "Client",
      date: monthStr,
      preparedBy: "WINTRICE Retirement Intelligence System",
      maritalStatus: fd.maritalStatus,
      currentAge: currentAge,         // null when no DOB — blueprint handles gracefully
      retirementAge: retireAgeNum,
      retirementAgeGoal: retireAgeNum,
      lifeExpectancy: 92,
      annualSalary: salary,
      annualSalaryGrowth: 0.03,
      currentRetirementSavings: planBal,
      monthlyRetirementContribution: monthlyContrib,
      employerMatch: empMatchNum,
      expectedAnnualReturn: annReturnNum,
      contribRate: contribRateNum,
      planTypes: fd.planTypes,
      hasIRA: fd.hasIRA,
      iraBalance: iraBal,
      taxableSavings: taxSav,
      targetRetirementIncome: retIncome,
      projectedNeededIncome: retIncome,
      lifestyle: fd.lifestyle,
      confidenceScore: fd.confidence,
      inflationRate: fd.inflationRate,
      projectedPortfolio67: projectedPortfolio,
      estimatedAnnualRetIncome: estimatedAnnualRetIncome,
      retirementIncomeGap: retirementIncomeGap,
      ssa67: ssa67,
      ssa70: ssa70,
      breakEvenAge: 81,
      netWorth: totalAssets,
      assets: [
        { label: "401(k) / Employer Plan", value: planBal },
        { label: "IRA Accounts", value: iraBal },
        { label: "Taxable / Brokerage", value: taxSav },
      ],
      totalAssets: totalAssets,
      totalLiabilities: 0,
      monthlyIncome: monthlyIncome,
      monthlyExpenses: monthlyExpenses,
      monthlySurplus: monthlySurplus,
      monthlyCoreExpenses: monthlyCoreExp,
      recommendedEFund: recommendedEFund,
      liquidSavings: taxSav,
      efundStatus: recommendedEFund > 0 ? Math.min(Math.round((taxSav / recommendedEFund) * 100), 100) : 0,
      debtToIncomeRatio: 32,
      riskProfile: fd.confidence >= 4 ? "Aggressive Growth" : fd.confidence >= 3 ? "Moderate Growth" : "Conservative",
      allocation: [
        { label: "U.S. Stocks", percent: 60 },
        { label: "International Stocks", percent: 15 },
        { label: "Bonds", percent: 20 },
        { label: "Cash", percent: 5 },
      ],
      salaryToday: salary,
      salaryFuture: salaryFuture,
      inflationRate: fd.inflationRate,
      chancePast90: 38,
      chancePast95: 16,
      portfolioLastsTo: 93,
      taxRate: 22,
      traditionalPercent: 60,
      rothPercent: 40,
      lifetimeTaxSavings: 112000,
      actionPlan: [
        "Increase retirement contribution to " + (Math.max(contribRateNum + 4, 12)) + "%",
        "Build emergency fund to $" + recommendedEFund.toLocaleString(),
        "Review and optimize life insurance coverage",
        "Rebalance portfolio annually",
      ],
    };
  }

  let payload = buildPayload(formData);

  function goNext() {
    let id: any = stepIds[currentIndex];
    if (completedSteps.indexOf(id) === -1) setCompletedSteps(function (prev: any) { return prev.concat(id); });
    if (currentIndex < stepIds.length - 1) setCurrentStep(stepIds[currentIndex + 1]);
    setSidebarOpen(false);
  }

  function goPrev() {
    if (currentIndex > 0) setCurrentStep(stepIds[currentIndex - 1]);
    setSidebarOpen(false);
  }

  function renderStep() {
    if (currentStep === "profile") return <Profile data={formData} setData={setFormData} onNext={goNext} />;
    if (currentStep === "income") return <Income data={formData} setData={setFormData} onNext={goNext} onPrev={goPrev} />;
    if (currentStep === "plans") return <Plans data={formData} setData={setFormData} onNext={goNext} onPrev={goPrev} />;
    if (currentStep === "iras") return <IRAs data={formData} setData={setFormData} onNext={goNext} onPrev={goPrev} />;
    if (currentStep === "goals") return <Goals data={formData} setData={setFormData} onNext={goNext} onPrev={goPrev} />;
    if (currentStep === "review") return <Review onPrev={goPrev} generateReport={generateReport} isLoading={isLoading} payload={payload} />;
    return null;
  }

  let currentLabel = (STEPS.find(function (s) { return s.id === currentStep; }) || {}).label || "";

  return (
    <div className="py-10">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-col fixed left-0 top-0 h-screen w-64 z-20">
        <SideBar currentStep={currentStep} completedSteps={completedSteps} />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-40" onClick={function () { setSidebarOpen(false); }} />
          <div className="relative z-50 w-72 h-full bg-white shadow-xl">
            <SideBar currentStep={currentStep} completedSteps={completedSteps} onClose={function () { setSidebarOpen(false); }} />
          </div>
        </div>
      )}

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: NAVY }}>
            <Ico d={P.chart} sz="w-4 h-4" st="white" />
          </div>
          <span className="text-sm font-bold text-gray-900">Retirement Planner</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 hidden sm:inline">{currentLabel}</span>
          <button onClick={function () { setSidebarOpen(true); }} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors" aria-label="Open menu">
            <Ico d={P.menu} sz="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main content — CENTERED relative to right panel */}
      <main className="lg:ml-64">
        <div className="pt-16 lg:pt-0 px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="text-sm text-gray-400 mb-5 max-w-2xl mx-auto">
            <span className="font-medium text-gray-600">Questionnaire</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-gray-800">{currentLabel}</span>
          </div>
          {/* Centered form — max-w-2xl keeps it tight and centered */}
          <div className="max-w-2xl mx-auto">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}