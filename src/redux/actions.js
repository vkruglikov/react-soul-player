import {INIT_ACTION} from "./constants";
import fullScreenUtils from "../containers/fullScreenUtils";

export const initPlayerAction = (playerId) => {
    const fullScreenEnabled = fullScreenUtils.enabled;

    return {
        type: INIT_ACTION,
        playerId,
        payload: {
            duration: 0,
            buffered: 0,
            currentTime: 0,
            loadedMetadata: false,
            paused: true,
            waiting: false,
            fullScreen: false,
            mouseActive: true,
            fullScreenEnabled
        }
    }
}