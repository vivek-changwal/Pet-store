import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { Grid, Box } from '@mui/material';
import Header from "../../Header";
export default function ViewForm({ veterinary }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const firstName = veterinary?.user?.first_name;
  const lastName = veterinary?.user?.last_name;

  const fullName = `${firstName} ${lastName}`;
  
  return (

    <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb: 3 ,mt:3 }}>
          <Header title="Veterinary Details" subtitle="" />
        </DialogTitle>
        <Box height="75vh">
          <form >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="fullName"
                  label="Full Name"
                  value={fullName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="phone"
                  label="Phone"
                  value={veterinary?.user?.phone || ""}
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
                  label="Email"
                  value={veterinary?.user?.email || ""}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="price"
                  label="address"
                  value={veterinary.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="start_time"
                  label="Start Time "
                  value={veterinary.start_time}
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
                  value={veterinary.end_time}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="Experience"
                  label="experience"
                  value={veterinary.experience}
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
                  value={veterinary.fees}
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
