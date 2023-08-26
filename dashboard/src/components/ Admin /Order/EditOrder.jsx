import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from '../../Header';

export default function EditForm({ cartdata }) {
  const [open, setOpen] = useState(false);
  const [cartsdata, setFormData] = useState({
    total_quantity: cartdata.total_quantity,
    total_amount: cartdata.total_amount,
    status: cartdata.status,
    first_name: cartdata.user ? cartdata.user.first_name : '',
    last_name: cartdata.user ? cartdata.user.last_name : '',
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
      ...cartsdata,
      [e.target.name]: e.target.value,
    });
    // Clear the validation error when the field is changed
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', cartsdata);

    const { total_quantity, total_amount, status, first_name, last_name } = cartsdata;

    // Perform validation
    const validationErrors = {};
    if (!first_name) {
      validationErrors.first_name = 'First Name is required';
    }
    if (!last_name) {
      validationErrors.last_name = 'Last Name is required';
    }
    if (!total_quantity) {
      validationErrors.total_quantity = 'Total Quantity is required';
    }
    if (!total_amount) {
      validationErrors.total_amount = 'Total Amount is required';
    }
    if (!status) {
      validationErrors.status = 'Status is required';
    }

    // If there are validation errors, set the errors state and return
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = {
      total_quantity,
      total_amount,
      status,
      user: {
        first_name,
        last_name,
      },
    };
    console.log('Updated Data:', data);

    try {
      const response = await axios.put(`http://localhost:5000/api/carts/${cartdata.id}`, data, {
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
      });
      console.log('Response:', response);
      window.location = '/orderTable';
    } catch (error) {
      console.log('Error:', error);
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
              <Grid item xs={11}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="first_name"
                  label="First Name"
                  type="text"
                  id="first_name"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3, ml: 5 }}
                  value={cartsdata.first_name}
                  onChange={handleChange}
                  error={!!errors.first_name} // Set error prop based on the presence of errors
                  helperText={errors.first_name} // Display error message
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  type="text"
                  id="last_name"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3, ml: 5 }}
                  value={cartsdata.last_name}
                  onChange={handleChange}
                  error={!!errors.last_name}
                  helperText={errors.last_name}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="total_quantity"
                  label="Total Quantity"
                  type="text"
                  id="total_quantity"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3, ml: 5 }}
                  value={cartsdata.total_quantity}
                  onChange={handleChange}
                  error={!!errors.total_quantity}
                  helperText={errors.total_quantity}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="total_amount"
                  label="Total Amount"
                  type="text"
                  id="total_amount"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3, ml: 5 }}
                  value={cartsdata.total_amount}
                  onChange={handleChange}
                  error={!!errors.total_amount}
                  helperText={errors.total_amount}
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="status"
                  label="Status"
                  type="text"
                  id="status"
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3, ml: 5 }}
                  value={cartsdata.status}
                  onChange={handleChange}
                  error={!!errors.status}
                  helperText={errors.status}
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
