import React, {Component} from 'react';
import ListItem from "../ListItem";
import axios from "axios";
import { Redirect, Link } from 'react-router-dom';


class List extends Component {
    state = {
        divs: []
    }

    componentDidMount() {
        const response = axios.get(
            'https://us-central1-mavka-c5c01.cloudfunctions.net/getZnoSubjects',
        );
        response.then(value => {
            let divs = [];
            value.data.map((info, index) => {
                divs.push({
                    header: info,
                    status: ""
                });
            });
            this.setState({
                divs: divs
            })
        });
    }

    constructor(props) {
        super(props);
    }

    render() {
        let divs = this.state.divs;
        let code = divs.map((info) => (
            <Link to={"/subject/" + info.header}>
                <ListItem
                    text={info.header}
                    pushed={null}/>
            </Link>
        ))
        //console.log(code);
        return (
            <div>
                {code}
            </div>
        );
    }
}

export default List;