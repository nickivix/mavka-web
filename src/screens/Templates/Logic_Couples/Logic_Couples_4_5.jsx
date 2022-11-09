import React from 'react';
import { Component } from 'react';
import s from './Logic_couples_4_5.module.css';
import g from './../Style.module.css';
import Party from "../Icon/Party/Party";
import Question from '../Objects/Question/Question.jsx';
import CoupleAnswer from '../Objects/Answer/Couple_Answer';
import CoupleOption from '../Objects/Answer/CoupleOption';
import Answer from '../Objects/Answer/Answer.jsx';
import Topic from './../Objects/Topic/Topic.jsx';
import Header from './../Objects/Header/Header.jsx';
import Comment from './../Objects/Comment/Comment.jsx';
import Video from './../Objects/Video/Video.jsx';
import Next from './../Objects/Next/Next.jsx';
import { ThemeProvider } from 'styled-components';
class Logic_Couples_4_5 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            number: props.number,
            data: props.data,
            active: props.active,
            answered: props.answered,
            currentAnswer: props.currentAnswer
        }
        //console.log(this.props.data);
    }

    componentDidUpdate(prevProps) {
        document.getElementById('FAKE').click();
        if (this.props != prevProps) {
            //console.log('sos' + this.props.answered)
            this.setState({
                number: this.props.number,
                data: this.props.data,
                active: this.props.active,
                answered: this.props.answered,
                currentAnswer: this.props.currentAnswer
            })
        }
    }

    buildQA(type) {
        const data = this.state.data;
        let hidden = !(this.state.answered && this.props.isPractice);
        let single1 = [];
        for (let i = 0; i < 4; ++i) {
            single1.push(<CoupleAnswer
                hidden={hidden}
                number={(i + 1).toString()}
                correctLetter={data.getMatchCorrectAnswers()[i]}
                subquestion={data.getMatchSubquestions()[i]}
                subanswer={""}
                explanation={data.getMatchExplanations()[i]}
            />)
        }
        let single2 = [];
        for (let i = 0; i < 5; ++i) {
            single2.push(<CoupleOption letter={String.fromCharCode('А'.charCodeAt(0) + i)} subquestion={data.getMatch5Options()[i]} />)
        }
        let couples = [];
        for (let i = 0; i < 4; ++i) {
            couples.push([]);


            let isCorrectAnswer;
            if (this.state.currentAnswer != null && this.state.currentAnswer.length > i) {
                isCorrectAnswer = data.getMatchCorrectAnswers()[i].charCodeAt(0) == this.state.currentAnswer[i].charCodeAt(0)
            }
            else {
                isCorrectAnswer = false;
            }
            for (let j = 0; j < 5; ++j) {
                couples[i].push(<CoupleAnswer
                    hidden={hidden}
                    number={(i + 1).toString()}
                    correctLetter={data.getMatchCorrectAnswers()[i]}
                    subquestion={data.getMatchSubquestions()[i]}
                    subanswer={data.getMatch5Options()[j]}
                    explanation={data.getMatchExplanations()[i]}
                    isCorrectAnswer={isCorrectAnswer}
                />)
            }
        }


        let result = [], result2 = [];
        if (hidden) {
            let used = [];
            for (let i = 0; i < 5; ++i) {
                used[i] = 0;
            }

            for (let i = 0; i < 4; ++i) {
                let column;
                if (this.state.currentAnswer != null && this.state.currentAnswer.length > i) {
                    column = this.state.currentAnswer[i];
                }
                else {
                    column = '';
                }
                if (column != '') {
                    //console.log(column);
                    //console.log(column.charCodeAt(0))
                    //console.log('А'.charCodeAt(0))
                    let j = column.charCodeAt(0) - 'А'.charCodeAt(0);
                    //console.log(j);
                    result.push(couples[i][j])
                    used[j] = 1;
                }
                else {
                    result.push(single1[i]);
                }
            }
            for (let i = 0; i < 5; ++i) {
                if (!used[i]) {
                    result2.push(single2[i]);
                }
            }
        }
        else {
            let used = [];
            for (let i = 0; i < 5; ++i) {
                used[i] = 0;
            }
            for (let i = 0; i < 4; ++i) {
                let j = data.getMatchCorrectAnswers()[i].charCodeAt(0) - 'А'.charCodeAt(0);
                result.push(couples[i][j])
                used[j] = true;
            }
            for (let i = 0; i < 5; ++i) {
                if (!used[i]) {
                    result2.push(single2[i]);
                }
            }
        }
        if (type == 1) {
            return result;
        }
        else {
            return result2;
        }
    }

    getChecked(i, j) {
        if (this.state.currentAnswer == null || this.state.currentAnswer.length <= i) return false;
        return (this.state.currentAnswer[i] == j);
    }

    upd = () => {
        let ans = [];
        for (let i = 0; i < 4; ++i) {
            let radios = document.getElementsByName('a[' + (i + 1).toString() + ']');
            let column = 'gg';
            for (let j = 0; j < radios.length; j++) {
                if (radios[j].checked) {
                    column = radios[j].value.charCodeAt(1) - 'a'.charCodeAt(0);
                }
            }
            if (column == 'gg') {
                ans.push('');
            }
            else {
                ans.push(String.fromCharCode('А'.charCodeAt(0) + column));
            }
        }
        this.updateCurrentAnswer(ans);
    }

    getDisabled() {
        let hidden = !(this.state.answered && this.props.isPractice);
        var opts = {};
        if (!hidden) {
            opts['disabled'] = 'disabled';
        }
        return opts;
    }

    getBorder(i, j) {
        const data = this.state.data;
        let hidden = !(this.state.answered && this.props.isPractice);
        var opts = {};
        if (!hidden) {
            if (data.getMatchCorrectAnswers()[i].charCodeAt(0) - 'А'.charCodeAt(0) == j) {
                opts['style'] = { background: '#02F1A0'  };
            }
        }
        return opts;
    }

    updateCurrentAnswer = (answer) => {
        this.setState({
            currentAnswer: answer
        })
    }

    isNextAllowed() {
        if (this.state.currentAnswer != null && this.state.currentAnswer.length == 4 && this.state.currentAnswer[0].length + this.state.currentAnswer[1].length + this.state.currentAnswer[2].length + this.state.currentAnswer[3].length == 4) {
            return true;
        }
        return false;
    }

    render() {

        //console.log(this.state.data.evaluate(this.state.currentAnswer))

        const data = this.state.data;
        let hidden = this.state.answered && this.props.isPractice;
        //console.log(this.state.currentAnswer)
        return (
            <div>
                <div className={s.question_body}>
                    <div className={s.question_frame}>

                        <Question
                            question={data.getQuestion()}
                            active={this.state.active}
                        />
                    </div>
                    <div className={s.answers_frame}>
                        <p className={s.choose}><strong>Встанови відповідність:</strong></p>
                        <div className={s.answers}>
                            <div className={s.answer_wrap}>
                                {this.buildQA(1)}
                            </div>
                            <div className={s.answer_wrap}>
                                {this.buildQA(2)}
                            </div>
                            <div className={s.answers_wrap}>
                                <div class={s.table}>
                                    <table class={s.select_answer}>
                                        <tbody>
                                            <tr>
                                                <th></th>
                                                <th>А</th>
                                                <th>Б</th>
                                                <th>В</th>
                                                <th>Г</th>
                                                <th>Д</th>
                                            </tr>
                                            <tr>
                                                <th class={s.r}>1</th>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="1a" name="a[1]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(0, 'А')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(0, 0)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="1b" name="a[1]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(0, 'Б')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(0, 1)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="1c" name="a[1]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(0, 'В')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(0, 2)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="1d" name="a[1]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(0, 'Г')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(0, 3)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="1e" name="a[1]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(0, 'Д')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(0, 4)} class={s.marker}></span>
                                                    </label>
                                                </td>

                                            </tr>
                                            <tr>
                                                <th class={s.r}>2</th>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="2a" name="a[2]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(1, 'А')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(1, 0)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="2b" name="a[2]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(1, 'Б')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(1, 1)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="2c" name="a[2]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(1, 'В')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(1, 2)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="2d" name="a[2]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(1, 'Г')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(1, 3)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="2e" name="a[2]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(1, 'Д')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(1, 4)} class={s.marker}></span>
                                                    </label>
                                                </td>

                                            </tr>
                                            <tr>
                                                <th class={s.r}>3</th>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="3a" name="a[3]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(2, 'А')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(2, 0)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="3b" name="a[3]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(2, 'Б')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(2, 1)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="3c" name="a[3]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(2, 'В')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(2, 2)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="3d" name="a[3]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(2, 'Г')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(2, 3)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="3e" name="a[3]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(2, 'Д')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(2, 4)} class={s.marker}></span>
                                                    </label>
                                                </td>

                                            </tr>
                                            <tr>
                                                <th class={s.r}>4</th>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="4a" name="a[4]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(3, 'А')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(3, 0)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="4b" name="a[4]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(3, 'Б')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(3, 1)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="4c" name="a[4]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(3, 'В')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(3, 2)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="4d" name="a[4]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(3, 'Г')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(3, 3)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                                <td>
                                                    <label>
                                                        <input type="radio" value="4e" name="a[4]" class={s.q_radio} {...this.getDisabled()} checked={this.getChecked(3, 'Д')} onChange={this.upd}></input>
                                                        <span {...this.getBorder(3, 4)} class={s.marker}></span>
                                                    </label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                                <Next
                                    scores={this.props.scores}
                                    isNextAllowed={this.isNextAllowed()}
                                    answered={this.state.answered}
                                    updateQuestion={this.props.updateQuestion}
                                    number={this.state.active}
                                    currentAnswer={this.state.currentAnswer}
                                    updateAnswers={this.props.updateAnswers}
                                    isPractice={this.props.isPractice}
                                    scroll={this.props.scroll}
                                    isLastQuestion={this.props.number == this.props.active}
                                    questionInfo={[data.getNumber(), data.getSubject(), data.getYear(), data.getSession()]}
                                />
                            </div>

                        </div>

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

export default Logic_Couples_4_5;
