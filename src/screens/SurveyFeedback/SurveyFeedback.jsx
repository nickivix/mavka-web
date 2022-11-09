import React from 'react';
import firebase from './../../global'
import { Link, Redirect } from 'react-router-dom';
import s from './Survey.module.css';
import g from './../Templates/Style.module.css';
import * as typeformEmbed from '@typeform/embed'

class SurveyFeedback {

    constructor(react) {
        this.react = react

        let uid = this.react.state.user.uid

        let onSubmit = () => {
            this.onSubmit();
        }

        this.feedbackForm = typeformEmbed.makePopup('https://mavkaorg.typeform.com/to/aGYIhiFY?uid=' + uid, {
            mode: 'popup',
            hideHeaders: true,
            hideFooters: true,
            onSubmit: onSubmit,
            onClose: onSubmit
        })

    }

    onSubmit () {
        //this.feedbackForm.close()
    }

    close () {
        this.feedbackForm.close()
    }

    open () {
        this.feedbackForm.open()
    }

}

export default SurveyFeedback;
