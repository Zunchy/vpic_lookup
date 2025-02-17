"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "system";
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const currentTheme = savedTheme === "system" ? (prefersDark ? "dark" : "light") : savedTheme;

        setTheme(currentTheme);
        document.documentElement.classList.toggle("dark", currentTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        console.log('I set the theme to: ' + theme);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 border rounded-full bg-gray-200 dark:bg-gray-800 dark:text-white"
        >
            {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
    );
}
