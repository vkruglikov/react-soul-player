import React from 'react';
import classNames from 'classnames';

import styles from './Shadow.module.css'

const Shadow = ({control, full}) => (
    <div className={styles.wrapper}>
        <div className={classNames(styles.controlTop__shadow, {
            [styles.shadow_show]: control
        })}></div>
        <div className={classNames(styles.controlBottom__shadow, {
            [styles.shadow_show]: control
        })}></div>
        <div className={classNames(styles.full__shadow, {
            [styles.shadow_show]: full
        })}></div>
    </div>
)

export default Shadow;