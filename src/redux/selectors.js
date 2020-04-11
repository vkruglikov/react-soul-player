export const getPlayerRootState = (state) => state.player;
export const getPlayerState = (state, id) => getPlayerRootState(state)[id];