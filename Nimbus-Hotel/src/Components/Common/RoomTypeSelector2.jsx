import React, { useEffect, useState } from "react";
import { getRoomTypes } from "../Utilities/APIfxns";

const RoomTypeSelector2 = ({ handleRoomInputChange, newRoom }) => {
    const [roomTypes, setRoomtypes] = useState([]);

    useEffect(() => {
        getRoomTypes().then((data) => {
            setRoomtypes(data);
        });
    }, []);

    return (
        <>
            {roomTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="roomType"
                        onChange={handleRoomInputChange}
                        value={newRoom.roomType}
                    >
                        <option value="">Select a room type</option>
                        {roomTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </>
    );
};

export default RoomTypeSelector2;
