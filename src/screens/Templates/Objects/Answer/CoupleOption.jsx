import React from 'react';

import g from './../../Objects/Answer/CoupleOption.module.css';
class Answer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            letter: props.letter,
            subquestion: props.subquestion
        }
    }

    componentDidUpdate(prevProps) {
        document.getElementById("FAKE1").click();
        if (this.props != prevProps) {
            this.setState({
                letter: this.props.letter,
                subquestion: this.props.subquestion
            })
        }
    }
    componentDidMount() {
        document.getElementById("FAKE1").click();
    }

    render() {
        //console.log(this.state.currentAnswer + " " +  this.props.letter);
        return (
            <div className={g.answer_withouthover}>
                <div className={g.answer_text_frame}>
                    <div className={g.letter_choice}>

                        <div className={g.check}>
                            <div className={g.letter}><strong>{this.props.letter}:</strong></div>
                        </div>
                    </div>
                    <div className={g.answer_text} dangerouslySetInnerHTML={{ __html: this.props.subquestion }}></div>
                </div>
                
            </div>
        );
    }
}

export default Answer;
