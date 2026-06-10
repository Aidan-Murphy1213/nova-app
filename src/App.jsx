import { useState, useEffect } from "react";

// ── Stock Dataset ──────────────────────────────────────────────────────────────
const STOCKS = {
  Technology: [
    { ticker: "AAPL", name: "Apple Inc.", risk: "low", dividendYield: 0.35, growth: "moderate", cap: "large", description: "World's largest company by market cap; stable, diversified revenue across hardware and services." },
    { ticker: "MSFT", name: "Microsoft Corp.", risk: "low", dividendYield: 0.88, growth: "high", cap: "large", description: "Cloud computing leader with consistent earnings growth and strong dividend history." },
    { ticker: "GOOGL", name: "Alphabet Inc.", risk: "moderate", dividendYield: 0.23, growth: "high", cap: "large", description: "Dominant in digital advertising and rapidly expanding in cloud and AI." },
    { ticker: "NVDA", name: "NVIDIA Corp.", risk: "high", dividendYield: 0.5, growth: "very high", cap: "large", description: "Leading AI chip manufacturer with explosive growth potential and high volatility." },
    { ticker: "CRM", name: "Salesforce Inc.", risk: "moderate", dividendYield: 0, growth: "high", cap: "large", description: "Enterprise software leader in CRM with strong recurring revenue model." },
    { ticker: "AMD", name: "Advanced Micro Devices", risk: "high", dividendYield: 0, growth: "very high", cap: "mid", description: "High-growth semiconductor company competing directly with Intel and NVIDIA." },
  ],
  Healthcare: [
    { ticker: "JNJ", name: "Johnson & Johnson", risk: "low", dividendYield: 2.3, growth: "low", cap: "large", description: "Diversified healthcare giant with 60+ years of consecutive dividend increases." },
    { ticker: "UNH", name: "UnitedHealth Group", risk: "low", dividendYield: 2.19, growth: "moderate", cap: "large", description: "Largest U.S. health insurer with consistent earnings and strong cash flow." },
    { ticker: "PFE", name: "Pfizer Inc.", risk: "moderate", dividendYield: 6.7, growth: "low", cap: "large", description: "Global pharmaceutical leader offering one of the highest dividend yields in healthcare." },
    { ticker: "ABBV", name: "AbbVie Inc.", risk: "moderate", dividendYield: 3.1, growth: "moderate", cap: "large", description: "Biopharmaceutical company known for strong pipeline and high dividend yield." },
    { ticker: "ISRG", name: "Intuitive Surgical", risk: "moderate", dividendYield: 0, growth: "high", cap: "large", description: "Leader in robotic-assisted surgery with strong growth prospects in medical tech." },
    { ticker: "VEEV", name: "Veeva Systems", risk: "moderate", dividendYield: 0, growth: "high", cap: "mid", description: "Cloud software provider for life sciences — fast-growing niche with high margins." },
  ],
  Energy: [
    { ticker: "XOM", name: "ExxonMobil Corp.", risk: "moderate", dividendYield: 2.77, growth: "low", cap: "large", description: "Largest U.S. oil company with a long track record of dividend payments." },
    { ticker: "CVX", name: "Chevron Corp.", risk: "moderate", dividendYield: 3.73, growth: "low", cap: "large", description: "Integrated energy major with strong balance sheet and consistent dividends." },
    { ticker: "NEE", name: "NextEra Energy", risk: "low", dividendYield: 2.9, growth: "moderate", cap: "large", description: "World's largest renewable energy producer — stable utility with growth potential." },
    { ticker: "SLB", name: "Schlumberger Ltd.", risk: "high", dividendYield: 2.09, growth: "moderate", cap: "large", description: "Global oilfield services leader tied closely to oil price cycles." },
    { ticker: "FSLR", name: "First Solar Inc.", risk: "high", dividendYield: 0, growth: "high", cap: "mid", description: "Leading U.S. solar panel manufacturer benefiting from clean energy transition." },
    { ticker: "OXY", name: "Occidental Petroleum", risk: "high", dividendYield: 1.77, growth: "moderate", cap: "large", description: "Oil and gas producer with significant Permian Basin exposure and Warren Buffett backing." },
  ],
  Financials: [
    { ticker: "JPM", name: "JPMorgan Chase", risk: "low", dividendYield: 1.92, growth: "moderate", cap: "large", description: "Largest U.S. bank with diversified revenue streams and strong dividend history." },
    { ticker: "BAC", name: "Bank of America", risk: "moderate", dividendYield: 2.08, growth: "moderate", cap: "large", description: "Second largest U.S. bank with improving efficiency and consistent dividend growth." },
    { ticker: "BRK.B", name: "Berkshire Hathaway B", risk: "low", dividendYield: 0, growth: "moderate", cap: "large", description: "Warren Buffett's holding company — highly diversified and historically stable." },
    { ticker: "V", name: "Visa Inc.", risk: "low", dividendYield: 0.86, growth: "high", cap: "large", description: "Global payments network with near-monopolistic position and consistent growth." },
    { ticker: "MA", name: "Mastercard Inc.", risk: "low", dividendYield: 0.7, growth: "high", cap: "large", description: "Second largest global payments network with strong international growth." },
    { ticker: "SCHW", name: "Charles Schwab Corp.", risk: "moderate", dividendYield: 1.44, growth: "moderate", cap: "large", description: "Leading brokerage and banking firm benefiting from rising interest rates." },
  ],
  Utilities: [
    { ticker: "DUK", name: "Duke Energy Corp.", risk: "low", dividendYield: 3.43, growth: "low", cap: "large", description: "One of the largest U.S. electric utilities — extremely stable with high dividends." },
    { ticker: "SO", name: "Southern Company", risk: "low", dividendYield: 3.28, growth: "low", cap: "large", description: "Major southeastern U.S. utility known for reliable dividends and regulated operations." },
    { ticker: "AEP", name: "American Electric Power", risk: "low", dividendYield: 3.01, growth: "low", cap: "large", description: "Large transmission utility with one of the highest dividend yields in the sector." },
    { ticker: "AWK", name: "American Water Works", risk: "low", dividendYield: 2.49, growth: "moderate", cap: "large", description: "Largest U.S. water utility — recession-proof with steady long-term growth." },
    { ticker: "WEC", name: "WEC Energy Group", risk: "low", dividendYield: 3.38, growth: "low", cap: "large", description: "Midwest utility with consistent dividend growth and clean energy transition focus." },
    { ticker: "ES", name: "Eversource Energy", risk: "low", dividendYield: 4.5, growth: "low", cap: "mid", description: "New England utility offering one of the highest yields in the sector." },
  ],
  Industrials: [
    { ticker: "HON", name: "Honeywell International", risk: "low", dividendYield: 2.23, growth: "moderate", cap: "large", description: "Diversified industrial conglomerate with strong aerospace and building tech divisions." },
    { ticker: "CAT", name: "Caterpillar Inc.", risk: "moderate", dividendYield: 0.67, growth: "moderate", cap: "large", description: "Global leader in construction and mining equipment with strong dividend history." },
    { ticker: "UPS", name: "United Parcel Service", risk: "moderate", dividendYield: 6.04, growth: "moderate", cap: "large", description: "Global logistics leader with high dividend yield and e-commerce tailwinds." },
    { ticker: "RTX", name: "RTX Corporation", risk: "moderate", dividendYield: 1.57, growth: "moderate", cap: "large", description: "Aerospace and defense giant with stable government contracts and growing commercial aviation." },
    { ticker: "DE", name: "Deere & Company", risk: "moderate", dividendYield: 1.1, growth: "high", cap: "large", description: "Agricultural equipment leader with strong pricing power and smart farming technology." },
    { ticker: "GWW", name: "W.W. Grainger", risk: "moderate", dividendYield: 0.83, growth: "high", cap: "mid", description: "Industrial supply distributor with consistent earnings growth and strong e-commerce pivot." },
  ],
};

const ALL_INDUSTRIES = Object.keys(STOCKS);

// ── Helpers ───────────────────────────────────────────────────────────────────
function getRiskScore(profile) {
  let score = 0;
  if (profile.riskTolerance === "conservative") score += 1;
  if (profile.riskTolerance === "moderate") score += 2;
  if (profile.riskTolerance === "aggressive") score += 3;
  if (profile.timeline === "short") score += 0;
  if (profile.timeline === "medium") score += 1;
  if (profile.timeline === "long") score += 2;
  return score; // 1-5
}

function filterStocks(industry, profile, riskScore) {
  const pool = STOCKS[industry];
  return pool.filter(s => {
    if (riskScore <= 2 && s.risk === "high") return false;
    if (riskScore >= 4 && s.risk === "low" && profile.goal === "growth") return false;
    if (profile.dividendFocus && s.dividendYield === 0) return false;
    if (profile.investmentStyle === "passive" && s.risk === "high") return false;
    return true;
  });
}

function getStockCount(equity) {
  if (equity < 5000) return 2;
  if (equity < 15000) return 3;
  if (equity < 50000) return 4;
  return 5;
}

function getHealthScore(profile, allocations) {
  let score = 100;
  const industries = Object.keys(allocations);
  if (industries.length < 3) score -= 20;
  if (industries.length < 2) score -= 20;
  const maxAlloc = Math.max(...Object.values(allocations));
  if (maxAlloc > 50) score -= 15;
  if (profile.riskTolerance === "aggressive" && profile.timeline === "short") score -= 15;
  if (profile.riskTolerance === "conservative" && profile.timeline === "long") score -= 5;
  return Math.max(score, 40);
}

function getReturnRange(riskScore, dividendFocus) {
  const ranges = {
    1: { low: 3, high: 6, label: "Conservative" },
    2: { low: 4, high: 8, label: "Moderately Conservative" },
    3: { low: 6, high: 11, label: "Balanced" },
    4: { low: 8, high: 15, label: "Moderately Aggressive" },
    5: { low: 10, high: 20, label: "Aggressive" },
  };
  const range = ranges[Math.min(riskScore, 5)];
  if (dividendFocus) range.low += 1;
  return range;
}

function buildPortfolio(profile) {
  const riskScore = getRiskScore(profile);
  const preferredIndustries = profile.industries;
  const avoided = profile.avoidIndustries || [];
  const allocationMap = {};
  const stockPicks = {};

  const otherIndustries = ALL_INDUSTRIES.filter(i => !preferredIndustries.includes(i) && !avoided.includes(i));
  const otherWeight = otherIndustries.length > 0 ? 30 / otherIndustries.length : 0;
  const preferredWeight = preferredIndustries.length > 0 ? 70 / preferredIndustries.length : 0;

  const industriesToUse = [...preferredIndustries, ...otherIndustries.slice(0, Math.max(0, 6 - preferredIndustries.length))];

  industriesToUse.forEach((ind) => {
    const isPreferred = preferredIndustries.includes(ind);
    allocationMap[ind] = Math.round(isPreferred ? preferredWeight : otherWeight);
  });

  // Normalize to 100%
  const total = Object.values(allocationMap).reduce((a, b) => a + b, 0);
  const keys = Object.keys(allocationMap);
  keys.forEach(k => { allocationMap[k] = Math.round((allocationMap[k] / total) * 100); });
  // Fix rounding
  const diff = 100 - Object.values(allocationMap).reduce((a, b) => a + b, 0);
  if (keys.length > 0) allocationMap[keys[0]] += diff;

  const stockCount = getStockCount(profile.equity);

  industriesToUse.forEach(ind => {
    const eligible = filterStocks(ind, profile, riskScore);
    const sorted = eligible.sort((a, b) => {
      if (profile.dividendFocus) return b.dividendYield - a.dividendYield;
      if (riskScore >= 4) return (b.growth === "very high" ? 2 : b.growth === "high" ? 1 : 0) - (a.growth === "very high" ? 2 : a.growth === "high" ? 1 : 0);
      return (a.risk === "low" ? 0 : a.risk === "moderate" ? 1 : 2) - (b.risk === "low" ? 0 : b.risk === "moderate" ? 1 : 2);
    });
    stockPicks[ind] = sorted.slice(0, stockCount);
  });

  const healthScore = getHealthScore(profile, allocationMap);
  const returnRange = getReturnRange(riskScore, profile.dividendFocus);

  return { allocationMap, stockPicks, healthScore, returnRange, riskScore };
}

function getRiskLabel(risk) {
  if (risk === "low") return { label: "Low Risk", color: "#10B981" };
  if (risk === "moderate") return { label: "Moderate Risk", color: "#F59E0B" };
  return { label: "High Risk", color: "#EF4444" };
}

function getRecommendationReason(stock, profile, riskScore) {
  const reasons = {
    AAPL: "A rare combination of brand loyalty and recurring services revenue makes this a cornerstone holding for conservative and moderate investors alike.",
    MSFT: "Cloud dominance plus a consistent dividend makes this one of the few stocks that satisfies both growth and income objectives simultaneously.",
    GOOGL: "Advertising monopoly funds moonshot bets in AI and cloud — chosen for its growth trajectory without relying on dividends.",
    NVDA: "The defining AI infrastructure stock of this decade — high conviction pick for aggressive timelines with appetite for volatility.",
    CRM: "Recurring SaaS revenue with 90%+ renewal rates gives this pick unusual earnings predictability for a high-growth company.",
    AMD: "Direct GPU and CPU competition with market leaders creates asymmetric upside — best for aggressive profiles with a long horizon.",
    JNJ: "Six decades of consecutive dividend increases make this a bedrock holding for income, retirement, and conservative investors.",
    UNH: "Dual insurance and healthcare services revenue streams provide a rare defensive growth combination suited to most risk profiles.",
    PFE: "One of the highest dividend yields in pharma with a deep drug pipeline — a value pick for income-focused portfolios.",
    ABBV: "Transitioning successfully beyond Humira with next-gen drugs already outperforming — a turnaround story with dividend upside.",
    ISRG: "Surgical robot installed base creates guaranteed maintenance revenue — chosen for its embedded moat rather than headline growth.",
    VEEV: "80%+ gross margins and near-zero churn in a niche with high switching costs — a compounding machine for patient investors.",
    XOM: "Massive reserve expansion and sector-leading dividend make this the go-to energy anchor for income and moderate risk profiles.",
    CVX: "Fortress balance sheet and below-peer debt ratio mean CVX can maintain dividends through commodity downturns competitors cannot.",
    NEE: "Renewable energy leadership paired with utility stability — the cleanest path to both ESG alignment and dividend income.",
    SLB: "International revenue diversification shields returns from U.S. shale volatility — a smarter energy pick for moderate investors.",
    FSLR: "Sole U.S.-scale solar manufacturer benefits disproportionately from domestic content incentives — a policy-backed growth play.",
    OXY: "Buffett's 28% stake signals deep value conviction — picked for aggressive investors who follow smart money into energy.",
    JPM: "Scale advantages compound over time — JPMorgan consistently outperforms peers across credit cycles, rate environments, and downturns.",
    BAC: "Rate sensitivity works in your favor here — rising interest rates directly expand this bank's net interest income.",
    "BRK.B": "$168B cash reserve gives Berkshire unmatched ability to acquire at distressed prices — a hedge within your portfolio.",
    V: "Zero credit risk on $14T in annual transactions — Visa is essentially a fee collector on global economic activity.",
    MA: "Fastest-growing payment network in developing markets — chosen for international tailwinds that domestic-focused alternatives lack.",
    SCHW: "$9T in custodied assets creates switching costs that keep clients locked in — a durable competitive position in retail brokerage.",
    DUK: "Regulated monopoly serving 8 million customers with state-guaranteed returns — maximum stability with predictable income.",
    SO: "First new U.S. nuclear capacity in 30 years positions Southern Company for decades of clean baseload generation.",
    AEP: "Owns the largest transmission network in the U.S. — infrastructure that becomes more valuable as electrification accelerates.",
    AWK: "No dividend cuts in public history — water scarcity trends make this the most defensible utility in a changing climate.",
    WEC: "20 consecutive years of dividend growth from a fully regulated operator — consistency that income investors can count on.",
    ES: "Offshore wind investments across New England create a long runway for above-average utility growth.",
    HON: "Aerospace maintenance contracts lock in recurring revenue years in advance — chosen for earnings visibility, not just valuation.",
    CAT: "Infrastructure spending cycles create demand waves that last years — Caterpillar captures the pick-and-shovel side of global building.",
    UPS: "Delivering 6% of U.S. GDP daily creates pricing power that smaller logistics competitors simply cannot match.",
    RTX: "$206B defense backlog means years of guaranteed revenue — chosen for investors who want defense exposure with dividend reliability.",
    DE: "Precision agriculture software is converting one-time equipment sales into recurring subscriptions — a business model evolution worth owning.",
    GWW: "Industrial supply scale and logistics depth make Grainger nearly impossible to displace once a business is a customer.",
  };
  return reasons[stock.ticker] || `Selected because it aligns with your ${profile.riskTolerance} risk profile and ${profile.goal} investment goal.`;
}

// ── Color palette ─────────────────────────────────────────────────────────────
const C = {
  bg: "#0A0F1E",
  card: "#111827",
  cardBorder: "#1E2D45",
  accent: "#3B82F6",
  accentHover: "#2563EB",
  emerald: "#10B981",
  amber: "#F59E0B",
  red: "#EF4444",
  text: "#F8FAFC",
  textMuted: "#94A3B8",
  textSubtle: "#475569",
};

const INDUSTRY_COLORS = {
  Technology: "#3B82F6",
  Healthcare: "#10B981",
  Energy: "#F59E0B",
  Financials: "#8B5CF6",
  Utilities: "#06B6D4",
  Industrials: "#F97316",
};

// ── Mini donut chart ──────────────────────────────────────────────────────────
function DonutChart({ allocations }) {
  const entries = Object.entries(allocations);
  if (!entries.length) return null;
  const size = 180, cx = 90, cy = 90, r = 70, stroke = 22;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const slices = entries.map(([industry, pct]) => {
    const dash = (pct / 100) * circumference;
    const gap = circumference - dash;
    const slice = { industry, pct, dash, gap, offset };
    offset += dash;
    return slice;
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1E2D45" strokeWidth={stroke} />
      {slices.map(s => (
        <circle key={s.industry} cx={cx} cy={cy} r={r} fill="none"
          stroke={INDUSTRY_COLORS[s.industry] || C.accent}
          strokeWidth={stroke}
          strokeDasharray={`${s.dash} ${s.gap}`}
          strokeDashoffset={-s.offset}
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      ))}
    </svg>
  );
}

// ── Health score ring ─────────────────────────────────────────────────────────
function HealthRing({ score }) {
  const r = 54, circumference = 2 * Math.PI * r;
  const dash = (score / 100) * circumference;
  const color = score >= 80 ? C.emerald : score >= 60 ? C.amber : C.red;
  const label = score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Fair";
  return (
    <div style={{ position: "relative", width: 130, height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={130} height={130} viewBox="0 0 130 130" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
        <circle cx={65} cy={65} r={r} fill="none" stroke="#1E2D45" strokeWidth={14} />
        <circle cx={65} cy={65} r={r} fill="none" stroke={color} strokeWidth={14}
          strokeDasharray={`${dash} ${circumference - dash}`}
          style={{ transition: "stroke-dasharray 1s ease" }}
        />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1 }}>{score}</div>
        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{label}</div>
      </div>
    </div>
  );
}

// ── Progress bar ──────────────────────────────────────────────────────────────
function ProgressBar({ step }) {
  const stages = [
    { label: "Welcome", icon: "✦" },
    { label: "Profile", icon: "◉" },
    { label: "Preferences", icon: "⬡" },
    { label: "Industries", icon: "◈" },
    { label: "Results", icon: "★" },
  ];
  return (
    <div style={{ padding: "24px 32px 0", maxWidth: 700, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        {stages.map((s, i) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", flex: i < stages.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                background: i < step ? C.emerald : i === step ? `linear-gradient(135deg, ${C.accent}, #6366F1)` : "#1E2D45",
                color: i <= step ? "#fff" : C.textSubtle,
                fontSize: i < step ? 14 : 18,
                fontWeight: 700,
                transition: "all 0.4s",
                border: i === step ? `2px solid ${C.accent}` : "2px solid transparent",
                boxShadow: i === step ? `0 0 16px ${C.accent}50` : "none",
              }}>
                {i < step ? "✓" : s.icon}
              </div>
              <div style={{
                fontSize: 10, fontWeight: i === step ? 700 : 400,
                color: i === step ? C.accent : i < step ? C.emerald : C.textSubtle,
                whiteSpace: "nowrap", letterSpacing: 0.5,
                textTransform: "uppercase",
              }}>{s.label}</div>
            </div>
            {i < stages.length - 1 && (
              <div style={{
                flex: 1, height: 2, marginBottom: 22, margin: "0 6px 22px",
                background: i < step
                  ? C.emerald
                  : `linear-gradient(90deg, #1E2D45 0%, #1E2D45 100%)`,
                transition: "background 0.4s",
                position: "relative", overflow: "hidden",
              }}>
                {i < step && <div style={{ position: "absolute", inset: 0, background: C.emerald }} />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Input components ──────────────────────────────────────────────────────────
function StyledInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={{
        background: "#0D1526", border: `1.5px solid ${C.cardBorder}`, borderRadius: 10,
        padding: "14px 18px", color: C.text, fontSize: 16, width: "100%", outline: "none",
        transition: "border-color 0.2s", fontFamily: "inherit",
      }}
      onFocus={e => e.target.style.borderColor = C.accent}
      onBlur={e => e.target.style.borderColor = C.cardBorder}
    />
  );
}

function OptionCard({ label, subtitle, selected, onClick, color }) {
  return (
    <div onClick={onClick} className="nova-option-card" style={{
      background: selected ? `${color || C.accent}18` : C.card,
      border: `1.5px solid ${selected ? (color || C.accent) : C.cardBorder}`,
      borderRadius: 12, padding: "16px 20px", cursor: "pointer",
      boxShadow: selected ? `0 0 16px ${(color || C.accent)}30` : "none",
    }}>
      <div className="card-label" style={{ fontWeight: 700, color: selected ? (color || C.accent) : C.text, fontSize: 15 }}>{label}</div>
      {subtitle && <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{subtitle}</div>}
    </div>
  );
}

function NavBtn({ onClick, children, secondary }) {
  return (
    <button onClick={onClick} className={secondary ? "nova-nav-btn nova-nav-btn-secondary" : "nova-nav-btn"} style={{
      background: secondary ? "transparent" : C.accent,
      border: secondary ? `1.5px solid ${C.cardBorder}` : "none",
      color: secondary ? C.textMuted : "#fff",
      borderRadius: 10, padding: "13px 32px", fontSize: 15, fontWeight: 700,
      cursor: "pointer", fontFamily: "inherit",
    }}>{children}</button>
  );
}

// ── Expandable Option Card with dropdown info ─────────────────────────────────
function ExpandableOptionCard({ label, sub, detail, selected, onClick, color }) {
  const [open, setOpen] = useState(false);
  const borderColor = selected ? (color || C.accent) : C.cardBorder;
  const bgColor = selected ? `${color || C.accent}18` : C.card;

  return (
    <div className="nova-expand-card" style={{
      background: bgColor, border: `1.5px solid ${borderColor}`,
      borderRadius: 12, overflow: "hidden",
      boxShadow: selected ? `0 0 16px ${(color || C.accent)}30` : "none",
    }}>
      {/* Main clickable row */}
      <div onClick={onClick} className="nova-expand-main" style={{ padding: "16px 20px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.18s" }}>
        <div>
          <div style={{ fontWeight: 700, color: selected ? (color || C.accent) : C.text, fontSize: 15 }}>{label}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 3 }}>{sub}</div>
        </div>
        {selected && (
          <div style={{
            width: 18, height: 18, borderRadius: "50%",
            background: color || C.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, marginLeft: 8,
          }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 900 }}>✓</span>
          </div>
        )}
      </div>

      {/* Dropdown toggle */}
      <div
        onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
        className="nova-expand-toggle"
        style={{
          borderTop: `1px solid ${borderColor}`,
          padding: "8px 20px",
          display: "flex", alignItems: "center", gap: 6,
          cursor: "pointer", background: selected ? `${color || C.accent}10` : "#0D1526",
          transition: "all 0.18s",
        }}
      >
        <span style={{ fontSize: 11, color: color || C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
          How this affects your portfolio
        </span>
        <span style={{
          fontSize: 9, color: color || C.accent,
          transform: open ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s", display: "inline-block", marginLeft: "auto",
        }}>▼</span>
      </div>

      {/* Expanded detail */}
      {open && (
        <div style={{
          padding: "14px 20px",
          background: "#0A0F1E",
          borderTop: `1px solid ${borderColor}`,
          fontSize: 13, color: C.textMuted, lineHeight: 1.7,
        }}>
          {detail}
        </div>
      )}
    </div>
  );
}

// ── Feature Pills with dropdowns ──────────────────────────────────────────────
const gradientStyle = document.createElement("style");
gradientStyle.textContent = `
  @keyframes gradientShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animated-gradient {
    background: linear-gradient(90deg, #3B82F6, #10B981, #6366F1, #3B82F6);
    background-size: 300% 300%;
    animation: gradientShift 4s ease infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .nova-option-card { transition: all 0.18s ease; }
  .nova-option-card:hover { border-color: #3B82F6 !important; background: #1a2640 !important; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(59,130,246,0.15) !important; }
  .nova-option-card:hover .card-label { color: #F8FAFC !important; }

  .nova-expand-card { transition: all 0.18s ease; }
  .nova-expand-card:hover { border-color: #3B82F6 !important; transform: translateY(-1px); box-shadow: 0 4px 20px rgba(59,130,246,0.15) !important; }

  .nova-expand-main:hover { background: #131f35 !important; }
  .nova-expand-toggle:hover { background: #131f35 !important; opacity: 0.9; }
  .nova-expand-toggle:hover span { opacity: 1 !important; }

  .nova-nav-btn { transition: all 0.18s ease !important; }
  .nova-nav-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(59,130,246,0.3) !important; filter: brightness(1.1); }
  .nova-nav-btn-secondary:hover { border-color: #3B82F6 !important; color: #F8FAFC !important; background: #1a2640 !important; transform: translateY(-1px); }

  .nova-pill:hover { border-color: #3B82F6 !important; color: #F8FAFC !important; background: #1a2640 !important; transform: translateY(-1px); }

  .nova-industry-card { transition: all 0.18s ease; }
  .nova-industry-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(59,130,246,0.2) !important; border-color: #3B82F6 !important; }
  .nova-industry-card:hover .industry-label { color: #F8FAFC !important; }

  .nova-dividend-card:hover { border-color: #10B981 !important; box-shadow: 0 4px 20px rgba(16,185,129,0.15) !important; transform: translateY(-1px); }

  .nova-stock-row:hover { background: #131f35 !important; }
  .nova-restart-btn:hover { border-color: #3B82F6 !important; color: #F8FAFC !important; background: #1a2640 !important; transform: translateY(-1px); }

  .nova-progress-step:hover { transform: scale(1.08); cursor: default; }
  .nova-feature-pill:hover { border-color: #3B82F6 !important; color: #F8FAFC !important; background: #1a2640 !important; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(59,130,246,0.2); }
`;
document.head.appendChild(gradientStyle);
function FeaturePills() {
  const [open, setOpen] = useState(null);
  const pills = [
    {
      label: "No Experience Needed",
      icon: "✦",
      detail: "Nova is built for beginners. Every question is explained in plain language — no financial jargon, no assumed knowledge. If you're just starting out, you're in the right place.",
    },
    {
      label: "Fully Personalized",
      icon: "✦",
      detail: "Your portfolio is built entirely around your inputs — your equity, your goals, your risk comfort, and the industries you care about. No two Nova portfolios are the same.",
    },
    {
      label: "Transparent Explanations",
      icon: "✦",
      detail: "Every stock recommendation comes with a clear explanation of why it was chosen for you specifically. You'll understand your portfolio, not just own it.",
    },
  ];

  return (
    <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
      {pills.map((p, i) => (
        <div key={p.label} style={{ position: "relative" }}>
          <div
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              display: "flex", alignItems: "center", gap: 7, fontSize: 12,
              color: open === i ? C.accent : C.textMuted,
              background: open === i ? `${C.accent}12` : "#111827",
              border: `1px solid ${open === i ? C.accent : C.cardBorder}`,
              borderRadius: 20, padding: "7px 14px", cursor: "pointer",
              transition: "all 0.18s", userSelect: "none",
            }}
            className="nova-feature-pill"
          >
            <span style={{ color: open === i ? C.accent : C.emerald, fontSize: 9 }}>{p.icon}</span>
            {p.label}
            <span style={{
              fontSize: 9, color: open === i ? C.accent : C.textSubtle,
              transform: open === i ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s", display: "inline-block", marginLeft: 2,
            }}>▼</span>
          </div>
          {open === i && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", left: "50%",
              transform: "translateX(-50%)",
              background: C.card, border: `1px solid ${C.accent}40`,
              borderRadius: 12, padding: "14px 16px", width: 240,
              fontSize: 12, color: C.textMuted, lineHeight: 1.6,
              zIndex: 10, boxShadow: `0 8px 32px rgba(0,0,0,0.4)`,
              textAlign: "left",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, marginBottom: 6 }}>{p.label}</div>
              {p.detail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── Summary Card with dropdown ────────────────────────────────────────────────
function SummaryCard({ label, value, valueColor, sub, ring, detail }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="nova-expand-card" style={{
      background: C.card, border: `1px solid ${open ? C.accent : C.cardBorder}`,
      borderRadius: 14, overflow: "hidden", transition: "all 0.18s",
      boxShadow: open ? `0 0 16px ${C.accent}20` : "none",
    }}>
      <div style={{ padding: "14px 16px", textAlign: "center" }}>
        <div style={{ fontSize: 11, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>{label}</div>
        {ring !== undefined
          ? <div style={{ display: "flex", justifyContent: "center" }}><HealthRing score={ring} /></div>
          : <div style={{ fontSize: 20, fontWeight: 900, color: valueColor, letterSpacing: "-0.5px", lineHeight: 1.2 }}>{value}</div>
        }
        {sub && <div style={{ fontSize: 11, color: C.textMuted, marginTop: 3 }}>{sub}</div>}
      </div>
      <div onClick={() => setOpen(o => !o)} className="nova-expand-toggle" style={{
        borderTop: `1px solid ${open ? C.accent + "40" : C.cardBorder}`,
        padding: "7px 14px", display: "flex", alignItems: "center", justifyContent: "space-between",
        cursor: "pointer", background: open ? `${C.accent}10` : "#0D1526", transition: "all 0.18s",
      }}>
        <span style={{ fontSize: 11, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>More Info</span>
        <span style={{ fontSize: 9, color: C.accent, transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
      </div>
      {open && (
        <div style={{ padding: "12px 14px", background: "#0A0F1E", borderTop: `1px solid ${C.accent}20`, fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>
          {detail}
        </div>
      )}
    </div>
  );
}

// ── Stock Card with hover more info ──────────────────────────────────────────
function StockCard({ stock, rl, reason, profile, riskScore }) {
  const [showInfo, setShowInfo] = useState(false);

  const insights = {
    AAPL: "Apple's services segment now generates over $85B annually — making it far more than just a hardware company. A strong hold for long-term stability.",
    MSFT: "Microsoft's Azure cloud platform is growing at 28% YoY, making it one of the most compelling growth-and-stability combinations in the market.",
    GOOGL: "Alphabet controls 91% of global search — a near-monopoly that funds aggressive expansion into cloud, AI, and autonomous vehicles.",
    NVDA: "NVIDIA supplies over 80% of AI training chips globally. High growth, but valuations reflect enormous expectations — volatility is part of the deal.",
    CRM: "Salesforce's recurring revenue model means predictable cash flow — over 90% of revenue renews annually, making it unusually stable for a growth stock.",
    AMD: "AMD has taken meaningful market share from Intel and competes directly with NVIDIA in AI chips — a high-conviction play for aggressive investors.",
    JNJ: "Johnson & Johnson has raised its dividend for 61 consecutive years — one of only a handful of 'Dividend Kings' in the entire market.",
    UNH: "UnitedHealth serves over 50 million people and operates in both insurance and healthcare services — two revenue streams that complement each other well.",
    PFE: "Pfizer's post-COVID revenue has normalized, but its pipeline of 100+ drugs in development gives it significant long-term upside beyond current prices.",
    ABBV: "AbbVie's Humira patent expiration is a known risk, but its newer drugs Skyrizi and Rinvoq are already offsetting the revenue gap ahead of schedule.",
    ISRG: "Intuitive Surgical's da Vinci robot is installed in 70% of U.S. hospitals — switching costs are extremely high, creating a powerful competitive moat.",
    VEEV: "Veeva dominates cloud software for life sciences with 80%+ gross margins and nearly zero customer churn — rare metrics in the software world.",
    XOM: "ExxonMobil's acquisition of Pioneer Natural Resources added 16 billion barrels of oil reserves — the largest energy deal in over two decades.",
    CVX: "Chevron maintains one of the strongest balance sheets in Big Oil with a debt ratio well below peers — built to survive commodity price cycles.",
    NEE: "NextEra generates more wind and solar power than any other company on earth, positioning it as the utility of the clean energy transition.",
    SLB: "Schlumberger's international revenue shields it from U.S. shale cycles — over 60% of revenue comes from markets outside North America.",
    FSLR: "First Solar is the only U.S.-based solar manufacturer at scale, giving it a significant advantage under domestic content incentive programs.",
    OXY: "Warren Buffett owns over 28% of Occidental — a strong vote of confidence from the most respected long-term investor in history.",
    JPM: "JPMorgan generates more revenue than the next two largest U.S. banks combined — scale that creates significant competitive advantages.",
    BAC: "Bank of America is uniquely positioned to benefit from rising interest rates, with every 1% rate increase adding billions to net interest income.",
    "BRK.B": "Berkshire Hathaway holds $168B in cash — giving it unmatched ability to acquire businesses or stocks at distressed prices during market downturns.",
    V: "Visa processes over $14 trillion in transactions annually but takes on zero credit risk — it's a toll booth on global commerce.",
    MA: "Mastercard's international markets are growing significantly faster than domestic ones — a strong tailwind as developing economies go cashless.",
    SCHW: "After acquiring TD Ameritrade, Charles Schwab now custodies over $9 trillion in client assets — an almost unassailable position in retail brokerage.",
    DUK: "Duke Energy serves 8 million customers across six states — a regulated monopoly with guaranteed returns and almost no competitive threat.",
    SO: "Southern Company's nuclear expansion in Georgia represents the first new U.S. nuclear capacity in 30 years — a long-term clean energy asset.",
    AEP: "American Electric Power owns the largest transmission network in the U.S. — infrastructure that will be critical as EV adoption accelerates.",
    AWK: "Water utilities are among the most recession-proof businesses in existence. American Water Works has never cut its dividend in its public history.",
    WEC: "WEC Energy has delivered 20 consecutive years of dividend growth — a rare consistency that reflects the stability of its regulated operations.",
    ES: "Eversource is aggressively investing in offshore wind infrastructure across New England, positioning itself for the next decade of clean energy growth.",
    HON: "Honeywell's aerospace division benefits from a commercial aviation rebound — long-term maintenance contracts create recurring revenue for years ahead.",
    CAT: "Caterpillar's equipment is on virtually every major infrastructure project globally — government spending cycles create predictable demand waves.",
    UPS: "UPS delivers 6% of U.S. GDP daily — a staggering figure that illustrates how deeply embedded it is in the American supply chain.",
    RTX: "RTX's defense backlog exceeds $206 billion — years of guaranteed revenue that provides remarkable stability regardless of economic conditions.",
    DE: "Deere's precision agriculture technology is becoming essential for modern farming — software subscriptions are creating a recurring revenue layer.",
    GWW: "W.W. Grainger serves over 4.5 million businesses with industrial supplies — its scale and logistics network are nearly impossible to replicate.",
  };

  const insight = insights[stock.ticker] || stock.description;

  return (
    <div style={{ borderBottom: `1px solid ${C.cardBorder}` }}>
      <div style={{ padding: "18px 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontWeight: 900, fontSize: 16, color: C.accent }}>{stock.ticker}</span>
              <span style={{ fontSize: 14, color: C.textMuted }}>{stock.name}</span>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: rl.color, background: `${rl.color}18`, padding: "3px 8px", borderRadius: 6 }}>{rl.label}</span>
              {stock.dividendYield > 0 && <span style={{ fontSize: 11, fontWeight: 700, color: C.emerald, background: `${C.emerald}18`, padding: "3px 8px", borderRadius: 6 }}>{stock.dividendYield}% Dividend</span>}
              <span style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, background: "#1E2D45", padding: "3px 8px", borderRadius: 6 }}>{stock.cap}-cap</span>
            </div>
          </div>

        </div>
        <p style={{ fontSize: 13, color: C.textMuted, margin: "8px 0 10px", lineHeight: 1.5 }}>{stock.description}</p>

        {/* Why recommended */}
        <div style={{ fontSize: 13, color: C.accent, fontStyle: "italic", marginBottom: 10 }}>💡 {reason}</div>

        {/* More Info toggle */}
        <div
          onClick={() => setShowInfo(o => !o)}
          className="nova-expand-toggle"
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 700, color: showInfo ? C.accent : C.textMuted,
            background: showInfo ? `${C.accent}12` : "#0D1526",
            border: `1px solid ${showInfo ? C.accent + "50" : C.cardBorder}`,
            borderRadius: 20, padding: "5px 12px", cursor: "pointer",
            transition: "all 0.18s",
          }}
        >
          {showInfo ? "Hide" : "More Info"}
          <span style={{ fontSize: 9, transform: showInfo ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
        </div>

        {showInfo && (
          <div style={{
            marginTop: 12, padding: "14px 16px",
            background: `${C.accent}08`, border: `1px solid ${C.accent}20`,
            borderRadius: 10, fontSize: 13, color: C.textMuted, lineHeight: 1.7,
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.accent, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Analyst Insight</div>
            {insight}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: "", equity: "1000", goal: "", riskTolerance: "", timeline: "", dividendFocus: false,
    incomeStyle: "", investmentStyle: "", industries: [], avoidIndustries: [],
  });
  const [portfolio, setPortfolio] = useState(null);
  const [expandedIndustry, setExpandedIndustry] = useState(null);

  const up = (key, val) => setProfile(p => ({ ...p, [key]: val }));

  const canProceed = () => {
    if (step === 0) return profile.name.trim().length > 0;
    if (step === 1) return profile.equity && profile.goal && profile.riskTolerance && profile.timeline;
    if (step === 2) return true;
    if (step === 3) return profile.industries.length > 0;
    return true;
  };

  const next = () => {
    if (step === 3) {
      const result = buildPortfolio({ ...profile, equity: parseFloat(profile.equity) });
      setPortfolio(result);
    }
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const restart = () => { setStep(0); setProfile({ name: "", equity: "1000", goal: "", riskTolerance: "", timeline: "", dividendFocus: false, incomeStyle: "", investmentStyle: "", industries: [], avoidIndustries: [] }); setPortfolio(null); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const toggleIndustry = (ind) => {
    if (profile.industries.includes(ind)) up("industries", profile.industries.filter(i => i !== ind));
    else up("industries", [...profile.industries, ind]);
  };

  const equityNum = parseFloat(profile.equity) || 0;

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.cardBorder}`, padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34,
            background: `linear-gradient(135deg, ${C.accent}, #6366F1)`,
            borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, boxShadow: `0 0 14px ${C.accent}50`,
          }}>★</div>
          <span style={{ fontWeight: 900, fontSize: 18, letterSpacing: "-0.5px", background: `linear-gradient(90deg, #fff, ${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Nova</span>
        </div>
        {step > 0 && step < 4 && (
          <div style={{ position: "absolute", right: 32, fontSize: 13, color: C.textMuted }}>
            Building portfolio for <span style={{ color: C.accent, fontWeight: 700 }}>{profile.name}</span>
          </div>
        )}
      </div>

      {/* Progress */}
      {step < 5 && <ProgressBar step={step} />}

      {/* Content */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px 80px" }}>

        {/* ── STEP 0: Welcome ── */}
        {step === 0 && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Your Personal Portfolio Advisor</div>
            <h1 style={{ fontSize: 38, fontWeight: 900, margin: "0 0 20px", lineHeight: 1.15, letterSpacing: "-1px", maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
              Smart Investing Starts With{" "}
              <span className="animated-gradient">Knowing Yourself</span>
            </h1>
            <p style={{ color: C.textMuted, fontSize: 15, lineHeight: 1.7, maxWidth: 400, margin: "0 auto 44px" }}>
              Your goals. Your comfort. Your industries. Nova builds a portfolio around you — and explains every decision along the way.
            </p>

            {/* Name input centered */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, maxWidth: 380, margin: "0 auto 36px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>What's your full name?</div>
              <StyledInput value={profile.name} onChange={e => up("name", e.target.value)} placeholder="Enter your full name" />
            </div>

            {/* Feature pills with dropdowns */}
            <FeaturePills />

            <NavBtn onClick={next} disabled={!canProceed()}>Get Started</NavBtn>

            {/* Nova logo mark at bottom */}
            <div style={{ marginTop: 52, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 52, height: 52,
                background: `linear-gradient(135deg, ${C.accent}, #6366F1)`,
                borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, boxShadow: `0 0 24px ${C.accent}40`,
              }}>★</div>
              <span style={{
                fontWeight: 900, fontSize: 20, letterSpacing: "-0.5px",
                background: `linear-gradient(90deg, #fff, ${C.accent})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Nova</span>
              <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: 2, textTransform: "uppercase" }}>Portfolio Intelligence</div>
            </div>
          </div>
        )}

        {/* ── STEP 1: Financial Profile ── */}
        {step === 1 && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Stage 1 — Financial Profile</div>
              <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.5px" }}>Tell Us About Your Situation, <span className="animated-gradient">{profile.name.split(" ")[0]}</span></h2>
              <p style={{ color: C.textMuted, fontSize: 15, margin: 0, lineHeight: 1.6 }}>Your starting point shapes everything. No judgment — just honesty.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Equity Slider */}
              <div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>How Much Are You Looking to Invest?</label>
                <div style={{ background: C.card, border: `1.5px solid ${C.cardBorder}`, borderRadius: 14, padding: "24px 24px 20px" }}>
                  {/* Amount display */}
                  <div style={{ textAlign: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: "-1px", background: `linear-gradient(90deg, ${C.accent}, ${C.emerald})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      ${Number(profile.equity || 1000).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 13, color: C.textMuted, marginTop: 6, lineHeight: 1.5 }}>
                      {equityNum < 5000 ? "We'll focus on a small, concentrated set of strong picks to make the most of your starting capital." :
                       equityNum < 15000 ? "A solid foundation — we'll spread across a few industries with 2–3 picks each." :
                       equityNum < 50000 ? "Great range for diversification — expect broader industry coverage with more picks per sector." :
                       equityNum < 150000 ? "Strong portfolio size — we'll build a well-rounded multi-industry strategy with depth in each sector." :
                       "Full portfolio potential — maximum diversification across all industries with top picks in every sector."}
                    </div>
                  </div>

                  {/* Slider */}
                  <style>{`
                    .equity-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 3px; outline: none; cursor: pointer; background: linear-gradient(90deg, #3B82F6 0%, #3B82F6 ${((Math.log(Number(profile.equity || 1000)) - Math.log(1000)) / (Math.log(500000) - Math.log(1000))) * 100}%, #1E2D45 ${((Math.log(Number(profile.equity || 1000)) - Math.log(1000)) / (Math.log(500000) - Math.log(1000))) * 100}%, #1E2D45 100%); }
                    .equity-slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #6366F1); border: 2px solid #fff; box-shadow: 0 0 12px #3B82F650; cursor: pointer; transition: transform 0.15s; }
                    .equity-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
                    .equity-slider::-moz-range-thumb { width: 22px; height: 22px; border-radius: 50%; background: linear-gradient(135deg, #3B82F6, #6366F1); border: 2px solid #fff; cursor: pointer; }
                  `}</style>
                  <input
                    type="range"
                    className="equity-slider"
                    min={0}
                    max={1}
                    step={0.001}
                    value={(Math.log(Number(profile.equity || 1000)) - Math.log(1000)) / (Math.log(500000) - Math.log(1000))}
                    onChange={e => {
                      const logVal = Math.log(1000) + parseFloat(e.target.value) * (Math.log(500000) - Math.log(1000));
                      const rounded = Math.round(Math.exp(logVal) / 500) * 500;
                      up("equity", Math.max(1000, Math.min(500000, rounded)).toString());
                    }}
                  />

                  {/* Range labels */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                    {["$1K", "$5K", "$25K", "$100K", "$500K"].map(l => (
                      <span key={l} style={{ fontSize: 11, color: C.textSubtle }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Why we ask — equity */}
              <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}28`, borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>✦ Why We Ask This</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Your investable equity determines how many stocks we recommend and how broadly we can diversify your portfolio. A smaller starting amount calls for a focused, concentrated strategy — a larger one allows for more breadth.</div>
              </div>

              {/* Goal + Income Style (merged) */}
              <div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 15 }}>What's Your Primary Investment Goal?</label>
                {(() => {
                  const disabledGoalsByRisk = {
                    conservative: ["growth"],
                    aggressive: ["retirement"],
                    moderate: [],
                  };
                  const goalDisabledReasons = {
                    growth: { conservative: "Conservative risk tolerance filters out the high-growth stocks needed to achieve this goal — the two work against each other." },
                    retirement: { aggressive: "Retirement planning requires capital preservation — an aggressive risk profile is too volatile for a retirement-focused portfolio." },
                  };
                  const disabledGoals = disabledGoalsByRisk[profile.riskTolerance] || [];
                  return (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[
                        { val: "growth", label: "Long-Term Growth", sub: "Maximize appreciation", color: C.accent, detail: "Your portfolio will favor high-growth stocks with strong upside potential. Expect higher volatility in exchange for greater long-term returns. Best paired with an aggressive or moderate risk tolerance and a long timeline." },
                        { val: "income", label: "Passive Income", sub: "Prioritize dividend payments", color: C.emerald, detail: "We'll build your portfolio around stocks with strong, reliable dividend yields — companies that pay you regularly just for holding shares. Every pick will carry a dividend, generating steady cash flow without selling positions." },
                        { val: "retirement", label: "Retirement", sub: "Stable, secure future", color: "#8B5CF6", detail: "Your portfolio will lean toward stable, established companies with lower volatility and reliable performance. The goal is capital preservation and steady growth — protecting what you've built while still moving forward." },
                        { val: "balanced", label: "Balanced", sub: "Growth + income mix", color: C.amber, detail: "A blend of growth-oriented and dividend-paying stocks. You get the upside of market appreciation alongside regular income — a well-rounded strategy suited for most beginner investors." },
                      ].map(o => {
                        const isDisabled = disabledGoals.includes(o.val);
                        const reason = goalDisabledReasons[o.val]?.[profile.riskTolerance];
                        return (
                          <div key={o.val} style={{ position: "relative" }}>
                            <div style={{
                              background: isDisabled ? "#0D1526" : profile.goal === o.val ? `${o.color}18` : C.card,
                              border: `1.5px solid ${isDisabled ? "#1a2233" : profile.goal === o.val ? o.color : C.cardBorder}`,
                              borderRadius: 12, padding: "16px 20px",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              opacity: isDisabled ? 0.4 : 1,
                              transition: "all 0.18s",
                              boxShadow: profile.goal === o.val && !isDisabled ? `0 0 16px ${o.color}30` : "none",
                            }} onClick={() => {
                              if (isDisabled) return;
                              const disabledTimelinesByGoal = { growth: ["short"], income: ["long"], retirement: ["short"], balanced: [] };
                              const newDisabledTimelines = disabledTimelinesByGoal[o.val] || [];
                              up("goal", o.val);
                              up("dividendFocus", o.val === "income");
                              up("incomeStyle", o.val === "income" ? "income" : o.val === "growth" ? "growth" : "blend");
                              if (profile.timeline && newDisabledTimelines.includes(profile.timeline)) up("timeline", "");
                            }}>
                              <div style={{ fontWeight: 700, color: isDisabled ? C.textSubtle : profile.goal === o.val ? o.color : C.text, fontSize: 15 }}>{o.label}</div>
                              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{o.sub}</div>
                              {isDisabled && profile.riskTolerance && (
                                <div style={{ fontSize: 11, color: C.red, marginTop: 6, lineHeight: 1.4 }}>✕ Not compatible with your risk tolerance</div>
                              )}
                            </div>
                            {isDisabled && reason && (
                              <div style={{ marginTop: 6, padding: "10px 12px", background: `${C.red}10`, border: `1px solid ${C.red}25`, borderRadius: 8, fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
                                {reason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Risk */}
              <div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 15 }}>How Comfortable Are You With Risk?</label>
                {(() => {
                  const disabledRiskByGoal = { growth: ["conservative"], retirement: ["aggressive"], income: [], balanced: [] };
                  const disabledRiskByTimeline = { short: ["aggressive"], long: ["conservative"], medium: [] };
                  const fromGoal = disabledRiskByGoal[profile.goal] || [];
                  const fromTimeline = disabledRiskByTimeline[profile.timeline] || [];
                  const disabledRisks = [...new Set([...fromGoal, ...fromTimeline])];
                  const riskDisabledReasons = {
                    conservative: {
                      growth: "Conservative filtering removes the high-growth stocks your goal depends on.",
                      long: "A 10+ year horizon gives your portfolio time to recover from volatility — conservative picks will significantly underperform over this period.",
                    },
                    aggressive: {
                      retirement: "High volatility is incompatible with the capital preservation that retirement planning requires.",
                      short: "Aggressive picks can drop sharply in the short term — with only 1–3 years, there's no time to recover from a downturn.",
                    },
                  };
                  const getRiskReason = (val) => riskDisabledReasons[val]?.[profile.goal] || riskDisabledReasons[val]?.[profile.timeline];
                  return (
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {[
                        { val: "conservative", label: "Conservative", sub: "I prefer stability. Slow and steady is fine with me.", color: C.emerald, detail: "We'll stick to large-cap, low-volatility stocks with proven track records — think established household names. Your portfolio won't swing dramatically, but it will grow steadily and reliably over time." },
                        { val: "moderate", label: "Moderate", sub: "I'm okay with some ups and downs for better returns.", color: C.amber, detail: "A mix of stable blue-chip stocks and select growth opportunities. You'll experience some market fluctuation, but your portfolio is built to recover and grow — balancing protection with upside." },
                        { val: "aggressive", label: "Aggressive", sub: "I can handle big swings. I'm chasing maximum growth.", color: C.red, detail: "Your portfolio will include high-growth stocks with significant upside — and higher short-term volatility. This approach is best suited for investors with a long timeline who won't panic during market dips." },
                      ].map(o => {
                        const isDisabled = disabledRisks.includes(o.val);
                        const reason = getRiskReason(o.val);
                        return (
                          <div key={o.val} style={{ position: "relative" }}>
                            <div style={{
                              background: isDisabled ? "#0D1526" : profile.riskTolerance === o.val ? `${o.color}18` : C.card,
                              border: `1.5px solid ${isDisabled ? "#1a2233" : profile.riskTolerance === o.val ? o.color : C.cardBorder}`,
                              borderRadius: 12, padding: "16px 20px",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              opacity: isDisabled ? 0.4 : 1,
                              transition: "all 0.18s",
                              boxShadow: profile.riskTolerance === o.val && !isDisabled ? `0 0 16px ${o.color}30` : "none",
                            }} onClick={() => {
                              if (isDisabled) return;
                              const disabledGoalsByRisk = { conservative: ["growth"], aggressive: ["retirement"], moderate: [] };
                              const newDisabledGoals = disabledGoalsByRisk[o.val] || [];
                              up("riskTolerance", o.val);
                              if (profile.goal && newDisabledGoals.includes(profile.goal)) {
                                up("goal", "");
                                up("dividendFocus", false);
                                up("incomeStyle", "");
                              }
                            }}>
                              <div style={{ fontWeight: 700, color: isDisabled ? C.textSubtle : profile.riskTolerance === o.val ? o.color : C.text, fontSize: 15 }}>{o.label}</div>
                              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{o.sub}</div>
                              {isDisabled && (profile.goal || profile.timeline) && (
                                <div style={{ fontSize: 11, color: C.red, marginTop: 6, lineHeight: 1.4 }}>✕ Not compatible with your {profile.goal && fromGoal.includes(o.val) ? "goal" : "timeline"}</div>
                              )}
                            </div>
                            {isDisabled && reason && (
                              <div style={{ marginTop: 6, padding: "10px 12px", background: `${C.red}10`, border: `1px solid ${C.red}25`, borderRadius: 8, fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
                                {reason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Why we ask — risk */}
              <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}28`, borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>✦ Why We Ask This</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Risk tolerance is the single most important factor in portfolio construction. It determines which stocks are suitable for you — and prevents us from recommending investments that could cause unnecessary stress or financial harm.</div>
              </div>

              {/* Timeline */}
              <div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 15 }}>What's Your Investment Timeline?</label>
                {(() => {
                  const disabledByGoal = { growth: ["short"], income: ["long"], retirement: ["short"], balanced: [] };
                  const disabledByRisk = { aggressive: ["short"], conservative: ["long"], moderate: [] };
                  const fromGoal = disabledByGoal[profile.goal] || [];
                  const fromRisk = disabledByRisk[profile.riskTolerance] || [];
                  const disabled = [...new Set([...fromGoal, ...fromRisk])];
                  const disabledReasons = {
                    short: {
                      growth: "Long-Term Growth requires time to compound — a 1–3 year window isn't enough to realize meaningful appreciation.",
                      retirement: "Retirement planning needs a longer runway to build and preserve wealth effectively.",
                      aggressive: "Aggressive picks can drop sharply in the short term — with only 1–3 years, there's no time to recover from a downturn.",
                    },
                    long: {
                      income: "Passive Income strategies focus on near-term dividend cash flow — a 10+ year horizon is better suited to a growth goal.",
                      conservative: "A 10+ year horizon gives your portfolio time to absorb volatility — conservative picks will significantly underperform over this period.",
                    },
                  };
                  const getReason = (val) => disabledReasons[val]?.[profile.goal] || disabledReasons[val]?.[profile.riskTolerance];
                  const getConflictLabel = (val) => {
                    if (fromGoal.includes(val) && fromRisk.includes(val)) return "goal and risk tolerance";
                    if (fromGoal.includes(val)) return "goal";
                    return "risk tolerance";
                  };
                  return (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                      {[
                        { val: "short", label: "Short Term", sub: "1–3 years" },
                        { val: "medium", label: "Medium Term", sub: "3–10 years" },
                        { val: "long", label: "Long Term", sub: "10+ years" },
                      ].map(o => {
                        const isDisabled = disabled.includes(o.val);
                        const reason = getReason(o.val);
                        return (
                          <div key={o.val} style={{ position: "relative" }}>
                            <div style={{
                              background: isDisabled ? "#0D1526" : profile.timeline === o.val ? `${C.accent}18` : C.card,
                              border: `1.5px solid ${isDisabled ? "#1a2233" : profile.timeline === o.val ? C.accent : C.cardBorder}`,
                              borderRadius: 12, padding: "16px 20px",
                              cursor: isDisabled ? "not-allowed" : "pointer",
                              opacity: isDisabled ? 0.4 : 1,
                              transition: "all 0.18s",
                              boxShadow: profile.timeline === o.val && !isDisabled ? `0 0 16px ${C.accent}30` : "none",
                            }} onClick={() => {
                              if (isDisabled) return;
                              up("timeline", o.val);
                              // clear risk if newly incompatible
                              const disabledRiskByTimeline = { short: ["aggressive"], long: ["conservative"], medium: [] };
                              const newDisabledRisks = disabledRiskByTimeline[o.val] || [];
                              if (profile.riskTolerance && newDisabledRisks.includes(profile.riskTolerance)) up("riskTolerance", "");
                            }}>
                              <div style={{ fontWeight: 700, color: isDisabled ? C.textSubtle : profile.timeline === o.val ? C.accent : C.text, fontSize: 15 }}>{o.label}</div>
                              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{o.sub}</div>
                              {isDisabled && (profile.goal || profile.riskTolerance) && (
                                <div style={{ fontSize: 11, color: C.red, marginTop: 6, lineHeight: 1.4 }}>✕ Not compatible with your {getConflictLabel(o.val)}</div>
                              )}
                            </div>
                            {isDisabled && reason && (
                              <div style={{ marginTop: 6, padding: "10px 12px", background: `${C.red}10`, border: `1px solid ${C.red}25`, borderRadius: 8, fontSize: 11, color: C.textMuted, lineHeight: 1.5 }}>
                                {reason}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Why we ask — timeline */}
              <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}28`, borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>✦ Why We Ask This</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Your timeline directly affects how much risk is appropriate. A longer horizon allows for more aggressive growth strategies — a shorter one calls for stability and capital preservation.</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <NavBtn onClick={back} secondary>Back</NavBtn>
              <NavBtn onClick={next} disabled={!canProceed()}>Continue</NavBtn>
            </div>
          </div>
        )}

        {/* ── STEP 2: Preferences ── */}
        {step === 2 && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Stage 2 — Investment Preferences</div>
              <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.5px" }}>What Matters Most to You, <span className="animated-gradient">{profile.name.split(" ")[0]}</span></h2>
              <p style={{ color: C.textMuted, fontSize: 15, margin: 0, lineHeight: 1.6 }}>These preferences shape how we filter and rank every recommendation.</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

              {/* Investment Style */}
              <div>
                <label style={{ display: "block", fontWeight: 700, marginBottom: 10, fontSize: 15 }}>How Hands-On Do You Want to Be?</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    {
                      val: "active", label: "Active", sub: "I'll monitor and adjust regularly", color: C.amber,
                      detail: "You're comfortable checking your portfolio often and making adjustments as the market shifts. We'll include some higher-volatility picks with greater upside that reward active attention.",
                    },
                    {
                      val: "passive", label: "Passive", sub: "Set it and forget it", color: C.emerald,
                      detail: "You want a portfolio you can build and leave alone. We'll favor stable, established companies that don't require frequent monitoring — steady performers that hold value over time without constant management.",
                    },
                  ].map(o => <ExpandableOptionCard key={o.val} {...o} selected={profile.investmentStyle === o.val} onClick={() => up("investmentStyle", o.val)} />)}
                </div>
              </div>

              {/* Why we ask — investment style */}
              <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}28`, borderRadius: 12, padding: "13px 16px" }}>
                <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>✦ Why We Ask This</div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Active investors can tolerate more volatility because they're watching and reacting. Passive investors need picks that hold value on their own — this tells us how much maintenance your portfolio should require.</div>
              </div>

            </div>

            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              <NavBtn onClick={back} secondary>Back</NavBtn>
              <NavBtn onClick={next}>Continue</NavBtn>
            </div>
          </div>
        )}

        {/* ── STEP 3: Industries ── */}
        {step === 3 && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, marginBottom: 10 }}>Stage 3 — Industry Preferences</div>
              <h2 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.5px" }}><span className="animated-gradient">Which Industries Excite You</span></h2>
              <p style={{ color: C.textMuted, fontSize: 15, margin: 0, lineHeight: 1.6 }}>Select the sectors that align with your vision. Your choices shape a portfolio built around your convictions.</p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
              {ALL_INDUSTRIES.map(ind => {
                const selected = profile.industries.includes(ind);
                const color = INDUSTRY_COLORS[ind];

                const icons = {
                  Technology: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                    </svg>
                  ),
                  Healthcare: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 8v8M8 12h8"/>
                    </svg>
                  ),
                  Energy: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                    </svg>
                  ),
                  Financials: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  ),
                  Utilities: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                    </svg>
                  ),
                  Industrials: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={selected ? color : "#94A3B8"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v5M8 12v5M16 12v5"/>
                    </svg>
                  ),
                };

                const descriptions = {
                  Technology: "Software, chips, AI & cloud",
                  Healthcare: "Pharma, biotech & insurance",
                  Energy: "Oil, gas & renewables",
                  Financials: "Banks, payments & insurance",
                  Utilities: "Electric, water & gas",
                  Industrials: "Manufacturing & logistics",
                };

                return (
                  <div key={ind} style={{
                    background: selected ? `${color}18` : C.card,
                    border: `2px solid ${selected ? color : C.cardBorder}`,
                    borderRadius: 14, overflow: "hidden",
                    boxShadow: selected ? `0 0 20px ${color}30` : "none",
                    transition: "all 0.18s",
                  }} className="nova-industry-card">
                    {/* Main card click area */}
                    <div onClick={() => toggleIndustry(ind)} style={{ padding: "16px 18px", cursor: "pointer" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                        {icons[ind]}
                        <span style={{ fontWeight: 800, fontSize: 15, color: selected ? color : C.text }}>{ind}</span>
                        {selected && <span style={{ marginLeft: "auto", background: color, color: "#fff", borderRadius: 6, padding: "2px 8px", fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>✓ SELECTED</span>}
                      </div>
                      <div style={{ fontSize: 12, color: C.textMuted }}>{descriptions[ind]}</div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Sector Avoidance */}
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontWeight: 700, marginBottom: 6, fontSize: 15 }}>Any Industries to Avoid?</label>
              <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 12, lineHeight: 1.5 }}>Optional — flag any sectors you'd like excluded from your portfolio entirely.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {ALL_INDUSTRIES.filter(ind => !profile.industries.includes(ind)).map(ind => {
                  const avoided = profile.avoidIndustries.includes(ind);
                  const avoidIcons = {
                    Technology: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                      </svg>
                    ),
                    Healthcare: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M12 8v8M8 12h8"/>
                      </svg>
                    ),
                    Energy: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                      </svg>
                    ),
                    Financials: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    ),
                    Utilities: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                      </svg>
                    ),
                    Industrials: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={avoided ? C.red : "#475569"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M12 12v5M8 12v5M16 12v5"/>
                      </svg>
                    ),
                  };
                  return (
                    <div key={ind} onClick={() => {
                      if (avoided) up("avoidIndustries", profile.avoidIndustries.filter(i => i !== ind));
                      else up("avoidIndustries", [...profile.avoidIndustries, ind]);
                    }} className="nova-industry-card" style={{
                      background: avoided ? `${C.red}12` : C.card,
                      border: `1.5px solid ${avoided ? C.red : C.cardBorder}`,
                      borderRadius: 12, padding: "14px 18px", cursor: "pointer",
                      boxShadow: avoided ? `0 0 14px ${C.red}25` : "none",
                      display: "flex", alignItems: "center", gap: 10,
                    }}>
                      {avoidIcons[ind]}
                      <span style={{ fontWeight: 700, fontSize: 14, color: avoided ? C.red : C.text }}>{ind}</span>
                      {avoided && (
                        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.red }}>Excluded</span>
                        </span>
                      )}
                    </div>
                  );
                })}
                {ALL_INDUSTRIES.filter(ind => !profile.industries.includes(ind)).length === 0 && (
                  <div style={{ gridColumn: "1 / -1", fontSize: 13, color: C.textMuted, fontStyle: "italic", padding: "10px 0" }}>
                    You've selected all industries as preferred — no exclusions available.
                  </div>
                )}
              </div>
            </div>

            {/* Live allocation preview */}
            {profile.industries.length > 0 && (
              <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
                <style>{`
                  @keyframes shimmer {
                    0%   { opacity: 1; filter: drop-shadow(0 0 3px #F59E0B); }
                    50%  { opacity: 0.6; filter: drop-shadow(0 0 8px #FCD34D); }
                    100% { opacity: 1; filter: drop-shadow(0 0 3px #F59E0B); }
                  }
                  .gold-star { animation: shimmer 2s ease-in-out infinite; }
                `}</style>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: C.textMuted, textTransform: "uppercase", letterSpacing: 1 }}>Live Allocation Preview</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.textMuted }}>
                    <span className="gold-star" style={{ color: "#F59E0B", fontSize: 13 }}>★</span>
                    <span>= Preferred Industry</span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                  <DonutChart allocations={(() => {
                    const pref = profile.industries;
                    const avoided = profile.avoidIndustries || [];
                    const others = ALL_INDUSTRIES.filter(i => !pref.includes(i) && !avoided.includes(i)).slice(0, Math.max(0, 6 - pref.length));
                    const all = [...pref, ...others];
                    const getConv = (i) => profile.industryWeights?.[i] ?? 50;
                    const totalConv = pref.reduce((s, i) => s + getConv(i), 0) || 1;
                    const othW = others.length ? 30 / others.length : 0;
                    const raw = {};
                    all.forEach(i => { raw[i] = pref.includes(i) ? (getConv(i) / totalConv) * 70 : othW; });
                    const tot = Object.values(raw).reduce((a, b) => a + b, 0);
                    const norm = {};
                    all.forEach(i => { norm[i] = Math.round((raw[i] / tot) * 100); });
                    return norm;
                  })()} />
                  <div style={{ flex: 1 }}>
                    {[...profile.industries, ...ALL_INDUSTRIES.filter(i => !profile.industries.includes(i) && !profile.avoidIndustries.includes(i)).slice(0, Math.max(0, 6 - profile.industries.length))].map(ind => {
                      const isPref = profile.industries.includes(ind);
                      return (
                        <div key={ind} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: INDUSTRY_COLORS[ind], flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: isPref ? C.text : C.textMuted, fontWeight: isPref ? 700 : 400 }}>{ind}</span>
                          {isPref && <span className="gold-star" style={{ color: "#F59E0B", fontSize: 14, marginLeft: "auto" }}>★</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Why we ask — industries */}
            <div style={{ background: `${C.accent}10`, border: `1px solid ${C.accent}28`, borderRadius: 12, padding: "13px 16px", marginBottom: 24 }}>
              <div style={{ fontSize: 12, color: C.accent, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>✦ Why We Ask This</div>
              <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6 }}>Your industry preferences tell us where your conviction lies. We weight your portfolio toward the sectors you believe in — while still maintaining diversification across others to protect your investment.</div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <NavBtn onClick={back} secondary>Back</NavBtn>
              <NavBtn onClick={next} disabled={!canProceed()}>Build My Portfolio</NavBtn>
            </div>
          </div>
        )}

        {/* ── STEP 4: Results ── */}
        {step === 4 && portfolio && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 13, color: C.emerald, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10 }}>✓ Portfolio Complete</div>
              <h2 style={{ fontSize: 34, fontWeight: 900, margin: "0 0 10px", letterSpacing: "-0.5px" }}>Your Personalized Portfolio, <span className="animated-gradient">{profile.name.split(" ")[0]}</span></h2>
              <p style={{ color: C.textMuted, fontSize: 15 }}>Built around your goals, risk tolerance, and preferred industries.</p>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 16 }}>
              {/* Investment Card */}
              <SummaryCard
                label="Total Investment"
                value={`$${parseFloat(profile.equity).toLocaleString()}`}
                valueColor={C.accent}
                detail={`You're starting with $${parseFloat(profile.equity).toLocaleString()} — ${parseFloat(profile.equity) < 5000 ? "a focused, concentrated portfolio that makes every dollar count." : parseFloat(profile.equity) < 50000 ? "a solid foundation that allows meaningful diversification across multiple industries." : "a substantial base that supports a fully diversified, multi-industry portfolio with depth in every sector."}`}
              />
              {/* Return Card */}
              <SummaryCard
                label="Est. Annual Return"
                value={`${portfolio.returnRange.low}–${portfolio.returnRange.high}%`}
                valueColor={C.emerald}
                sub={portfolio.returnRange.label}
                detail={`Based on your ${profile.riskTolerance} risk profile and ${profile.timeline}-term timeline, your portfolio targets an estimated annual return of ${portfolio.returnRange.low}–${portfolio.returnRange.high}%. This range reflects historical sector averages — actual returns will vary with market conditions. ${profile.dividendFocus ? "Dividend income is included in this estimate." : "This reflects price appreciation rather than dividend income."}`}
              />
              {/* Health Card */}
              <SummaryCard
                label="Portfolio Health"
                value={null}
                ring={portfolio.healthScore}
                detail={`Your portfolio health score of ${portfolio.healthScore} reflects how well-structured your portfolio is based on diversification, risk alignment, and timeline suitability. ${portfolio.healthScore >= 80 ? "Your portfolio is excellently balanced — strong diversification with a risk profile that matches your stated comfort level." : portfolio.healthScore >= 60 ? "Your portfolio is in good shape with minor areas to consider — diversifying across more industries could improve this score." : "Consider broadening your industry selections or adjusting your risk preference to improve portfolio balance."}`}
              />
            </div>

            {/* Additional Summary Info Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 32 }}>
              <SummaryCard
                label="Risk Profile"
                value={profile.riskTolerance.charAt(0).toUpperCase() + profile.riskTolerance.slice(1)}
                valueColor={profile.riskTolerance === "conservative" ? C.emerald : profile.riskTolerance === "moderate" ? C.amber : C.red}
                detail={`A ${profile.riskTolerance} profile means ${profile.riskTolerance === "conservative" ? "your portfolio prioritizes capital preservation — favoring large-cap, low-volatility stocks with proven track records. Less upside, but far less downside." : profile.riskTolerance === "moderate" ? "your portfolio balances growth and stability — a blend of established blue-chips and select growth opportunities. Some market fluctuation is expected and manageable." : "your portfolio leans into high-growth opportunities — expect more short-term volatility in exchange for greater long-term upside. Best suited for investors with a long horizon."}`}
              />
              <SummaryCard
                label="Investment Timeline"
                value={profile.timeline === "short" ? "1–3 Years" : profile.timeline === "medium" ? "3–10 Years" : "10+ Years"}
                valueColor={C.accent}
                detail={`A ${profile.timeline}-term horizon ${profile.timeline === "short" ? "means capital preservation is the priority. Your portfolio avoids high-volatility picks that could dip right when you need the funds." : profile.timeline === "medium" ? "gives your portfolio time to recover from short-term market dips while still targeting meaningful compounding returns." : "is the most powerful investing advantage you have. Long timelines allow compounding to work in your favor — short-term market swings become far less relevant."}`}
              />
              <SummaryCard
                label="Investment Goal"
                value={profile.goal === "growth" ? "Long-Term Growth" : profile.goal === "income" ? "Passive Income" : profile.goal === "retirement" ? "Retirement" : "Balanced"}
                valueColor={"#8B5CF6"}
                detail={`Your ${profile.goal} goal shaped the entire stock selection process. ${profile.goal === "growth" ? "Growth-focused portfolios favor companies reinvesting earnings into expansion — higher upside, with volatility as the trade-off." : profile.goal === "income" ? "Income portfolios lean on dividend-paying stocks that generate regular cash flow — rewarding you for simply holding your positions." : profile.goal === "retirement" ? "Retirement portfolios prioritize stability and steady appreciation — protecting your wealth while still growing toward your future." : "A balanced approach gives you both appreciation potential and income generation — a well-rounded strategy suited for most beginner investors."}`}
              />
              <SummaryCard
                label="Income Style"
                value={profile.incomeStyle === "growth" ? "Pure Growth" : profile.incomeStyle === "income" ? "Income First" : profile.incomeStyle === "blend" ? "Balanced Blend" : "Not Specified"}
                valueColor={C.emerald}
                detail={`Your income style preference filtered how stocks were ranked within each industry. ${profile.incomeStyle === "growth" ? "Stocks were ranked by growth potential — dividend yield was secondary to appreciation." : profile.incomeStyle === "income" ? "Stocks were ranked by dividend yield first — ensuring your portfolio generates regular income." : "Stocks were selected for a balance of growth and income — combining appreciation potential with dividend reliability."}`}
              />
            </div>

            {/* Allocation + Donut */}
            <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, padding: "24px", marginBottom: 24 }}>
              <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 20 }}>Industry Allocation</div>
              <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                <DonutChart allocations={portfolio.allocationMap} />
                <div style={{ flex: 1 }}>
                  {Object.entries(portfolio.allocationMap).map(([ind, pct]) => (
                    <div key={ind} style={{ marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                          <div style={{ width: 10, height: 10, borderRadius: 3, background: INDUSTRY_COLORS[ind] }} />
                          {ind}
                          {profile.industries.includes(ind) && <span className="gold-star" style={{ color: "#F59E0B", fontSize: 12 }}>★</span>}
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 800, color: INDUSTRY_COLORS[ind] }}>{pct}%</span>
                      </div>
                      <div style={{ height: 6, background: "#1E2D45", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: INDUSTRY_COLORS[ind], borderRadius: 3, transition: "width 0.8s ease" }} />
                      </div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>
                        ${Math.round(parseFloat(profile.equity) * pct / 100).toLocaleString()} allocated
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stock Picks */}
            <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 16 }}>Stock Recommendations</div>
            {Object.entries(portfolio.stockPicks).map(([ind, stocks]) => (
              <div key={ind} style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 16, marginBottom: 16, overflow: "hidden" }}>
                <div onClick={() => setExpandedIndustry(expandedIndustry === ind ? null : ind)}
                  className="nova-stock-row"
                  style={{ padding: "18px 24px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: expandedIndustry === ind ? `1px solid ${C.cardBorder}` : "none", transition: "background 0.18s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 12, height: 12, borderRadius: 4, background: INDUSTRY_COLORS[ind] }} />
                    <span style={{ fontWeight: 800, fontSize: 15 }}>{ind}</span>
                    <span style={{ fontSize: 12, color: C.textMuted }}>{stocks.length} picks · {portfolio.allocationMap[ind]}% allocation</span>
                  </div>
                  <span style={{ color: C.textMuted, fontSize: 18 }}>{expandedIndustry === ind ? "▾" : "▸"}</span>
                </div>
                {expandedIndustry === ind && stocks.map(stock => {
                  const rl = getRiskLabel(stock.risk);
                  const reason = getRecommendationReason(stock, profile, portfolio.riskScore);
                  return (
                    <StockCard
                      key={stock.ticker}
                      stock={stock}
                      rl={rl}
                      reason={reason}
                      profile={profile}
                      riskScore={portfolio.riskScore}
                    />
                  );
                })}
              </div>
            ))}

            {/* Disclaimer */}
            <div style={{ background: `${C.amber}10`, border: `1px solid ${C.amber}30`, borderRadius: 12, padding: "14px 18px", marginBottom: 28 }}>
              <div style={{ fontSize: 13, color: C.amber, fontWeight: 700, marginBottom: 4 }}>⚠ Important Disclaimer</div>
              <div style={{ fontSize: 12, color: C.textMuted, lineHeight: 1.6 }}>This tool is for educational and informational purposes only. It does not constitute financial advice. Past performance is not indicative of future results. Always consult a licensed financial advisor before making investment decisions. Estimated return ranges are based on historical sector averages and are not guaranteed.</div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 52 }}>
              <NavBtn onClick={restart} secondary>Start Over</NavBtn>
              <NavBtn onClick={() => {
                const lines = [
                  `NOVA — Personalized Portfolio Report`,
                  `Generated for: ${profile.name}`,
                  `Date: ${new Date().toLocaleDateString()}`,
                  ``,
                  `── PROFILE SUMMARY ──`,
                  `Investment: $${parseFloat(profile.equity).toLocaleString()}`,
                  `Goal: ${profile.goal}`,
                  `Risk Tolerance: ${profile.riskTolerance}`,
                  `Timeline: ${profile.timeline}`,
                  `Investment Style: ${profile.investmentStyle || "Not specified"}`,
                  ``,
                  `── PORTFOLIO HEALTH ──`,
                  `Health Score: ${portfolio.healthScore}/100`,
                  `Est. Annual Return: ${portfolio.returnRange.low}–${portfolio.returnRange.high}%`,
                  ``,
                  `── INDUSTRY ALLOCATION ──`,
                  ...Object.entries(portfolio.allocationMap).map(([ind, pct]) =>
                    `${ind}: ${pct}% ($${Math.round(parseFloat(profile.equity) * pct / 100).toLocaleString()})`
                  ),
                  ``,
                  `── STOCK RECOMMENDATIONS ──`,
                  ...Object.entries(portfolio.stockPicks).flatMap(([ind, stocks]) => [
                    ``,
                    `${ind}:`,
                    ...stocks.map(s => `  ${s.ticker} — ${s.name} | Risk: ${s.risk} | Dividend: ${s.dividendYield}%`)
                  ]),
                  ``,
                  `── DISCLAIMER ──`,
                  `This report is for educational purposes only and does not constitute financial advice.`,
                  `Always consult a licensed financial advisor before making investment decisions.`,
                ];
                const blob = new Blob([lines.join("\n")], { type: "text/plain" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `Nova_Portfolio_${profile.name.replace(" ", "_")}.txt`;
                a.click();
                URL.revokeObjectURL(url);
              }}>Download Report</NavBtn>
            </div>

            {/* Nova footer */}
            <div style={{ textAlign: "center", paddingBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 44, height: 44,
                  background: `linear-gradient(135deg, ${C.accent}, #6366F1)`,
                  borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, boxShadow: `0 0 20px ${C.accent}35`,
                }}>★</div>
                <span style={{
                  fontWeight: 900, fontSize: 18, letterSpacing: "-0.5px",
                  background: `linear-gradient(90deg, #fff, ${C.accent})`,
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                }}>Nova</span>
                <div style={{ fontSize: 11, color: C.textSubtle, letterSpacing: 2, textTransform: "uppercase" }}>Portfolio Intelligence</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
