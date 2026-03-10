import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import {
  useAppSettings,
  useSaveAppSettings,
  useUserProfile,
} from "@/hooks/useQueries";
import { Variant_dark_light } from "@/hooks/useQueries";
import {
  Bell,
  ChevronRight,
  Clock,
  Globe,
  Info,
  LogIn,
  LogOut,
  Share2,
  Shield,
  Star,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export function ProfilePage() {
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const { data: profile } = useUserProfile();
  const { data: settings } = useAppSettings();
  const saveSettings = useSaveAppSettings();

  const isLoggedIn = !!identity && !identity.getPrincipal().isAnonymous();
  const principalStr = identity?.getPrincipal().toString() ?? "";
  const shortPrincipal = principalStr
    ? `${principalStr.slice(0, 8)}...${principalStr.slice(-4)}`
    : "";

  const [darkMode, setDarkMode] = useState(
    settings?.theme !== Variant_dark_light.light,
  );
  const [notifications, setNotifications] = useState(
    settings?.notificationsEnabled ?? true,
  );

  const handleDarkToggle = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (isLoggedIn) {
      saveSettings.mutate({
        theme: next ? Variant_dark_light.dark : Variant_dark_light.light,
        notificationsEnabled: notifications,
      });
    }
  };

  const handleNotifToggle = () => {
    const next = !notifications;
    setNotifications(next);
    if (isLoggedIn) {
      saveSettings.mutate({
        theme: darkMode ? Variant_dark_light.dark : Variant_dark_light.light,
        notificationsEnabled: next,
      });
    }
  };

  const initials = profile?.name
    ? profile.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : isLoggedIn
      ? "U"
      : "G";

  const menuItems = [
    { icon: Globe, label: "Language", value: "English" },
    { icon: Clock, label: "Auto-clean Schedule", value: "Daily 3 AM" },
    { icon: Shield, label: "Privacy Policy", value: "" },
    { icon: Info, label: "About PhoneBoost Pro", value: "v2.1.0" },
    { icon: Star, label: "Rate App", value: "" },
    { icon: Share2, label: "Share App", value: "" },
  ];

  return (
    <div data-ocid="profile.page" className="pb-24 px-4 pt-4">
      <h1 className="text-xl font-bold mb-4">
        <span style={{ color: "var(--neon-purple)" }}>My</span> Profile
      </h1>

      {/* Avatar + Auth */}
      <div className="glass rounded-2xl p-5 mb-4 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.22 300), oklch(0.82 0.18 195))",
            boxShadow: "0 0 20px oklch(0.72 0.22 300 / 0.4)",
          }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-base">
            {profile?.name ?? (isLoggedIn ? "User" : "Guest User")}
          </p>
          {isLoggedIn ? (
            <p className="text-xs text-muted-foreground font-mono truncate">
              {shortPrincipal}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Sign in to sync data
            </p>
          )}
        </div>
        {isLoggedIn ? (
          <motion.button
            type="button"
            onClick={clear}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{
              background: "oklch(0.65 0.22 25 / 0.15)",
              border: "1px solid oklch(0.65 0.22 25 / 0.4)",
              color: "var(--neon-red)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={12} /> Sign Out
          </motion.button>
        ) : (
          <motion.button
            type="button"
            data-ocid="profile.signin_button"
            onClick={login}
            disabled={isLoggingIn}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.82 0.18 195), oklch(0.72 0.22 300))",
              color: "oklch(0.09 0.015 260)",
              boxShadow: "0 0 12px oklch(0.82 0.18 195 / 0.3)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogIn size={12} /> {isLoggingIn ? "Signing In..." : "Sign In"}
          </motion.button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { label: "Cleaned", value: "2.4 GB", color: "var(--neon-cyan)" },
          { label: "Boosts", value: "47", color: "var(--neon-purple)" },
          { label: "Scans", value: "12", color: "var(--neon-green)" },
        ].map((stat) => (
          <div key={stat.label} className="glass rounded-xl p-3 text-center">
            <p
              className="text-xl font-bold font-mono"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Theme Toggle */}
      <div className="glass rounded-2xl p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.72 0.22 300 / 0.15)" }}
            >
              <span className="text-base">{darkMode ? "🌙" : "☀️"}</span>
            </div>
            <div>
              <p className="text-sm font-semibold">Dark Theme</p>
              <p className="text-xs text-muted-foreground">App appearance</p>
            </div>
          </div>
          <button
            type="button"
            data-ocid="profile.theme.toggle"
            onClick={handleDarkToggle}
            className="relative w-12 h-6 rounded-full transition-all duration-300"
            style={{
              background: darkMode
                ? "var(--neon-purple)"
                : "oklch(0.25 0.02 260)",
            }}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
              animate={{ left: darkMode ? "26px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="glass rounded-2xl p-4 mb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.78 0.19 50 / 0.15)" }}
            >
              <Bell size={16} style={{ color: "var(--neon-orange)" }} />
            </div>
            <p className="text-sm font-semibold">Notifications</p>
          </div>
          <button
            type="button"
            data-ocid="profile.notifications.toggle"
            onClick={handleNotifToggle}
            className="relative w-12 h-6 rounded-full transition-all duration-300"
            style={{
              background: notifications
                ? "var(--neon-orange)"
                : "oklch(0.25 0.02 260)",
            }}
          >
            <motion.div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow"
              animate={{ left: notifications ? "26px" : "2px" }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="glass rounded-2xl overflow-hidden mb-4">
        {menuItems.map((item, i) => (
          <motion.button
            key={item.label}
            type="button"
            className="w-full flex items-center gap-3 p-4 text-left"
            style={{
              borderBottom:
                i < menuItems.length - 1
                  ? "1px solid oklch(1 0 0 / 0.05)"
                  : "none",
            }}
            whileHover={{ background: "oklch(1 0 0 / 0.03)" }}
            whileTap={{ scale: 0.99 }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "oklch(0.82 0.18 195 / 0.1)" }}
            >
              <item.icon size={16} style={{ color: "var(--neon-cyan)" }} />
            </div>
            <span className="flex-1 text-sm">{item.label}</span>
            {item.value && (
              <span className="text-xs text-muted-foreground">
                {item.value}
              </span>
            )}
            <ChevronRight size={14} className="text-muted-foreground" />
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground py-4">
        © {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
            typeof window !== "undefined" ? window.location.hostname : "",
          )}`}
          className="underline"
          style={{ color: "var(--neon-cyan)" }}
          target="_blank"
          rel="noopener noreferrer"
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}
