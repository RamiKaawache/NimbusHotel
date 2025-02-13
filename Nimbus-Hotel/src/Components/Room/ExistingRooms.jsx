import React, { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../Utilities/APIfxns";
import { Col, Row } from "react-bootstrap";
import RoomFilter from "../Common/RoomFilter";
import RoomPaginator from "../Common/RoomPaginator";
import {FaEdit, FaEye, FaPlus, FaTrashAlt} from "react-icons/fa"
import { Link } from "react-router-dom"
 
const ExistingRooms = () => {
    const[rooms, setRooms] = useState([])
    const[currentPage, setCurrentPage] = useState(1)
    const[roomsPerPage] = useState(8)
    const[isLoading, setIsLoading] = useState(false)
    const[filteredRooms, setFilteredRooms] = useState([])
    const[selectedRoomType, setSelectedRoomtype] = useState("")
    const[successfulMessage, setSuccessfulMessage] = useState("")
    const[errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        fetchRooms()
    }, [])
    
    const fetchRooms = async() => {
        setIsLoading(true)
        try{
            const result = await getAllRooms()
            console.log("Fetched Rooms: ", result); // Log the API response
            setRooms(result)
            setIsLoading(false)
        }
        catch(error){
            setErrorMessage(error.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(selectedRoomType === "") {
            setFilteredRooms(rooms)
        }
        else{
            const filtered = rooms.filter((room) => room.roomType === selectedRoomType)
            setFilteredRooms(filtered)
        }
        setCurrentPage(1)
    }, [rooms, selectedRoomType])

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const sumTotalPages = (filteredRooms, roomsPerPage, rooms) => {
        const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length
        return Math.ceil(totalRooms/roomsPerPage)
    }

    const handleDelete = async(roomId) => {
        try{
            const result = await deleteRoom(roomId)
            if(result === "") {
                setSuccessfulMessage(`Room Number ${roomId} was deleted successfully`)
                fetchRooms()
            }
            else{
                console.error(`There was an error in deleting the room. ${result.message}`)
            }
        }
        catch(error){
            setErrorMessage(error.message)
        }
        setTimeout(() => {
            setSuccessfulMessage("")
            setErrorMessage("")
        }, 3000) //Message expires after 3 seconds.
    }

    const LastRoomIndex = currentPage * roomsPerPage
    const firstRoomIndex = LastRoomIndex - roomsPerPage
    const currentRooms = filteredRooms.slice(firstRoomIndex, LastRoomIndex)
    
    return (
        <>
        <div className="container col-md-8 col-lg-6">
				{successfulMessage && <p className="alert alert-success mt-5">{successfulMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
			</div>
        {isLoading ? (
            <p>loading the existing rooms..</p>
        ): (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-between mb-3 mt-5">
                    <h2>Existing Rooms</h2>
                </div>
            

                <Row>
                    <Col md={6} className="mb-2 md-mb-0">
                    <RoomFilter data={rooms} setFilteredData={setFilteredRooms}/>
                    </Col>
                    <Col md={6} className="d-flex justify-content-end">
                        <Link to={"/add-room"}>
                            <FaPlus/> Add new room
                        </Link>
                    </Col>
                </Row>

                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>ID</th>
                            <th>Room Type</th>
                            <th>Room Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms.map((room) => (
                            <tr key={room.id} className="text-center">
                                <td>{room.id}</td>
                                <td>{room.roomType}</td>
                                <td>{room.roomPrice}</td>
                                <td className="gap-2">
                                    <Link to= {`/edit-room/${room.id}`}>
                                    <span className="btn btn-warning btn-sm"> 
                                        <FaEdit/> 
                                    </span>
                                    </Link>
                                    <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(room.id)}>
                                        <FaTrashAlt/>
                                    </button>
                                </td>
                            </tr>
                        )
                        )}
                    </tbody>
                </table>
                <RoomPaginator currentPage={currentPage}
                totalPages={sumTotalPages(filteredRooms, roomsPerPage, rooms)}
                onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )
        }
        </>
    )

}

export default ExistingRooms