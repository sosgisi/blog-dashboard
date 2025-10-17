'use client'

import { DarkMode, LightMode } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function ThemeToggle() {

    const [theme, setTheme] = useState<string|null>(null);

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if(storedTheme){
            setTheme(storedTheme)
            document.documentElement.setAttribute('data-theme', storedTheme);
        }
    }, [setTheme])

    const handleToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme)
    }

    return (
        <button onClick={handleToggle}>
            {theme === 'light' ? <DarkMode/> : <LightMode/> }
        </button>
    )
}