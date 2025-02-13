import axios from "axios"

export const api = axios.create({
    baseURL :"http://localhost:8080"
}) 

export const getHeader = (includeContentType = true) => {
	const token = localStorage.getItem("token")
	const headers = {
        Authorization: `Bearer ${token}`
    };
    if (includeContentType) {
        headers["Content-Type"] = "application/json";
    }
    return headers;
}


//GET: room types method for the purpose of filtering
export async function getRoomTypes() {
    try{
        const response = await api.get("/rooms/room/types")
        return response.data
    }
    catch(error) {
        throw new Error("Error trying to get the room types!")
    }
}

//GET: all rooms from database
export async function getAllRooms(){
    try{
        const result = await api.get("/rooms/all-rooms")
        return result.data
    } 
    catch(error){
        throw new Error("Error in getting the rooms")
    }
}

//POST: add new room method 
export async function addRoom(image, roomType, roomPrice) {

    const formData = new FormData()
    formData.append("image", image)
    formData.append("roomType", roomType)
    formData.append("roomPrice", roomPrice)

    const response = await api.post("/rooms/add/new-room", formData, {
        headers: getHeader(false)
    })
    if(response.status === 201) {
        return true
    }
    else{
        return false
    }
}

//DELETE: a room by its RoomID
export async function deleteRoom(roomId){
    try{
        const result = await api.delete(`/rooms/delete/room/${roomId}`, {
            headers: getHeader()
        }) 
        return result.data
    }
    catch(error){
        throw new Error(`Error in deleting the room ${error.message}`)
    }
}

//PUT: function, updates the room
export async function updateRoom(roomId, roomData) {
    const formData = new FormData()
    formData.append("roomType", roomData.roomType)
    formData.append("roomPrice", roomData.roomPrice)
    formData.append("image", roomData.image)

    const response = await api.put(`/rooms/update/${roomId}`, formData, { // formdata sends changes back to the backend for updating
        headers: getHeader(false)
    }) 
    return response
}

//GET: a room by its RoomID
export async function getRoomById(roomId) {
    try{
    const result = await api.get(`/rooms/room/${roomId}`)
    return result.data
    }
    catch(error){
        throw new Error(`There was an Error in finding the room ${error.message}`)
    }
}

//POST: save a new booking
export async function bookRoom(roomId, booking) {
    try{
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    }
        catch(error){
        if(error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Error in Booking The Room: ${error.message}`);
        }
    }
}

//GET: All Bookings
export async function getAllBookings() {
    try{
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    }
    catch(error) {
        throw new Error(`Error in fetching the bookings: ${error.message}`)
    }
}


//GET: Bookings By Confirmation Code
export async function getBookingByConfirmationCode(confirmationCode) {
    try{
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    }
    catch(error) {
        if (error.response && error.response.data) {
        throw new Error(error.response.data)
       }
        else {
        throw new Error(`Error in Finding the Booking: ${error.message}`);
       }
    }
}


//DELETE: Cancels Bookings
export async function cancelBooking(bookingID) {
    try{
        const result = await api.delete(`/bookings/booking/${bookingID}/delete`)
        return result.data
    }
    catch(error) {
        throw new Error(`Error in Cancelling the Booking: ${error.message}`)
    }
}


//GET: Filters and searches the rooms based on user preference.
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        return result
}

//POST: Registration
export async function registerUser(registration) {
    try{
        const response = await api.post("/auth/register-user", registration)
        return response.data
    }
    catch(error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        }
        else {
            throw new Error(`Registration Error: ${error.message}`)
        }
    }
}

//POST: Login
export async function loginUser(login) {
	try {
		const response = await api.post("/auth/login", login)
		if (response.status >= 200 && response.status < 300) {
			return response.data
		} else {
			return null
		}
	} catch (error) {
		console.error(error)
		return null
	}
}

//GET: Fetch User Profile
export async function getUserProfile(userId, token) {
	try {
		const response = await api.get(`users/profile/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

//DELETE: Delete User Profile
export async function deleteUser(userId) {
	try {
		const response = await api.delete(`/users/delete/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
        console.error("Error deleting user:", error.response ? error.response.data : error.message);
		return error.message
	}
}

//GET: User by ID
export async function getUser(userId, token) {
	try {
		const response = await api.get(`/users/${userId}`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		throw error
	}
}

//GET: Booking using User ID
export async function getBookingsByUserId(userId, token) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader()
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

