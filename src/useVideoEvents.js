import {useEffect, useRef} from "react";

const getBuffered = (buffered, currentTime) => {
    if (buffered.length) {
        for (let i = 0; i <= buffered.length - 1; i++) {
            if (currentTime >= buffered.start(i) && currentTime < buffered.end(i)) {
                return buffered.end(i);
            }
        }
    }

    return 0;
}

const useVideoEvents = ({ toggleFullScreen, metaData, playVideo, pauseVideo, setMetaData, playerContainerElRef }) => {

    useEffect(() => {
        /* Standard syntax */
        playerContainerElRef.current.addEventListener("fullscreenchange", function(event) {
            setMetaData((state) => ({
                ...state,
                fullScreen: document.fullscreenElement === playerContainerElRef.current
            }));
        });
        /* Firefox */
        playerContainerElRef.current.addEventListener("mozfullscreenchange", function(event) {
            setMetaData((state) => ({
                ...state,
                fullScreen: document.fullscreenElement === playerContainerElRef.current
            }));
        });
        /* Chrome, Safari and Opera */
        playerContainerElRef.current.addEventListener("webkitfullscreenchange", function(event) {
            setMetaData((state) => ({
                ...state,
                fullScreen: document.fullscreenElement === playerContainerElRef.current
            }));
        });
        /* IE / Edge */
        playerContainerElRef.current.addEventListener("msfullscreenchange", function(event) {
            setMetaData((state) => ({
                ...state,
                fullScreen: document.fullscreenElement === playerContainerElRef.current
            }));
        });
    }, [playerContainerElRef, setMetaData]);

    const detailsRef = useRef({
        mouseActiveInterval: null
    });

    return {
        onMouseMove: () => {
            if (!metaData.mouseActive) {
                setMetaData((state) => ({
                    ...state,
                    mouseActive: true
                }));
            }

            clearInterval(detailsRef.current.mouseActiveInterval);
            detailsRef.current.mouseActiveInterval = setTimeout(() => {
                setMetaData((state) => ({
                    ...state,
                    mouseActive: false
                }));
            }, 5000);
        },
        onDoubleClick: () => {
            toggleFullScreen();
        },
        onClick: () => {
            if (metaData.paused) {
                playVideo();
            } else {
                pauseVideo();
            }
        },
        onPause: (event) => {
            setMetaData((state) => ({
                ...state,
                paused: true
            }));
        },
        onPlay: (event) => {
            setMetaData((state) => ({
                ...state,
                paused: false
            }));
        },
        onLoadedMetadata: (event) => {
            const buffered = getBuffered(event.target.buffered, event.target.currentTime);
            const currentTime = event.target.currentTime;
            const duration = event.target.duration;
            const paused = event.target.paused;
            const fullScreen = document.fullscreenElement === playerContainerElRef.current;

            setMetaData((state) => ({
                ...state,
                loadedMetadata: true,
                paused,
                duration,
                buffered,
                waiting: false,
                currentTime,
                fullScreen,
                mouseActive: false
            }));
        },
        onWaiting: () => {
            setMetaData((state) => ({
                ...state,
                waiting: true,
            }));
        },
        onPlaying: () => {
            setMetaData((state) => ({
                ...state,
                waiting: false,
            }));
        },
        onProgress: (event) => {
            const buffered = getBuffered(event.target.buffered, event.target.currentTime);

            setMetaData((state) => ({
                ...state,
                buffered,
            }));
        },
        onDurationChange: (event) => {
            const duration = event.target.duration;
            setMetaData((state) => ({
                ...state,
                duration,
            }));
        },
        onTimeUpdate: (event) => {
            const buffered = getBuffered(event.target.buffered, event.target.currentTime);
            const currentTime = event.target.currentTime;

            setMetaData((state) => ({
                ...state,
                buffered: buffered,
                currentTime,
            }));
        }
    }
}

export default useVideoEvents;