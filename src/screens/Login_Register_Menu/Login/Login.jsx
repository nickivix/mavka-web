import React from 'react'
import s from './../Login_Register.module.css';
import g from '../../Templates/Style.module.css';
import firebase from "../../../global"
import { Redirect, Link } from 'react-router-dom';
import LoadingScreen from '../../LoadingScreen/LoadingScreen';
import AlertConfirm from '../../AlertConfirm/AlertConfirm';
import Services from '../../../Services/Services';

class Login extends React.Component {
    state = {
        user: 25,
        emailComment: '',
        passwordComment: '',
        changedEmail: true,
        changedPassword: true,
        googleComment: '',
        fbComment: '',
        clicked: false,
        alertText: ''
    }

    cancel = () => {
        //console.log('asdsa');
        this.setState({
            clicked: false
        })
        //console.log('fs')
    }

    customAlert(text) {
        //console.log(this.state.clicked)
        if (this.state.clicked) {
            return <AlertConfirm showOne={true} text2={'Ок'} text={text} cancel={this.cancel} args={[]} />
        }
        else {
            return null;
        }
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
    async login(email, password) {
        //alert(email + " " + password)
        let current = this;
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            console.log(error);
            if (error.code == "auth/wrong-password") {
                current.setState({
                    passwordComment: "Неправильний пароль!",
                    emailComment: "",
                    changedPassword: false,
                    changedEmail: true
                })
            }
            if (error.code == "auth/invalid-email") {
                current.setState({
                    emailComment: "Неправильний формат електронної адреси!",
                    passwordComment: "",
                    changedPassword: true,
                    changedEmail: false
                })
            }
            if (error.code == "auth/user-not-found") {
                current.setState({
                    emailComment: "Не існує користувача з даною електронною адресою!",
                    passwordComment: "",
                    changedPassword: true,
                    changedEmail: false
                })
            }
        });

        if (firebase.auth().currentUser) {
            firebase.analytics().logEvent('login with email and password');
            this.props.history.push('/home')
        }
    }

    trueChangedEmail() {
        this.setState({
            changedEmail: true,
            googleComment: '',
            fbComment: ''
        })
    }

    trueChangedPassword() {
        this.setState({
            changedPassword: true,
            googleComment: '',
            fbComment: ''
        })
    }

    render() {
        if (this.state.user == 25) {
            return (<LoadingScreen />)
        }
        if (this.state.user) {
            return (<Redirect to="/home" />)
        }
        let current = this;
        return (
            <div>
                {this.customAlert(this.state.alertText)}
                <div className={g.background}>
                    <div className={s.window}>
                        <a href="/" className={s.logo}><strong>мавка</strong> зно</a>
                        <div className={s.header}>
                            <strong>Вхід</strong>
                        </div>
                        <div className={s.btns}>
                            <button className={s.btn_google} onClick={() => {
                                current.setState({
                                    googleComment: '',
                                    fbComment: ''
                                })
                                let provider = new firebase.auth.GoogleAuthProvider();
                                //firebase.auth().signInWithRedirect(provider);
                                firebase.auth().signInWithPopup(provider).then(function (result) {
                                    var token = result.credential.accessToken;
                                    var user = result.user;
                                    firebase.analytics().logEvent('login with google');
                                    Services.setDemographicsSurvey(user, 'true').then(() => {
                                        window.location.href = '/home';
                                    });
                                }).catch(function (error) {
                                    console.log(error);
                                    current.setState({
                                        googleComment: 'Електрона адреса вже використовується!'
                                    })
                                });
                            }}><span style={{ fontWeight: "bolder" }}>G</span>&nbsp; Увійти з Google</button>
                            <div className={s.errMsg} style={{ color: 'red' }}>
                                {this.state.googleComment}
                            </div>
                            {/*<button className={s.btn} onClick={() => {
                                current.setState({
                                    googleComment: '',
                                    fbComment: ''
                                })
                                var provider = new firebase.auth.FacebookAuthProvider();
                                firebase.auth().signInWithPopup(provider).then(function (result) {
                                    var token = result.credential.accessToken;
                                    var user = result.user;
                                    firebase.analytics().logEvent('login with facebook');
                                    Services.setDemographicsSurvey(user, 'true').then(() => {
                                        window.location.href = '/home';
                                    });
                                }).catch(function (error) {
                                    console.log(error);
                                    current.setState({
                                        fbComment: 'Електрона адреса вже використовується!'
                                    })
                                });
                            }}><span style={{ fontWeight: "bolder" }}>f</span>&nbsp; Увійти з Facebook</button>
                            <div className={s.errMsg} style={{ color: 'red' }}>
                                {this.state.fbComment}
                        </div>*/}
                            <div className={s.info}>
                                <div className={s.title}>EMAIL</div>
                                <div className={s.inp_wrapper}><div className={s.icon}></div><input onChange={() => {
                                    this.trueChangedEmail();
                                }} id='email' style={{
                                    border: (this.state.emailComment && !this.state.changedEmail) ? "1px red solid" : ""
                                }}></input></div>
                            </div>
                            <div className={s.errMsg} style={{ color: 'red' }}>
                                {this.state.emailComment}
                            </div>
                            <div className={s.info}>
                                <div className={s.password_wrapper}>
                                    <div className={s.title}>ПАРОЛЬ</div>
                                    <div className={s.account} onClick={() => {
                                        this.setState({
                                            clicked: true
                                        })
                                        var auth = firebase.auth();
                                        var emailAddress = document.getElementById('email').value;
                                        auth.sendPasswordResetEmail(emailAddress).then(function () {
                                            current.setState({
                                                clicked: true,
                                                alertText: 'Посилання для зміни пароля знаходиться на електроній адресі ' + emailAddress
                                            })
                                        }).catch(function (error) {
                                            current.setState({
                                                clicked: true,
                                                alertText: 'Email некоректний!'
                                            })
                                        });
                                    }}>Забув пароль?</div>
                                </div>
                                <div className={s.inp_wrapper}><div className={s.icon}></div><input onChange={() => {
                                    this.trueChangedPassword();
                                }} id='password' type="password" style={{
                                    border: (this.state.passwordComment && !this.state.changedPassword) ? "1px red solid" : ""
                                }}></input></div>
                            </div>
                            <div className={s.errMsg} style={{ color: 'red' }}>
                                {this.state.passwordComment}
                            </div>
                            <button className={s.btn} onClick={async () => {
                                await this.login(document.getElementById('email').value, document.getElementById('password').value);
                            }}>Увійти з Email</button>
                            <Link to='/register'>
                                <div className={s.account}>Зареєструватися</div>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
