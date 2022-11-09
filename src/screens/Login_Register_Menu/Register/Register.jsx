import React from 'react'
import s from './../Login_Register.module.css';
import g from '../../Templates/Style.module.css';
import firebase from "../../../global"
import { Redirect, Link } from 'react-router-dom';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import Services from '../../../Services/Services';

class Register extends React.Component {
    state = {
        user: 25,
        emailComment: '',
        passwordComment: '',
        changedEmail: true,
        changedPassword: true,
        googleComment: '',
        fbComment: ''
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
    async register(email, password) {
        //alert(email + " " + password)
        let current = this;
        await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            console.log(error);
            if(error.code == "auth/weak-password"){
                current.setState({
                    passwordComment: "Пароль повинен складатися мінімум з 6 символів!",
                    emailComment: "",
                    changedPassword: false,
                    changedEmail: true
                })
            }
            if(error.code == "auth/email-already-in-use"){
                current.setState({
                    emailComment: "Електронна адреса вже використовується!",
                    passwordComment: "",
                    changedPassword: true,
                    changedEmail: false
                })
            }
            if(error.code == "auth/invalid-email"){
                current.setState({
                    emailComment: "Неправильний формат електронної пошти!",
                    passwordComment: "",
                    changedPassword: true,
                    changedEmail: false
                })
            }
        });
    }
    trueChangedEmail(){
        this.setState({
            changedEmail: true,
            googleComment: '',
            fbComment: ''
        })
    }

    trueChangedPassword(text){
        console.log(text);
        if(text.target.value.length >= 6){
            this.setState({
                changedPassword: true,
                googleComment: '',
                fbComment: ''
            })
        }
    }
    render() {
        if(this.state.user == 25){
            return (<LoadingScreen />);
        }
        if(this.state.user) {
            firebase.analytics().logEvent('register with email and password');
            Services.setDemographicsSurvey(this.state.user, 'true').then(() => {
                window.location.href = '/home';
            });
        }
        let current = this;
        return (
            <div className={g.background}>
                <div className={s.window}>
                    <a href="/" className={s.logo}><strong>мавка</strong> зно</a>
                    <div className={s.header}>
                        <strong>Реєстрація</strong>
                    </div>
                    <div className={s.btns}>
                        <button className={s.btn_google} onClick={()=>{
                            current.setState({
                                googleComment: '',
                                fbComment: ''
                            })
                            let provider = new firebase.auth.GoogleAuthProvider();
                            firebase.auth().signInWithPopup(provider).then(function(result) {
                             var token = result.credential.accessToken;
                             var user = result.user;
                             return user;
                         }).then((user) => {
                                firebase.analytics().logEvent('register with google');
                                Services.setDemographicsSurvey(user, 'true').then(() => {
                                    window.location.href = '/home';
                                });
                            }).catch(function(error){
                                console.log(error);
                                current.setState({
                                    googleComment: 'Електрона адреса вже використовується!'
                                })
                            });
                        }}><span style={{fontWeight: "bolder"}}>G</span>&nbsp; Увійти з Google</button>
                        <div className={s.errMsg} style={{color:'red'}}>
                            {this.state.googleComment}
                        </div>
                        {/*<button className={s.btn} onClick={()=>{
                            current.setState({
                                googleComment: '',
                                fbComment: ''
                            })
                            var provider = new firebase.auth.FacebookAuthProvider();
                            firebase.auth().signInWithPopup(provider).then(function(result) {
                                var token = result.credential.accessToken;
                                var user = result.user;
                                return user;
                            }).then((user) => {
                                firebase.analytics().logEvent('register with facebook');
                                Services.setDemographicsSurvey(user, 'true').then(() => {
                                    window.location.href = '/home';
                                });

                            }).catch(function(error) {
                                console.log(error);
                                current.setState({
                                    fbComment: 'Електрона адреса вже використовується!'
                                })
                              });
                        }}><span style={{fontWeight: "bolder"}}>f</span>&nbsp; Увійти з Facebook</button>
                        <div className={s.errMsg} style={{color:'red'}}>
                            {this.state.fbComment}
                    </div>*/}
                        <div className={s.info}>
                            <div className={s.title}>EMAIL</div>
                            <div className={s.inp_wrapper}><div className={s.icon}></div><input onChange={()=>{
                                this.trueChangedEmail();
                            }} id='email' style={{
                                border: (this.state.emailComment && !this.state.changedEmail) ? "1px red solid" : ""
                            }}></input></div>
                        </div>
                        <div className={s.errMsg} style={{color:'red'}}>
                            {this.state.emailComment}
                        </div>
                        <div className={s.info}>
                            <div className={s.title}>ПАРОЛЬ</div>
                            <div className={s.inp_wrapper}><div className={s.icon}></div><input onChange={(text)=>{
                                this.trueChangedPassword(text);
                            }} id='password' type="password" style={{
                                border: (this.state.passwordComment && !this.state.changedPassword) ? "1px red solid" : ""
                            }}></input></div>
                        </div>
                        <div className={s.errMsg} style={{color:'red'}}>
                            {this.state.passwordComment}
                        </div>
                        <button className={s.btn} onClick={async()=>{
                            await this.register(document.getElementById('email').value, document.getElementById('password').value);
                        }}>Зареєструватися з Email</button>
                        <Link to='/login'>
                            <div className={s.account}>Вже маєш акаунт?</div>
                        </Link>
                        <div className={s.agreement}>Реєструючись, Ви погоджуютесь з <a href="https://www.notion.so/mavkaorg/bf574fef03bf4ad9a78df3b9389d0ec3" target="_blank">умовами обробки персональних даних та умовами користування платформою "Мавка"</a></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register;
