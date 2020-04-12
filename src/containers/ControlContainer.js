import React, {memo} from 'react';
import classNames from "classnames";
import {useSelector} from "react-redux";

import PlayButton, {PlayButtonAbsolute} from "../controls/PlayButton";
import ProgressControl from "../controls/ProgressControl";
import Time from "../controls/Time";
import FullScreenButton from "../controls/FullScreenButton";
import {getPlayerState} from "../redux/selectors";
import useControlActions from "./useControlActions";

import EffectsContainer from "./EffectsContainer";

import styles from "./ControlContainer.module.css";

const ControlContainer = ({playerId, videoElRef, playerContainerElRef, effects}) => {
    const {
        loadedMetadata,
        paused,
        currentTime,
        buffered,
        duration,
        fullScreen
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
            <div className={styles.control}>
                <div className={styles.control__row}>
                    <ProgressControl
                        videoElRef={videoElRef}
                        currentTime={currentTime}
                        buffered={buffered}
                        duration={duration}
                        onChange={setCurrentTime}
                    />
                </div>
                <div className={classNames(styles.control__row, styles.control__actions)}>
                    <div className={styles.control__actionsLeft}>
                        <PlayButton onClick={togglePlayVideo} paused={paused} />
                        <Time seconds={currentTime} />
                    </div>
                    <div className={styles.control__actionsRight}>
                        <FullScreenButton status={fullScreen} onClick={toggleFullScreen} />
                    </div>
                </div>
            </div>
        </div>
    ) : null
}
export default memo(ControlContainer);