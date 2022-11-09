import React from 'react'
import style from '../styles/Login.module.css'
import {Link, Redirect} from 'react-router-dom'
import firebase from "../../../global"


export class Login extends React.Component {
    state = {
        user: 25
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
        alert(email + " " + password)
        await firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + " " + errorMessage);
        });

        if(firebase.auth().currentUser){
            // EVENT DOESN'T REGISTER -- needs Kostya's superpowers
            firebase.analytics().logEvent('logged in');
            this.props.history.push('/home')
        }
    }

    constructor(props) {
        super(props)
    }
    render() {
        if(this.state.user == 25){
            return(<div></div>)
        }
        if(this.state.user){
            return(<Redirect to="/home"/>)
        }
        return (
            <div className={style.base_container}>
                <p>mavka</p>
                <p>Увійти</p>
                <div className={style.inputs}>
                    <p>Електронна пошта</p>
                    <input id='email' placeholder='Email'></input>
                    <p>Пароль</p>
                    <input id='password' type="password" placeholder='Пароль'></input>
                </div>
                <div className={style.btn_log_in}><button onClick={async() => await this.login(document.getElementById('email').value, document.getElementById('password').value)} className={style.log_in}>Вхід</button></div>
                <div className={style.social_or}>
                    <p>Або</p>
                    <p>Увійти разом з...</p>
                </div>
                <div className={style.social}>
                    <a href="#" class={style.facebook}>Facebook</a>
                    <a href="#" class={style.google}>Google</a>
                </div>
            </div>
        )
    }
}
export default Login
