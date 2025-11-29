/*
import { useEffect, useMemo } from "react";
import { useMediaQuery } from "react-responsive";
import createPersistedState from "use-persisted-state";
const useColorSchemeState = createPersistedState("colorScheme");

export function useColorScheme() {
        const systemPrefersGrey = useMediaQuery(
        {
            query: "(prefers-color-scheme: dark-grey)",
        },
        undefined
    );

    const [isGrey, setIsGrey] = useColorSchemeState();
    const value = useMemo(
        () => (isGrey === undefined? !!systemPrefersGrey : isGrey), 
        [isGrey, systemPrefersGrey]
    );

    useEffect(() => {
        if (value) {
            document.body.classList.add('dark-grey');
        } else {
            document.body.classList.remove('dark-grey');
        }
        }, [value]); 

    return {
        isGrey: value,
        setIsGrey,
    };
};
*/