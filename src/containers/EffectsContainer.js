import React from 'react';
import {useSelector} from "react-redux";

import AbstractEffect from "./AbstractEffect";
import {getPlayerState} from "../redux/selectors";

import TextSaver from "../effects/TextSaver";

import styles from "../VideoPlayer.module.css";

const EffectsContainer = ({playerId}) => {
    const currentTime = useSelector((state) => getPlayerState(state, playerId).currentTime);

    return (
        <div className={styles.customContainer}>
            <AbstractEffect
                timeStart={3}
                timeEnd={7}
                currentTime={currentTime}
            >
                <TextSaver title={'Дорога в ад'}>Много людей хотели это сделать, но не смогли</TextSaver>
            </AbstractEffect>
        </div>
    )
}

export default EffectsContainer;