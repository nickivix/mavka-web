import React from 'react';
import s from './../../MainMenu.module.css';
import g from './../../../Templates/Style.module.css';
import AlertConfirm from '../../../AlertConfirm/AlertConfirm'
class Button extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    cancel = () => {
        //console.log('asdsa');
        this.setState({
            clicked: false
        })
        //console.log('fs')
    }

    customConfirm() {
        //console.log(this.state.clicked)
        if(this.state.clicked) {
            return <AlertConfirm text1={'Розпочати'} text2={'Назад'} text={'В тебе 180 хвилин, щоб завершити тест'} cancel={this.cancel} click={this.props.click} args={[]}/>
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>
                {this.customConfirm()}
                <div className={this.props.stl} onClick={() => {
                    if(this.props.alert) {
                        this.setState({
                            clicked: true
                        })
                        //console.log('tr')
                    }
                    else {
                        this.props.click();
                    }
                }}>
                    <div className={[s.wrap, this.props.style].join(' ')}>
                        <div className={s.icon}>{this.props.icon}</div>
                        <div className={s.btn_title}><strong>{this.props.title}</strong></div>
                        <div className={s.comment}>{this.props.comment}</div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Button;
