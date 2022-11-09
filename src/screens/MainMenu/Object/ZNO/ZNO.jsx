import React from 'react';
import g from "../../../Templates/Style.module.css"
import s from './ZNO.module.css';



class ZNO extends React.Component {
    scoreDPA(){
        if(this.props.testInfo.score12 == 0)
            return 1;
        return this.props.testInfo.score12;
    }
    showStatus(){
        if(this.props.testInfo.status == 'тест пройдений')
            return 'ЗНО ' + this.props.testInfo.score200 + ' ДПА ' + this.scoreDPA();
        return this.props.testInfo.status;
    }
    render() {
        return (
            <div className={s.zno_choose + (this.props.num == this.props.active ? " " + s.active : "")} onClick={() => {this.props.updateSelectedTest(this.props.num)}}>
                <div className={s.wrapper}>
                
                    <div className={s.description}><b>{this.props.testInfo.name1}</b> &nbsp; {this.props.testInfo.name2}</div>
                    <div className={s.results}>
                        {this.showStatus()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ZNO;