import {useCallback, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {getPlayerState} from "../redux/selectors";
import {SET_CURRENT_TIME_ACTION, SET_MOUSE_ACTIVE_ACTION} from "../redux/constants";

const useControlActions = ({
    playerId,
    videoElRef,
    playerContainerElRef,
}) => {
    const dispatch = useDispatch();

    const isPaused = useSelector((state) => getPlayerState(state, playerId).paused);
    const isFullScreen = useSelector((state) => getPlayerState(state, playerId).fullScreen);
    const isMouseActive = useSelector((state) => getPlayerState(state, playerId).mouseActive);

    const playVideo = useCallback(() => {
        videoElRef.current.play()
    }, [videoElRef]);

    const togglePlayVideo = useCallback(() => {
        if (isPaused) {
            videoElRef.current.play()
        } else {
            videoElRef.current.pause()
        }
    }, [isPaused, videoElRef]);

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
        if (isFullScreen) {
            exitFullscreen();
        } else {
            fullScreen();
        }
    }, [exitFullscreen, fullScreen, isFullScreen]);

    const _setCurrentTime = useCallback((time) => {
        videoElRef.current.currentTime = time;
        dispatch({
            type: SET_CURRENT_TIME_ACTION,
            playerId,
            payload: time
        });
    }, [dispatch, playerId, videoElRef]);

    const detailsRef = useRef({
        mouseActiveInterval: null
    });

    const onMouseMove = useCallback(() => {
        if (!isMouseActive) {
            dispatch({
                type: SET_MOUSE_ACTIVE_ACTION,
                playerId,
                payload: true
            });
        }

        clearInterval(detailsRef.current.mouseActiveInterval);
        detailsRef.current.mouseActiveInterval = setTimeout(() => {
            dispatch({
                type: SET_MOUSE_ACTIVE_ACTION,
                playerId,
                payload: false
            });
        }, 5000);
    }, [dispatch, isMouseActive, playerId]);

    return {
        togglePlayVideo,
        playVideo,
        pauseVideo,
        fullScreen,
        exitFullscreen,
        toggleFullScreen,
        setCurrentTime: _setCurrentTime,
        onMouseMove
    }
}

export default useControlActions;