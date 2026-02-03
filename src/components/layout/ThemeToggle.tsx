"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";

export function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');

    useEffect(() => {
        // Standardize to dark on mount
        document.documentElement.classList.add('dark');
    }, []);

    const toggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="flex items-center p-1 bg-white/5 rounded-full border border-white/10">
            <button
                onClick={() => toggle()}
                className={`p-1.5 rounded-full transition-all ${theme === 'dark' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
                <Moon className="w-4 h-4" />
            </button>
            <button
                onClick={() => toggle()}
                className={`p-1.5 rounded-full transition-all ${theme === 'light' ? 'bg-blue-600 text-white' : 'text-zinc-500 hover:text-white'}`}
            >
                <Sun className="w-4 h-4" />
            </button>
        </div>
    );
}
