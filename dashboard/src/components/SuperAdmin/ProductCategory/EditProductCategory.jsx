import React, { useState } from 'react';
import Button from '@mui/material/Button';
import {TextField, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';

export default function EditForm({ productCategories }) {
  const [open, setOpen] = useState(false);
  const [productCategoryData, setProductCategoryData] = useState({
    name: productCategories.name,
  });
  const [nameError, setNameError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setProductCategoryData({ ...productCategoryData, [e.target.name]: e.target.value });
    setNameError('');
  };

  const validateForm = () => {
    const { name } = productCategoryData;

    if (name.trim() === '') {
      setNameError('Product name is required.');
      return false;
    }

    // Add additional validation rules as needed

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { name } = productCategoryData;
    const data = {
      name: name,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/api/product-categories/${productCategories.id}`,
        data,
        {
          headers: {
            Authorization: authHeader(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      window.location = '/ProductCategoryTable';
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen} style={{ color: 'white' }} data-bs-target={`#id${productCategories.id}`}>
          Edit
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={10} style={{ position: "relative", left: "20px" }}>
                <TextField
                  margin="normal"
                  fullWidth
                  name="name"
                  label="Name"
                  type="text"
                  id="name"
                  value={productCategoryData.name}
                  onChange={handleChange}
                  error={Boolean(nameError)}
                  helperText={nameError}
                />
              </Grid>
            </Grid>
            <DialogActions sx={{ mb: 3,ml:10}} >
              <Button onClick={handleClose} style={{ color: 'white' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ color: 'white' }}>
                Save
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
}
