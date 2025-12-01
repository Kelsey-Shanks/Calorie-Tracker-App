import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export const DarkToggle = () => {
    // Toggles appearance preference:
    const systemPrefersDarkGrey = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark-grey)"
        }, 
        undefined,
        prefersDarkGrey => {
            setIsDarkGrey(prefersDarkGrey);
        }
    );

    const [isDarkGrey, setIsDarkGrey] = useState(systemPrefersDarkGrey);

    useEffect(() => {
        if (isDarkGrey) {
            document.documentElement.classList.add("dark-grey")
        } else {
            document.documentElement.classList.remove("dark-grey");
        }
    }, [isDark]);

    return(                                                 // change appearance with selection
        <>

        </>
    );
}

