import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { Grid, Box } from '@mui/material';
import Header from "../../Header";
export default function ViewForm({ ngos }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const firstName = ngos?.user?.first_name;
  const lastName = ngos?.user?.last_name;

  const fullName = `${firstName} ${lastName}`;
  return (
    <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb: 3 ,mt:3 }}>
          <Header title="Ngos Details" subtitle="" />
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
                  label="Founder"
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
                  name="address"
                  label="Address"
                  value={ngos.address}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 2 }}
                  name="user"
                  label="Email"
                  value={ngos?.user?.email}
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
                  value={ngos.contact}
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
                  label="Name"
                  value={ngos.name}
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
                  value={ngos.time}
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
