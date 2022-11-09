import React from 'react';
import g from './../../Style.module.css';
import PointDown from './../../Icon/PointDown/PointDown';
class Topic extends React.Component {

    getTopicsList() {
        return this.props.topic.map(function(topic){
            return(<div className={g.topic_frame_text}>· {topic}</div>)
          })
    }
    render() {
        return (
            <div className={g.topic_frame} style={{
                display: !this.props.hidden ? "none" : "block"
            }}>
                <p><strong><PointDown /> Теми:</strong></p>
                {this.getTopicsList()}
            </div>
        );
    }
}

export default Topic;
