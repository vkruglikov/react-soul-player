import React from 'react';

import styles from './TextSaver.module.css';

const TextSaver = ({children, title}) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{children}</div>
        </div>
    );
}

TextSaver.defaultProps = {
    color: '#fff'
}

export default TextSaver;