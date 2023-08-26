import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, Grid, Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import Header from '../../Header';

export default function EditPets({ pets }) {
  const [open, setOpen] = useState(false);
  const [petdata, setPetdata] = useState({
    age: pets.age || '',
    name: pets.name || '',
    colour: pets.colour || '',
    life_expectancy: pets.life_expectancy || '',
    breed: pets.breed || '',
    first_name: pets.user ? pets.user.first_name : '',
    last_name: pets.user ? pets.user.last_name : '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setPetdata({
      ...petdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    // Submit the form if validation passes
    try {
      // Construct the updated data
      const { age, colour, name, life_expectancy, first_name, last_name, breed } = petdata;
      const data = {
        age,
        colour,
        life_expectancy,
        name,
        breed,
        user: {
          first_name,
          last_name,
        },
      };

      // Make API call to update the pet data
      const response = await axios.put(`http://localhost:5000/api/pets/${pets.id}`, data, {
        headers: {
          Authorization: authHeader(),
          'Content-Type': 'application/json',
        },
      });
      window.location = '/petsuperAdminTable';
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const validateForm = () => {
    const { first_name, last_name, name, age, breed, colour, life_expectancy } = petdata;
    if (!first_name || !last_name || !name || !age || !breed || !colour || !life_expectancy) {
      console.log('All fields are required');
      return false;
    }

    return true;
  };

  return (
    <Box m="2.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'blue', mb: 3 }}>
          <Header title="Edit Pets" subtitle="" />
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
                  value={petdata.first_name}
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
                  value={petdata.last_name}
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
                  name="name"
                  label="Pet Name"
                  id="name"
                  margin="normal"
                  type="text"
                  value={petdata.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="age"
                  label="Age"
                  id="age"
                  margin="normal"
                  type="text"
                  value={petdata.age}
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
                  name="breed"
                  label="Breed"
                  id="breed"
                  margin="normal"
                  type="text"
                  value={petdata.breed}
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
                  name="colour"
                  label="Colour"
                  id="colour"
                  margin="normal"
                  type="text"
                  value={petdata.colour}
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
                  name="life_expectancy"
                  label="Life Expectancy"
                  id="life_expectancy"
                  margin="normal"
                  type="text"
                  value={petdata.life_expectancy}
                  onChange={handleChange}
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
