import {
  ArrowDown,
  ArrowUp,
  Globe,
  Lock,
  Shield,
  Wifi,
  WifiOff,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const networks = [
  { ssid: "HomeNetwork_5G", signal: 92, secured: true, band: "5 GHz" },
  { ssid: "NeighborWifi", signal: 65, secured: true, band: "2.4 GHz" },
  { ssid: "CoffeeShop_Free", signal: 48, secured: false, band: "2.4 GHz" },
  { ssid: "Office_Network", signal: 31, secured: true, band: "5 GHz" },
];

export function WiFiPage() {
  const [testing, setTesting] = useState(false);
  const [tested, setTested] = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(87.4);
  const [uploadSpeed, setUploadSpeed] = useState(32.1);
  const [signalPulse, setSignalPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setSignalPulse((v) => !v), 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSpeedTest = () => {
    if (testing || tested) return;
    setTesting(true);
    setTestProgress(0);
    const interval = setInterval(() => {
      setTestProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTesting(false);
          setTested(true);
          setDownloadSpeed(94.2);
          setUploadSpeed(38.7);
          return 100;
        }
        return p + 4;
      });
    }, 120);
  };

  const getSignalBars = (signal: number) => {
    const bars = signal > 75 ? 4 : signal > 50 ? 3 : signal > 25 ? 2 : 1;
    return bars;
  };

  return (
    <div data-ocid="wifi.page" className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">
        <span style={{ color: "var(--neon-cyan)" }}>WiFi</span> Manager
      </h1>

      {/* Connected Network */}
      <div className="grad-cyan rounded-2xl p-5 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: signalPulse ? 1.1 : 1 }}
              transition={{ duration: 0.5 }}
            >
              <Wifi size={28} style={{ color: "var(--neon-cyan)" }} />
            </motion.div>
            <div>
              <p className="font-bold text-base">HomeNetwork_5G</p>
              <p className="text-xs text-muted-foreground">Connected · 5 GHz</p>
            </div>
          </div>
          <div
            className="flex items-center gap-1 px-2 py-1 rounded-full"
            style={{
              background: "oklch(0.82 0.2 150 / 0.15)",
              border: "1px solid oklch(0.82 0.2 150 / 0.4)",
            }}
          >
            <Shield size={12} style={{ color: "var(--neon-green)" }} />
            <span className="text-xs" style={{ color: "var(--neon-green)" }}>
              Secure
            </span>
          </div>
        </div>

        {/* Speed */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <ArrowDown size={14} style={{ color: "var(--neon-green)" }} />
              <span className="text-xs text-muted-foreground">Download</span>
            </div>
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--neon-green)" }}
            >
              {downloadSpeed}
            </p>
            <p className="text-xs text-muted-foreground">Mbps</p>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <ArrowUp size={14} style={{ color: "var(--neon-cyan)" }} />
              <span className="text-xs text-muted-foreground">Upload</span>
            </div>
            <p
              className="text-2xl font-bold font-mono"
              style={{ color: "var(--neon-cyan)" }}
            >
              {uploadSpeed}
            </p>
            <p className="text-xs text-muted-foreground">Mbps</p>
          </div>
        </div>

        {/* Speed Test Button */}
        <motion.button
          data-ocid="wifi.speed_test_button"
          onClick={handleSpeedTest}
          disabled={testing}
          className="w-full mt-3 py-3 rounded-xl font-semibold text-sm relative overflow-hidden"
          style={{
            background: tested
              ? "oklch(0.82 0.2 150 / 0.15)"
              : "oklch(0.82 0.18 195 / 0.15)",
            border: `1px solid ${tested ? "oklch(0.82 0.2 150 / 0.4)" : "oklch(0.82 0.18 195 / 0.4)"}`,
            color: tested ? "var(--neon-green)" : "var(--neon-cyan)",
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center justify-center gap-2 relative z-10">
            <Zap size={16} />
            {testing
              ? `Testing... ${testProgress}%`
              : tested
                ? "✓ Test Complete"
                : "Run Speed Test"}
          </span>
          {testing && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5"
              style={{ background: "var(--neon-cyan)" }}
              animate={{ width: `${testProgress}%` }}
            />
          )}
        </motion.button>
      </div>

      {/* Network Info */}
      <div className="glass rounded-2xl p-4 mb-4">
        <p className="text-xs text-muted-foreground mb-3">Network Details</p>
        <div className="space-y-2">
          {[
            { label: "IP Address", value: "192.168.1.105", icon: Globe },
            { label: "DNS Server", value: "8.8.8.8 (Google)", icon: Globe },
            { label: "Signal Strength", value: "92% · Excellent", icon: Wifi },
            { label: "Security", value: "WPA3 Encrypted", icon: Lock },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon size={14} style={{ color: "var(--neon-cyan)" }} />
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
              <span
                className="text-xs font-mono"
                style={{ color: "var(--neon-cyan)" }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Available Networks */}
      <div className="space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Available Networks
        </p>
        {networks.map((net, i) => (
          <motion.div
            key={net.ssid}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass rounded-xl p-3 flex items-center gap-3"
          >
            <Wifi
              size={18}
              style={{
                color:
                  net.signal > 60
                    ? "var(--neon-cyan)"
                    : net.signal > 30
                      ? "var(--neon-yellow)"
                      : "var(--neon-red)",
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{net.ssid}</p>
              <p className="text-xs text-muted-foreground">
                {net.band} · {net.signal}%
              </p>
            </div>
            <div className="flex items-center gap-2">
              {net.secured ? (
                <Lock size={12} style={{ color: "var(--neon-green)" }} />
              ) : (
                <WifiOff size={12} style={{ color: "var(--neon-orange)" }} />
              )}
              <div className="flex gap-0.5 items-end">
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className="w-1.5 rounded-sm"
                    style={{
                      height: `${bar * 4 + 2}px`,
                      background:
                        bar <= getSignalBars(net.signal)
                          ? "var(--neon-cyan)"
                          : "oklch(0.25 0.02 260)",
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
