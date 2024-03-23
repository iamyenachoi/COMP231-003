import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { fetchReservations } from "./api-RestManagement";

const RestManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const credentials = {
      t: Cookies.get("accessToken"), // Example: Retrieving an auth token from cookies
    };

    // Fetch reservations when component mounts

    const fetchBookings = async () => {
      // Use userId from cookie as AdminId
      const userId = getCookie("userId");
      console.log(userId);

      if (!userId) return;
      const data = await fetchReservations({ userId }, credentials, signal);
      if (data && !data.error) {
        setBookings(data);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = (bookingId) => {
    // Implement remove method
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBooking(null);
  };

  const handleSave = () => {
    // Implement update method
  };

  const handleChange = (name, value) => {
    // Update selected booking state with new value
    setSelectedBooking({ ...selectedBooking, [name]: value });
  };

  // Helper function to get cookie value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Restaurant Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>People</TableCell>
              <TableCell>Selected Menu</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking._id}>
                <TableCell>{booking.restaurantName}</TableCell>
                <TableCell>{booking.date}</TableCell>
                <TableCell>{booking.time}</TableCell>
                <TableCell>{booking.people}</TableCell>
                <TableCell>
                  {booking.menuSelection && booking.menuSelection.length > 0
                    ? booking.menuSelection.join(", ")
                    : "No menu selected"}
                </TableCell>{" "}
                <TableCell>
                  <Button onClick={() => handleEdit(booking)}>Edit</Button>
                  <Button onClick={() => handleDelete(booking._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Booking</DialogTitle>
        <DialogContent>
          <TextField
            label="Date"
            value={selectedBooking ? selectedBooking.date : ""}
            onChange={(e) => handleChange("date", e.target.value)}
          />
          <TextField
            label="Time"
            value={selectedBooking ? selectedBooking.time : ""}
            onChange={(e) => handleChange("time", e.target.value)}
          />
          <TextField
            label="People"
            value={selectedBooking ? selectedBooking.people : ""}
            onChange={(e) => handleChange("people", e.target.value)}
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestManagement;
