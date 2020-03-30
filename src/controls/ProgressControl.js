import React, {useRef} from 'react';
import classNames from 'classnames';

import styles from './ProgressControl.module.css';

const ProgressControl = ({buffered, currentTime, duration, onChange}) => {
    const railWrapperElRef = useRef();
    const wrapperElRef = useRef();

    const durationAsPercent = duration / 100;
    const bufferedPos = buffered / durationAsPercent;
    const currentTimePos = currentTime / durationAsPercent;

    const onMouseMove = (event) => {
        // console.log(railWrapperElRef.current.offsetWidth);
        // console.log(event.pageX - railWrapperElRef.current.offsetLeft);
    }
    const onMouseLeave = (event) => {
        // console.log(event.pageX);
        // console.log(event.target.offsetWidth);
        // console.log(event.pageX - event.target.offsetLeft);
    }
    const onClick = (event) => {
        const boundingClientRect = wrapperElRef.current.getBoundingClientRect();
        const clickPos = (event.pageX - boundingClientRect.left) / (boundingClientRect.width / 100);

        onChange(durationAsPercent * clickPos);
    }

    return (
        <div ref={wrapperElRef} className={styles.wrapper} onClick={onClick}>
            <div ref={railWrapperElRef} className={styles.railWrapper} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
                <div
                    className={styles.cursor}
                    style={{
                        left: `${currentTimePos}%`
                    }}
                ></div>
                <div className={styles.rail}></div>
                <div
                    className={classNames(styles.rail, styles.rail_buffer)}
                    style={{
                        width: `${bufferedPos}%`
                    }}
                ></div>
                <div
                    className={classNames(styles.rail, styles.rail_current)}
                    style={{
                        width: `${currentTimePos}%`
                    }}
                ></div>
            </div>
        </div>
    )
}

export default ProgressControl;