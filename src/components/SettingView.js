import React from 'react'
import {connect} from 'react-redux';
import {
    updateSettingsRound,
    updateSettingsSets,
    updateSettingsTime} from '../actions/index'

class SettingView extends React.Component{

    handlerSettingSec=(e)=>{
        if(e.target.name == 'setting_game_count'){      // 판수 설정
            this.props.updateSettingsRound(e.target.value)
        }else if(e.target.name == 'setting_game_sets'){ // 세트 설정
            this.props.updateSettingsSets(e.target.value)
        }else{                                          // 시간 설정
            this.props.updateSettingsTime(e.target.value)
        }
        
    }
    render(){
        let {
            setting_sec,
            setting_game_sets,
            setting_game_count} = this.props.settings;

        return(
            <div>
                <h3>설정</h3>
                <div>
                    <div>
                        <label>대기 시간 (초)</label>
                        <input type="number" name="setting_sec" value={setting_sec} onChange={this.handlerSettingSec.bind(this)}/>
                    </div>
                    <div>
                        <label>게임 승리 세트 수 조건</label>
                        <input type="number" name="setting_game_sets" value={setting_game_sets} onChange={this.handlerSettingSec.bind(this)}/>
                    </div>
                    <div>
                        <label>한 세트 게임 승리 수 조건</label>
                        <input type="number" name="setting_game_count" value={setting_game_count} onChange={this.handlerSettingSec.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        settings: state.Settings
    }
}
let mapDispatchToProps = (dispatch)=>{
    return{
        updateSettingsTime: (setting_sec)=>dispatch(updateSettingsTime(setting_sec)),
        updateSettingsRound: (setting_game_count)=>dispatch(updateSettingsRound(setting_game_count)),
        updateSettingsSets: (setting_game_sets)=> dispatch(updateSettingsSets(setting_game_sets))
    }
}
SettingView = connect(mapStateToProps,mapDispatchToProps)(SettingView)
export default SettingView;