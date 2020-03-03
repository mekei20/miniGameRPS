export const GAME_WIN = "GAME_WIN";
export const GAME_LOSE = "GAME_LOSE";
export const GAME_DRAW = "GAME_DRAW";
export const ADD_HISTORY = "ADD_HISTORY";
export const INIT_HISTORY = "INIT_HISTORY";
export const INIT_PLAY = "INIT_PLAY";
export const FINISH_GAME = "FINISH_GAME";

// 게임 결과 추가 : 승리
export function updateWinGameResult(value){
    return ({
        type:GAME_WIN,
        value:value
    })
}
// 게임 결과 추가 : 패배
export function updateLoseGameResult(value){
    return ({
        type:GAME_LOSE,
        value:value
    })
}
// 게임 결과 추가 : 무승부
export function updateDrawGameResult(value){
    return ({
        type:GAME_DRAW,
        value:value
    })
}
// 세트 초기화
export function initSet(){
    return ({
        type:INIT_PLAY
    })
}
// 세트 결과 이력에 추가
export function addHistory(win,lose,draw){
    return ({
        type:ADD_HISTORY,
        value:{
            'win': win,
            'lose': lose,
            'draw': draw
        }
    })
}
// 게임 종료
export function finishHistory(result){
    return ({
        type:FINISH_GAME,
        result
    })
}
// 새게임 시작으로 인한 이력 초기화
export function initHistory(){
    return ({
        type:INIT_HISTORY,
    })
}
export const UPDATE_SETTING_TIME = 'UPDATE_SETTING_TIME';
export const UPDATE_SETTING_ROUND = 'UPDATE_SETTING_ROUND';
export const UPDATE_SETTING_SETS = 'UPDATE_SETTING_SETS';
export const REDUCE_TIME = 'REDUCE_TIME';

export function updateSettingsRound(setting_game_count){
    return({
        type:UPDATE_SETTING_ROUND,
        setting_game_count: setting_game_count,
    })
}

export function updateSettingsTime(setting_sec){
    return({
        type:UPDATE_SETTING_TIME,
        setting_sec: setting_sec,
        display_sec: setting_sec,
    })
}

export function updateSettingsSets(setting_game_sets){
    return({
        type: UPDATE_SETTING_SETS,
        setting_game_sets: setting_game_sets,
    })
}

export function reduceTime(){
    return({
        type:REDUCE_TIME
    })
}