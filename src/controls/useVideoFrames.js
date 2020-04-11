import {useMemo, useEffect, useCallback, useState} from 'react';

const useVideoFrames = ({
    videoElRef,
}) => {
    const videoForRenderFrames = useMemo(() => videoElRef.current.cloneNode(true), [videoElRef]);
    const canvas = useMemo(() => document.createElement('canvas'), []);


    useEffect(() => {
        videoForRenderFrames.mute = true;
        videoForRenderFrames.pause();

        videoForRenderFrames.addEventListener('loadedmetadata', () => {
            canvas.width = videoForRenderFrames.videoWidth;
            canvas.height = videoForRenderFrames.videoHeight;
        });
    }, [canvas, videoForRenderFrames]);

    const drawImageFrame = useCallback((time) => {
        const ctx = canvas.getContext('2d');
        videoForRenderFrames.currentTime = time;

        ctx.drawImage(videoForRenderFrames, 0, 0);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/jpeg');
        });
    }, [canvas, videoForRenderFrames]);

    return drawImageFrame;
}

export default useVideoFrames;