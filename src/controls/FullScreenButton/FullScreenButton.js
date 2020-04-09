import React from 'react';

import {ReactComponent as FullIcon} from './full-screen.svg'
import {ReactComponent as ExitIcon} from './exit.svg'
import styles from './FullScreenButton.module.css';

const FullScreenButton = ({onClick, status}) => (
    <button onClick={onClick} className={styles.wrapper}>
        <div className={styles.container}>
            {status ? <ExitIcon fill={'#fff'} /> : <FullIcon fill={'#fff'} /> }
        </div>
    </button>
)

export default FullScreenButton;