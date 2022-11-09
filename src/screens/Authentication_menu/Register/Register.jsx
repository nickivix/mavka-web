import React from 'react'
import style from '../styles/Register.module.css'

import {Link} from 'react-router-dom'
import axios from 'axios'


export class Register extends React.Component{


    constructor(props){
        super(props)
    }

    reg(email, password) {
        alert(email + " " + password)
        // EVENT DOESN'T REGISTER -- needs Kostya's superpowers
        firebase.analytics().logEvent('registered');
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode + " " + errorMessage);
            return;
        });
    }
    checkUser() {
        if(firebase.auth().currentUser != null)
            alert(firebase.auth().currentUser.uid)
        else
            alert('gav')
    }

    logOut() {
        firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        });
    }

    async getData(){
        var tok = ""
        if(firebase.auth().currentUser) {
            tok = await firebase.auth().currentUser.getIdToken()
        }
        document.getElementById('sa').value = tok;

        const response = await axios.post(
            'https://us-central1-mavka-c5c01.cloudfunctions.net/getTestAnswers',
            {
                token: tok,
                courseID: "5FHcq0gcaS6FKHECdKxb"
            },
            { headers: { 'Content-Type': 'text/plain' } }
        )
        alert(JSON.stringify(response.data)) // 'success' or error
    }

    render(){
        return(
            <div className={style.base_container}>
                <p>mavka</p>
                <p>Зареєструватися</p>
                <div className={style.inputs}>
                    <div className={style.name}>
                        <p>Ім'я</p>
                        <input id="sa" placeholder="Ім'я"></input>
                        <p>Прізвище</p>
                        <input placeholder='Прізвище'></input>
                    </div>
                    <p>Електронна пошта</p>
                    <input placeholder='Email' id="email"></input>
                    <p>Пароль</p>
                    <input id="pass" type="password" placeholder='Пароль'></input>
                </div>
                <div className={style.btn_log_in}><button className={style.log_in} onClick={() => this.reg(document.getElementById("email").value, document.getElementById("pass").value)}>Вхід</button></div>
                <div className={style.btn_log_in}><button className={style.log_in} onClick={() => this.checkUser()}>checkUser</button></div>
                <div className={style.btn_log_in}><button className={style.log_in} onClick={() => this.logOut()}>logOut</button></div>
                <div className={style.btn_log_in}><button className={style.log_in} onClick={async() => await this.getData()}>send</button></div>
                <div className={style.social}>
                    <a href="#" class={style.facebook}>Facebook</a>
                    <a href="#" class={style.google}>Google</a>
                </div>
            </div>
        )
    }
}
