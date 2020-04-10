import React from 'react';

import {ReactComponent as PlayIcon} from './play.svg'
import {ReactComponent as PauseIcon} from './pause.svg'
import styles from './PlayIcon.module.css';

const PlayButton = ({onClick, paused}) => (
    <button onClick={onClick} className={styles.wrapper}>
        {!paused ? <PauseIcon fill={'#fff'} /> : <PlayIcon fill={'#fff'} />}
    </button>
)

export default PlayButton;