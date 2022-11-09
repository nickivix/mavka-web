import React from 'react';
import s from './AlertConfirm.module.css';

class AlertConfirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: this.props.time
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props != prevProps) {
            this.setState({
                time: this.props.time
            })
        }
    }

    render() {
        return (
            <div className={s.background} style={{
                zIndex: 100,
            }}>
                <div className={s.alert}>
                    <div className={s.alert_description}>{this.props.text}</div>
                    <div className={s.btn_wrapper}>
                        <button className={s.btn_end} style={{
                                    display: this.props.showOne ? "none" : "block"
                                }} onClick={() => {
                            this.props.click(...this.props.args);
                            this.props.cancel();
                        }}>{this.props.text1 ? this.props.text1 : "Так"}</button>
                        <button className={s.btn_turn_back} onClick={() => {
                            this.props.cancel();
                        }}>{this.props.text2 ? this.props.text2 : "Ні"}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default AlertConfirm;