import React from 'react';
import firebase from './../../global'
import { Link, Redirect } from 'react-router-dom';
import s from './Survey.module.css';
import g from './../Templates/Style.module.css';
import * as typeformEmbed from '@typeform/embed'

class reportProblemTypeform {

    constructor(q_details) {

        let onSubmit = () => {
            this.onSubmit();
        }

        let url = 'https://mavkaorg.typeform.com/to/uxLMhLEe' + '?q_number=' + q_details[0] + '&q_subject=' +
            q_details[1] + '&q_year=' + q_details[2] + '&q_session=' + q_details[3]
        console.log(url)

        this.reportTypeform = typeformEmbed.makePopup(url, {
            mode: 'popup',
            hideHeaders: true,
            hideFooters: true,
            onSubmit: onSubmit,
            onClose: onSubmit
        })

        this.reportTypeform.open()

    }

    onSubmit () {
        //this.feedbackForm.close()
    }

    close () {
        this.reportTypeform.close()
    }

    open () {
        this.reportTypeform.open()
    }

}

export default reportProblemTypeform;
