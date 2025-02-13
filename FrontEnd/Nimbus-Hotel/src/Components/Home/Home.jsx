import React from "react";
import MainHeader from "../Layout/MainHeader";
import Services from "../Common/Services";
import Parallax from "../Common/Parallax";
import RoomSlider from "../Common/RoomSlider";
import RoomSearch from "../Common/RoomSearch";
import { useLocation } from "react-router-dom";

const Home = () => {

    const location = useLocation()
    const message = location.state && location.state.message
    const currentUser = localStorage.getItem("userId")
    return (
        <section>
            {message && <h5 className="text-warning px-5">{message}</h5>}
            {currentUser && <h5 className="text-success text-center">You are logged in as: {currentUser}</h5>}
            <MainHeader />
            <RoomSearch />
            <div className="container">
                <RoomSlider />
                <Parallax />
                <Services />
            </div>
        </section>
    )
}

export default Home