import React, { useState } from 'react'
import { addRoom } from '../Utilities/APIfxns'
import RoomTypeSelector from '../Common/RoomTypeSelector'
import { Link } from 'react-router-dom'

const AddRoom = () => {
    const[newRoom, setNewRoom] = useState({
        image : null,
        roomType : "",  
        roomPrice : "" 
    })

    const[imagePreview, setImagePreview] = useState("") // Previewing the image
    const[successMessage, setSuccessMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    //Handling room type and price Changes
    const handleRoomInputChange = (e) => {
        const name = e.target.name 
        let value = e.target.value
        if(name === "roomPrice"){
            if(!isNaN(value)){  
                value = parseInt(value) // Converts to Number
        } 
        else{
            value = ""
        }
    }
    setNewRoom({...newRoom, [name]: value})    
}

//Handling Image changes
const handleImageChange = (e) =>{
    const selectedImage = e.target.files[0]
    setNewRoom({...newRoom, image: selectedImage})
    setImagePreview(URL.createObjectURL(selectedImage)) // Temporary URL to Preview Image
}

const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const success = await addRoom(newRoom.image, newRoom.roomType, newRoom.roomPrice) 
        if(success != undefined) {
            setErrorMessage("")
            setSuccessMessage("A new room has been added to the database")
            setImagePreview("")
            setNewRoom({image: null, roomType: "", roomPrice: ""})
        } else {
            setErrorMessage("There has been an error in adding a room!")
        }   

    } catch(error){
        setErrorMessage(error.message)
    }

    setTimeout(() => {
        setSuccessMessage("")
        setErrorMessage("")
    }, 3000)
}

    return (
        <>
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                <h2 className="mt-5 mb-2">Add a New Room</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roomType" className="form-label">
									Room Type
								</label>
								<div>
									<RoomTypeSelector
										handleRoomInputChange={handleRoomInputChange}
										newRoom={newRoom}
									/>
								</div>
							</div>

                            <div className="mb-3">
                                <label htmlFor="roomPrice" className="form-label">Room Price</label>
                                <input 
                                className="form-control"
                                required
                                id="roomPrice"
                                type="number"
                                name="roomPrice"
                                value={newRoom.roomPrice}
                                onChange={handleRoomInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="Image" className="form-label">Room Image</label>
                                <input
                                id="image"
                                name="image"
                                type="file"
                                className="form-control"
                                onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img src={imagePreview}
                                    alt="Preview Room Image"
                                    style={{maxWidth: "400px", maxHeight: "400px"}}
                                    className="mb-3" />
                                )}  
                            </div>
                            <div className="d-grid d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                    Back
                                </Link>
                                <button className="btn btn-outline-primary ml-5">
                                    Save Room
                                </button>
                            </div>
                        </form>
                </div>
            </div>
        </section>
        </>
    )
}

export default AddRoom