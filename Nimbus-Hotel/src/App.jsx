import { useState } from 'react'
import React from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddRoom from './Components/Room/AddRoom'
import ExistingRooms from './Components/Room/ExistingRooms';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import EditRoom from './Components/Room/EditRoom';
import Home from './Components/Home/Home'
import NavBar from './Components/Layout/NavBar';
import Footer from './Components/Layout/Footer';
import RoomList from './Components/Common/RoomList';
import Admin from './Components/Admin/Admin';
import CheckOut from './Components/Booking/CheckOut';
import BookingSuccess from './Components/Booking/BookingSuccess';
import Bookings from './Components/Booking/Bookings';
import FindBooking from './Components/Booking/FindBooking';
import Login from './Components/Authentication/login';
import Registration from './Components/Authentication/Registration';
import Profile from './Components/Authentication/Profile';
import Logout from './Components/Authentication/Logout';
import { AuthProvider } from './Components/Authentication/AuthProvider';
import AuthRequired from './Components/Authentication/AuthRequired';




function App() {
  return (
    <AuthProvider>
    <main>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/book-room/:roomId" element={<AuthRequired>< CheckOut /></AuthRequired>} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/browse-all-rooms" element={<RoomList />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/existing-bookings" element={<Bookings />} />
          <Route path="/find-booking" element={<FindBooking />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/registration" element={<Registration />} />  
          <Route path="/profile" element={<Profile />} />  
          <Route path="/logout" element={<Logout />} /> 
        </Routes>
      </Router>
      <Footer/>
    </main>
    </AuthProvider>
  )
}

export default App
