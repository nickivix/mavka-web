import React from 'react';
import s from './HeaderMobile.module.css';
import g from './../../Style.module.css';
import Clock from '../../Icon/Clock/Clock';
import WavingHand from '../../Icon/WavingHand/WavingHand';

class HeaderMobile extends React.Component {

    render() {
        var elem = document.getElementsByClassName('nav')
        return (
            <div className={g.background}>
                <div className={[s.page, g.page_].join(' ')}>
                   <div className={s.header}>
                       <div className={s.nav_panel}>
                            <div className={s.nav}>Усі завдання</div>
                            <div className={s.timer}><Clock /> <strong>109:06</strong></div>
                            <div>Завершити</div>
                       </div>
                       <div className={s.tip} >
                            <div className={s.title}> <WavingHand /> <strong>&nbsp;Порада!</strong></div>
                            <div className={s.description}>Гортай сторінку вправо та вліво, щоб переключатися між сусідніми завданнями.</div>
                       </div>
                       <div className={s.tip1}>
                            <div className={s.title}><strong>ураїнська мова та література</strong></div>
                            <div className={s.description}>2018 додаткова сесія</div>
                       </div>
                   </div>
                </div>
            </div>
        );
    }
}

export default HeaderMobile;
