import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { readUserId, remove, update } from "../api-Reservation";

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
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import EmailIcon from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";


const token = Cookies.get("accessToken");
function BookingManagement() {
  const [reservations, setReservations] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
      fetchReservations();
    }, []);

    const controller = new AbortController();
    const signal = controller.signal;
    const credentials = {
      t: Cookies.get("accessToken"), // Example: Retrieving an auth token from cookies
    };

      const fetchReservations = async () => {
        const userId = Cookies.get("userId");
        console.log(userId);
        
        if (!userId) return;
        const data = await readUserId({ userId }, credentials, signal);
        console.log(data)
        setReservations(data);
      };

      const handleDelete = async (reservation) => {
      // Implement remove method
      setSelectedReservation(reservation);
      console.log(reservation._id)
      const params = {userId : reservation._id};
      console.log(params.userId);
      const credentials = {t:token};
      console.log(credentials)
      
      remove(params, credentials).then(()=>{
        console.log('Reservation canceled');
        setShowDeleteDialog(true);
      })};
  

      const handleEdit = (reservation) => {
        console.log(reservation)
      
        setSelectedReservation(reservation);
        setOpen(true);
    };

      const handleDeleteClose = async () =>{
        setShowDeleteDialog(false);
        await fetchReservations();
      }

      const handleClose = () => {
        setOpen(false);
        setSelectedReservation(null);
      };

    const handleCloseSuccessDialog = () =>{
      setShowSuccessDialog(false);
      handleClose();
    }

  
    const handleSave = async (reservation) => {
      // Implement update method
      console.log(selectedReservation.date);
      console.log(selectedReservation.time);
      console.log(selectedReservation.people);
      console.log(selectedReservation._id);

      const updatedReservation = {
        date : selectedReservation.date,
        time : selectedReservation.time,
        people : selectedReservation.people
      };

      const credentials = {t:token};

      console.log(credentials.t)

      const params = {userId : selectedReservation._id};

      console.log(params.userId);

      try{
        const response = await update(params, credentials, updatedReservation);

        console.log(response)

        if(response.error){
          console.log(response.error)
        }
        else{
          console.log('update successful', response)
          setShowSuccessDialog(true);
          await fetchReservations();
        }
      }
      catch (e){
        console.log('update failed', e.errorMessage)
        setShowSuccessDialog(false);
      }
    };

  const handleChange = (name, value) => {
    // Update selected booking state with new value
    setSelectedReservation({ ...selectedReservation, [name]: value });
  };

  const handleEmail = (reservation) => {
    const emailSubject = encodeURIComponent(
      `Reservation at ${reservation.restaurantName}`
    );
    const emailBody = encodeURIComponent(
      `I have a reservation on ${reservation.date} at ${reservation.time} for ${reservation.people} people.`
    );
    window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
  };

  return (
    <div>
      <h1>My Reservations</h1>
      {reservations.length >0 ? (
         
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reservation id</TableCell>
                <TableCell>Restaurant Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>People</TableCell>
                <TableCell>Selected Menu</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations &&
                reservations.map((reservation, index) => (
                  <TableRow key={index}>
                    <TableCell>{reservation._id}</TableCell>
                    <TableCell>{reservation.restaurantName}</TableCell>
                    <TableCell>{reservation.date}</TableCell>
                    <TableCell>{reservation.time}</TableCell>
                    <TableCell>{reservation.people}</TableCell>
                    <TableCell>
                      {reservation.menuSelection && reservation.menuSelection.length > 0
                        ? reservation.menuSelection.join(", ")
                        : "No menu selected"}
                    </TableCell>
                    
                    <TableCell>
                      <IconButton
                        onClick={() => handleEdit(reservation)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDelete(reservation)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEmail(reservation)}>
                        <EmailIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ): (
          <p>No bookings available</p>
        )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Booking</DialogTitle>
            <DialogContent>
              <TextField
                label="Date"
                value={selectedReservation ? selectedReservation.date : ""}
                onChange={(e) => handleChange("date", e.target.value)}
              />
              <TextField
                label="Time"
                value={selectedReservation ? selectedReservation.time : ""}
                onChange={(e) => handleChange("time", e.target.value)}
              />
              <TextField
                label="People"
                value={selectedReservation ? selectedReservation.people : ""}
                onChange={(e) => handleChange("people", e.target.value)}
              />
              </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Save</Button>
                </DialogActions>
                </Dialog>

              <Dialog open={showSuccessDialog} onClose={handleCloseSuccessDialog}>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogContent>
                  <p>The booking has been successfully updated.</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSuccessDialog}>OK</Button>
                </DialogActions>
                </Dialog>

                <Dialog open={showDeleteDialog} onClose={handleDeleteClose}>
                <DialogTitle>Edit Booking</DialogTitle>
                <DialogContent>
                  <p>The booking has been successfully cancelled.</p>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleDeleteClose}>OK</Button>
                </DialogActions>
                </Dialog> 
    </div>
  );
}

export default BookingManagement;
