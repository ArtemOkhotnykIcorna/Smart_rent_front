import {useEffect, useState} from "react";

export const   useDarkMode = () => {
    const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleThemeChange = (event) => {
            setTheme(event.matches);
        };

        darkModeMediaQuery.addEventListener('change', handleThemeChange);

        // Set initial theme based on the media query
        setTheme(darkModeMediaQuery.matches);

        return () => {
            darkModeMediaQuery.removeEventListener('change', handleThemeChange);
        };
    }, []);

    return theme;
};
