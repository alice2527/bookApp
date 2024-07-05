import React from 'react';
// @ts-ignore
import {button, modal} from "../../styled-system/recipes";
import {css} from "../../styled-system/css";


const Spinner: React.FC = () => {

    return (
        <span className={css({
            width: "48px",
            height: "48px",
            border: "5px solid",
            borderColor: "danger",
            borderBottomColor: "secondary",
            borderRadius: " 50%",
            display: "inline-block",
            boxSizing: "border-box",
            animation: "spin 1s linear infinite",

        })}></span>
    );
};

export default Spinner;
