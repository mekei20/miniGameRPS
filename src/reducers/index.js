import {combineReducers} from 'redux'
import gameScore from './gameScore';
import Settings from './Settings'
import GameHistory from './GameHistory'

const gameApp = combineReducers({
    gameScore,
    Settings,
    GameHistory
})
export default  gameApp;