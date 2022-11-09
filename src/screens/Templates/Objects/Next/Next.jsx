import React from 'react';
import g from './../../Style.module.css';
import Party from './../../Icon/Party/Party';
import RaisedFist from './../../Icon/RaisedFist';
import Like from './../../Icon/Like';
import firebase from "../../../../global";
import Strong from "../../Icon/Strong";
import Tools from './../../Icon/Tools';
import reportProblemTypeform from '../../../reportProblemTypeform'

class Next extends React.Component {
    submitQuestion() {
        if(this.props.isPractice){
            if(this.props.answered) {
                this.props.scroll();
                this.props.updateQuestion(this.props.number + 1);
            }
            else {
                if(this.props.currentAnswer && this.props.isNextAllowed) {
                    this.props.updateAnswers(this.props.number, this.props.currentAnswer);
                }
                else {
                    //console.log("выбери ответ");
                }
            }
        }else{
            if(this.props.currentAnswer) {
                firebase.analytics().logEvent('press Next question');
                this.props.scroll();
                this.props.updateAnswers(this.props.number, this.props.currentAnswer);
                this.props.updateQuestion(this.props.number + 1);
            }
            else {
                //console.log("выбери ответ");
            }
        }
    }

    bals(x) {
        let res;
        if(x == 1 || x == 21 || x == 31) {
            res = 'бал';
        }
        else if(x == 2 || x == 3 || x == 4 || x == 22 || x == 23 || x == 24 || x == 32 || x == 33 || x == 34) {
            res = 'бали';
        }
        else {
            res = 'балів';
        }
        return '' + x + ' ' + res;
    }

    getResult() {
        if(this.props.isPractice && this.props.answered) {
            if(this.props.isOpenEnded) {
                return (
                    <div>
                        <div className={g.result}><strong>Молодець!<Party /></strong></div>
                        <div className={g.stats}>Ми нарахуємо тобі типовий бал, який отримували учні зі схожими тестовими відповідями на справжньому ЗНО</div>
                    </div>
                );
            }
            else {
                if(this.props.scores[this.props.number - 1][1] == 2) {
                    return (
                        <div>
                            <div className={g.result}><strong>Правильно!<Party /></strong></div>
                            <div className={g.stats}>Отримано {this.bals(this.props.scores[this.props.number - 1][0])} із {this.props.scores[this.props.number - 1][2]}</div>
                        </div>
                    );
                }
                else if(this.props.scores[this.props.number - 1][1] == 1) {
                    return (
                        <div>
                            <div className={g.result}><strong>Частково правильно<Like /></strong></div>
                            <div className={g.stats}>Отримано {this.bals(this.props.scores[this.props.number - 1][0])} із {this.props.scores[this.props.number - 1][2]}</div>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                            <div className={g.result}><strong>Помилка, не здавайся!<RaisedFist /></strong></div>
                            <div className={g.stats}>Отримано {this.bals(this.props.scores[this.props.number - 1][0])} із {this.props.scores[this.props.number - 1][2]} </div>
                        </div>
                    );
                }
            }
        }
        else {
            return <div></div>;
        }
    }
    buttonName(){
        if(this.props.isPractice){
            if(!this.props.answered)
                return 'Перевірити';
            else{
                if(this.props.isLastQuestion)
                    return 'Завершити тест';
                return 'Наступне питання';
            }
        }else{
            if(this.props.isLastQuestion)
                return 'Завершити тест';
            return 'Наступне питання';
        }
    }
    showSkip(){
        if(this.props.isLastQuestion)
            return false;
        else {
            if(this.props.isPractice){
                if(this.props.answered)
                    return false;
                return true;
            }
            return true;
        }
    }
    render() {
        return (
            <div className={g.result_frame}>
                {this.getResult()}
                <div className={g.wrap}>
                <button className={this.props.isNextAllowed ? (g.btn) : (g.btn + ' ' + g.inactiveNextButton)} onClick={() => {
                    this.submitQuestion();
                }}>{this.buttonName()}</button>

                <button className={g.pass} style={{
                    display: this.showSkip() ? "block" : "none"
                }} onClick={()=>{
                        this.props.scroll();
                        firebase.analytics().logEvent('skip question');
                        this.props.updateQuestion(this.props.number + 1);
                    }}>Пропустити</button>

                <button className={g.pass} style={{textDecoration: 'none'}} onClick={()=>{
                        new reportProblemTypeform(this.props.questionInfo)
                    }}><div className={g.report}><div style={{width: "20px"}}><Tools />&nbsp;</div>&nbsp; Розповісти про проблему</div></button>
                </div>
            </div>
        );
    }
}

export default Next;
