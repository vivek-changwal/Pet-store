import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Box, Grid, Stack, FormLabel, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from "../../Header";

export default function EditForm({ user }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.first_name,
    lastName: user.last_name,
    phone: user.phone,
    gender: user.gender
  });
  const [formErrors, setFormErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, phone, gender } = formData;
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      gender: gender
    };

    if (validateForm()) {
      try {
        const response = await axios.put(`http://localhost:5000/api/admin/users/${user.id}`, data, {
          headers: {
            'Authorization': authHeader(),
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        window.location = "/userTable";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
  
    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    } else if (/\d/.test(formData.firstName)) {
      errors.firstName = "First name should not contain numbers";
    }
  
    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    } else if (/\d/.test(formData.lastName)) {
      errors.lastName = "Last name should not contain numbers";
    }
  
    // Validate phone number
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phone)) {
      errors.phone = "Invalid phone number";
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  return (
    <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ mb: 3, mt: 4 }}>
          <Header title="Edit User Details" subtitle="" />
        </DialogTitle>
        <Box height="75vh">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={5}>
              <Grid item xs={10}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="firstName"
                  label="First Name"
                  type="text"
                  id="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  color="secondary"
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  sx={{ mb: 2, ml: 11 }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="lastName"
                  label="Last Name"
                  type="text"
                  id="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  color="secondary"
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  sx={{ mb: 2, ml: 11 }}
                />
              </Grid>
              <Grid item xs={10}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="number"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  color="secondary"
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                  sx={{ mb: 2, ml: 11 }}
                />
              </Grid>
              <Grid item xs={10}>
                <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                  <FormLabel id="demo-radio-buttons-group-label" sx={{  marginLeft: 11 }}>
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="gender"
                    required
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <div>
                      <FormControlLabel value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    </div>
                  </RadioGroup>
                </Stack>
              </Grid>
            </Grid>
            <DialogActions>
              <Button type="submit" style={{ backgroundColor: '#28a745 ', color: 'white' }} >
                Save
              </Button>
              <Button onClick={handleClose} style={{ backgroundColor: 'black', color: 'white' }} >
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        Edit
      </Button>
    </Box>
  );
}
