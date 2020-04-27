import React, {memo, useEffect} from 'react';
import classNames from "classnames";
import {useSelector} from "react-redux";
import  enableInlineVideo from 'iphone-inline-video';

import {getPlayerState} from "../redux/selectors";

import Shadow from "../controls/Shadow";
import useVideoEvents from "./useVideoEvents";

import styles from './VideoContainer.module.css';


const ControlContainer = ({src, playerId, videoElRef, playerContainerElRef}) => {
    const mouseActive = useSelector((state) => getPlayerState(state, playerId).mouseActive);
    const paused = useSelector((state) => getPlayerState(state, playerId).paused);

    const videoEventHandlers = useVideoEvents({
        playerId,
        playerContainerElRef,
    });

    useEffect(() => {
        enableInlineVideo(videoElRef.current);
    }, [videoElRef]);

    return (
        <div
            className={classNames(styles.videoContainer, {
                [styles.videoContainer_hideMouse]: !mouseActive && !paused,
            })}
        >
            <video
                {...videoEventHandlers}
                ref={videoElRef}
                className={styles.video}
                src={src}
                controls={false}
                playsInline={true}
            />
            <Shadow full={paused}  control={mouseActive || paused}/>
        </div>
    )
}
export default memo(ControlContainer);