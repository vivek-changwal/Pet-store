import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from '../../Header';

export default function Editveterinary({ veterinary }) {
  const [open, setOpen] = useState(false);
  const [veterinarydata, setVeterinaryData] = useState({
    address: veterinary.address || '',
    start_time: veterinary.start_time || '',
    end_time: veterinary.end_time || '',
    experience: veterinary.experience || '',
    fees: veterinary.fees || '',
    organised_by: veterinary.organised_by || '',
    time: veterinary.time || '',
    first_name: veterinary.user ? veterinary.user.first_name : '',
    last_name: veterinary.user ? veterinary.user.last_name : '',
    email: veterinary.user ? veterinary.user.email : '',
    phone: veterinary.user ? veterinary.user.phone : '',
  });


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setVeterinaryData({
      ...veterinarydata,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', veterinarydata);

    const { address, start_time, fees, experience, first_name, last_name, end_time, email,phone } = veterinarydata;
    const data = {
        address,
        start_time,
        experience,
        fees,
        end_time,
      user: {
        first_name,
        last_name,
        email,
        phone,
      },
    };
    console.log('Updated Data:', data);

    try {
      const response = await axios.put(`http://localhost:5000/api/veterinaries/${veterinary.id}`, data, {
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
      });
      window.location = '/veterinarySuperAdminTable';
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Box m="2.5rem 5.5rem">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle sx={{ color: 'blue', mb: 3 }}>
            <Header title="Edit Veterinary" subtitle="" />
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
                value={veterinarydata.first_name}
                onChange={handleChange}
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
                value={veterinarydata.last_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="email"
                label="email"
                id="email"
                margin="normal"
                type="text"
                value={veterinarydata.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="phone"
                label="Phone"
                id="phone"
                margin="normal"
                type="text"
                value={veterinarydata.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="address"
                label="Address"
                id="address"
                margin="normal"
                type="text"
                value={veterinarydata.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="start_time"
                label="Start Time"
                id="start_time"
                margin="normal"
                type="text"
                value={veterinarydata.start_time}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="end_time"
                label="End Time"
                id="end_time"
                margin="normal"
                type="text"
                value={veterinarydata.end_time}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="experience"
                label="Experience"
                id="experience"
                margin="normal"
                type="text"
                value={veterinarydata.experience}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                name="fees"
                label="Fees"
                id="fees"
                margin="normal"
                type="text"
                value={veterinarydata.fees}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <DialogActions sx={{ mb: 5, mr: 6 }}>
                    <Button type="submit" style={{ color: 'white', backgroundColor: 'black', marginRight: '10px' }}>
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

