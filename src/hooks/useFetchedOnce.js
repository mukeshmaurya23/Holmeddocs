
import { useEffect, useState } from 'react';

export function useFetchedOnce(fetchAction) {
    const [hasFetchedData, setHasFetchedData] = useState(
        localStorage.getItem(`${fetchAction}_fetched`) === 'true'
    );

    useEffect(() => {
        if (!hasFetchedData) {
            fetchAction();
            setHasFetchedData(true);
            localStorage.setItem(`${fetchAction}_fetched`, 'true');
        }
    }, [fetchAction, hasFetchedData]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.removeItem(`${fetchAction}_fetched`);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [fetchAction]);

    return hasFetchedData;
}
