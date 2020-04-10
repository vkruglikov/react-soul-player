import {useCallback} from 'react';

const useControlActions = ({
    setMetaData,
    videoElRef,
    playerContainerElRef,
    metaData,
}) => {
    const playVideo = useCallback(() => {
        videoElRef.current.play()
    }, [videoElRef]);

    const togglePlayVideo = useCallback(() => {
        if (metaData.paused) {
            videoElRef.current.play()
        } else {
            videoElRef.current.pause()
        }
    }, [videoElRef, metaData]);

    const pauseVideo = useCallback(() => {
        videoElRef.current.pause()
    }, [videoElRef]);

    const fullScreen = useCallback(() => {
        const video = playerContainerElRef.current;
        const rfs = video.requestFullscreen || video.webkitRequestFullScreen || video.mozRequestFullScreen || video.msRequestFullscreen;

        rfs.call(playerContainerElRef.current);
    }, [playerContainerElRef]);

    const exitFullscreen = useCallback(() => {
        document.exitFullscreen();
    }, []);

    const toggleFullScreen = useCallback(() => {
        if (metaData.fullScreen) {
            exitFullscreen();
        } else {
            fullScreen();
        }
    }, [exitFullscreen, fullScreen, metaData.fullScreen]);

    const setCurrentTime = useCallback((time) => {
        videoElRef.current.currentTime = time;
        setMetaData((values) => ({
            ...values,
            currentTime: time
        }));
    }, [setMetaData, videoElRef]);

    return {
        togglePlayVideo,
        playVideo,
        pauseVideo,
        fullScreen,
        exitFullscreen,
        toggleFullScreen,
        setCurrentTime
    }
}

export default useControlActions;