import React from 'react';
import s from './../../MainMenu.module.css';
import g from './../../../Templates/Style.module.css';
class Scores extends React.Component {
    totalCount(){
        if(this.props.subject == 'Математика')
            return 44;
        if(this.props.subject == 'Історія України')
            return 98;
        if(this.props.subject == 'Біологія')
            return 80;
        if(this.props.subject == 'Українська мова і література')
            return 104;
    }
    scoreDPA(){
        if(this.props.score12 == 0)
            return 1;
        return this.props.score12;
    }
    render() {
        return (<div>
            <div className={s.scores_frame}>
                <div className={s.score_frame}>
                    <div className={s.score}>
                        <div className={s.mark}>{this.props.score200}</div>
                        <div className={s.comment}>ЗНО з 200</div>
                    </div>
                    <div className={s.score}>
                        <div className={s.mark}>{this.scoreDPA()}</div>
                        <div className={s.comment}>ДПА з 12</div>
                    </div>
                    <div className={s.score}>
                        <div className={s.mark}>{this.props.numCorrect}</div>
                <div className={s.comment}>Балів за тести з {this.totalCount()}</div>
                    </div>
                </div>
                <div className={s.btn_wrap} onClick={() => {
                        this.props.click();
                    }}><button className={g.btn}>Переглянути помилки</button></div>
            </div>

        </div>

        );
    }
}

export default Scores;
