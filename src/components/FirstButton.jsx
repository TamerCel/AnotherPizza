import React from "react";

function FirstButton({ onClick }) {
    return (
        <button className="homebutton" onClick={onClick} data-cy="home-acik">
            ACIKTIM
        </button>
    );
}

export default FirstButton;