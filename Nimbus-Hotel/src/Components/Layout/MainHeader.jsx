import React from "react";

const MainHeader = () => {
    return(
        <header className="header-banner">
            <div className="overlay"></div>
            <div className="overlay-content">
                <h1>Welcome to <span className="hotel-color">Nimbus Hotel</span></h1>
                <h4>Experience the best hospitality with us!</h4>
            </div>
        </header>
    )
}

export default MainHeader