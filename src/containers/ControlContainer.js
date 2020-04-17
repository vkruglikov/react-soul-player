import React, {memo, useEffect} from 'react';
import classNames from "classnames";
import {useSelector, useDispatch} from "react-redux";

import {PlayButtonAbsolute} from "../controls/PlayButton";
import ProgressControl from "../controls/ProgressControl";
import Time from "../controls/Time";
import FullScreenButton from "../controls/FullScreenButton";
import {getPlayerState} from "../redux/selectors";
import useControlActions from "./useControlActions";

import EffectsContainer from "./EffectsContainer";
import fullScreenUtils from "./fullScreenUtils";

import styles from "./ControlContainer.module.css";
import {ON_FULL_SCREEN_CHANGE_ACTION} from "../redux/constants";

const ControlContainer = ({playerId, videoElRef, playerContainerElRef, effects}) => {
    const {
        loadedMetadata,
        paused,
        currentTime,
        buffered,
        duration,
        fullScreen,
        fullScreenEnabled,
    } = useSelector((state) => getPlayerState(state, playerId));

    const {
        playVideo,
        togglePlayVideo,
        toggleFullScreen,
        setCurrentTime,
        onMouseMove,
    } = useControlActions({
        playerId,
        videoElRef,
        playerContainerElRef,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        if (!fullScreenEnabled) return;

        const handler = () => {
            const isFullscreen = fullScreenUtils.fullscreenElement === playerContainerElRef.current;

            if (fullScreen === isFullscreen) return;

            dispatch({
                type: ON_FULL_SCREEN_CHANGE_ACTION,
                playerId,
                payload: isFullscreen
            });
        };

        fullScreenUtils.addEventListener(handler)

        return () => {
            fullScreenUtils.removeEventListener(handler);
        }
    }, [dispatch, fullScreen, fullScreenEnabled, playerContainerElRef, playerId]);

    return loadedMetadata ? (
        <div
            className={styles.controlContainer}
        >
            <div
                onClick={togglePlayVideo}
                onMouseMove={onMouseMove}
                className={styles.control__fullLayer}
            >
                <EffectsContainer playerId={playerId}>{effects}</EffectsContainer>
            </div>
            {paused && <PlayButtonAbsolute onClick={playVideo} />}
            <div className={classNames(styles.control, {
                [styles.control_fullScreen]: fullScreen
            })}>
                <div className={classNames(styles.control__row, styles.control__actions)}>
                    <div className={styles.control__actionsLeft}>
                        <Time seconds={currentTime} />
                    </div>
                    <div className={styles.control__actionsRight}>
                        <FullScreenButton status={fullScreen} onClick={toggleFullScreen} />
                    </div>
                </div>
                <div className={styles.control__row}>
                    <ProgressControl
                        videoElRef={videoElRef}
                        fullScreen={fullScreen}
                        currentTime={currentTime}
                        buffered={buffered}
                        duration={duration}
                        onChange={setCurrentTime}
                    />
                </div>
            </div>
        </div>
    ) : null
}
export default memo(ControlContainer);