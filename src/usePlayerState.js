import {useState} from 'react';

const usePlayerState = () => {
    const [metaData, setMetaData] = useState({
        duration: 0,
        buffered: {
            // start: event.nativeEvent.target.buffered.start(0),
            // end: event.nativeEvent.target.buffered.end(0),
        },
        currentTime: 0,
    });

    return {
        metaData,
        setMetaData,
    }
}

export default usePlayerState;