import React from 'react';
import firebase from './../../global'
import { Link, Redirect } from 'react-router-dom';
import * as typeformEmbed from '@typeform/embed'
import s from './Survey.module.css';
import g from './../Templates/Style.module.css';
import axios from 'axios'
import Services from '../../Services/Services';

class SurveyDemographics extends React.Component {

    state = {
        user: 25
    }

    getAnswersFromData(data) {
        let items = data['items'][0]
        let answers = items['answers']

        return answers
    }

    getHiddenFromData(data) {
        let items = data['items'][0]
        let hidden = items['hidden']

        return hidden
    }

    async demographicsOnSubmit() {
        let url = 'https://api.typeform.com/forms/BnKWPReN/responses?page_size=1'
        let uid = this.state.user.uid

        let data = await Services.getReqForm(url)
        let requested_uid = this.getHiddenFromData(data)['uid']

        // wait until you get the valid user's response
        while (requested_uid != uid) {
            data = await Services.getReqForm(url)
            requested_uid = this.getHiddenFromData(data)['uid']
        }

        let answers = this.getAnswersFromData(data)

        this.initiateUserProperties(answers)

        window.location.href = '/home';
    }


    initiateUserProperties (answers) {

        // entryProduct --> мавка зно чи мавка?
        firebase.analytics().setUserProperties({entryProduct: 'mavka zno'});

        // occupationType --> Що тебе описує?
        let occupationTypeDict = {
                "UI8Oz6L9C2wr" : "11thgrader",
        		"wYemcfOvwoqj" : "10thgrader",
        		"URsZrQJZmmuF" : "educator",
        		"other" : answers[0]['choice']['other']
        }
        let occupationType = occupationTypeDict[answers[0]['choice']['id']]
        firebase.analytics().setUserProperties({occupationType: occupationType});
        //console.log(occupationType)

        if (occupationType != 'educator') {

            // statedAqSource --> Звідки ти знаєш про Мавку?, може бути кілька відповідей
            let statedAqSourceDict = {
              "Qn7ipi5N1Mi1" : "instaAds",
              "9Pt2UYrKMvBT" : "socialMedia",
              "PoNu7KrOcbZ1" : "mavkaStaff",
              "3f8jVs07pexq" : "friends",
              "bsFAhhjzVV79" : "teachers",
              "other" : answers[1]['choices']['other']
            }
            let statedAqSource = ""
            for (let source of answers[1]['choices']['ids']) {
            	statedAqSource = statedAqSource + statedAqSourceDict[source] + " "
            }
            //console.log(statedAqSource)
            firebase.analytics().setUserProperties({statedAqSource: statedAqSource});


            // hadTutor --> Ти готуєшся до ЗНО хоча б з одним репетитором?, boolean
            let hadZNOTutor = answers[2]['boolean']
            //console.log(hadZNOTutor)
            firebase.analytics().setUserProperties({hadZNOTutor: hadZNOTutor});


            // schoolLocation --> Де ти навчаєшся?
            let schoolLocationDict = {
              "TPvZyomgZKYA" : "stateCity",
              "mMBLseQiBZY5" : "city",
              "BMxp3gpIBU0V" : "village",
              "other" : answers[3]['choice']['other']
            }
            let schoolLocation = schoolLocationDict[answers[3]['choice']['id']]
            //console.log(schoolLocation)
            firebase.analytics().setUserProperties({schoolLocation: schoolLocation});


            // schoolPerformance --> Які оцінки ти зазвичай отримуєш?
            let schoolPerformance = answers[4]['choice']['label']
            //console.log(schoolPerformance)
            firebase.analytics().setUserProperties({schoolPerformance: schoolPerformance});

        }
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


    render() {
        let uid = this.state.user.uid
        let demographicsOnSubmit = () => {
            Services.setDemographicsSurvey(this.state.user, 'false').then(() => {this.demographicsOnSubmit()})
        }

        if (uid) {
            const demographicsForm = typeformEmbed.makePopup('https://mavkaorg.typeform.com/to/BnKWPReN?uid=' + uid, {
                mode: 'popup',
                hideHeaders: true,
                hideFooters: true,
                onSubmit: demographicsOnSubmit,
                onClose: async function() {
                    const firestore = firebase.firestore();
                    await firestore.collection("users").doc(uid).get().then(doc => {
                        if(doc.get("demographicsSurvey") == "true") {
                            demographicsForm.open()
                        }
                    });
                }
            })

            demographicsForm.open()
        }

        if(this.state.user == 25){
            return(<div></div>)
        }
        if(this.state.user){
            firebase.analytics().logEvent('start demographics survey')
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

export default SurveyDemographics;
