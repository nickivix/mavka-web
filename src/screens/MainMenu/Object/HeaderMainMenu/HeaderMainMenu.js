import React from 'react';
import s from '../Header/Header.module.css';
import { Link } from "react-router-dom";
import firebase from './../../../../global'
class HeaderMainMenu extends React.Component {
    render() {
        return (
            <div className={s.header}>
                <div className={s.nav_panel}>
                    <div className={s.nav}><strong>мавка</strong> зно</div>
                        <div className={s.back} onClick={()=>{
                                firebase.analytics().logEvent('return to home');
                                this.props.navigate('/home');
                            }}>
                            {this.props.selectedMainMenu ? ('Назад до тестів') : ('Назад до предметів')}
                        </div>
                </div>
                <div style={{marginLeft:'25px',marginTop:'25px', width: '90%', fontSize:'25px', lineHeight:'30px'}}>{this.props.children}</div>
            </div>
        );
    }
}

export default HeaderMainMenu;