import React from 'react';
import s from './Course.module.css';

class Course extends React.Component {
    render() {
        return (
            <div className={this.props.hover ? (s.course_frame) : (s.course_frame_no_hover)} style={this.props.style} onClick={() => {
                if(this.props.course == 'Математика' || this.props.course == 'Українська мова і література' || this.props.course == 'Історія України' || this.props.course == 'Біологія')
                    this.props.navigate('/subject/' + this.props.course);
            }}>
                <div className={s.wrapper}>
                    <div className={s.course}><div className={s.icon}>{this.props.pic}</div><div className={s.course_text}>{this.props.course}</div></div>
                </div>
            </div>
        )
    }
}

export default Course;