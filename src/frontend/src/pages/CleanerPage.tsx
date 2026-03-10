import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Flame,
  HardDrive,
  Lightbulb,
  Snowflake,
  Thermometer,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const storageBreakdown = [
  { label: "Apps", gb: 12.1, color: "var(--neon-cyan)" },
  { label: "Photos", gb: 8.4, color: "var(--neon-purple)" },
  { label: "System", gb: 7.4, color: "var(--neon-green)" },
];

const storageTips = [
  "Delete 23 duplicate photos · save 450 MB",
  "Clear WhatsApp cache · save 312 MB",
  "Remove unused apps · save 1.2 GB",
  "Clean download folder · save 287 MB",
];

const cpuProcesses = [
  { name: "Chrome", cpu: 8.2 },
  { name: "YouTube", cpu: 12.1 },
  { name: "Instagram", cpu: 4.8 },
  { name: "System UI", cpu: 3.2 },
  { name: "Launcher", cpu: 1.1 },
  { name: "Google Play", cpu: 2.4 },
  { name: "Spotify", cpu: 3.8 },
  { name: "Maps", cpu: 4.1 },
];

const batteryUsage = [
  { label: "Screen", pct: 34, color: "var(--neon-cyan)" },
  { label: "Apps", pct: 28, color: "var(--neon-purple)" },
  { label: "Network", pct: 18, color: "var(--neon-orange)" },
  { label: "System", pct: 20, color: "var(--neon-yellow)" },
];

const batteryTips = [
  "Reduce screen brightness by 20%",
  "Disable background app refresh",
  "Turn off always-on display",
  "Enable adaptive battery",
];

const heatingApps = [
  { name: "YouTube", temp: 8.2, color: "var(--neon-red)" },
  { name: "Chrome", temp: 5.1, color: "var(--neon-orange)" },
  { name: "Instagram", temp: 3.8, color: "var(--neon-yellow)" },
  { name: "Camera", temp: 2.4, color: "var(--neon-cyan)" },
];

function StorageTab() {
  const [cleaning, setCleaning] = useState(false);
  const [cleaned, setCleaned] = useState(false);
  const [cacheClearing, setCacheClearing] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);
  const [junkGB, setJunkGB] = useState(2.1);
  const [cacheGB, setCacheGB] = useState(1.8);
  const usedGB = 34.2 - (cleaned ? 2.1 : 0) - (cacheCleared ? 1.8 : 0);

  const handleClean = () => {
    if (cleaning || cleaned) return;
    setCleaning(true);
    setTimeout(() => {
      setCleaning(false);
      setCleaned(true);
      setJunkGB(0);
    }, 2500);
  };

  const handleCacheClean = () => {
    if (cacheClearing || cacheCleared) return;
    setCacheClearing(true);
    setTimeout(() => {
      setCacheClearing(false);
      setCacheCleared(true);
      setCacheGB(0);
    }, 2000);
  };

  const pct = (usedGB / 128) * 100;
  const circ = 2 * Math.PI * 55;

  const dynamicBreakdown = [
    ...storageBreakdown,
    { label: "Cache", gb: cacheGB, color: "var(--neon-yellow)" },
    { label: "Junk", gb: junkGB, color: "var(--neon-red)" },
  ];

  return (
    <div data-ocid="storage.page" className="space-y-4">
      {/* Ring */}
      <div className="flex flex-col items-center py-4">
        <div className="relative">
          <svg
            width="140"
            height="140"
            viewBox="0 0 140 140"
            role="img"
            aria-label={`Storage used: ${usedGB.toFixed(1)} GB of 128 GB`}
          >
            <circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="oklch(0.18 0.025 260)"
              strokeWidth="8"
            />
            <motion.circle
              cx="70"
              cy="70"
              r="55"
              fill="none"
              stroke="oklch(0.78 0.19 50)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={{ strokeDashoffset: circ - (pct / 100) * circ }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              transform="rotate(-90 70 70)"
              style={{
                filter: "drop-shadow(0 0 6px oklch(0.78 0.19 50 / 0.8))",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--neon-orange)" }}
            >
              {usedGB.toFixed(1)}
            </span>
            <span className="text-[10px] text-muted-foreground">of 128 GB</span>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="space-y-2">
        {dynamicBreakdown.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-mono" style={{ color: item.color }}>
                {item.gb.toFixed(1)} GB
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(item.gb / 128) * 100 * 3}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                style={{ background: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Junk Card */}
      <div className="grad-red rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Flame size={16} style={{ color: "var(--neon-red)" }} />
              <span className="font-semibold text-sm">Junk Files</span>
            </div>
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--neon-red)" }}
            >
              {junkGB.toFixed(1)} GB
            </p>
            <p className="text-xs text-muted-foreground">cleanable</p>
          </div>
          <motion.button
            type="button"
            data-ocid="storage.clean_button"
            onClick={handleClean}
            disabled={cleaning || cleaned}
            className="px-4 py-2 rounded-xl font-semibold text-sm transition-all"
            style={{
              background: cleaned
                ? "oklch(0.82 0.2 150 / 0.2)"
                : "var(--neon-red)",
              color: cleaned ? "var(--neon-green)" : "white",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cleaning ? "Cleaning..." : cleaned ? "✓ Cleaned!" : "Clean Now"}
          </motion.button>
        </div>
        {cleaning && (
          <motion.div className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "var(--neon-red)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "linear" }}
            />
          </motion.div>
        )}
      </div>

      {/* Cache Card */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <HardDrive size={16} style={{ color: "var(--neon-yellow)" }} />
              <span className="font-semibold text-sm">Cache</span>
            </div>
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--neon-yellow)" }}
            >
              {cacheGB.toFixed(1)} GB
            </p>
            <p className="text-xs text-muted-foreground">cleanable</p>
          </div>
          <motion.button
            type="button"
            data-ocid="storage.cache_button"
            onClick={handleCacheClean}
            disabled={cacheClearing || cacheCleared}
            className="px-4 py-2 rounded-xl font-semibold text-sm"
            style={{
              background: cacheCleared
                ? "oklch(0.82 0.2 150 / 0.2)"
                : "var(--neon-yellow)",
              color: cacheCleared
                ? "var(--neon-green)"
                : "oklch(0.09 0.015 260)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cacheClearing
              ? "Clearing..."
              : cacheCleared
                ? "✓ Cleared!"
                : "Clear Cache"}
          </motion.button>
        </div>
      </div>

      {/* Recommendations */}
      <div className="grad-cyan rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb size={16} style={{ color: "var(--neon-cyan)" }} />
          <span className="font-semibold text-sm">Live Recommendations</span>
        </div>
        <ul className="space-y-2">
          {storageTips.map((tip) => (
            <li
              key={tip}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span style={{ color: "var(--neon-cyan)" }} className="mt-0.5">
                →
              </span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CpuTab() {
  const [killing, setKilling] = useState(false);
  const [killed, setKilled] = useState(false);
  const [usages, setUsages] = useState([72, 68, 58, 81]);

  const handleKill = () => {
    if (killing || killed) return;
    setKilling(true);
    setTimeout(() => {
      setKilling(false);
      setKilled(true);
      setUsages([12, 8, 15, 10]);
    }, 2000);
  };

  return (
    <div data-ocid="cpu.page" className="space-y-4">
      {/* Temp */}
      <div className="grad-cyan rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Thermometer size={32} style={{ color: "var(--neon-cyan)" }} />
          <div>
            <p className="text-xs text-muted-foreground">CPU Temperature</p>
            <p
              className="text-3xl font-bold font-mono"
              style={{
                color: killed ? "var(--neon-green)" : "var(--neon-cyan)",
              }}
            >
              {killed ? "28°C" : "42°C"}
            </p>
          </div>
        </div>
        <div
          className="px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: killed
              ? "oklch(0.82 0.2 150 / 0.2)"
              : "oklch(0.78 0.19 50 / 0.2)",
            color: killed ? "var(--neon-green)" : "var(--neon-orange)",
            border: `1px solid ${
              killed ? "var(--neon-green)" : "var(--neon-orange)"
            }`,
          }}
        >
          {killed ? "Cool" : "Warm"}
        </div>
      </div>

      {/* CPU Cores */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground mb-3">CPU Cores</p>
        <div className="grid grid-cols-2 gap-3">
          {usages.map((usage, i) => (
            <div key={`core-${i + 1}`}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Core {i + 1}</span>
                <span
                  className="font-mono"
                  style={{
                    color:
                      usage > 70 ? "var(--neon-orange)" : "var(--neon-cyan)",
                  }}
                >
                  {usage}%
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${usage}%` }}
                  transition={{ duration: 0.8 }}
                  style={{
                    background:
                      usage > 70 ? "var(--neon-orange)" : "var(--neon-cyan)",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Processes */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground mb-3">Running Processes</p>
        <div className="space-y-2">
          {cpuProcesses.map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <span className="text-sm">{p.name}</span>
              <span
                className="text-xs font-mono"
                style={{
                  color: p.cpu > 8 ? "var(--neon-orange)" : "var(--neon-cyan)",
                }}
              >
                {p.cpu}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Kill Button */}
      <motion.button
        type="button"
        data-ocid="cpu.clean_button"
        onClick={handleKill}
        disabled={killing || killed}
        className="w-full py-4 rounded-2xl font-bold text-base"
        style={{
          background: killed
            ? "oklch(0.82 0.2 150 / 0.15)"
            : "linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))",
          color: killed ? "var(--neon-green)" : "oklch(0.09 0.015 260)",
          boxShadow: killed ? "none" : "0 0 20px oklch(0.82 0.18 195 / 0.3)",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {killing
          ? "Killing Processes..."
          : killed
            ? "✓ Processes Killed! CPU Free"
            : "Kill Background Processes"}
      </motion.button>
    </div>
  );
}

function BatteryTab() {
  const [powerSave, setPowerSave] = useState(false);
  const batteryPct = powerSave ? 85 : 78;

  return (
    <div data-ocid="battery.page" className="space-y-4">
      {/* Battery Visual */}
      <div className="flex flex-col items-center py-4">
        <div className="relative">
          <svg
            width="80"
            height="140"
            viewBox="0 0 80 140"
            role="img"
            aria-label={`Battery level: ${batteryPct} percent`}
          >
            <rect
              x="20"
              y="8"
              width="40"
              height="6"
              rx="3"
              fill="oklch(0.82 0.2 150)"
            />
            <rect
              x="5"
              y="14"
              width="70"
              height="116"
              rx="10"
              fill="none"
              stroke="oklch(0.82 0.2 150)"
              strokeWidth="3"
            />
            <clipPath id="battery-clip">
              <rect x="8" y="17" width="64" height="110" rx="8" />
            </clipPath>
            <rect
              x="8"
              y={17 + 110 * (1 - batteryPct / 100)}
              width="64"
              height={110 * (batteryPct / 100)}
              rx="4"
              fill={
                batteryPct > 50
                  ? "oklch(0.82 0.2 150)"
                  : batteryPct > 20
                    ? "oklch(0.78 0.19 50)"
                    : "oklch(0.65 0.22 25)"
              }
              clipPath="url(#battery-clip)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-xl font-bold font-mono"
              style={{ color: "oklch(0.09 0.015 260)" }}
            >
              {batteryPct}%
            </span>
          </div>
        </div>
        <p className="text-sm mt-3" style={{ color: "var(--neon-green)" }}>
          Battery Health: Good · 89%
        </p>
        <p className="text-xs text-muted-foreground">
          Estimated: {powerSave ? "6h 10min" : "4h 23min"} remaining
        </p>
      </div>

      {/* Usage */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground mb-3">Power Usage</p>
        <div className="space-y-3">
          {batteryUsage.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-mono" style={{ color: item.color }}>
                  {item.pct}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 1 }}
                  style={{ background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="grad-green rounded-2xl p-4">
        <p className="font-semibold text-sm mb-2">Optimization Tips</p>
        <ul className="space-y-1">
          {batteryTips.map((tip) => (
            <li key={tip} className="text-xs text-muted-foreground flex gap-2">
              <span style={{ color: "var(--neon-green)" }}>•</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>

      {/* Power Save Toggle */}
      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="font-semibold text-sm">Power Saving Mode</p>
          <p className="text-xs text-muted-foreground">Extends battery life</p>
        </div>
        <button
          type="button"
          data-ocid="battery.power_save.toggle"
          onClick={() => setPowerSave((v) => !v)}
          className="relative w-12 h-6 rounded-full transition-all duration-300"
          style={{
            background: powerSave
              ? "var(--neon-green)"
              : "oklch(0.25 0.02 260)",
          }}
        >
          <motion.div
            className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
            animate={{ left: powerSave ? "26px" : "2px" }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </div>
  );
}

function CoolerTab() {
  const [cooling, setCooling] = useState(false);
  const [cooled, setCooled] = useState(false);
  const [temp, setTemp] = useState(42);

  const handleCool = () => {
    if (cooling || cooled) return;
    setCooling(true);
    let t = 42;
    const interval = setInterval(() => {
      t -= 2;
      setTemp(t);
      if (t <= 28) {
        clearInterval(interval);
        setCooling(false);
        setCooled(true);
      }
    }, 300);
  };

  const tempColor =
    temp > 45
      ? "var(--neon-red)"
      : temp > 38
        ? "var(--neon-orange)"
        : "var(--neon-green)";
  const status =
    temp > 45 ? "Phone is Hot" : temp > 38 ? "Phone is Warm" : "Phone is Cool";

  return (
    <div data-ocid="cooler.page" className="space-y-4">
      {/* Temp Display */}
      <div className="flex flex-col items-center py-6">
        <motion.div
          className="relative w-36 h-36 rounded-full flex items-center justify-center"
          style={{
            background: `radial-gradient(circle, ${tempColor}22 0%, transparent 70%)`,
            border: `2px solid ${tempColor}44`,
          }}
          animate={{
            boxShadow: cooling
              ? `0 0 40px ${tempColor}66`
              : `0 0 20px ${tempColor}33`,
          }}
        >
          {cooling && (
            <motion.div className="absolute inset-0 flex items-center justify-center">
              <Snowflake
                size={60}
                style={{ color: "var(--neon-cyan)" }}
                className="animate-cool-spin opacity-20"
              />
            </motion.div>
          )}
          <div className="text-center z-10">
            <motion.div
              key={temp}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold font-mono"
              style={{ color: tempColor }}
            >
              {temp}°C
            </motion.div>
            <Thermometer
              size={16}
              className="mx-auto mt-1"
              style={{ color: tempColor }}
            />
          </div>
        </motion.div>
        <p className="mt-3 text-sm font-semibold" style={{ color: tempColor }}>
          {status}
        </p>
      </div>

      {/* Heating Apps */}
      <div className="glass rounded-2xl p-4">
        <p className="text-xs text-muted-foreground mb-3">Top Heating Apps</p>
        <div className="space-y-3">
          {heatingApps.map((app) => (
            <div key={app.name} className="flex items-center justify-between">
              <span className="text-sm">{app.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-1.5 rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(app.temp / 10) * 100}%`,
                      background: app.color,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-mono w-10 text-right"
                  style={{ color: app.color }}
                >
                  +{app.temp}°
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cool Button */}
      <motion.button
        type="button"
        data-ocid="cooler.start_button"
        onClick={handleCool}
        disabled={cooling || cooled}
        className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3"
        style={{
          background: cooled
            ? "oklch(0.82 0.2 150 / 0.15)"
            : cooling
              ? "linear-gradient(135deg, oklch(0.72 0.22 300 / 0.3), oklch(0.82 0.18 195 / 0.3))"
              : "linear-gradient(135deg, var(--neon-cyan), oklch(0.72 0.22 300))",
          color: cooled
            ? "var(--neon-green)"
            : cooling
              ? "var(--neon-cyan)"
              : "oklch(0.09 0.015 260)",
          boxShadow:
            cooled || cooling ? "none" : "0 0 20px oklch(0.82 0.18 195 / 0.3)",
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {cooling && <Snowflake size={20} className="animate-cool-spin" />}
        {cooled && <CheckCircle size={20} />}
        {cooling ? (
          "Cooling Down..."
        ) : cooled ? (
          "✓ Phone is Cool!"
        ) : (
          <span className="flex items-center gap-2">
            <Snowflake size={20} /> Start Cooling
          </span>
        )}
      </motion.button>
    </div>
  );
}

export function CleanerPage() {
  return (
    <div className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">
        <span style={{ color: "var(--neon-cyan)" }}>Smart</span> Cleaner
      </h1>
      <Tabs defaultValue="storage">
        <TabsList
          className="grid grid-cols-4 w-full mb-4"
          style={{ background: "oklch(0.13 0.018 260)" }}
        >
          {[
            ["storage", "Storage"],
            ["cpu", "CPU"],
            ["battery", "Battery"],
            ["cooler", "Cooler"],
          ].map(([v, l]) => (
            <TabsTrigger
              key={v}
              value={v}
              className="text-xs data-[state=active]:text-foreground"
            >
              {l}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="storage">
          <StorageTab />
        </TabsContent>
        <TabsContent value="cpu">
          <CpuTab />
        </TabsContent>
        <TabsContent value="battery">
          <BatteryTab />
        </TabsContent>
        <TabsContent value="cooler">
          <CoolerTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
