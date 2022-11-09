import React, {Component} from "react";
import ABCDE from "../Templates/ABCDE/ABCDE";
import ABCDE_OneColumn from "../Templates/ABCDE_OneColumn/ABCDE_OneColumn";

class ResponsiveScreen extends Component {
    update () {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.update = this.update.bind(this);
        window.addEventListener("resize", this.update);
    }

    render() {
        if (this.state.width > 992) {
            return <ABCDE/>
        }
        return <ABCDE_OneColumn/>
    }
}

export default ResponsiveScreen;