import React, { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { getRoomById } from "../Utilities/APIfxns";
import { useParams } from "react-router-dom";
import {
  FaCar,
  FaDumbbell,
  FaParking,
  FaSpa,
  FaSwimmingPool,
  FaTshirt,
  FaUtensils,
  FaWifi,
  FaWineGlassAlt,
} from "react-icons/fa";
import RoomSlider2 from "../Common/RoomSlider2";

const CheckOut = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({ image: "", roomType: "", roomPrice: "" });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 2000);
  }, [roomId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [roomId]);

  return (
    <div className="checkout-section">
      <section className="container">
        <div className="row flex-column flex-md-row align-items-center">
          <div className="col-md-4 mt-5 mb-5">
            {isLoading ? (
              <p className="loading-text">Loading Room Information...</p>
            ) : error ? (
              <p className="error-text">{error}</p>
            ) : (
              <div className="room-info shadow p-4 rounded">
                <img
                  src={`data:image/png;base64, ${roomInfo.image}`}
                  alt="Room"
                  className="img-fluid room-image rounded"
                />
                <table className="table mt-3">
                  <tbody>
                    <tr>
                      
                      <th className="room-info-text">{roomInfo.roomType}</th>
                    </tr>
                    <tr>
                      
                      <th className="room-info-text">{roomInfo.roomPrice} HUF / Night</th>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <ul className="list-unstyled amenities-list">
                          <li><FaWifi /> Free Wifi</li>
                          <li><FaDumbbell /> Gym</li>
                          <li><FaSwimmingPool /> Swimming Pool</li>
                          <li><FaCar /> Car Service</li>
                          <li><FaTshirt /> Laundry Service</li>
                          <li><FaParking /> Free Parking Space</li>
                          <li><FaWineGlassAlt /> Mini-Bar</li>
                          <li><FaUtensils /> Breakfast & Dinner Included</li>
                          <li><FaSpa /> Spa</li>
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="col-md-6 offset-md-2">
            <BookingForm />
          </div>
        </div>
      </section>
      <div className="container">
            <RoomSlider2 />
      </div>
    </div>
  );
};

export default CheckOut;
