import React from 'react';
import s from './../../MainMenu.module.css';
import g from './../../../Templates/Style.module.css';
import AlertConfirm from './../../../AlertConfirm/AlertConfirm'

class Progres extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }

    cancel = () => {
        this.setState({
            clicked: false
        })
    }

    customConfirm() {
        if(this.state.clicked) {
            return <AlertConfirm text={'Ви впевнені, що бажаєте скинути прогрес для цього теста?'} cancel={this.cancel} click={this.props.deleteTestInfo} args={[this.props.testID]}/>
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div className={s.skip}>
                {this.customConfirm()}
                <button className={g.btn}  onClick={()=>{
                    this.setState({
                        clicked: true
                    })
                }}>Скинути прогрес</button>
                <div className={s.description} style={{ width: '100%', fontSize: '14px', lineHeight: '18px',marginBottom:'20px' }}>Ти втратиш прогрес, бали і рекомендовані теми, та зможеш практикувати та симулювати цей тест з нуля </div>
            </div>
        );
    }
}

export default Progres;
