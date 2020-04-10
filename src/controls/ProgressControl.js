import React, {useRef, useEffect, useCallback} from 'react';
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

    const move = useCallback((pageX) => {
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
    }, [duration, durationAsPercent, onChange])

    const onMouseMove = useCallback((event) => {
        if (!details.current.dragStart) return;

        event.preventDefault();
        move(event.pageX || event.touches[0].pageX);
    }, [move])
    const onMouseDown = useCallback((event) => {
        if (event.target !== wrapperElRef.current && !wrapperElRef.current.contains(event.target)) return;

        details.current.dragStart = true;
        move(event.pageX || event.touches[0].pageX);
    }, [move]);
    const onMouseLeave = useCallback(() => {
        details.current.dragStart = false;
    }, []);
    const onMouseUp = useCallback(() => {
        details.current.dragStart = false;
    }, []);

    useEffect(() => {
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseleave', onMouseLeave);

        document.addEventListener('touchend', onMouseUp, {passive:false});
        document.addEventListener('touchstart', onMouseDown, {passive:false});
        document.addEventListener('touchmove', onMouseMove, {passive:false});
        document.addEventListener('touchcancel', onMouseLeave, {passive:false});

        const remove = () => {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseleave', onMouseLeave);

            document.removeEventListener('touchend', onMouseUp);
            document.removeEventListener('touchstart', onMouseDown);
            document.removeEventListener('touchmove', onMouseMove);
            document.removeEventListener('touchcancel', onMouseLeave);
        }

        return remove;
    }, [onMouseUp, onMouseDown, onMouseMove, onMouseLeave]);

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