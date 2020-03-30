import React, {useRef} from "react";
import classNames from 'classnames';

import ProgressControl from './controls/ProgressControl';
import PlayButton from './controls/PlayButton';
import FullScreenButton from './controls/FullScreenButton';
import Shadow from "./controls/Shadow";

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
                {metaData.paused && <PlayButton onClick={playVideo} />}
                <video {...videoEvents} ref={videoElRef} className={styles.video} controls={false}
                    style={{
                        // visibility: 'hidden'
                    }}
                >
                    <source src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" type="video/mp4" />
                </video>
            </div>
            <Shadow full={metaData.paused}  control={metaData.mouseActive || metaData.paused}/>
            {metaData.loadedMetadata && (
                <div className={styles.control}>
                    <ProgressControl
                        currentTime={metaData.currentTime}
                        buffered={metaData.buffered}
                        duration={metaData.duration}
                        onChange={setCurrentTime}
                    />
                    <FullScreenButton status={metaData.fullScreen} onClick={toggleFullScreen} />
                </div>
            )}
        </div>
    )
}

export default VideoPlayer;