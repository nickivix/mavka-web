import React from 'react';
import CheckAnswerIcon from '../../Icon/CheckAnswerIcon';
import g from './Answer.module.css';
class Answer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAnswer: props.currentAnswer,
            answered: props.answered
        }
    }

    componentDidUpdate(prevProps) {
        document.getElementById("FAKE1").click();
        if (this.props != prevProps) {
            this.setState({
                currentAnswer: this.props.currentAnswer,
                answered: this.props.answered
            })
        }
    }

    check() {
        if(this.state.currentAnswer == null) {
            return false;
        }

        if(typeof this.state.currentAnswer == 'string') {
            return this.state.currentAnswer == this.props.letter
        }
        else if(typeof this.state.currentAnswer == 'object'){
            let res = false;
            for(let i of this.state.currentAnswer) {
                if(this.props.letter == i) res = true;
            }
            return res;
        }
        else {
            return false;
        }
    }

    setBorder(isUserAnswer){
        if(this.props.hidden){
            if(this.props.isCorrectAnswer)
                return "1px #0EFB71 solid";
            if(isUserAnswer)
                return "1px red solid";
            return "";
        }else{
            if(isUserAnswer)
                return "1px black solid";
            return "";
        }
        
    }

    render() {
        //console.log(this.state.currentAnswer + " " +  this.props.letter + " " + this.props.isCorrectAnswer);
        let isUserAnswer = false;
        if(this.props.letter >= '1' && this.props.letter <= '9'){
            for(let i of this.props.currentAnswer){
                if(this.props.letter == i)
                    isUserAnswer = true;
            }
        }else isUserAnswer = !(this.props.letter.localeCompare(this.state.currentAnswer));

        //this.props.isCorrectAnswer ? (g.answer + (this.check() ? (" " + g.answer_answered) : "")) : (g.btn_inactive + (isUserAnswer ? (" " + g.answer_answered) : ""))
        return (
            <div onClick={()=>{
                if(!this.state.answered || !this.props.isPractice)
                    this.props.updateCurrentAnswer(this.props.letter, this.props.index);
            }}className={this.state.answered && this.props.isPractice ? (g.answer_withouthover) : (g.answer)} style={{
                border: this.setBorder(isUserAnswer),
                opacity: (this.props.hidden && !this.props.isCorrectAnswer && !isUserAnswer) ? "50%" : "100%",
            }}>
                <div className={g.answer_text_frame}>
                    <div className={g.letter_choice}>

                        <div className={g.check}>
                            <div className={g.symbol} style={{
                                display: !this.props.hidden ? "none" : "block"
                                }}> <CheckAnswerIcon
                                        isCorrectAnswer={this.props.isCorrectAnswer}
                                        isUserAnswer={isUserAnswer}
                                    /></div>
                            <div className={g.letter}><strong>{this.props.letter}:</strong></div>
                        </div>
                    </div>
                    <div className={g.answer_text} dangerouslySetInnerHTML={{ __html: this.props.question }}></div>
                </div>
                <div className={g.comment} dangerouslySetInnerHTML={{ __html: this.props.explanation }} style={{
                    display: !this.props.hidden ? "none" : "block"
                }}></div>
            </div>
        );
    }
}

export default Answer;
