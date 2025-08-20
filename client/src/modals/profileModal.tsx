import { useState } from "react";
import { User, Settings, BookOpen, Info, LogIn, X } from "lucide-react";

export default function ProfileModal() {
  const [open, setOpen] = useState(true);

  return (
      <div className="bg-white absolute top-24 right-4 rounded-2xl shadow-2xl border border-slate-100 w-80 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <User className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-lg font-bold text-slate-900">Menu</h2>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="space-y-2">
          <a
            href="/login"
            className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="p-1 bg-indigo-100 group-hover:bg-indigo-600 rounded-lg transition-colors">
              <LogIn className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
              Login
            </span>
          </a>

          <a
            href="/settings"
            className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="p-1 bg-indigo-100 group-hover:bg-indigo-600 rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
              Settings
            </span>
          </a>

          <a
            href="/journal"
            className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="p-1 bg-indigo-100 group-hover:bg-indigo-600 rounded-lg transition-colors">
              <BookOpen className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
              My Journal
            </span>
          </a>

          <a
            href="/about"
            className="flex items-center gap-3 p-3 bg-slate-50 border-2 border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-white hover:shadow-lg transition-all group"
          >
            <div className="p-1 bg-indigo-100 group-hover:bg-indigo-600 rounded-lg transition-colors">
              <Info className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-indigo-600">
              About
            </span>
          </a>
        </nav>
      </div>
  );
}
