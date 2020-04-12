import {
    INIT_ACTION,
    ON_PAUSE_ACTION,
    ON_PLAY_ACTION,
    ON_WAITING_ACTION,
    ON_PLAYING_ACTION,
    ON_PROGRESS_ACTION,
    ON_DURATION_CHANGE_ACTION,
    ON_LOADED_META_DATA_ACTION,
    ON_TIME_UPDATE_ACTION,
    ON_FULL_SCREEN_CHANGE_ACTION, SET_CURRENT_TIME_ACTION, SET_MOUSE_ACTIVE_ACTION
} from "./constants";


const updatePlayerState = (state, playerId, updater) => ({
    ...state,
    [playerId]: updater(state[playerId])
});

const player = (state = {}, action) => {
    switch (action.type) {
        case SET_MOUSE_ACTIVE_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                mouseActive: action.payload,
            }));
        case SET_CURRENT_TIME_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                currentTime: action.payload,
            }));
        case ON_PAUSE_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                paused: true
            }));
        case ON_PLAY_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                paused: false
            }));
        case ON_WAITING_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                waiting: true
            }));
        case ON_PLAYING_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                waiting: false
            }));
        case ON_PROGRESS_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                buffered: action.payload
            }));
        case ON_DURATION_CHANGE_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                duration: action.payload
            }));
        case ON_LOADED_META_DATA_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                loadedMetadata: true,
                buffered: action.payload.buffered
            }));
        case ON_TIME_UPDATE_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                currentTime: action.payload.currentTime,
                buffered: action.payload.buffered
            }));
        case ON_FULL_SCREEN_CHANGE_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                ...playerState,
                fullScreen: action.payload
            }));
        case INIT_ACTION:
            return updatePlayerState(state, action.playerId, (playerState) => ({
                duration: 0,
                buffered: 0,
                currentTime: 0,
                loadedMetadata: false,
                paused: true,
                waiting: false,
                fullScreen: false,
                mouseActive: true,
            }));
        default:
            return state
    }
}

export default player;