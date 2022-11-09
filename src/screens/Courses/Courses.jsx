import React from 'react';
import firebase from './../../global'
import s from './Courses.module.css';
import g from './../Templates/Style.module.css';
import Course from './Object/Course';
import Fire from './../Templates/Icon/Fire';
import Moai from './../Templates/Icon/Moai';
import Swords from './../Templates/Icon/Swords';
import Telescope from './../Templates/Icon/Telescope';
import DNA from './../Templates/Icon/DNA';
import Earth from './../Templates/Icon/Earth';
import German from './../Templates/Icon/German';
import France from './../Templates/Icon/France';
import Sunflower from './../Templates/Icon/Sunflower';
import UK from './../Templates/Icon/UK';
import Book from './../Templates/Icon/Book'
import { Redirect } from 'react-router-dom';
import AlertConfirm from './../AlertConfirm/AlertConfirm'
import Footer from '../Footer/Footer';
import Loading from './../LoadingScreen'
import LoadingScreen from './../LoadingScreen';
class Courses extends React.Component {





    state = {
        user: 25,
        clicked: false,
        width: window.innerWidth,
    }
    updateScreen = this.updateScreen.bind(this);
    updateScreen() {
        this.setState({
            width: window.innerWidth
        })
    }
    componentDidMount = () => this.getAuthStatus();

    // Get firebase auth status.
    getAuthStatus = () => {
        firebase.auth().onAuthStateChanged((resp) => {

            // Pass response to a call back func to update state
            this.updateUserState(resp);
        });
    }

    // update state
    updateUserState = (resp) => {
        this.setState({
            user: resp
        })
    }

    navigate = (ref) => {
        firebase.analytics().logEvent('choose subject', { subject: ref.substring(9) });
        this.props.history.push(ref);
    }

    cancel = () => {
        this.setState({
            clicked: false
        })
    }

    signOut = () => {
        firebase.analytics().logEvent('sign out');
        firebase.auth().signOut();
    }

    customConfirm() {
        if (this.state.clicked) {
            return <AlertConfirm text={'Ви впевенені, що бажаєте вийти з акаунта?'} cancel={this.cancel} click={this.signOut} args={[]} />
        }
        else {
            return null;
        }
    }

    render() {
        window.addEventListener("resize", this.updateScreen)
        var pic1 = <Sunflower />
        var pic2 = <Moai />
        var pic3 = <Swords />
        var pic4 = <DNA />
        var pic5 = <Telescope />
        var pic6 = <Earth />
        var pic7 = <UK />
        var pic8 = <France />
        var pic9 = <German />
        if (!this.state.user) {
            return (<Redirect to="/login" />);
        }
        if (this.state.user == 25) {
            return (<LoadingScreen />);
        }
        if (this.state.user) {
            if (window.innerWidth <= 992) {
                return (
                    <div className={g.background}>
                        {this.customConfirm()}
                        <div className={[s.page, g.page_].join(' ')}>
                            <div className={s.header_mobile}>
                                <div className={s.logo}><strong>мавка</strong> зно</div>
                                <div className={s.logo} style={{ cursor: 'pointer' }} onClick={() => {
                                    this.setState({
                                        clicked: true
                                    })
                                }}>Вихід</div>

                            </div>
                            <div className={s.header}>

                                <div className={s.title}><div className={s.sub_title}>Останній ривок до ЗНО<br></br> разом з <div className={s.sub_title_icon}>мавкою <Fire /></div> </div></div>
                                <div className={s.description}>Практикуйся, вчися на поясненнях та проходь симуляції екзамену. Обери предмет:</div>
                            </div>
                            <div className={s.courses_wrapper}>
                                <Course hover={true} course={'Українська мова і література'} pic={pic1} navigate={this.navigate} />
                                <Course hover={true} course={'Математика'} pic={pic2} navigate={this.navigate} />
                                <Course hover={true} course={'Історія України'} pic={pic3} navigate={this.navigate} />
                                <Course hover={true} course={'Біологія'} pic={pic4} navigate={this.navigate} />
                                <Course hover={false} course={'Фізика'} pic={pic5} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Географія'} pic={pic6} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Англійська мова'} pic={pic7} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Французька мова'} pic={pic8} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Німецька мова'} pic={pic9} style={{ opacity: 0.4, cursor: 'default' }} />

                            </div>
                            <div style={{ width: '100%', marginTop: '90px', marginBottom: '10px', color: 'Gray' }}><hr></hr></div>
                            <div className={s.footer}>
                                <Footer />
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className={g.background}>
                        {this.customConfirm()}
                        <div className={[s.page, g.page_].join(' ')}>
                            <div className={s.question_header}>
                                <div className={s.header}>
                                    <div className={s.title}><div className={s.sub_title}>Останній ривок до ЗНО<br></br> разом з <div className={s.sub_title_icon}>мавкою <Fire /></div> </div></div>
                                    <div className={s.description}>Практикуйся, вчися на поясненнях та проходь симуляції екзамену. Обери предмет:</div>
                                </div>

                                <div className={s.exit}>
                                    <button className={s.end} onClick={() => {
                                        this.setState({
                                            clicked: true
                                        })
                                    }}>
                                        Вийти
                                        </button>
                                </div>
                            </div>
                            <div className={s.courses_wrapper} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                                {/*<div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>
                                <div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>
                                <div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>
                                <div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>
                                <div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>
                                <div style={{width:'25px',height:'25px',backgroundColor:'red'}}></div>*/}
                                <Course hover={true} course={'Українська мова і література'} pic={pic1} navigate={this.navigate} />
                                <Course hover={true} course={'Математика'} pic={pic2} navigate={this.navigate} />
                                <Course hover={true} course={'Історія України'} pic={pic3} navigate={this.navigate} />
                                <Course hover={true} course={'Біологія'} pic={pic4} navigate={this.navigate} />
                                <Course hover={false} course={'Фізика'} pic={pic5} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Географія'} pic={pic6} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Англійська мова'} pic={pic7} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Французька мова'} pic={pic8} style={{ opacity: 0.4, cursor: 'default' }} />
                                <Course hover={false} course={'Німецька мова'} pic={pic9} style={{ opacity: 0.4, cursor: 'default' }} />
                            </div>
                            <div style={{ width: '100%', marginTop: '90px', marginBottom: '10px', color: 'Gray' }}><hr></hr></div>
                            <div className={s.footer}>
                                <Footer />
                            </div>
                        </div>
                    </div>
                )
            }


        }
    }
}

export default Courses;
