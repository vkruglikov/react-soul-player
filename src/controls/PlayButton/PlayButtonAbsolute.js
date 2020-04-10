import React from 'react';

import {ReactComponent as PlayIcon} from './play.svg'
import styles from './PlayIcon.module.css';

const PlayButtonAbsolute = ({onClick}) => (
    <button onClick={onClick} className={styles.absolute}>
        <div className={styles.circleWrapper}>
            <PlayIcon fill={'#fff'} />
        </div>
    </button>
)

export default PlayButtonAbsolute;