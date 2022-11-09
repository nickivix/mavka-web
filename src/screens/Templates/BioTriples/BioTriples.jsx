import React from 'react';
import s from './BioTriples.module.css';
import g from './../Style.module.css';
import Header from '../Objects/Header/Header';
import Answer from '../Objects/Answer/Answer';
import Question from '../Objects/Question/Question';
import Next from '../Objects/Next/Next';
import Topic from '../Objects/Topic/Topic';
import Comment from '../Objects/Comment/Comment';
import Video from '../Objects/Video/Video';

class BioTriples extends React.Component {
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
        //console.log(props.data);
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

    updateCurrentAnswer = (answer, index) => {

        let curAnswer = this.state.currentAnswer
        curAnswer[index] = answer

        this.setState({
            currentAnswer: curAnswer
        })
    }

    nextValidation(currentAnswer){
        if(this.state.currentAnswer[0] != '' && this.state.currentAnswer[1] != '' && this.state.currentAnswer[2] != '')
            return true;
        else return false;
    }

    render() {
        //console.log(this.state.data.evaluate(this.state.currentAnswer))

        if(typeof this.state.currentAnswer == "undefined"){
            this.setState({
                currentAnswer: ["", "", ""]
            })
            return(<div></div>)
        }

        let isNextAllowed = this.nextValidation(this.state.currentAnswer);
        const data = this.state.data;
        let hidden = this.state.answered && this.props.isPractice;
        //console.log(data.getBio3_secondquestion());
        return (
            <div>
                <Question
                    question={data.getBio3_question()}
                    active={this.state.active}
                />
                <div style={{marginBottom:20}}><strong>Обери одну відповідь до кожнолого з тверджень:</strong></div>
                <div className={s.question_body}>
                    <div className={s.answers}>
                        <div className={s.title_column}>{data.getBio3_firstquestion().question}</div>
                        <Answer
                            index={0}
                            answered={this.state.answered}
                            letter={"1"}
                            question={data.getBio3_firstquestion().firstAnswer}
                            explanation={data.getBio3_firstquestion().firstExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[0]}
                            isCorrectAnswer={data.checkCorrectFromList("1", 1)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={0}
                            answered={this.state.answered}
                            letter={"2"}
                            question={data.getBio3_firstquestion().secondAnswer}
                            explanation={data.getBio3_firstquestion().secondExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[0]}
                            isCorrectAnswer={data.checkCorrectFromList("2", 1)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={0}
                            answered={this.state.answered}
                            letter={"3"}
                            question={data.getBio3_firstquestion().thirdAnswer}
                            explanation={data.getBio3_firstquestion().thirdExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[0]}
                            isCorrectAnswer={data.checkCorrectFromList("3", 1)}
                            isPractice={this.props.isPractice}
                        />
                    </div>
                    <div className={s.answers}>
                        <div className={s.title_column}>{data.getBio3_secondquestion().question}</div>
                        <Answer
                            index={1}
                            answered={this.state.answered}
                            letter={"1"}
                            question={data.getBio3_secondquestion().firstAnswer}
                            explanation={data.getBio3_secondquestion().firstExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[1]}
                            isCorrectAnswer={data.checkCorrectFromList("1", 2)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={1}
                            answered={this.state.answered}
                            letter={"2"}
                            question={data.getBio3_secondquestion().secondAnswer}
                            explanation={data.getBio3_secondquestion().secondExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[1]}
                            isCorrectAnswer={data.checkCorrectFromList("2", 2)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={1}
                            answered={this.state.answered}
                            letter={"3"}
                            question={data.getBio3_secondquestion().thirdAnswer}
                            explanation={data.getBio3_secondquestion().thirdExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[1]}
                            isCorrectAnswer={data.checkCorrectFromList("3", 2)}
                            isPractice={this.props.isPractice}
                        />
                    </div>
                    <div className={s.answers}>
                        <div className={s.title_column}>{data.getBio3_thirdquestion().question}</div>
                        <Answer
                            index={2}
                            answered={this.state.answered}
                            letter={"1"}
                            question={data.getBio3_thirdquestion().firstAnswer}
                            explanation={data.getBio3_thirdquestion().firstExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[2]}
                            isCorrectAnswer={data.checkCorrectFromList("1", 3)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={2}
                            answered={this.state.answered}
                            letter={"2"}
                            question={data.getBio3_thirdquestion().secondAnswer}
                            explanation={data.getBio3_thirdquestion().secondExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[2]}
                            isCorrectAnswer={data.checkCorrectFromList("2", 3)}
                            isPractice={this.props.isPractice}
                        />
                        <Answer
                            index={2}
                            answered={this.state.answered}
                            letter={"3"}
                            question={data.getBio3_thirdquestion().thirdAnswer}
                            explanation={data.getBio3_thirdquestion().thirdExplain}
                            hidden={hidden}
                            updateCurrentAnswer={this.updateCurrentAnswer}
                            currentAnswer={this.state.currentAnswer[2]}
                            isCorrectAnswer={data.checkCorrectFromList("3", 3)}
                            isPractice={this.props.isPractice}
                        />
                    </div>
                </div>
                <Next
                    scores={this.props.scores}
                    answered={this.state.answered}
                    updateQuestion={this.props.updateQuestion}
                    number={this.state.active}
                    currentAnswer={this.state.currentAnswer}
                    updateAnswers={this.props.updateAnswers}
                    isPractice={this.props.isPractice}
                    isNextAllowed={isNextAllowed}
                    scroll={this.props.scroll}
                    isLastQuestion={this.props.number == this.props.active}
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
        );
    }
}

export default BioTriples;
