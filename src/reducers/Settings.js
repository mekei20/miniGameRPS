import {
    UPDATE_SETTING_ROUND, 
    UPDATE_SETTING_TIME,
    UPDATE_SETTING_SETS,
    REDUCE_TIME,
    } from '../actions/index'

// import {GAME_WIN} from '../actions/index'
// import {GAME_DRAW} from '../actions/index'

const initialState ={
    "setting_sec":10,
    "display_sec":10,
    "setting_game_count":2,
    // "left_game_count":2,
    "setting_game_sets":2,
    // "left_game_sets":2
}

export default function Settings(state=initialState, action){
    switch (action.type) {
        case UPDATE_SETTING_ROUND:
            return {
                ...state,                
                setting_game_count: action.setting_game_count,
            }            
        case UPDATE_SETTING_TIME:
            return {
                ...state,
                setting_sec: action.setting_sec,
                display_sec: action.display_sec,
            }  
        case UPDATE_SETTING_SETS:
            return {
                ...state,
                setting_game_sets: action.setting_game_sets,
            }  
        case REDUCE_TIME:
            return {
                ...state,
                display_sec: state.display_sec - 1,
            }      
        default:
           return state;
    }
}
// export default gameScore;