import React from 'react';
import s from './../NotFound/NotFound.module.css'
const TechnicalPause = () => {
    return (
        <div className={s.wrapper}>
            <div className={s.image}>
                <div className={s.alert}>Війна війною, а обід за розкладом (технічна перерва)</div>
                <img src='https://i.pinimg.com/originals/e6/7f/67/e67f678b67683359e5cc4f08e2ff4577.gif' style={{width:'100%',height:'100%'}} ></img>
            </div>
        </div>
    )
}
export default TechnicalPause;