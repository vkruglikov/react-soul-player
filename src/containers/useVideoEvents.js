import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    ON_DURATION_CHANGE_ACTION, ON_FULL_SCREEN_CHANGE_ACTION, ON_LOADED_META_DATA_ACTION,
    ON_PAUSE_ACTION,
    ON_PLAY_ACTION,
    ON_PLAYING_ACTION,
    ON_PROGRESS_ACTION, ON_TIME_UPDATE_ACTION,
    ON_WAITING_ACTION
} from "../redux/constants";

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

const useVideoEvents = ({ playerId, playerContainerElRef }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handler = () => {
            dispatch({
                type: ON_FULL_SCREEN_CHANGE_ACTION,
                playerId,
                payload: document.fullscreenElement === playerContainerElRef.current
            });
        };
        playerContainerElRef.current.addEventListener("fullscreenchange", handler);

        const unsubscribe = () => {
            playerContainerElRef.current && playerContainerElRef.current.removeEventListener("fullscreenchange", handler);
        }

        return unsubscribe;
    }, [dispatch, playerContainerElRef, playerId]);


    return {
        onPause: (event) => {
            dispatch({type: ON_PAUSE_ACTION, playerId});
        },
        onPlay: (event) => {
            dispatch({type: ON_PLAY_ACTION, playerId});
        },
        onLoadedMetadata: (event) => {
            dispatch({
                type: ON_LOADED_META_DATA_ACTION,
                playerId,
                payload: {
                    buffered: getBuffered(event.target.buffered, event.target.currentTime)
                }
            });
        },
        onWaiting: () => {
            dispatch({type: ON_WAITING_ACTION, playerId});
        },
        onPlaying: () => {
            dispatch({type: ON_PLAYING_ACTION, playerId});
        },
        onProgress: (event) => {
            dispatch({
                type: ON_PROGRESS_ACTION,
                playerId,
                payload: getBuffered(event.target.buffered, event.target.currentTime)
            });
        },
        onDurationChange: (event) => {
            dispatch({
                type: ON_DURATION_CHANGE_ACTION,
                playerId,
                payload: event.target.duration
            });
        },
        onTimeUpdate: (event) => {
            dispatch({
                type: ON_TIME_UPDATE_ACTION,
                playerId,
                payload: {
                    currentTime: event.target.currentTime,
                    buffered: event.target.buffered,
                }
            });
        }
    }
}

export default useVideoEvents;