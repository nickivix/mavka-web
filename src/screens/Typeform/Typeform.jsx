import React from 'react';
import firebase from './../../global'
import { Link, Redirect } from 'react-router-dom';
import * as typeformEmbed from '@typeform/embed'
import s from './Survey.module.css';
import g from './../Templates/Style.module.css';

class Typeform extends React.Component {

    constructor(props) {
        super(props);
        this.survey_id = this.props.match.params.id
    }

    state = {
        user: 25
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
    updateUserState = (resp) => {
        this.setState({
            user: resp
        })
    }

    onSubmit () {
        //window.location.href = '/home';
    }

    onClose () {
        window.location.href = '/home';
    }


    render() {
        let survey_id = this.survey_id

        let onSubmit = () => {
            this.onSubmit()
        }

        let onClose = () => {
            this.onClose()
        }

        if (this.state.user && this.state.user != 25) {
            this.form = typeformEmbed.makePopup('https://mavkaorg.typeform.com/to/' + survey_id + '?uid=' + this.state.user.uid, {
                mode: 'popup',
                hideHeaders: true,
                hideFooters: true,
                onSubmit: onSubmit,
                onClose: onClose
            })

            this.form.open()
        }

        if(this.state.user == 25){
            return(<div></div>)
        }
        if(this.state.user){
            return (
                <div>
                </div>
            );
        }
        else {
            return(<Redirect to="/login"/>);
        }
    }
}

export default Typeform;
