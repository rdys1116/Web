import { useState } from 'react';

// default @param is set to phone screen size
const useMediaQueries = (mediaSize="(max-width: 400px)") => {
    const [isMatch, setIsMatch] = useState(window.matchMedia(mediaSize).matches);

    window.addEventListener('resize', () => {
        setIsMatch(window.matchMedia(mediaSize).matches);
    });

    return isMatch;
}

export default useMediaQueries;
