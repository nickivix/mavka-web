import React from 'react';
import ZNO from './ZNO/ZNO';

class ZNO_component extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        let testsList = this.props.tests;
        let current = this;
        return testsList.map(function(test, index){
            return(
            <ZNO 
                testInfo={test}
                updateSelectedTest={current.props.updateSelectedTest}
                num={index}
                active={current.props.active}
            />);
        })
    }
}

export default ZNO_component;