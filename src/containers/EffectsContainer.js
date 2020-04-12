import React from 'react';
import {useSelector} from "react-redux";

import {getPlayerState} from "../redux/selectors";

import styles from "../VideoPlayer.module.css";

const EffectsContainer = ({playerId, children}) => {
    const currentTime = useSelector((state) => getPlayerState(state, playerId).currentTime);

    return (
        <div className={styles.customContainer}>
            {React.Children.map(children, (child) => React.cloneElement(child, {
                currentTime
            }))}
        </div>
    )
}

export default EffectsContainer;