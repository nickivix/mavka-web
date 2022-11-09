import React from "react";
import heart from "../../icons/heart.png";

export default () => (
    <span style={{
        backgroundImage: "url( " + heart + ")",
        backgroundSize: "contain",
        height: "100%",
        backgroundPosition: "center",
        width: "100%",
        backgroundRepeat: "no-repeat"
    }}>&nbsp; &nbsp; &nbsp;</span>
)
