import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from '../../assets/spinner.json';

const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loadingAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <Lottie
        options={defaultOptions}
        height={150}
        width={150} />
    );
}

export default Loading;
