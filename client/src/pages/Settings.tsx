import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center gap-3 mb-10">
          <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <div className="p-3 bg-indigo-600 rounded-xl">
            <Settings className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        </header>

        <div className="grid gap-8">
          {/* Account Settings */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-slate-800">Account</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Privacy & Security */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-slate-800">
                Privacy & Security
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors pr-10"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-slate-800">
                Preferences
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">Dark Mode</h3>
                  <p className="text-sm text-slate-600">
                    Switch between light and dark theme
                  </p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    darkMode ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      darkMode ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    Auto-save Entries
                  </h3>
                  <p className="text-sm text-slate-600">
                    Automatically save your journal entries
                  </p>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    autoSave ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      autoSave ? "translate-x-7" : "translate-x-1"
                    }`}
                  ></div>
                </button>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Language
                </label>
                <select className="w-full p-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Italian</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-slate-800">
                Notifications
              </h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">
                  Push Notifications
                </h3>
                <p className="text-sm text-slate-600">
                  Receive reminders to write in your journal
                </p>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  notifications ? "bg-indigo-600" : "bg-slate-300"
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications ? "translate-x-7" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </section>

          {/* Save Actions */}
          <div className="flex gap-4">
            <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-4 px-6 rounded-xl transition-colors">
              Cancel
            </button>
            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
