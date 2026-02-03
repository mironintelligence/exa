"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    // Only Dark mode supported as per core directive, but UI toggle included for aesthetic completion.
    const [theme, setTheme] = useState<'dark'>('dark');

    return (
        <div className="flex items-center p-1.5 bg-zinc-900 border border-white/5 rounded-2xl">
            <button className="h-8 w-8 flex items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg">
                <Moon className="w-4 h-4" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded-xl text-zinc-600 cursor-not-allowed opacity-50">
                <Sun className="w-4 h-4" />
            </button>
        </div>
    );
}
