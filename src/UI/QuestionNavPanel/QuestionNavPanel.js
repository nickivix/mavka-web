import React, { Component } from "react";
import ButtonQNav from "../ButtonQNav";
import "./navigation.css";
import g from './../../screens/Templates/Style.module.css';
import RightArrow from "../../screens/Templates/Icon/RightArrow";
import LeftArrow from "../../screens/Templates/Icon/LeftArrow";
class QuestionNavPanel extends Component {

    updateWindowDimensions() {
        this.setState({
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            let getStatus = (i) => (this.props.answers[i]);
            let buttons = [...this.state.buttons];
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].status = getStatus(i);
            }
            buttons[prevProps.active - 1].active = false;
            buttons[this.props.active - 1].active = true;
            this.setState({
                checkedAnswers: this.props.checkedAnswers,
                buttons: buttons,
                current: this.props.active
            })
        }
    }


    constructor(props) { // сейчас это просто количество вопросов в тесте. Когда функции будут готовы все пропишу
        super(props);
        let list = props.list;

        let getStatus = (i) => (this.props.answers[i]);
        let buttons = [];
        for (let i = 0; i < list; i++) {
            buttons.push({
                pushed: () => {
                    document.getElementById("fakeButton").click(); // это надо, чтобы dropdown пропадал по клику
                    this.props.updateQuestion(i + 1);
                    //this.update(i + 1);
                },
                status: getStatus(i),
                active: i == this.props.active - 1
            });
        }

        this.state = {
            checkedAnswers: this.props.checkedAnswers,
            current: this.props.active,
            n: list,
            buttons: buttons,
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth
        };

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    getWidth = width => this.state.windowWidth * width / 100.0;
    getHeight = height => this.state.windowHeight * height / 100.0;



    htmlButton = (button, index, needMargin) => (
        <ButtonQNav
            pushed={button.pushed}
            number={index + 1}
            key={index + 1}
            backColor={!button.active ? this.backColor(button.status) : "#000000"}
            color={!button.active ? this.colorText(button.status) : "#FFFFFF"}
            height={this.getHeight(button.active ? 4.5 : 3)}
            width={this.getWidth(2.2)}
            marginLeft={needMargin ? this.getWidth(0.22) : 0}
        />
    );


    backColor = status => {
        if (!this.props.isPractice) {
            if (status == -1) {
                return "#FFFFFF";
            }
            return '#FFBE0B';
        }
        if (status == 0) {
            return '#E7574F';
        }
        if (status == 1) {
            return '#FFBE0B';
        }
        if (status == 2) {
            return '#0EFB71';
        }
        return "#FFFFFF";
    }

    backColor1 = status => { /// для Дани
        if (!this.props.isPractice) { //симуляция
            if (status == -1) { // не отвечен
                return "#FFFFFF";
            }
            return "#000000"; ///отвечен
        }
        if (status == 0) {///неправильно
            return '#E7574F';
        }
        if (status == 1) {///частично
            return '#FFBE0B';
        }
        if (status == 2) {///правильно
            return '#0EFB71';
        }
        return "#FFFFFF";//не отвечен
    }


    colorText = status => {
        if (!this.props.isPractice) {
            if (status == -1) {
                return "#000000";
            }
            return "#000000";
        }
        return "#000000";
    }

    reformat(code) {
        let new_code = [];
        for (let i = 0; i < code.length; i += 3) {
            let r = Math.min(code.length - 1, i + 2);
            let cnt = r - i + 1;
            if (cnt == 1) {
                new_code.push(<li>{code[i]}</li>);
            }
            if (cnt == 2) {
                new_code.push(<li>{code[i]} {code[i + 1]}</li>)
            }
            if (cnt == 3) {
                //alert(1);
                new_code.push(<li>{code[i]} {code[i + 1]} {code[i + 2]}</li>)
            }
        }
        return new_code;
    }


    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }

    render() {



        const delta = 10;
        let n = this.state.n;
        let current = this.state.current;
        let allButtons = this.state.buttons;

        if (window.innerWidth <= 992) {
            let code = [];
            for (let i = 0; i < this.state.n; i++) {
                code.push(
                    <div className={g.variant_anwer} id={"228"}>
                        <label htmlFor={i} id={"228"}><div id={"228"} style={{
                            width: "15px",
                            height: "15px",
                            borderRadius: "15px",
                            border: "2px solid black",
                            marginLeft: '15px',
                            marginRight: '15px',
                            backgroundColor: !allButtons[i].active ? this.backColor1(allButtons[i].status) : "black"
                        }}></div></label>
                        <div id={i} onClick={() => {
                            this.props.updateQuestion(i + 1);
                            this.closeNav();
                        }} style={{ cursor: "pointer" }}>
                            Завдання {i + 1}
                        </div>
                    </div>
                )
            }
            return (
                <div>{code}</div>
            );
        }

        const styles = {
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
            borderRadius: "5px",
            width: this.getWidth(2.2),
            marginLeft: this.getWidth(0.22),
            textAlign: "center"
        };
        let l = Math.max(current - delta / 2, 1);
        let r = Math.min(n, l + delta);
        if (r == n) {
            l = Math.max(r - delta, 1);
        }

        let middle = allButtons.map((button, index) => {
            if (l - 1 > index || r - 1 < index) return null;
            return this.htmlButton(button, index, true);
        });

        let left = allButtons.map((button, index) => {
            if (l - 1 <= index) return null;
            return this.htmlButton(button, index, false)
        });

        let right = allButtons.map((button, index) => {
            if (r - 1 >= index) return null;
            return this.htmlButton(button, index, false)
        });

        let check = elem => elem != null;

        left = left.filter(check);
        middle = middle.filter(check);
        right = right.filter(check);

        /*const dr = () => (
        );
        const styledDr = styled(dr)`
            color: red;
        `;*/

        //console.log('?')
        return (
            <div style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "flex-end",
                marginBottom: "10px"
            }}>
                <style type="text/css">
                    {`
                     #my-dropdown {
                        border-radius: 5px;
                        font-size: 14px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
                        border-width: 1px;
                        opacity:1;
                        background-color: white;
                        width:` + this.getWidth(2.2) + `px;
                        height:` + this.getHeight(3) + `px;
                    }
                    #my-dropdown:focus {
                        outline: 0;
                    }
                    `}
                </style>
                <button
                    id={"fakeButton"}
                    style={{
                        visibility: "hidden"
                    }}
                />
                <div>
                    <div style={{ opacity: left.length > 0 ? 1 : 0.4 }}>
                        <ul>
                            <li style={styles}><a href={"#"}><LeftArrow /></a>
                                <ul
                                    className={"dropdown"}
                                    style={{
                                        zIndex: 100,
                                        opacity: 1,
                                        backgroundColor: 'white',
                                        display: left.length > 0 ? "block" : "none"
                                    }}
                                >
                                {this.reformat(left)}
                                </ul>
                            </li>
                        </ul>
                </div>
            </div>
                { middle }
        <div style={{
            marginLeft: this.getWidth(0.22)
        }}>
            <div >
                <ul>
                    <li style={styles}><a href={"#"} ><RightArrow /></a>
                        <ul
                            className={"dropdown"}
                            style={{
                                zIndex: 100,
                                opacity: 1,
                                backgroundColor:'white',
                                display: right.length > 0 ? "block" : "none",
                            }}
                        >
                            {this.reformat(right)}
                        </ul>
                    </li>
                </ul>
        </div>
        </div >
            </div >
        );
    }
}
export default QuestionNavPanel;
