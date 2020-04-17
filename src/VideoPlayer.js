import React, {useRef, useEffect, useState} from "react";
import ReactDOM from 'react-dom';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import classNames from 'classnames';

import ControlContainer from "./containers/ControlContainer";
import VideoContainer from "./containers/VideoContainer";

import {getPlayerState} from "./redux/selectors";
import {initPlayerAction} from "./redux/actions";

import styles from './VideoPlayer.module.css';


const VideoPlayer = ({id: playerId, children}) => {
    const playerContainerElRef = useRef();
    const videoElRef = useRef();

    const isInitialized = useSelector((state) => !!getPlayerState(state, playerId));
    const fullScreen = useSelector((state) => getPlayerState(state, playerId) && getPlayerState(state, playerId).fullScreen);
    const fullScreenEnabled = useSelector((state) => getPlayerState(state, playerId) && getPlayerState(state, playerId).fullScreenEnabled);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initPlayerAction(playerId));
    }, [dispatch, playerId]);

    useEffect(() => {
        if (fullScreenEnabled) return;
        
        if (fullScreen) {
            document.body.classList.add(styles.body_customFullscreen);
        } else {
            document.body.classList.remove(styles.body_customFullscreen);
        }
    }, [fullScreen, fullScreenEnabled]);

    return (
        <div
            className={classNames(styles.wrapper, {
                [styles.wrapper_fullScreen]: fullScreen,
                [styles.wrapper_customFullscreen]: fullScreen && !fullScreenEnabled
            })}
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

VideoPlayer.propTypes = {
    id: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    classNameControl: PropTypes.string
}


export default VideoPlayer;