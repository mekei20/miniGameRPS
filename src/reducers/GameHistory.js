import {
    ADD_HISTORY,
    FINISH_GAME,
    INIT_HISTORY} from '../actions/index'

const initialState ={
    "history": [],
    "set_num": 1,
    "final_score_user":0,
    "final_score_com":0,
    "result":""
}

export default function GameHistory(state=initialState, action){
    switch (action.type) {        
        case ADD_HISTORY: // 게임 이력 추가.
            let value = action.value
            value['set'] = state.set_num

            if(action.value.win > action.value.lose){
                value['set_score'] = 1
                return {
                    ...state,
                    history: [...state.history, value],
                    set_num: state.set_num +1,
                    final_score_user: state.final_score_user + value['set_score']
                }
            }

            value['set_score'] = 0
            return {
                ...state,
                history: [...state.history, value],
                set_num: state.set_num +1,
                final_score_com: state.final_score_com + value['set_score']
            }
        case FINISH_GAME: // 새게임 시작.
            // state = 
            return {
                ...state,
                result: action.result
            };
        case INIT_HISTORY: // 새게임 시작.
            state = initialState
            return state;
        
        default:
           return state;
    }
}
// export default gameScore;