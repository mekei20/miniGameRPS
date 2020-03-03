import {GAME_LOSE, 
    GAME_WIN,
    INIT_PLAY
    } from '../actions/index'

const initialState ={
    "total_win":0,
    "total_lose":0,
    // "total_draw":0,
    // "history":[]
}

export default function gameScore(state=initialState, action){
    switch (action.type) {
        case GAME_WIN: // Game 이겼을때
            return {
                ...state,
                total_win:state.total_win +1,

            }
            
        case GAME_LOSE:
            return {
                ...state,
                total_lose:state.total_lose +1,

            }
        case INIT_PLAY: // 게임 이력 초기화.
            state = initialState
            return state;
        default:
           return state;
    }
}
// export default gameScore;