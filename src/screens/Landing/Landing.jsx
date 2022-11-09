import React from 'react';
import s from './Landing.module.css';
import Strong from './../Templates/Icon/Strong'
import Clock from './../Templates/Icon/Clock'
import Light from './../Templates/Icon/Light'
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../global'
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import Footer from '../Footer/Footer';
class Landing extends React.Component {
    state = {
        user: 25,
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
    render() {
        firebase.analytics().logEvent('open landing');
        if(this.state.user == 25){
            return (<LoadingScreen />)
        }
        if(this.state.user){
            return(<Redirect to="/home"/>)
        }
        return (
            <div className={s.page}>
                <div className={s.wrapper}>
                    <div className={s.frame_1}>
                        <div className={s.title}><strong>мавка </strong>&nbsp; зно<div className={s.beta}>бета</div></div>
                        <div className={s.big_title}>Готуйся до зно <br></br>по-новому </div>
                        <div className={s.desc}>Абсолютно безкоштовна платформа,<br></br> створена звичайними українцями <br></br> для українців, з любов’ю</div>
                        <Link to='/register'><div className={s.next} onClick={()=>{firebase.analytics().logEvent('press Join');}}>Розпочати</div></Link>
                    </div>
                    <div className={s.frame_2}>
                        <div className={s.icon_row}><div className={s.icon}><Strong /></div><div className={s.desc_2}>Практикуйся на минулих тестах</div></div>
                        <div className={s.icon_row}><div className={s.icon}><Light /></div><div className={s.desc_2}>Вчися на покрокових поясненнях</div></div>
                        <div className={s.icon_row}><div className={s.icon}><Clock /></div><div className={s.desc_2}>Проходь симуляції та отримуй бали</div></div>
                    </div>
                </div>

                <div style={{width: '80%', margin: 'auto'}}>
                    <div style={{ width: '100%', marginTop: '90px', marginBottom: '10px', color: 'Gray' }}><hr></hr></div>
                    <div className={s.footer}>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing;
