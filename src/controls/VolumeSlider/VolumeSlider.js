import React from 'react';

import {ReactComponent as FullIcon} from './speaker.svg'
import styles from './VolumeSlider.module.css';

const VolumeSlider = ({onClick, status}) => (
    <button onClick={onClick} className={styles.wrapper}>
        <div className={styles.container}>
            <FullIcon />
        </div>
    </button>
)

export default VolumeSlider;