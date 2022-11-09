import React, {Component} from "react";
import Swing from "react-swing"
import Strong from "../Templates/Icon/Strong";

export default class TabView extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <Swing
            className="stack"
            tagName="div"
            setStack={stack => this.setState({stack: stack})}
            ref="stack"
            throwout={e => console.log('throwout', e)}
        >
            {/*
            children elements is will be Card
        */}
            <div><Strong/></div>
            <div><Strong/></div>
            <div><Strong/></div>
            <div><Strong/></div>
            <div><Strong/></div>
            <div><Strong/></div>
        </Swing>)
    }
}