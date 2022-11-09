import React from 'react';
import g from './../../Style.module.css';
import PointDown from './../../Icon/PointDown/PointDown';
class Topic extends React.Component {

    getTopicsList() {
        let topics = this.props.topics;
        if (this.props.status == 'тест не пройдений') {
            return <div>Пройдіть практику або симуляцію для того, щоб отримати рекомендації</div>
        }
        if (topics == null || typeof topics == 'undefined' || topics.length == 0) {
            return <div>Жодних рекомендацій поки що немає</div>
        }


        let list = [];
        for (var key in topics) {
            //list.push(<div className={g.topic_frame_text}>· {key} - {topics[key]}</div>);
            list.push(<div className={g.topic_frame_text}>· {key}</div>);
        }

        return list;
    }
    render() {
        return (
            <div className={g.topic_frame} style={{
                display: this.props.hidden ? "none" : "block"
            }}>
                <p><strong><PointDown /> Теми для повторення:</strong></p>
                <div className={g.list}>
                    {this.getTopicsList()}
                </div>
            </div>
        );
    }
}

export default Topic;
