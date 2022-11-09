import React from 'react';
import g from './../../../../Templates/Style.module.css';
import s from './Header.module.css';
import firebase from './../../global';

class Header extends React.Component {
    render() {
        return (
            <div className={g.header}>
                <div className={s.logo}><strong>мавка </strong>зно</div>
                <div className={s.profile} style={{ color: 'Gray' }} onClick={() => {
                    firebase.auth().signOut();
                }}>Вийти</div>
            </div>
        );
    }
}

export default Header;