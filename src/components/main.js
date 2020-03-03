import React, {Component} from 'react'
import {connect} from 'react-redux';
import {updateLoseGameResult, 
    updateWinGameResult,
     updateSettingsSets,
     updateSettingsTime,
     updateSettingsRound,
     addHistory,
     initSet,
     initHistory,
     finishHistory,
     reduceTime} from '../actions';
import ResultView from './ResultView';
import SettingView from './SettingView';

var timer;
class BaseLayout extends Component{
    state = {
        playerInput:0,
        game_status:false,
        set_win_user:0,
        set_win_com:0
    }

    handlerSelect =(e)=>{
        // e.preventDefault();
        if(e.target.value === 0 ) return;

        let playerInput = Number(e.target.value);
        let com_value = Math.floor(Math.random()* (3-1)) +1;
        /*
        1: 가위
        2: 바위
        3: 보
        */
        // let set_winer; 

        if(com_value == playerInput){ //비기는 경우
            clearInterval(timer);   // 타이머 초기화
            this.props.updateSettingsTime(this.props.setting_sec) // 남은 시간 초기화
            this.interval_func(); // 타이머 재동작
            return this.setState({
                drawMSG: "비겼습니다 다시 선택해주세요.",
                com_value: com_value,
                playerInput:0      // 사용자1 입력 초기화
            })
        }else{
            if(playerInput ===1){ //user 가위,
                if( com_value===2){//  com바위
                    // lose
                    this.props.updateLoseGameResult()
                }else if( com_value===3){ //  com보
                    // win
                    this.props.updateWinGameResult()
                }
            }else if(playerInput == 2){ // user바위
                if(com_value == 1){ // com가위
                    // win
                    this.props.updateWinGameResult()
                }else if(com_value == 3){ //  com보
                    // lose
                    this.props.updateLoseGameResult()
                }
            }else{ // user 보
                if(com_value == 1){ // com 가위
                    // lose
                    this.props.updateLoseGameResult()
                }else if(com_value == 2){ // com 바위
                    // win
                    this.props.updateWinGameResult()
                }
            }
        }


        clearInterval(timer);   // 타이머 초기화
        
        this.props.updateSettingsTime(this.props.setting_sec) // 남은 시간 초기화
        
        setTimeout(()=>{
            // let {set_win_com, set_win_user} = this.state;
            let {setting_game_count} = this.props;
            let {total_win, total_lose} = this.props.gameScore;

            if(total_win === setting_game_count || total_lose === setting_game_count){ // 승리 조건 충족.
                this.end_set();
            }
            let {final_score_com, final_score_user} = this.props;
            if(this.props.setting_game_sets  === final_score_com){
                this.end_game("패")
            }else if(this.props.setting_game_sets  === final_score_user){
                this.end_game("승")
                
            }else{
                this.interval_func(); // 타이머 재동작
                this.setState({
                    // msg:"게임이 종료되었습니다.",
                    drawMSG: "",
                    com_value: com_value,
                    // game_status:false,
                    playerInput:0}) // 게임 시작 버튼 활성화.
            }
            
        },0)
        
        return 
        
    }

    end_set=()=>{
        let {total_win, total_lose} =this.props.gameScore;
        // console.log(this.props.left_game_count,total_win, total_lose)
        this.props.addHistory(total_win, total_lose); // 세트 결과 추가
        // this.props.reduceSET();
        this.props.initSet() // 현재 세트 초기화
        this.props.updateSettingsRound(this.props.setting_game_count); //게임 수 초기화
        return;
    }
    end_game=(result)=>{
        // 게임 종료.
        
        // this.props.updateSettingsSets(this.props.setting_game_sets)
        this.props.finishHistory(result);
        // this.props.stopGame();
         this.setState({
            msg:"게임이 종료되었습니다.",
            drawMSG: "",
            game_status:false,
            playerInput:0}) // 게임 시작 버튼 활성화.
    }

    interval_func=()=>{

        this.setState({playerInput:0})// 사용자1 선택 기능 초기화

        timer = setInterval(()=>{
            let {playerInput} = this.state;

            if( this.props.display_time-1 ==0){ // 시간 종료
                clearInterval(timer); // 타이머 종료

                if(playerInput == 0){ // 미선택으로 인한 패배
                    this.props.updateLoseGameResult() // 게임 패배
                    this.props.updateSettingsTime(this.props.setting_sec); //시간 초기화
                    let {setting_game_count} = this.props;
                    let {total_win, total_lose} = this.props.gameScore;
        
                    if(total_win === setting_game_count || total_lose === setting_game_count){ // 승리 조건 충족.
                        this.end_set();
                    }

                    // 게임 종료.
                    let {final_score_com, final_score_user} = this.props;
                    if(this.props.setting_game_sets  === final_score_com){
                        this.end_game("패")
                    }else if(this.props.setting_game_sets  === final_score_user){
                        this.end_game("승")
                    }else{
                        this.interval_func(); // 타이머 재동작
                    }
                    return ;
                }
            }
            // 타이머 시간 감소 함수
            this.props.reduceTime()
        },1000)   
    }
    handlerStart = (e)=>{
        this.props.initHistory();
        
        this.interval_func()
        this.setState({
            msg:"게임이 시작되었습니다.",
            game_status:true
        })
    }

    render(){
        return(
            <div>
                <h2>가위 바위 보 시합!</h2>
                <div>
                    <SettingView />
                    <br/>
                    <div>
                        <div>
                            <button 
                                onClick={this.handlerStart.bind(this)}
                                disabled={this.state.game_status}
                            >게임 시작</button>
                            <p>{this.state.msg}</p>
                           <div>
                                <div>
                                    <label>남은 시간(초) : </label>
                                    {this.props.display_time}(초)
                                </div>
                                {/* <div>
                                    <label>남은 게임 set 수 : </label>
                                    {this.props.left_game_sets}
                                </div>
                                <div>
                                    <label>남은 게임 수 : </label>
                                    {this.props.left_game_count}
                                </div> */}
                           </div>
                        </div>
                        {this.state.drawMSG?
                            <p>{this.state.drawMSG}</p>
                            :null}

                        <br></br>
                        <div style={{display:'inline-flex'}}>
                            <div style={{display:'inline-flex', marginRight:30}}>
                                <label style={{marginRight:5}}>사용자1 : </label>
                                <div>
                                    <select value={this.state.playerInput} onChange={this.handlerSelect.bind(this)}>
                                        <option value={0}>선택</option>
                                        <option value={1}>가위</option>
                                        <option value={2}>바위</option>
                                        <option value={3}>보</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{display:'inline-flex', marginRight:30}}>
                                <label style={{marginRight:5}}>컴퓨터1</label>
                                <span>{this.state.com_value&&(this.state.com_value==1?"가위":(this.state.com_value==2?"바위":"보"))}</span>
                            </div>
                        </div>
                    </div>
                    <ResultView />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        display_time: state.Settings.display_sec,
        setting_sec: state.Settings.setting_sec,
        setting_game_count: state.Settings.setting_game_count,
        setting_game_sets: state.Settings.setting_game_sets,
        gameScore: state.gameScore,
        final_score_user: state.GameHistory.final_score_user,
        final_score_com: state.GameHistory.final_score_com,
    }
}

let mapDispatchToProps = (dispatch)=>{
    return{
        updateLoseGameResult: ()=>dispatch(updateLoseGameResult()),
        updateWinGameResult: ()=>dispatch(updateWinGameResult()),
        addHistory:(win,lose)=>dispatch(addHistory(win,lose)),
        initSet:()=>dispatch(initSet()),
        reduceTime: ()=>dispatch(reduceTime()),
        initHistory: ()=>dispatch(initHistory()),
        finishHistory: (result)=> dispatch(finishHistory(result)),        
        updateSettingsTime: (setting_sec)=>dispatch(updateSettingsTime(setting_sec)),
        updateSettingsRound: (setting_game_count)=>dispatch(updateSettingsRound(setting_game_count)),
        updateSettingsSets:(setting_game_sets)=>dispatch(updateSettingsSets(setting_game_sets))
    }
}
BaseLayout = connect(mapStateToProps, mapDispatchToProps)(BaseLayout)
export default BaseLayout;