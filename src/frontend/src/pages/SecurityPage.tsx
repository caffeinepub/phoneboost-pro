import { useAddScanHistory } from "@/hooks/useQueries";
import {
  AlertTriangle,
  CheckCircle,
  Cpu,
  Eye,
  Lock,
  Shield,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const checks = [
  {
    icon: Lock,
    label: "App Permissions",
    status: "warn",
    detail: "3 apps with excessive permissions",
  },
  {
    icon: Wifi,
    label: "Network Security",
    status: "ok",
    detail: "Connection is secure",
  },
  {
    icon: ShieldCheck,
    label: "Malware Scan",
    status: "ok",
    detail: "No threats detected",
  },
  {
    icon: Eye,
    label: "Privacy",
    status: "warn",
    detail: "2 privacy issues found",
  },
  {
    icon: Cpu,
    label: "System Integrity",
    status: "ok",
    detail: "System files are intact",
  },
];

export function SecurityPage() {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [fixing, setFixing] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [score, setScore] = useState(85);

  const addScanHistory = useAddScanHistory();

  const handleScan = () => {
    if (scanning || scanned) return;
    setScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanning(false);
          setScanned(true);
          addScanHistory.mutate({
            itemsCleaned: BigInt(5),
            date: BigInt(Date.now() * 1_000_000),
            mbFreed: BigInt(0),
          });
          return 100;
        }
        return p + 5;
      });
    }, 120);
  };

  const handleFix = () => {
    if (fixing || fixed) return;
    setFixing(true);
    setTimeout(() => {
      setFixing(false);
      setFixed(true);
      setScore(98);
    }, 2000);
  };

  const circ = 2 * Math.PI * 55;
  const offset = circ - (score / 100) * circ;

  return (
    <div data-ocid="security.page" className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">
        <span style={{ color: "var(--neon-purple)" }}>Security</span> Center
      </h1>

      {/* Score Ring */}
      <div className="flex items-center gap-6 glass rounded-2xl p-5 mb-4">
        <div className="relative">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            role="img"
            aria-label={`Security score: ${score} out of 100`}
          >
            <circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="oklch(0.18 0.025 260)"
              strokeWidth="8"
            />
            <motion.circle
              cx="60"
              cy="60"
              r="55"
              fill="none"
              stroke="oklch(0.72 0.22 300)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              transform="rotate(-90 60 60)"
              style={{
                filter: "drop-shadow(0 0 6px oklch(0.72 0.22 300 / 0.8))",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={score}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-3xl font-bold font-mono"
              style={{ color: "var(--neon-purple)" }}
            >
              {score}
            </motion.span>
            <span className="text-[10px] text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div className="flex-1">
          <p className="font-bold text-lg">
            {score >= 95
              ? "Excellent"
              : score >= 80
                ? "Good"
                : "Needs Attention"}
          </p>
          <p className="text-xs text-muted-foreground">
            Last scan: {scanned ? "Just now" : "3 hours ago"}
          </p>
          <div className="mt-1 flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                background:
                  score >= 80 ? "var(--neon-green)" : "var(--neon-orange)",
              }}
            />
            <span
              className="text-xs"
              style={{
                color: score >= 80 ? "var(--neon-green)" : "var(--neon-orange)",
              }}
            >
              {score >= 95
                ? "Fully Protected"
                : score >= 80
                  ? "Protected"
                  : "Issues Found"}
            </span>
          </div>
        </div>
      </div>

      {/* Scan button */}
      <motion.button
        type="button"
        data-ocid="security.scan_button"
        onClick={handleScan}
        disabled={scanning}
        className="w-full py-4 rounded-2xl font-bold text-base mb-4 overflow-hidden relative"
        style={{
          background: scanned
            ? "oklch(0.82 0.2 150 / 0.15)"
            : "linear-gradient(135deg, oklch(0.72 0.22 300), oklch(0.82 0.18 195))",
          color: scanned ? "var(--neon-green)" : "oklch(0.09 0.015 260)",
          boxShadow: scanned ? "none" : "0 0 20px oklch(0.72 0.22 300 / 0.3)",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center justify-center gap-2">
          <Shield size={18} />
          {scanning
            ? `Scanning... ${scanProgress}%`
            : scanned
              ? "✓ Scan Complete"
              : "Run Full Scan"}
        </span>
        {scanning && (
          <motion.div
            className="absolute bottom-0 left-0 h-1"
            style={{ background: "var(--neon-purple)" }}
            animate={{ width: `${scanProgress}%` }}
            transition={{ duration: 0.1 }}
          />
        )}
      </motion.button>

      {/* Checks */}
      <div className="space-y-2 mb-4">
        {checks.map((check, i) => {
          const isFixed = fixed && check.status === "warn";
          const statusColor = isFixed
            ? "var(--neon-green)"
            : check.status === "ok"
              ? "var(--neon-green)"
              : "var(--neon-orange)";
          return (
            <motion.div
              key={check.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-3 flex items-center gap-3"
            >
              <check.icon size={18} style={{ color: statusColor }} />
              <div className="flex-1">
                <p className="text-sm font-semibold">{check.label}</p>
                <p className="text-xs text-muted-foreground">
                  {isFixed ? "✓ Fixed" : check.detail}
                </p>
              </div>
              {isFixed || check.status === "ok" ? (
                <CheckCircle size={16} style={{ color: "var(--neon-green)" }} />
              ) : (
                <AlertTriangle
                  size={16}
                  style={{ color: "var(--neon-orange)" }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Fix button */}
      <AnimatePresence>
        {!fixed && (
          <motion.button
            type="button"
            data-ocid="security.fix_button"
            onClick={handleFix}
            disabled={fixing}
            className="w-full py-3.5 rounded-2xl font-semibold text-sm"
            style={{
              background: "oklch(0.78 0.19 50 / 0.15)",
              border: "1px solid oklch(0.78 0.19 50 / 0.4)",
              color: "var(--neon-orange)",
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span className="flex items-center justify-center gap-2">
              <AlertTriangle size={16} />
              {fixing ? "Fixing Issues..." : "Fix 2 Issues Found"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
