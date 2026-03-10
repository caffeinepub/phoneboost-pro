import { CheckCircle, X, Zap } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const initialApps = [
  { name: "Chrome", ram: 312, cpu: 8, color: "var(--neon-cyan)" },
  { name: "YouTube", ram: 287, cpu: 12, color: "var(--neon-red)" },
  { name: "Instagram", ram: 198, cpu: 5, color: "var(--neon-purple)" },
  { name: "WhatsApp", ram: 145, cpu: 2, color: "var(--neon-green)" },
  { name: "Spotify", ram: 134, cpu: 3, color: "var(--neon-green)" },
  { name: "Gmail", ram: 98, cpu: 1, color: "var(--neon-orange)" },
  { name: "Maps", ram: 87, cpu: 4, color: "var(--neon-cyan)" },
  { name: "TikTok", ram: 234, cpu: 9, color: "var(--neon-purple)" },
];

const initials: Record<string, string> = {
  Chrome: "Ch",
  YouTube: "YT",
  Instagram: "In",
  WhatsApp: "WA",
  Spotify: "Sp",
  Gmail: "Gm",
  Maps: "Ma",
  TikTok: "TT",
};

export function TasksPage() {
  const [apps, setApps] = useState(initialApps);
  const [killingAll, setKillingAll] = useState(false);
  const [killedAll, setKilledAll] = useState(false);
  const totalRam = 6 * 1024;
  const usedRam = apps.reduce((s, a) => s + a.ram, 0) + 1800; // system
  const usedPct = Math.round((usedRam / totalRam) * 100);

  const killApp = (name: string) => {
    setApps((prev) => prev.filter((a) => a.name !== name));
  };

  const killAll = () => {
    if (killingAll || killedAll) return;
    setKillingAll(true);
    setTimeout(() => {
      setApps([]);
      setKillingAll(false);
      setKilledAll(true);
    }, 1500);
  };

  const freedRam =
    initialApps.reduce((s, a) => s + a.ram, 0) -
    apps.reduce((s, a) => s + a.ram, 0);

  return (
    <div data-ocid="tasks.page" className="pb-24 px-4 pt-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">
          <span style={{ color: "var(--neon-cyan)" }}>Task</span> Manager
        </h1>
        <motion.button
          data-ocid="tasks.kill_all_button"
          onClick={killAll}
          disabled={killingAll || killedAll || apps.length === 0}
          className="px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
          style={{
            background: killedAll
              ? "oklch(0.82 0.2 150 / 0.15)"
              : "oklch(0.65 0.22 25 / 0.15)",
            border: `1px solid ${killedAll ? "oklch(0.82 0.2 150 / 0.4)" : "oklch(0.65 0.22 25 / 0.4)"}`,
            color: killedAll ? "var(--neon-green)" : "var(--neon-red)",
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          {killedAll ? (
            <>
              <CheckCircle size={12} /> Cleared!
            </>
          ) : killingAll ? (
            "Killing..."
          ) : (
            <>
              <Zap size={12} /> Kill All
            </>
          )}
        </motion.button>
      </div>

      {/* RAM Overview */}
      <div className="grad-cyan rounded-2xl p-4 mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold">RAM Usage</span>
          <span
            className="text-sm font-mono"
            style={{ color: "var(--neon-cyan)" }}
          >
            {(usedRam / 1024).toFixed(1)} / 6 GB
          </span>
        </div>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${usedPct}%` }}
            transition={{ duration: 0.8 }}
            style={{
              background:
                "linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))",
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-muted-foreground">
            Used: <span style={{ color: "var(--neon-cyan)" }}>{usedPct}%</span>
          </span>
          <span className="text-muted-foreground">
            Free:{" "}
            <span style={{ color: "var(--neon-green)" }}>
              {((totalRam - usedRam) / 1024).toFixed(1)} GB
            </span>
          </span>
        </div>
        {freedRam > 0 && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 text-xs font-semibold"
            style={{ color: "var(--neon-green)" }}
          >
            ✓ Freed {(freedRam / 1024).toFixed(2)} GB RAM
          </motion.p>
        )}
      </div>

      {/* App List */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          {apps.length} Running Apps
        </p>
        <AnimatePresence>
          {apps.map((app, i) => (
            <motion.div
              key={app.name}
              data-ocid={`tasks.app.item.${i + 1}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.2 }}
              className="glass rounded-xl p-3 flex items-center gap-3"
            >
              {/* App Icon */}
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: `${app.color}22`,
                  border: `1px solid ${app.color}44`,
                  color: app.color,
                }}
              >
                {initials[app.name]}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{app.name}</p>
                <div className="flex gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    <span
                      className="font-mono"
                      style={{ color: "var(--neon-cyan)" }}
                    >
                      {app.ram}
                    </span>{" "}
                    MB
                  </span>
                  <span className="text-xs text-muted-foreground">
                    <span
                      className="font-mono"
                      style={{
                        color:
                          app.cpu > 8
                            ? "var(--neon-orange)"
                            : "var(--neon-green)",
                      }}
                    >
                      {app.cpu}%
                    </span>{" "}
                    CPU
                  </span>
                </div>
              </div>
              <motion.button
                data-ocid={`tasks.kill_button.${i + 1}`}
                onClick={() => killApp(app.name)}
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: "oklch(0.65 0.22 25 / 0.15)",
                  border: "1px solid oklch(0.65 0.22 25 / 0.3)",
                }}
                whileHover={{
                  scale: 1.1,
                  background: "oklch(0.65 0.22 25 / 0.3)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={12} style={{ color: "var(--neon-red)" }} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>

        {apps.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10"
          >
            <CheckCircle
              size={40}
              className="mx-auto mb-3"
              style={{ color: "var(--neon-green)" }}
            />
            <p className="font-semibold" style={{ color: "var(--neon-green)" }}>
              All Clear!
            </p>
            <p className="text-sm text-muted-foreground">
              No running background apps
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
