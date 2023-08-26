import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { Grid, Box } from '@mui/material';
import Header from "../../Header";
export default function ViewForm({ pets }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const firstName = pets?.user?.first_name;
  const lastName = pets?.user?.last_name;

  const fullName = `${firstName} ${lastName}`;
  
  return (

    <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb: 3 ,mt:3 }}>
          <Header title="Pets Details" subtitle="" />
        </DialogTitle>
        <Box height="75vh">
          <form >
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="fullName"
                  label="Owner"
                  value={fullName}
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
                  value={pets.name}
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
                  value={pets.age}
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
                  value={pets.breed}
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
                  value={pets.colour}
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
                  value={pets.life_expectancy}
                />
              </Grid>
       
              <Grid item xs={12}>
                <DialogActions>
                  <Button  style={{ color: 'white', backgroundColor:'black', marginRight:'10px' }} onClick={handleClose}>Close</Button>
                </DialogActions>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Dialog>
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        View
      </Button>
    </Box>
  );
}
