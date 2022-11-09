import React from 'react';
import firebase from "../../global"
import {Redirect, Link} from 'react-router-dom';
import ListItem from "../../UI/ListItem";
import ABCDE from "../Templates/ABCDE/ABCDE";
import Services from "../../Services";
import ABCD from '../Templates/ABCD/ABCD';
import Logic_Couples_4_4 from '../Templates/Logic_Couples/Logic_Couples_4_4';
import Logic_Couples_4_5 from '../Templates/Logic_Couples/Logic_Couples_4_5';
import Double_Open from '../Templates/Double_Open/Double_Open';
import Open from '../Templates/Open/Open';
import Open_Ended from '../Templates/Super_Ended/Open_Ended';
import SystemFunctions from '../../utils/SystemFunctions';
import ABCDE_OneColumn from "../Templates/ABCDE_OneColumn/ABCDE_OneColumn";
import ABCD_OneColumn from "../Templates/ABCD_OneColumn/ABCD_OneColumn";
import Double_Open_OneColumn from "../Templates/Double_Open_OneColumn/Double_Open_OneColumn";
import Logic_Couples_4_4_OneColumn from "../Templates/Logic_Couples_OneColumn/Logic_Couples_4_4_OneColumn";
import Logic_Couples_4_5_OneColumn from "../Templates/Logic_Couples_OneColumn/Logic_Couples_4_5_OneColumn";
import g from "../Templates/Style.module.css";
import s from "../Templates/ABCDE_OneColumn/ABCDE_OneColumn.module.css";
import Header from "../Templates/Objects/Header/Header";
import BioTriples from '../Templates/BioTriples/BioTriples';
import Geo_History_3_7 from '../Templates/Geo_History_3_7/Geo_History_3_7';
import {animateScroll as scroll} from 'react-scroll'
import Axios from 'axios';
import NotFound from './../NotFound'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import SurveyFeedback from '../SurveyFeedback'

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
    'Geo_History_3_7_OneColumn': Geo_History_3_7,
};




export class Test extends React.Component{

    getTouches = (evt) => {
        return evt.touches ||             // browser API
            evt.originalEvent.touches; // jQuery
    }

    handleTouchStart = (evt) => {
        const firstTouch = this.getTouches(evt)[0];
        this.xDown = firstTouch.clientX;
        this.yDown = firstTouch.clientY;
    };

    handleTouchMove = (evt) => {
        if ( ! this.xDown || ! this.yDown ) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = this.xDown - xUp;
        var yDiff = this.yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                this.updateQuestion(Math.min(this.state.active + 1, this.state.n));
                /* left swipe */
            } else {
                this.updateQuestion(Math.max(1, this.state.active - 1));
                /* right swipe */
            }
        } else {
            if ( yDiff > 0 ) {
                /* up swipe */
            } else {
                /* down swipe */
            }
        }
        /* reset values */
        this.xDown = null;
        this.yDown = null;
    };

    checkIfNeedToClose (event) {
        if (event.toElement.id != "228" && event.toElement.id != "all") {
            let nav = document.getElementById("myNav");
            if (nav) {
                if (nav.style.width != "0%") {
                    nav.style.width = "0%";
                }
            }
        }
    }

    updateScreen () {
        this.setState({
            width: window.innerWidth
        })
    }

    constructor(props) {
        super(props);
        this.xDown = null;
        this.yDown = null;
        this.state = {
            subject: this.props.match.params.id,
            testId: this.props.match.params.testId,
            mode: this.props.match.params.mode,
            isPractice: SystemFunctions.stringsEqual(this.props.match.params.mode, 'practice'),
            user: 25,
            active: 1,
            data: [],
            answered: [],
            n: 0,
            answers: {},
            checkedAnswers: {},
            width: window.innerWidth,
            statusFound: true,
            loading: true,
            topicSimulation: [],
            redirect: false
        }
        this.updateScreen = this.updateScreen.bind(this);
        window.addEventListener("resize", this.updateScreen);

        let current = this;
        Services.getReferenceById(this.state.testId).then(function (ref) {
            //console.log(ref);
            if(typeof ref == 'undefined'){
                current.setState({
                    statusFound: false
                })
            }
            Services.getData(ref).then(function (data) {
                let myData = data.map(value => Services.getQuestionClass(value));
                let status = [];
                for (let i = 0; i < myData.length; i++) status.push(false);
                myData.sort((a, b) => a.getNumber() - b.getNumber());
                //console.log(myData);
                current.setState({
                    data: myData,
                    answered: status,
                    n: myData.length
                });
                if(current.state.user != null){
                    current.state.user.getIdToken().then((token)=>{
                        Services.getTestAnswers(token, current.state.testId).then(function (response){
                            //console.log("Test.js");
                            //console.log(response.data);
                            let checkedAnswers = {};
                            if(response.data != "not exist"){
                                for(let tmp in response.data){
                                    if(tmp == 'status'){
                                        if(response.data[tmp] == 'Тест пройдений' && current.props.match.params.mode == 'simulation'){
                                            //console.log('lalalal');
                                            current.setState({
                                                redirect: true
                                            })
                                        }
                                    }
                                    if(tmp != "status" && tmp != "Test_results" && tmp!= "Topics_to_review")
                                        checkedAnswers[tmp] = current.state.data[Number(tmp) - 1].checkCorrect(response.data[tmp]);
                                }
                                current.setState({
                                    answers: response.data,
                                    checkedAnswers: checkedAnswers,
                                    loading: false
                                })
                            }else{
                                current.setState({
                                    loading: false
                                })
                                Services.changeTestStatusByID(token, current.state.testId, "вільна практика");
                            }
                        })
                    })
                }
            })
        })

        document.addEventListener('touchstart', this.handleTouchStart, false);
        document.addEventListener('touchmove', this.handleTouchMove, false);
        window.addEventListener('click', this.checkIfNeedToClose);


    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.getElementById("FAKE").click();
        document.getElementById("FAKE1").click();
    }

    componentDidMount() {
        this.getAuthStatus();
        document.getElementById("FAKE").click();
        document.getElementById("FAKE1").click();
    }

    // Get firebase auth status.
    getAuthStatus = () => {
        firebase.auth().onAuthStateChanged((resp) => {
            // Pass response to a call back func to update state
            this.updateUserState(resp);
        });
    }

    // update state
    updateUserState (resp) {
        this.setState({
            user: resp
        });
    }

    updateQuestion = (x, time) => {
        if(x <= this.state.n){
            this.setState({
                active: x
            });
        }else{
            //console.log("ПОСЛЕДНИЙ ВОПРОС")
            //console.log(this.state.testId)
            this.setState({
                loading: !this.state.loading
            })
            if(this.state.isPractice){
                let cnt = Object.keys(this.state.answers).length;
                if('Topics_to_review' in this.state.answers) {
                    cnt -= 1;
                }
                if('status' in this.state.answers) {
                    cnt -= 1;
                }
                firebase.analytics().logEvent('finish practice', {countOfAnsweredQuestions: cnt});
                if (cnt >= 15) {
                    this.state.user.getIdToken().then((token) => {
                        return Services.checkFeedbackSurvey(token)
                    }).then((result) => {
                        if(result.toString() != '2') {
                            this.props.history.push({
                                pathname: '/subject/' + this.state.subject,
                                state: { testID: this.state.testId }
                            });
                        }
                        else {
                            this.props.history.push({
                                pathname: '/subject/' + this.state.subject,
                                state: { testID: this.state.testId }
                            });
                            new SurveyFeedback(this).open()
                        }
                    })
                }
                else {
                    this.props.history.push({
                        pathname: '/subject/' + this.state.subject,
                        state: { testID: this.state.testId }
                    });
                }
            }else{
                let cnt = Object.keys(this.state.answers).length;
                if('Topics_to_review' in this.state.answers) {
                    cnt -= 1;
                }
                if('status' in this.state.answers) {
                    cnt -= 1;
                }

                //console.log(time);
                firebase.analytics().logEvent('finish simulation', {countOfAnsweredQuestions: cnt});

                this.setState({
                    loading: !this.stateloading
                })
                this.state.user.getIdToken().then((token) => {
                    for(let i = 1; i <= this.state.n; i++){
                        if(!(i in this.state.answers)){
                            this.state.answers[i] = "";
                        }
                    }
                    Services.updateTestAnswers(token, this.state.testId, this.state.answers).then(() => {
                        let res = {};
                        for(let i = 0; i < this.state.n; i++) {
                            if ((i + 1) in this.state.answers) {
                                let tmp = this.state.data[i].evaluate2(this.state.answers[i + 1]);
                                if(tmp != null) {
                                    res[i + 1] = tmp;
                                }
                            }
                        }
                        //console.log(this.state.user);
                        /*console.log({
                            Test_id: this.state.testId,
                            User_id: this.state.user.uid,
                            UserAnswers: res
                        })*/
                        Axios.post(
                            'https://flask.mavka.org/api/post_score',
                            {
                                Test_id: this.state.testId,
                                User_id: this.state.user.uid,
                                UserAnswers: res,
                                Subject: SystemFunctions.convertSubjectName(this.state.subject)
                            },
                            { headers: { 'Content-Type': 'application/json' } }
                        ).then((response) => {
                            Axios.post(
                                'https://flask.mavka.org/api/post_topics',
                                {
                                    Test_id: this.state.testId,
                                    User_id: this.state.user.uid,
                                    UserTopics: this.state.topicSimulation
                                },
                                { headers: { 'Content-Type': 'application/json' } }
                            ).then((response) => {
                                Services.changeTestStatusByID(token, this.state.testId, "Тест пройдений").then(() => { // Dont touch this status
                                    if(cnt >= 15) {
                                        this.state.user.getIdToken().then((token) => {
                                            return Services.checkFeedbackSurvey(token)
                                        }).then((result) => {
                                            if(result.toString() != '2') {
                                                this.props.history.push({
                                                    pathname: '/subject/' + this.state.subject,
                                                    state: { testID: this.state.testId }
                                                });
                                            }
                                            else {
                                                this.props.history.push({
                                                    pathname: '/subject/' + this.state.subject,
                                                    state: { testID: this.state.testId }
                                                });
                                                new SurveyFeedback(this).open()
                                            }
                                        })
                                    }
                                    else {
                                        this.props.history.push({
                                            pathname: '/subject/' + this.state.subject,
                                            state: { testID: this.state.testId }
                                        });
                                    }
                                });
                            })
                        })
                    })
                });
            }
        }
    }

    goToMenu = () => {
        this.state.user.getIdToken().then((token) => {
            Services.changeTestStatusByID(token, this.state.testId, "Тест не пройдений").then(() => { // Dont touch this status
                this.props.history.push({
                    pathname: '/subject/' + this.state.subject,
                    state: { testID: this.state.testId }
                });
            });
        });
    }


    updateStatus = (id, x) => {
        const answered = this.state.answered;
        answered[id - 1] = x;
        this.setState({
            answered: answered
        })
    }

    updateAnswers = (num, answer) => {
        firebase.analytics().logEvent('press Check answer');
        const answers = this.state.answers;
        const checkedAnswers = this.state.checkedAnswers;
        answers[num] = answer;
        checkedAnswers[num] = this.state.data[Number(num) - 1].checkCorrect(answer);
        this.setState({
            answers: answers,
            checkedAnswers: checkedAnswers
        })

        if(this.state.isPractice) {
            //console.log(1);
            if(this.state.data[num - 1].evaluate(this.state.answers[num])[1] == 0){
                //console.log(2);
                let topics = [];
                topics.push(this.state.data[Number(num) - 1].getTopic());
                //console.log(topics);
                Axios.post(
                    'https://flask.mavka.org/api/post_topics',
                    {
                        Test_id: this.state.testId,
                        User_id: this.state.user.uid,
                        UserTopics: topics
                    },
                    { headers: { 'Content-Type': 'application/json' } }
                );
            }
            this.state.user.getIdToken().then((token) => {
                let obj = {};
                obj[num] = answer;
                Services.updateTestAnswers(token, this.state.testId, obj);
            })
        }else{
            if(this.state.data[num - 1].evaluate(this.state.answers[num])[1] == 0){
                //console.log(2);
                let topics = [];
                this.state.topicSimulation.push(this.state.data[Number(num) - 1].getTopic());
                //console.log(topics);
            }
        }
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    }

    render() {
        if(!this.state.user){
            return (<Redirect to="/register" />);
        }
        if(!this.state.statusFound){
            return (<Redirect to="/404" />);
        }
        if (this.state.subject != 'Математика' && this.state.subject != 'Українська мова і література' && this.state.subject != 'Історія України' && this.state.subject != 'Біологія'){
            return (<Redirect to="/404" />);
        }
        if (this.state.mode != 'practice' && this.state.mode != 'simulation'){
            return (<Redirect to="/404" />);
        }
        if(this.state.redirect){
            //this.props.history.push('/subject/' + this.state.subject + '/practice/' + this.state.testId);
            return(<Redirect to={'/subject/' + this.state.subject + '/practice/' + this.state.testId}/>)
        }
        if(this.state.loading || this.state.user == 25){
            return (<LoadingScreen />);
        }
        if (this.state.user) {
            if (this.state.data.length > 0) {
                const data = this.state.data;
                let num = this.state.active - 1;
                let type = data[num].getType();
                let answers = [];
                //alert(this.state.answers[1]);
                for (let i = 0; i < this.state.n; i++) {
                    if ((i + 1) in this.state.answers)
                        answers.push(data[i].evaluate(this.state.answers[i + 1])[1]);
                    else answers.push(-1);
                }
                let scores = [];
                for(let i = 0; i < this.state.n; i++) {
                    if ((i + 1) in this.state.answers)
                        scores.push(data[i].evaluate(this.state.answers[i + 1]));
                    else scores.push(-1);
                }
                //console.log("1111");
                //console.log(answers);
                if (window.innerWidth <= 992 || !data[num].getIsDoubleColumn()) {
                    type += "_OneColumn";
                }
                const DynamicComponent = componentsMap[type];

                if (this.state.active in this.state.answers) {
                    firebase.analytics().logEvent('return to answered question', {value: this.state.checkedAnswers[this.state.active]});
                }
                else {
                    firebase.analytics().logEvent('newQuestion');
                }
                //console.log(scores);
                return (
                    <div className={g.background}>
                        <div className={[s.page, g.page_].join(' ')}>
                            <Header
                                goToMenu={this.goToMenu}
                                checkedAnswers={this.state.checkedAnswers}
                                subject={data[num].getSubject()}
                                year={data[num].getYear()}
                                session={data[num].getSession()}
                                list={this.state.n}
                                updateQuestion={this.updateQuestion}
                                active={this.state.active}
                                isPractice={this.state.isPractice}
                                answers={answers}
                            />
                            <DynamicComponent
                                updateQuestion={this.updateQuestion}
                                active={this.state.active}
                                number={this.state.n}
                                answered={(this.state.active in this.state.answers)}
                                data={data[num]}
                                changeStatus={this.updateStatus}
                                updateAnswers={this.updateAnswers}
                                currentAnswer={this.state.answers[this.state.active]}
                                isPractice={this.state.isPractice}
                                scroll={this.scrollToTop}
                                scores={scores}
                            >
                            </DynamicComponent>
                        </div>
                    </div>
                )
            }
            return (<div></div>);
        }
    }
}

export default Test;
