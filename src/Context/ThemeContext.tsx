import React, {createContext,useContext, useEffect,useState} from "react";

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: (mode: 'dark' | 'light') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
        } else {            
            document.body.classList.add('light-mode');
        }
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    
    const toggleTheme = (mode: 'dark' | 'light') => {
        setIsDarkMode(mode === 'dark');
        localStorage.setItem('theme', mode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context =useContext(ThemeContext);
    if (!context){ throw new Error("useTheme must be used within a ThemeProvider");

    }
    return context;
};