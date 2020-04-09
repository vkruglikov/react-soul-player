import React from 'react';

import styles from './Time.module.css';

const toHHMMSS = (_seconds) => {
    let hours   = Math.floor(_seconds / 3600);
    let minutes = Math.floor((_seconds - (hours * 3600)) / 60);
    let seconds = Math.floor(_seconds - (hours * 3600) - (minutes * 60));

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return hours+':'+minutes+':'+seconds;
}

const Time = ({seconds}) => (
    <div className={styles.wrapper}>{toHHMMSS(seconds)}</div>
)

export default Time;