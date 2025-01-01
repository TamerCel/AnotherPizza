import React from "react";
import "../../images/iteration-1-images/logo.svg";
import "../css/SuccessPage.css"

function SuccessPage({ onBack }) {
    return (
        <div className="success-page" data-cy="test-success">
            <div className="logo">
                <img src="../../images/iteration-1-images/logo.svg" alt="logo" />
            </div>
            <div className="success-message" data-cy="test-success-message">
                <p data-cy="success-congratulations">TEBRİKLER!</p>
                <p data-cy="success-order-received">SİPARİŞİNİZ ALINDI!</p>
            </div>
            <div className="success-button">
                <button onClick={onBack} data-cy="test-Anasayfa-button">Anasayfa</button>
            </div>
        </div>
    );
}

export default SuccessPage;