import React from 'react';
import g from './../../Style.module.css';
import Sparks from './../../Icon/Sparks/Sparks';
class SampleAnswer extends React.Component {

    componentDidUpdate(prevProps, prevState, snapshot) {
        document.getElementById("FAKE1").click();
    }

    componentDidMount() {
        document.getElementById("FAKE1").click();
    }

    render() {
        return (
            <div style={{
                display: !this.props.hidden && this.props.sample ? "none" : "block"
            }}>
                <p><strong><Sparks /> Зразкова відповідь:</strong></p>
                <div className={g.comment_frame_text} dangerouslySetInnerHTML={{ __html: this.props.sample }}></div>
            </div>
        );
    }
}
export default SampleAnswer;
