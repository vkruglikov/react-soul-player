import React from 'react';

import {ReactComponent as PlayIcon} from './play.svg'
import styles from './PlayIcon.module.css';

const PlayButton = ({onClick}) => (
    <button onClick={onClick} className={styles.wrapper}>
        <div className={styles.circleWrapper}>
            <PlayIcon fill={'#fff'} />
        </div>
    </button>
)

export default PlayButton;