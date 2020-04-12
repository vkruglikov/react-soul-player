import {ROOT_REDUCER} from "./constants";

export const getPlayerRootState = (state) => state[ROOT_REDUCER];
export const getPlayerState = (state, id) => getPlayerRootState(state)[id];