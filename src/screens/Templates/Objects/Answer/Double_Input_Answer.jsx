import React from 'react';
import CheckAnswerIcon from '../../Icon/CheckAnswerIcon';
import s from './../../Objects/Answer/Input_Answer.module.css';
class Double_Input_Answer extends React.Component {

    constructor(props) {
        super(props);
        this.inputId = this.props.number == null ? 'userInput' : 'userInput' + this.props.number
        this.state = {
            currentAnswer: props.currentAnswer,
            answered: props.answered
        }
    }

    componentDidUpdate(prevProps) {
        document.getElementById("FAKE1").click();
        document.getElementById(this.inputId).value = this.props.currentAnswer

        if (this.props != prevProps) {
            this.setState({
                currentAnswer: this.props.currentAnswer,
                answered: this.props.answered
            })
        }
    }

    updateInput() {
        this.validateAnswer()
        let input = document.getElementById(this.inputId);
        this.props.updateCurrentAnswer(input.value, this.props.number-1);
    }

    validateAnswer() {
        let input = document.getElementById(this.inputId);
        let clean = input.value.replace(/[^0-9,-]/g, "").replace(/(,.*?),(.*,)?/, "$1");
        // don't move cursor to end if no change
        if (clean !== input.value) input.value = clean;
    }

    setBorder(){
        if(this.props.hidden){
            if(this.props.isCorrectAnswer)
                return "1px #0EFB71 solid";
            return "1px red solid";
        }
        return "1px solid #7c7c7c";
    }

    render() {
        //console.log(this.state.currentAnswer + " " +  this.props.letter + " " + this.props.isCorrectAnswer);
        //console.log(this.props.isPractice);
        //console.log(this.props.answered);
        return (

            <div className={s.answer}>
                <div className={s.variant}>
                    <div className={s.number}>
                        <div className={s.icon} style={{
                            display: !this.props.hidden ? "none" : "block"
                            }}>
                            <CheckAnswerIcon
                                isCorrectAnswer={this.props.isCorrectAnswer}
                                isUserAnswer={true}
                            />
                        </div>
                        <strong>{this.props.number}:</strong>
                    </div>

                    <div style={{
                        display: this.props.subquestion == null ? "none" : "block"
                        }}
                        dangerouslySetInnerHTML={{ __html: this.props.subquestion }}>
                    </div>
                </div>

                <div className={s.comment} style={{
                    display: !this.props.hidden ? "none" : "block"
                    }}>
                    <div dangerouslySetInnerHTML={{ __html: this.props.explanation }}></div>
                </div>

                <input style={{
                        border: this.setBorder()
                    }} disabled={this.props.isPractice && this.props.answered ? true : false} className={s.inp} id={this.inputId} value={this.props.currentAnswer} onChange={() => {this.updateInput()}}></input>

                <div className={s.correct_answer} style={{
                    display: !this.props.hidden ? "none" : "block"
                    }}>
                    <div className={s.correct_number}><strong>Правильна відповідь: </strong>{this.props.correctAnswer}</div>
                </div>
            </div>

        );
    }
}

export default Double_Input_Answer;
