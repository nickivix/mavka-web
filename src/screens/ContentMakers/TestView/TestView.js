import React from 'react';
import firebase from "../../../global"
import {Redirect, Link} from 'react-router-dom';
import ListItem from "../../../UI/ListItem";
import ABCDE from "../../Templates/ABCDE/ABCDE";
import Services from "../../../Services";
import ABCD from '../../Templates/ABCD/ABCD';
import Logic_Couples_4_4 from '../../Templates/Logic_Couples/Logic_Couples_4_4';
import Logic_Couples_4_5 from '../../Templates/Logic_Couples/Logic_Couples_4_5';
import Double_Open from '../../Templates/Double_Open/Double_Open';
import Open from '../../Templates/Open/Open';
import Open_Ended from '../../Templates/Super_Ended/Open_Ended';
import SystemFunctions from '../../../utils/SystemFunctions';
import ABCDE_OneColumn from "../../Templates/ABCDE_OneColumn/ABCDE_OneColumn";
import ABCD_OneColumn from "../../Templates/ABCD_OneColumn/ABCD_OneColumn";
import Double_Open_OneColumn from "../../Templates/Double_Open_OneColumn/Double_Open_OneColumn";
import Logic_Couples_4_4_OneColumn from "../../Templates/Logic_Couples_OneColumn/Logic_Couples_4_4_OneColumn";
import Logic_Couples_4_5_OneColumn from "../../Templates/Logic_Couples_OneColumn/Logic_Couples_4_5_OneColumn";
import g from "../../Templates/Style.module.css";
import s from "../../Templates/ABCDE/ABCDE.module.css";
import TestViewHeader from "../TestViewHeader/TestViewHeader";
import Header from "../../Templates/Objects/Header/Header";
import BioTriples from '../../Templates/BioTriples/BioTriples';
import Geo_History_3_7 from '../../Templates/Geo_History_3_7/Geo_History_3_7';

const componentsMap = {
    ABCDE,
    ABCDE_OneColumn,
    ABCD,
    ABCD_OneColumn,
    Logic_Couples_4_4,
    Logic_Couples_4_5,
    Double_Open,
    Double_Open_OneColumn,
    Open,
    'Open_OneColumn': Open,
    Open_Ended,
    'Open_Ended_OneColumn': Open_Ended,
    Logic_Couples_4_4_OneColumn,
    Logic_Couples_4_5_OneColumn,
    'Bio_Triples': BioTriples,
    'Bio_Triples_OneColumn': BioTriples,
    Geo_History_3_7,
    'Geo_History_3_7_OneColumn': Geo_History_3_7
};

export class TestView extends React.Component {

    updateScreen () {
        this.setState({
            width: window.innerWidth
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            subject: null,
            testId: this.props.match.params.id,
            isPractice: true,
            user: 25,
            active: 1,
            data: [],
            answered: [],
            n: 0,
            answers: {},
            checkedAnswers: {},
            width: window.innerWidth,
            error: null
        }
        this.updateScreen = this.updateScreen.bind(this);
        window.addEventListener("resize", this.updateScreen)
    }

    getData (url) {
        fetch(url)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                if(result['error']){
                    this.setState({
                        error: result['error']
                    })
                } else {
                    var question = Services.getQuestionClass(result)
                    this.setState({
                        data: question,
                        active: question.getNumber()
                    })
                }
            })
            .catch(e => console.log(e));

            //console.log(this.state.data)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.getElementById("FAKE").click();
        document.getElementById("FAKE1").click();
    }

    componentDidMount() {
        document.getElementById("FAKE").click();
        document.getElementById("FAKE1").click();
        let id = 'https://flask.mavka.org/api/get_test_map?page_id=' + this.state.testId;
        fetch(id)
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                let ans = [];
                let cnt = 0;
                for (let x in result) {
                    ++cnt;
                    ans.push(false);
                }
                this.setState({
                    list: result,
                    n: cnt,
                    answered: ans
                })
                this.getData("https://flask.mavka.org/api/get_question?page_id=" + this.state.testId);
            })
            .catch(e => console.log(e));
    }

    updateQuestion = (x) => {
        this.setState({
            active: x,
            data: null
        });
        this.getData("https://flask.mavka.org/api/get_question?page_id=" + this.state.list[x]);
    }

    updateStatus = (id, x) => {
        const answered = this.state.answered;
        answered[id - 1] = x;
        this.setState({
            answered: answered
        })
    }

    updateAnswers = (num, answer) => {
        const answers = this.state.answers;
        const checkedAnswers = this.state.checkedAnswers;
        answers[num] = answer;
        checkedAnswers[num] = this.state.data.checkCorrect(answer);
        this.setState({
            answers: answers,
            checkedAnswers: checkedAnswers
        })
    }

    render() {
        //console.log(this.state.data)

        if(this.state.error){
            return (
                <div>
                    Error: <br/> {this.state.error}
                </div>
            )
        }

        if (this.state.data != null) {
            if (this.state.data['number']) {
                const data = this.state.data;
                let num = this.state.active - 1;
                let type = data.getType();

                let scores = [];
                for(let i = 0; i < this.state.n; i++) {
                    scores.push(-1);
                }

                if (window.innerWidth <= 992 || !data.getIsDoubleColumn()) {
                    type += "_OneColumn";
                }
                const DynamicComponent = componentsMap[type];
                //console.log(data)
                return (
                    <div className={g.background}>
                        <div className={[s.page, g.page_].join(' ')}>
                            <TestViewHeader
                                checkedAnswers={this.state.checkedAnswers}
                                subject={data.getSubject()}
                                year={data.getYear()}
                                session={data.getSession()}
                                list={this.state.n}
                                updateQuestion={this.updateQuestion}
                                active={this.state.active}
                                answers={this.state.answers}
                                isDoubleColumn={data.getIsDoubleColumn()}
                                testId={this.state.list[this.state.active]}
                            />
                            <DynamicComponent
                                updateQuestion={this.updateQuestion}
                                active={this.state.active}
                                number={this.state.n}
                                answered={(this.state.active in this.state.answers)}
                                data={data}
                                changeStatus={this.updateStatus}
                                updateAnswers={this.updateAnswers}
                                currentAnswer={this.state.answers[this.state.active]}
                                isPractice={this.state.isPractice}
                                scores={scores}
                            >
                            </DynamicComponent>
                        </div>
                    </div>
                )
            }
            return (<div></div>);
        }
        return (<div></div>);
    }
}

export default TestView;
