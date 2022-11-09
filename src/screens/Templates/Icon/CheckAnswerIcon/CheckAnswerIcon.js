import React from "react";
import {MdClose} from "react-icons/md";
import { FiCheck, FiArrowRight } from "react-icons/fi";

class CheckAnswerIcon extends React.Component{

    renderIcon(isCorrectAnswer, isUserAnswer){
        if(isCorrectAnswer){
            if(isUserAnswer){
                return (<FiCheck/>);
            }else {
                return (<FiArrowRight/>);
            }
        }else{
            if(isUserAnswer){
                return (<MdClose/>);
            }
        }
        return null;
    }

    render(){
        return this.renderIcon(this.props.isCorrectAnswer, this.props.isUserAnswer);  
    }
} 
export default CheckAnswerIcon;