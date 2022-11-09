import React from "react";

export default props => (
    <div onClick={props.pushed} style={{
        borderRadius: "10px",
        border: "1px solid black",
        width: "15.38%",
        height: "10%",
        fontSize: 14,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
        boxSizing: "border-box"
    }}>{props.text}</div>
);