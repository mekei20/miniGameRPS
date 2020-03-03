import React from 'react'
import {connect} from 'react-redux'

class ResultView extends React.Component{
    // 결과 이력 출력
    historyList(){
        return(this.props.gameHistory.history.map(r=>{
            return(
                <tr key={r.set}>
                    <td>{r.set}</td>
                    <td>{r.set_score==0?"패":"승"}</td>
                    <td>{r.win+r.lose}</td>
                    <td>{r.win}</td>
                    <td>{r.lose}</td>
                </tr>
            )
        }))
    }
    
    render(){
        return(
            <div>
                <h2>결과</h2>
                <div>
                    <div>이번판 승리 수: {this.props.result.total_win}</div>
                    <div>이번판 패배 수: {this.props.result.total_lose}</div>
                    <div style={{textAlign:'center',width:"50%",margin:"auto"}}>
                        <h3>최종 결과</h3>
                        <div> 
                            <h2>{this.props.gameHistory.result}</h2>
                        </div>
                        <h3>역대 전적</h3>
                        <table style={{textAlign:"center",width:'100%'}}>
                            <thead>
                                <tr>
                                    <th>라운드(세트)</th>
                                    <th>결과</th>
                                    <th>경기 수</th>
                                    <th>승</th>
                                    <th>패</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.historyList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        result: state.gameScore,
        gameHistory: state.GameHistory
    }
}
ResultView = connect(mapStateToProps)(ResultView)
export default ResultView;