import React from "react";

function FirstButton({ onClick }) {
    return (
        <button className="homebutton" onClick={onClick} data-cy="test-acıktım-button">
            ACIKTIM
        </button>
    );
}

export default FirstButton;