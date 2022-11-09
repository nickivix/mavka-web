import React from 'react';
import s from './MainMenu.module.css'
import g from '../Templates/Style.module.css';
import ZNO from './Object/ZNO/ZNO';
import TopicWithNum from "../Templates/Objects/TopicsWithNum/TopicsWithNum"
import strong from "../Templates/icons/strong.png";
import Clock from "../Templates/Icon/Clock";
import VideoCamera from "../Templates/Icon/VideoCamera";
import { Link, Router, Redirect } from 'react-router-dom';
import SystemFunctions from "../../utils/SystemFunctions"
import axios from "axios";
import firebase from "../../global"
import ZNO_component from './Object/ZNO_component';
import Services from '../../Services/Services';
import Confetti from '../../UI/Confetti/Confetti';
import Scores from './Object/Scores/Scores';
import Progres from './Object/Progres/Progres';
import Button from './Object/Button/Button';
import { animateScroll as scroll } from 'react-scroll'
import { bounce } from 'react-animations'
import Radium, { StyleRoot } from 'radium';
import NotFound from './../NotFound'

import Strong from '../Templates/Icon/Strong/Strong';
import HeaderMainMenu from "./Object/HeaderMainMenu/HeaderMainMenu";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
class MainMenu extends React.Component {

    updateScreen() {
        this.setState({
            width: window.innerWidth
        })
    }

    constructor(props) {
        super(props);
        this.token = "";
        this.state = {
            subjectName: SystemFunctions.changeStringBeetwenHomeAndMain(this.props.match.params.id),
            subject: this.props.match.params.id,
            user: 25,
            tests: [],
            active: 0,
            confetti: this.props.location.state,
            loading: true,
            selectedMainMenu: false
        }
        this.updateScreen = this.updateScreen.bind(this);
        window.addEventListener("resize", this.updateScreen);

    }

    componentDidMount() {
        this.getAuthStatus();
    }

    // Get firebase auth status.
    getAuthStatus = () => {
        firebase.auth().onAuthStateChanged((resp) => {
            // Pass response to a call back func to update state
            this.updateUserState(resp);
        });
    }

    // update state
    updateUserState(resp) {
        this.setState({
            user: resp
        });

        let current = this;
        if (this.state.subject != 'Математика' && this.state.subject != 'Українська мова і література' && this.state.subject != 'Історія України' && this.state.subject != 'Біологія') {
            return (NotFound);
        }
        let token = resp.getIdToken().then(function (token) {
            current.token = token;
            //alert(token);
            const response = axios.post(
                'https://europe-west3-mavka-c5c01.cloudfunctions.net/getTestsBySubject',
                {
                    token: token,
                    subject: current.state.subject
                },
                { headers: { 'Content-Type': 'text/plain' } }
            );
            response.then(function (value) {
                let tests = []
                let T = value.data;
                //console.log(value.data)
                for (let year in T) {
                    for (let t in T[year]) {
                        tests.push({
                            name1: "ЗНО " + year,
                            name2: T[year][t].type.toLowerCase() + " сесія",
                            status: T[year][t].status.toLowerCase(),
                            id: T[year][t].id,
                            ref: T[year][t].ref,
                            score200: (T[year][t].score200 == 'Н.С.') ? '-' : T[year][t].score200,
                            score12: T[year][t].score12,
                            numCorrect: T[year][t].numCorrect,
                            Topics_to_review: T[year][t].Topics_to_review
                        })
                    }
                }
                tests.sort((a, b) => (a.name1 < b.name1) ? 1 : -1)
                //console.log(tests);
                //let myProps = Object.keys(current.props.location.state);
                //console.log(current.props.location.state);
                current.setState({
                    tests: tests,
                    active: SystemFunctions.mainMenuActiveElement(typeof current.state.confetti != 'undefined' ? current.state.confetti.testID : 'undefined', tests, current.state.active),
                    loading: false,
                    selectedMainMenu: typeof current.props.location.state != 'undefined' ? true : false
                })
            });
        });
    }

    updateSelectedTest = (num) => {
        if (window.innerWidth > 992) {
            this.setState({
                active: num,
                confetti: null
            })
        }
        else {
            this.setState({
                active: num,
                confetti: null,
                selectedMainMenu: true
            })
        }
    }

    changeMobileMainMenu = () => {
        this.setState({
            selectedMainMenu: !this.state.selectedMainMenu
        })
    }

    deleteTestInfo = (testID) => {
        firebase.analytics().logEvent('erase progress');
        this.scrollToTop();
        //let tmp = this.state.confetti;
        //tmp.testID = this.state.tests[this.state.active].testID;
        this.setState({
            loading: true,
            selectedMainMenu: false,
            confetti: undefined,
            active: this.state.active
        })
        this.state.user.getIdToken().then((token) => {
            Services.deleteTestByID(token, testID).then(() => {
                this.updateUserState(this.state.user);
            });
        });
    }

    startPractice = () => {
        firebase.analytics().logEvent('start practice mode');
        Services.changeTestStatusByID(this.token, this.state.tests[this.state.active].id, "вільна практика");
        this.props.history.push('/subject/' + this.state.subject + '/practice/' + this.state.tests[this.state.active].id);
    }

    openResults = () => {
        firebase.analytics().logEvent('open simulation results');
        this.props.history.push('/subject/' + this.state.subject + '/practice/' + this.state.tests[this.state.active].id);
    }

    startSimulation = () => {
        firebase.analytics().logEvent('start simulation mode');
        this.props.history.push('/subject/' + this.state.subject + '/simulation/' + this.state.tests[this.state.active].id);
    }


    onClickPractice() {
        if (this.state.tests[this.state.active].status == 'тест пройдений') {
            return this.scrollToBottom;
        } else return this.startPractice;
    }

    alert() {
        if (this.state.tests[this.state.active].status == 'тест не пройдений') {
            return true;
        } else {
            return false;
        }
    }

    onClickSimulation() {
        if (this.state.tests[this.state.active].status == 'тест не пройдений') {
            return this.startSimulation;
        } else {
            return this.scrollToBottom;
        }
    }

    btnPracticeStyle() {
        if (this.state.tests[this.state.active].status == 'тест пройдений') {
            return s.btn_disabled;
        } else return s.btn;
    }

    btnSimulationStyle() {
        if (this.state.tests[this.state.active].status == 'тест не пройдений') {
            return s.btn;
        } else return s.btn_disabled;
    }

    scrollToBottom = () => {
        scroll.scrollToBottom();
        return null;
    }

    scrollToTop = () => {
        scroll.scrollToTop();
    }

    navigate = (ref) => {
        firebase.analytics().logEvent('choose subject', { subject: ref });
        this.props.history.push(ref);
    }

    render() {
        const pic1 = <Strong />
        const pic2 = <Clock />
        if (!this.state.user) {
            return (<Redirect to="/register" />);
        }
        if (this.state.subject != 'Математика' && this.state.subject != 'Українська мова і література' && this.state.subject != 'Історія України' && this.state.subject != 'Біологія') {
            return (<Redirect to="/404" />);
        }
        if (this.state.loading || this.state.user == 25) {
            return (<LoadingScreen />);
        }
        if (this.state.user) {
            if (window.innerWidth > 992) {
                return (
                    <div className={g.background}>
                        <meta name="viewport" content="height=device-height"></meta>
                        <div className={[s.page, g.page_].join(' ')} >
                            <div className={s.header}>
                                <div className={s.question_title}>
                                    <strong>Тести з<br></br> {this.state.subjectName}</strong>
                                </div>
                                <div className={s.exit}>
                                    <Link to={'/home'}>
                                    <button className={s.end} onClick={()=>{firebase.analytics().logEvent('return to home');}}>
                                        Назад до предметів
                                    </button>
                                </Link>
                                </div>
                            </div>
                            <div className={s.question_body}>
                                <div className={s.tests_body_left}>
                                    <ZNO_component
                                        tests={this.state.tests}
                                        updateSelectedTest={this.updateSelectedTest}
                                        active={this.state.active}
                                    />
                                </div>

                                {this.state.tests.length > 0 ? (<div className={s.test_body_right}>
                                    <div>
                                        {this.state.tests[this.state.active].status == 'тест пройдений' && this.state.confetti && this.state.confetti.testID ? (<Confetti />) : null}
                                    </div>

                                    <div className={s.scores_frame}>
                                        <div className={s.title}>
                                            <strong>{this.state.tests[this.state.active].name1 + " " + this.state.tests[this.state.active].name2}</strong>
                                        </div>
                                        {this.state.tests[this.state.active].status == 'тест пройдений' ? (<Scores subject={this.state.subject} numCorrect={this.state.tests[this.state.active].numCorrect} score12={this.state.tests[this.state.active].score12} score200={this.state.tests[this.state.active].score200} click={this.openResults} />) : ""}
                                    </div>
                                    <div className={s.buttons_frame}>
                                        <Button stl={this.btnPracticeStyle()} click={this.onClickPractice()} icon={pic1} title={'Практикуватися'} comment={'Проходь одне питання за раз та вчися на поясненнях'} />
                                        <Button alert={this.alert()} stl={this.btnSimulationStyle()} click={this.onClickSimulation()} icon={pic2} title={'Симулювати ЗНО'} comment={'Проходь тест на час та отримуй свій бал'} />
                                    </div>
                                    <div className={s.description}>Ти також можеш роздрукувати цей тест тут та автоматично перевірити розв’язання з нашим мобільним додатком (незабаром)</div>
                                    <TopicWithNum
                                        topics={this.state.tests[this.state.active].Topics_to_review}
                                        status={this.state.tests[this.state.active].status}
                                    //hidden={!(this.state.tests[this.state.active].status == 'тест пройдений' || this.state.tests[this.state.active].status == 'вільна практика')}
                                    />


                                    {this.state.tests[this.state.active].status == 'тест не пройдений' ? "" : (<Progres testID={this.state.tests[this.state.active].id} deleteTestInfo={this.deleteTestInfo} />)}

                                </div>) : null}
                            </div>
                        </div>
                    </div >
                )
            } else {
                return (
                    <div className={g.background}>
                        <div className={[s.page, g.page_].join(' ')} >
                            <HeaderMainMenu selectedMainMenu={this.state.selectedMainMenu} navigate={this.state.selectedMainMenu ? this.changeMobileMainMenu : this.navigate}>
                                {this.state.selectedMainMenu ? '' : (<strong>Тести з<br></br> {this.state.subjectName}</strong>)}
                            </HeaderMainMenu>
                            <div className={s.question_body}>
                                <div className={s.tests_body_left} style={{
                                    display: this.state.selectedMainMenu ? "none" : "block"
                                }}>
                                    <ZNO_component
                                        tests={this.state.tests}
                                        updateSelectedTest={this.updateSelectedTest}
                                        active={-1}
                                    />
                                </div>
                                {(this.state.tests.length > 0 && this.state.selectedMainMenu) ? (<div className={s.test_body_right}>
                                    <div>
                                        {this.state.tests[this.state.active].status == 'тест пройдений' && this.state.confetti && this.state.confetti.testID ? (<Confetti />) : null}
                                    </div>

                                    <div className={s.scores_frame}>
                                        <div className={s.question_title_mobile}>
                                            <strong>{this.state.tests[this.state.active].name1 + " " + this.state.tests[this.state.active].name2}</strong>
                                        </div>
                                        {this.state.tests[this.state.active].status == 'тест пройдений' ? (<Scores subject={this.state.subject} totalCount={this.state.tests[this.state.active].totalCount} numCorrect={this.state.tests[this.state.active].numCorrect} score12={this.state.tests[this.state.active].score12} score200={this.state.tests[this.state.active].score200} click={this.openResults} />) : ""}
                                    </div>
                                    <div className={s.buttons_frame}>
                                        <Button stl={this.btnPracticeStyle()} click={this.onClickPractice()} icon={pic1} title={'Практикуватися'} comment={'Проходь одне питання за раз та вчися на поясненнях'} />
                                        <Button alert={this.alert()} stl={this.btnSimulationStyle()} click={this.onClickSimulation()} icon={pic2} title={'Симулювати ЗНО'} comment={'Проходь тест на час та отримуй свій бал'} />
                                    </div>
                                    <div className={s.description}>Ти також можеш роздрукувати цей тест тут та автоматично перевірити розв’язання з нашим мобільним додатком (незабаром)</div>
                                    <div className={s.topic_frame_menu}>
                                        <TopicWithNum
                                            topics={this.state.tests[this.state.active].Topics_to_review}
                                            status={this.state.tests[this.state.active].status}
                                        //hidden={!(this.state.tests[this.state.active].status == 'тест пройдений' || this.state.tests[this.state.active].status == 'вільна практика')}
                                        />
                                    </div>



                                    {this.state.tests[this.state.active].status == 'тест не пройдений' ? "" : (<Progres testID={this.state.tests[this.state.active].id} deleteTestInfo={this.deleteTestInfo} />)}

                                </div>) : null}
                            </div>
                        </div>
                    </div >
                )
            }

        }
    }
}

export default MainMenu;
