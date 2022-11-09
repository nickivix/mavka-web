import React from 'react';
import s from './Open.module.css'
import g from './../Style.module.css';
import Question from '../Objects/Question/Question.jsx';
import Topic from './../Objects/Topic/Topic.jsx';
import Header from './../Objects/Header/Header.jsx';
import Comment from './../Objects/Comment/Comment.jsx';
import Input_Answer from './../Objects/Answer/Input_Answer';
import Video from './../Objects/Video/Video.jsx';
import Next from './../Objects/Next/Next.jsx';

class Open extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedAnswers: props.checkedAnswers,
            number: props.number,
            data: props.data,
            active: props.active,
            answered: props.answered,
            currentAnswer: props.currentAnswer
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.setState({
                checkedAnswers: this.props.checkedAnswers,
                number: this.props.number,
                data: this.props.data,
                active: this.props.active,
                answered: this.props.answered,
                currentAnswer: this.props.currentAnswer
            })
        }
    }

    updateCurrentAnswer = (answer) => {
        this.setState({
            currentAnswer: answer
        })
    }

    validateCurrentAnswer() {
        return (this.state.currentAnswer != "")
    }

    render() {
        //console.log(this.state.data.evaluate(this.state.currentAnswer))
        if(typeof this.state.currentAnswer == "undefined"){
            this.setState({
                currentAnswer: ""
            })
            return(<div></div>)
        }

        const data = this.state.data;
        let hidden = this.state.answered && this.props.isPractice;
        let isNextAllowed = this.validateCurrentAnswer()

        return (
            <div>
                <div className={s.question_body}>
                    <Question
                        question={data.getQuestion()}
                        active={this.state.active}
                        />
                    <div className={s.main_answers}>
                        <p><strong>Впиши відповідь на питання:</strong> </p>
                        <div className={s.answers_frame}>
                            <Input_Answer
                                answered={this.state.answered}
                                correctAnswer={data.getOpenAnswer()}
                                hidden={hidden}
                                updateCurrentAnswer={this.updateCurrentAnswer}
                                currentAnswer={this.state.currentAnswer}
                                isPractice={this.props.isPractice}
                                isLastQuestion={this.props.number == this.props.active}
                                isCorrectAnswer={data.checkCorrect(this.state.currentAnswer)}
                                />
                        </div>

                        <Next
                            scroll={this.props.scroll}
                            scores={this.props.scores}
                            isNextAllowed={isNextAllowed}
                            answered={this.state.answered}
                            updateQuestion={this.props.updateQuestion}
                            number={this.state.active}
                            currentAnswer={this.state.currentAnswer}
                            updateAnswers={this.props.updateAnswers}
                            isPractice={this.props.isPractice}
                            questionInfo={[data.getNumber(), data.getSubject(), data.getYear(), data.getSession()]}
                        />

                        <Topic
                            topic={data.getTopic()}
                            hidden={hidden}
                            />
                        <Comment
                            comment={data.getComment()}
                            hidden={hidden}
                            />
                        <Video
                            hidden={hidden}
                            />
                    </div>

                </div>
            </div>
        )
    }
}

export default Open;
