import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from '../../Header';

export default function EditForm({ ngos }) {
  const [open, setOpen] = useState(false);
  const [ngodata, setFormData] = useState({
    address: ngos.address || '',
    contact: ngos.contact || '',
    name: ngos.name || '',
    time: ngos.time || '',
    first_name: ngos.user ? ngos.user.first_name : '',
    last_name: ngos.user ? ngos.user.last_name : '',
    email: ngos.user ? ngos.user.email : '',
  });
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...ngodata,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { first_name, last_name, contact, address, name, time, email } = ngodata;
    const errors = {};

    if (!first_name.trim()) {
      errors.first_name = 'First Name is required';
    }

    if (!last_name.trim()) {
      errors.last_name = 'Last Name is required';
    }

    if (!contact.trim()) {
      errors.contact = 'Contact is required';
    }

    if (!address.trim()) {
      errors.address = 'Address is required';
    }

    if (!name.trim()) {
      errors.name = 'Ngo Name is required';
    }

    if (!time.trim()) {
      errors.time = 'Time is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form Data:', ngodata);

      const { address, contact, name, time, first_name, last_name, email } = ngodata;
      const data = {
        address,
        contact,
        time,
        name,
        user: {
          first_name,
          last_name,
          email,
        },
      };
      console.log('Updated Data:', data);

      try {
        const response = await axios.put(`http://localhost:5000/api/ngos/${ngos.id}`, data, {
          headers: {
            Authorization: authHeader(),
            'Content-Type': 'application/json',
          },
        });
        console.log('Response:', response);
        window.location = '/ngoSuperAdminTable';
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  return (
    <Box m="2.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'blue', mb: 3 }}>
          <Header title="Edit Order" subtitle="" />
        </DialogTitle>
        <Box height="75vh">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="first_name"
                  label="First Name"
                  type="text"
                  id="first_name"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3}}
                  value={ngodata.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name}
                  helperText={errors.first_name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  type="text"
                  id="user"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3 }}
                  value={ngodata.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="contact"
                  label="Contact"
                  type="text"
                  id="contact"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3 }}
                  value={ngodata.contact}
                  onChange={handleChange}
                  error={!!errors.contact}
                  helperText={errors.contact}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="address"
                  label="Address"
                  type="text"
                  id="address"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3}}
                  value={ngodata.address}
                  onChange={handleChange}
                  error={!!errors.address}
                  helperText={errors.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Ngo Name"
                  type="text"
                  id="name"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3}}
                  value={ngodata.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="time"
                  label="Time"
                  type="text"
                  id="time"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3}}
                  value={ngodata.time}
                  onChange={handleChange}
                  error={!!errors.time}
                  helperText={errors.time}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  type="text"
                  id="email"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3 }}
                  value={ngodata.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
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
