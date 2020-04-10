import React, {useRef} from "react";
import classNames from 'classnames';

import ProgressControl from './controls/ProgressControl';
import PlayButton, {PlayButtonAbsolute} from './controls/PlayButton';
import FullScreenButton from './controls/FullScreenButton';
import VolumeSlider from './controls/VolumeSlider';
import Shadow from "./controls/Shadow";
import Time from "./controls/Time";

import usePlayerState from "./usePlayerState";
import useVideoEvents from "./useVideoEvents";
import useControlActions from "./useControlActions";

import styles from './VideoPlayer.module.css';

const VideoPlayer = () => {
    const playerContainerElRef = useRef();
    const videoElRef = useRef();
    const {
        metaData,
        setMetaData
    } = usePlayerState();

    const {
        togglePlayVideo,
        playVideo,
        pauseVideo,
        toggleFullScreen,
        setCurrentTime,
    } = useControlActions({
        videoElRef,
        playerContainerElRef,
        metaData,
        setMetaData
    });

    const {
        onClick,
        onDoubleClick,
        onMouseMove,
        ...videoEvents
    } = useVideoEvents({
        toggleFullScreen,
        metaData,
        setMetaData,
        playVideo,
        pauseVideo,
        playerContainerElRef,
    });

    return (
        <div
            className={styles.wrapper}
            ref={playerContainerElRef}
        >
            <div
                onClick={onClick}
                onMouseMove={onMouseMove}
                onDoubleClick={onDoubleClick}
                className={classNames(styles.videoContainer, {
                    [styles.videoContainer_hideMouse]: !metaData.mouseActive && !metaData.paused,
                })}
            >
                {metaData.paused && <PlayButtonAbsolute onClick={playVideo} />}
                <video {...videoEvents} ref={videoElRef} className={styles.video} controls={false}
                    style={{
                        // visibility: 'hidden'
                    }}
                >
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
                </video>
                <Shadow full={metaData.paused}  control={metaData.mouseActive || metaData.paused}/>
            </div>
            {metaData.loadedMetadata && (
                <div className={styles.control}>
                    <div className={styles.control__row}>
                        <ProgressControl
                            currentTime={metaData.currentTime}
                            buffered={metaData.buffered}
                            duration={metaData.duration}
                            onChange={setCurrentTime}
                        />
                    </div>
                    <div className={classNames(styles.control__row, styles.control__actions)}>
                        <div className={styles.control__actionsLeft}>
                            <PlayButton onClick={togglePlayVideo} paused={metaData.paused} />
                            <Time seconds={metaData.currentTime} />
                        </div>
                        <div className={styles.control__actionsRight}>
                            <FullScreenButton status={metaData.fullScreen} onClick={toggleFullScreen} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default VideoPlayer;