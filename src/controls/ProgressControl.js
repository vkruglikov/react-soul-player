import React, {useRef, useEffect} from 'react';
import classNames from 'classnames';

import styles from './ProgressControl.module.css';

const ProgressControl = ({buffered, currentTime, duration, onChange}) => {
    const railWrapperElRef = useRef();
    const wrapperElRef = useRef();
    const details = useRef({
        dragStart: false,
    });

    const durationAsPercent = duration / 100;
    const bufferedPos = buffered / durationAsPercent;
    const currentTimePos = currentTime / durationAsPercent;

    const move = (pageX) => {
        const boundingClientRect = wrapperElRef.current.getBoundingClientRect();
        const clickPos = (pageX - boundingClientRect.left) / (boundingClientRect.width / 100);
        const requestTime = durationAsPercent * clickPos;


        if (requestTime < 0) {
            onChange(0);
        } else if (requestTime > duration) {
            onChange(duration);
        } else {
            onChange(requestTime);
        }
    }

    const onMouseMove = (event) => {
        if (!details.current.dragStart) return;

        event.preventDefault();
        move(event.pageX);
    }
    const onMouseDown = (event) => {
        if (event.target !== wrapperElRef.current && !wrapperElRef.current.contains(event.target)) return;

        details.current.dragStart = true;
        move(event.pageX);
    }
    const onMouseLeave = () => {
        details.current.dragStart = false;
    }
    const onMouseUp = () => {
        details.current.dragStart = false;
    }

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);

        const remove = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);
        }

        return remove;
    }, [onMouseUp, onMouseDown, onMouseMove]);

    return (
        <div
            ref={wrapperElRef}
            className={styles.wrapper}
        >
            <div ref={railWrapperElRef} className={styles.railWrapper} >
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