import React from 'react';
import s from './Super_Open.module.css';
import g from './../Style.module.css';
import Question from '../Objects/Question/Question.jsx';
import Topic from './../Objects/Topic/Topic.jsx';
import Header from './../Objects/Header/Header.jsx';
import Comment from './../Objects/Comment/Comment.jsx';
import SampleAnswer from './../Objects/SampleAnswer/SampleAnswer.jsx';
import Video from './../Objects/Video/Video.jsx';
import Next from './../Objects/Next/Next.jsx';

class Open_Ended extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
            data: props.data,
            active: props.active,
            answered: props.answered
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            //console.log('sos' + this.props.answered)
            this.setState({
                number: this.props.number,
                data: this.props.data,
                active: this.props.active,
                answered: this.props.answered,
            })
        }
    }

    render() {
        //console.log(this.state.data.evaluate(this.state.currentAnswer))

        const data = this.state.data;
        let hidden = this.state.answered;

        //console.log(data)

        return (
            <div>
                <div className={s.question_body}>
                    <Question
                        question={data.getQuestion()}
                        active={this.state.active}
                        />
                    <div className={s.main_answers}>
                        <Next
                            isOpenEnded={true}
                            scroll={this.props.scroll}
                            scores={this.props.scores}
                            isNextAllowed={true}
                            answered={this.state.answered}
                            updateQuestion={this.props.updateQuestion}
                            number={this.state.active}
                            isLastQuestion={this.props.number == this.props.active}
                            currentAnswer=" "
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
                        <SampleAnswer
                            sample={data.getOpenEndedSample()}
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

export default Open_Ended;
