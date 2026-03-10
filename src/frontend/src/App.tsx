import { Toaster } from "@/components/ui/sonner";
import { Home, LayoutGrid, Shield, Sparkles, User, Wifi } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { CleanerPage } from "./pages/CleanerPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SecurityPage } from "./pages/SecurityPage";
import { TasksPage } from "./pages/TasksPage";
import { WiFiPage } from "./pages/WiFiPage";

type TabType = "home" | "cleaner" | "security" | "wifi" | "tasks" | "me";

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "cleaner", label: "Clean", icon: Sparkles },
  { id: "security", label: "Security", icon: Shield },
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "tasks", label: "Tasks", icon: LayoutGrid },
  { id: "me", label: "Me", icon: User },
];

const signalBars = [3, 5, 7, 9];

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  return (
    <div className="phone-frame">
      {/* Status Bar */}
      <div
        className="flex items-center justify-between px-5 pt-3 pb-1"
        style={{ background: "oklch(0.09 0.015 260)" }}
      >
        <span className="text-xs font-mono text-muted-foreground">9:41</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5 items-end">
            {signalBars.map((h, i) => (
              <div
                key={h}
                className="w-1 rounded-sm"
                style={{
                  height: `${h}px`,
                  background:
                    i < 3 ? "var(--neon-cyan)" : "oklch(0.3 0.02 260)",
                }}
              />
            ))}
          </div>
          <Wifi size={12} style={{ color: "var(--neon-cyan)" }} />
          <div className="flex items-center gap-1">
            <div
              className="w-5 h-2.5 rounded-sm border"
              style={{ borderColor: "oklch(0.82 0.2 150)" }}
            >
              <div
                className="h-full rounded-sm"
                style={{ width: "78%", background: "var(--neon-green)" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main
        className="overflow-y-auto"
        style={{ height: "calc(100dvh - 44px - 68px)" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {activeTab === "home" && <HomePage onNavigate={setActiveTab} />}
            {activeTab === "cleaner" && <CleanerPage />}
            {activeTab === "security" && <SecurityPage />}
            {activeTab === "wifi" && <WiFiPage />}
            {activeTab === "tasks" && <TasksPage />}
            {activeTab === "me" && <ProfilePage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <div className="flex items-center justify-around px-1 py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                data-ocid={`nav.${tab.id}.link`}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all ${
                  isActive ? "nav-active" : "text-muted-foreground"
                }`}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-tab-bg"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: "oklch(0.82 0.18 195 / 0.08)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  />
                )}
                <tab.icon size={20} />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.13 0.018 260)",
            border: "1px solid oklch(0.25 0.025 260)",
            color: "oklch(0.96 0.01 220)",
          },
        }}
      />
    </div>
  );
}
