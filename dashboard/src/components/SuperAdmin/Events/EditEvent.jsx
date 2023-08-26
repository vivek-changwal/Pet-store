import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from '../../Header';

export default function Editevents({ events }) {
  const [open, setOpen] = useState(false);
  const [eventdata, setEventdata] = useState({
    contact: events.contact || '',
    date: events.date || '',
    location: events.location || '',
    name: events.name || '',
    breed: events.breed || '',
    organised_by: events.organised_by || '',
    time: events.time || '',
    first_name: events.user ? events.user.first_name : '',
    last_name: events.user ? events.user.last_name : '',
  });
  const [errors, setErrors] = useState({}); // State for form validation errors

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setEventdata({
      ...eventdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const validationErrors = validateForm(eventdata);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Exit if there are validation errors
    }

    console.log('Form Data:', eventdata);

    const { contact, date, name, location, first_name, last_name, organised_by, time } = eventdata;
    const data = {
      contact,
      date,
      location,
      name,
      organised_by,
      time,
      user: {
        first_name,
        last_name,
      },
    };
    console.log('Updated Data:', data);

    try {
      const response = await axios.put(`http://localhost:5000/api/events/${events.id}`, data, {
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
      });
      window.location = '/eventsuperAdminTable';
    } catch (error) {
      console.log('Error:', error);
    }
  };

  // Validate form fields
  const validateForm = (data) => {
    let errors = {};

    if (!data.first_name) {
      errors.first_name = 'First Name is required';
    }

    if (!data.last_name) {
      errors.last_name = 'Last Name is required';
    }

    if (!data.name) {
      errors.name = 'Pet Name is required';
    }

    if (!data.contact) {
      errors.contact = 'Contact is required';
    }

    if (!data.date) {
      errors.date = 'Date is required';
    }

    if (!data.location) {
      errors.location = 'Location is required';
    }

    if (!data.organised_by) {
      errors.organised_by = 'Organised By is required';
    }

    if (!data.time) {
      errors.time = 'Time is required';
    }

    return errors;
  };

  return (
    <Box m="2.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'blue', mb: 3 }}>
          <Header title="Edit events" subtitle="" />
        </DialogTitle>
        <Box height="75vh">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="first_name"
                  label="First Name"
                  id="first_name"
                  margin="normal"
                  type="text"
                  value={eventdata.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="last_name"
                  label="Last Name"
                  id="last_name"
                  margin="normal"
                  type="text"
                  value={eventdata.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="name"
                  label="Pet Name"
                  id="name"
                  margin="normal"
                  type="text"
                  value={eventdata.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="contact"
                  label="Contact"
                  id="contact"
                  margin="normal"
                  type="text"
                  value={eventdata.contact}
                  onChange={handleChange}
                  error={!!errors.contact}
                  helperText={errors.contact}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="date"
                  label="Date"
                  id="date"
                  margin="normal"
                  type="text"
                  value={eventdata.date}
                  onChange={handleChange}
                  error={!!errors.date}
                  helperText={errors.date}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="location"
                  label="Location"
                  id="location"
                  margin="normal"
                  type="text"
                  value={eventdata.location}
                  onChange={handleChange}
                  error={!!errors.location}
                  helperText={errors.location}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="organised_by"
                  label="Organised By"
                  id="organised_by"
                  margin="normal"
                  type="text"
                  value={eventdata.organised_by}
                  onChange={handleChange}
                  error={!!errors.organised_by}
                  helperText={errors.organised_by}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="time"
                  label="Time"
                  id="time"
                  margin="normal"
                  type="text"
                  value={eventdata.time}
                  onChange={handleChange}
                  error={!!errors.time}
                  helperText={errors.time}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <DialogActions sx={{ mb: 5, mr: 6 }}>
                  <Button
                    type="submit"
                    style={{ color: 'white', backgroundColor: 'black', marginRight: '10px' }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleClose} style={{ color: 'white', backgroundColor: 'grey' }}>
                    Cancel
                  </Button>
                </DialogActions>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        Edit
      </Button>
    </Box>
  );
}
