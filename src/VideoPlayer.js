import React, {useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import ControlContainer from "./containers/ControlContainer";
import VideoContainer from "./containers/VideoContainer";

import styles from './VideoPlayer.module.css';
import {INIT_ACTION} from "./redux/constants";
import {getPlayerState} from "./redux/selectors";


const VideoPlayer = ({id: playerId, children}) => {
    const playerContainerElRef = useRef();
    const videoElRef = useRef();

    const isInitialized = useSelector((state) => !!getPlayerState(state, playerId));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: INIT_ACTION,
            playerId
        });
    }, [dispatch, playerId]);

    return (
        <div
            className={styles.wrapper}
            ref={playerContainerElRef}
        >
            {isInitialized && (
                <React.Fragment>
                    <VideoContainer
                        playerId={playerId}
                        videoElRef={videoElRef}
                        playerContainerElRef={playerContainerElRef}
                    />
                    <ControlContainer
                        effects={children}
                        playerId={playerId}
                        videoElRef={videoElRef}
                        playerContainerElRef={playerContainerElRef}
                    />
                </React.Fragment>
            )}
        </div>
    )
}

export default VideoPlayer;