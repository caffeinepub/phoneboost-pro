import {
  Battery,
  CheckCircle,
  Cpu,
  HardDrive,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type TabType = "home" | "cleaner" | "security" | "wifi" | "tasks" | "me";

interface HomePageProps {
  onNavigate: (tab: TabType) => void;
}

const quickStats = [
  { label: "Battery", value: "78%", color: "var(--neon-green)" },
  { label: "Storage", value: "67%", color: "var(--neon-orange)" },
  { label: "CPU", value: "42%", color: "var(--neon-cyan)" },
  { label: "RAM", value: "70%", color: "var(--neon-purple)" },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const [boosting, setBoosting] = useState(false);
  const [boosted, setBoosted] = useState(false);
  const [healthScore, setHealthScore] = useState(78);

  const handleBoost = () => {
    if (boosting || boosted) return;
    setBoosting(true);
    setTimeout(() => {
      setBoosting(false);
      setBoosted(true);
      setHealthScore(90);
      setTimeout(() => setBoosted(false), 3000);
    }, 2500);
  };

  const circumference = 2 * Math.PI * 70;
  const dashOffset = circumference - (healthScore / 100) * circumference;

  return (
    <div data-ocid="home.page" className="pb-24 px-4 pt-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted-foreground text-sm">Good morning</p>
          <h1 className="text-xl font-bold text-foreground">
            PhoneBoost <span style={{ color: "var(--neon-cyan)" }}>Pro</span>
          </h1>
        </div>
        <div className="w-10 h-10 rounded-full grad-cyan flex items-center justify-center">
          <Zap size={18} style={{ color: "var(--neon-cyan)" }} />
        </div>
      </div>

      {/* Health Ring */}
      <div className="flex flex-col items-center py-4">
        <div className="relative">
          <svg
            width="180"
            height="180"
            viewBox="0 0 180 180"
            role="img"
            aria-label={`Phone health score: ${healthScore} out of 100`}
          >
            <circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="oklch(0.18 0.025 260)"
              strokeWidth="10"
            />
            <motion.circle
              cx="90"
              cy="90"
              r="70"
              fill="none"
              stroke="oklch(0.82 0.18 195)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              transform="rotate(-90 90 90)"
              style={{
                filter: "drop-shadow(0 0 8px oklch(0.82 0.18 195 / 0.8))",
              }}
            />
            <circle
              cx="90"
              cy="90"
              r="58"
              fill="none"
              stroke="oklch(0.82 0.18 195 / 0.05)"
              strokeWidth="1"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              key={healthScore}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-bold font-mono"
              style={{ color: "var(--neon-cyan)" }}
            >
              {healthScore}
            </motion.span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">
              Health
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Your phone is{" "}
          <span style={{ color: "var(--neon-green)" }}>performing well</span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-2">
        {quickStats.map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-2.5 text-center">
            <div
              className="text-base font-bold font-mono"
              style={{ color: stat.color }}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-muted-foreground mt-0.5">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Boost Button */}
      <div className="flex justify-center pt-2">
        <AnimatePresence mode="wait">
          {!boosted ? (
            <motion.button
              key="boost"
              type="button"
              data-ocid="home.boost_button"
              onClick={handleBoost}
              disabled={boosting}
              className="relative w-48 h-14 rounded-2xl font-bold text-base transition-all overflow-hidden"
              style={{
                background: boosting
                  ? "linear-gradient(135deg, oklch(0.82 0.18 195 / 0.3), oklch(0.72 0.22 300 / 0.3))"
                  : "linear-gradient(135deg, oklch(0.82 0.18 195), oklch(0.72 0.22 300))",
                color: boosting
                  ? "oklch(0.82 0.18 195)"
                  : "oklch(0.09 0.015 260)",
                boxShadow: boosting
                  ? "none"
                  : "0 0 30px oklch(0.82 0.18 195 / 0.4)",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {boosting && (
                <span className="animate-shimmer absolute inset-0 rounded-2xl" />
              )}
              <span className="relative z-10 flex items-center justify-center gap-2">
                {boosting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        duration: 1,
                        ease: "linear",
                      }}
                    >
                      <Zap size={18} />
                    </motion.div>{" "}
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Zap size={18} /> Boost Now
                  </>
                )}
              </span>
            </motion.button>
          ) : (
            <motion.div
              key="boosted"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl"
              style={{
                background: "oklch(0.82 0.2 150 / 0.15)",
                border: "1px solid oklch(0.82 0.2 150 / 0.4)",
              }}
            >
              <CheckCircle size={20} style={{ color: "var(--neon-green)" }} />
              <span
                style={{ color: "var(--neon-green)" }}
                className="font-bold"
              >
                Boosted! +12% faster
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            type="button"
            data-ocid="home.battery.card"
            onClick={() => onNavigate("cleaner")}
            className="grad-green rounded-2xl p-4 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Battery
              size={24}
              style={{ color: "var(--neon-green)" }}
              className="mb-2"
            />
            <div className="font-semibold text-sm">Battery</div>
            <div className="text-xs text-muted-foreground">78% · 4h 23min</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: "78%", background: "var(--neon-green)" }}
              />
            </div>
          </motion.button>

          <motion.button
            type="button"
            data-ocid="home.storage.card"
            onClick={() => onNavigate("cleaner")}
            className="grad-orange rounded-2xl p-4 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <HardDrive
              size={24}
              style={{ color: "var(--neon-orange)" }}
              className="mb-2"
            />
            <div className="font-semibold text-sm">Storage</div>
            <div className="text-xs text-muted-foreground">34.2 / 128 GB</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: "27%", background: "var(--neon-orange)" }}
              />
            </div>
          </motion.button>

          <motion.button
            type="button"
            data-ocid="home.cpu.card"
            onClick={() => onNavigate("cleaner")}
            className="grad-cyan rounded-2xl p-4 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Cpu
              size={24}
              style={{ color: "var(--neon-cyan)" }}
              className="mb-2"
            />
            <div className="font-semibold text-sm">CPU Cooler</div>
            <div className="text-xs text-muted-foreground">42°C · Normal</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: "55%", background: "var(--neon-cyan)" }}
              />
            </div>
          </motion.button>

          <motion.button
            type="button"
            data-ocid="home.security.card"
            onClick={() => onNavigate("security")}
            className="grad-purple rounded-2xl p-4 text-left"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Shield
              size={24}
              style={{ color: "var(--neon-purple)" }}
              className="mb-2"
            />
            <div className="font-semibold text-sm">Security</div>
            <div className="text-xs text-muted-foreground">Score: 85/100</div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full"
                style={{ width: "85%", background: "var(--neon-purple)" }}
              />
            </div>
          </motion.button>
        </div>
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-muted-foreground py-2">
        Last cleaned:{" "}
        <span style={{ color: "var(--neon-cyan)" }}>2 hours ago</span>
      </div>
    </div>
  );
}
