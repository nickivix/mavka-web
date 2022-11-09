import React from 'react';
import List from '../../UI/List'
import firebase from "../../global"
import { Redirect, Link } from 'react-router-dom';
    async function sosi(){
        firebase.auth().signOut();
    }


export class Home extends React.Component{
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
    render() {
        alert("yo");
        firebase.analytics().logEvent('TEST user logged in');
        if(this.state.user == 25){
            return(<div></div>)
        }
        if(this.state.user) {
            return(
                <div>
                    <List/>
                    <button onClick={async() => await sosi()}></button>
                </div>
            )
        }
        else {
            return(<Redirect to="/login"/>)
        }

    }
}

export default Home;
