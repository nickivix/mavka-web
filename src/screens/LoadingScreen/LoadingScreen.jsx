import React from 'react';
import s from './LoadingScreen.module.css';
import Strong from '../Templates/Icon/Strong'
import Book from '../Templates/Icon/Book'
import Clock from '../Templates/Icon/Clock'
import DNA from '../Templates/Icon/DNA'
import Earth from '../Templates/Icon/Earth'
import Fire from '../Templates/Icon/Fire'
import RaisedFist from '../Templates/Icon/RaisedFist'
import France from '../Templates/Icon/France'
import Lamb from '../Templates/Icon/Lamb'
import Like from '../Templates/Icon/Like'
import Moai from '../Templates/Icon/Moai'
import German from '../Templates/Icon/German'
import Party from '../Templates/Icon/Party'
import PointDown from '../Templates/Icon/PointDown'
import Sparks from '../Templates/Icon/Sparks'
import UK from '../Templates/Icon/UK'
import Swords from '../Templates/Icon/Swords'
import Telescope from '../Templates/Icon/Telescope'
import VideoCamera from '../Templates/Icon/VideoCamera'
import WavingHand from '../Templates/Icon/WavingHand'

const emojisMap = [
    Strong,
    Book,
    Clock,
    DNA,
    Earth,
    Fire,
    RaisedFist,
    France,
    Lamb,
    Like,
    Moai,
    German,
    Party,
    PointDown,
    Sparks,
    Swords,
    UK,
    Telescope,
    VideoCamera,
    WavingHand
];

class LoadingScreen extends React.Component {

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 200);
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
    }

    emoji() {
        return emojisMap[this.randomInteger(0, emojisMap.length - 1)];
    }

    render() {
        const DynamicComponent = this.emoji()
        return (
            <div className={s.page}>
                <div className={s.loading}>
                    <div className={s.logo}><strong>мавка </strong>зно</div>
                   <div style={{marginTop: '50px'}}><DynamicComponent /></div>
                </div>
            </div>
        )
    }
}
export default LoadingScreen;
