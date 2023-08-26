import * as React from 'react';
import Button from '@mui/material/Button';
import {TextField,Box ,Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useParams } from 'react-router'
import Axios from "axios";
import { blue } from '@mui/material/colors'
import authHeader from '../../authHeaders';
import Header from '../../Header'

export default function ViewForm({ user }) {
  const { id } = useParams()
  const [open, setOpen] = React.useState(false);
  const [first_Name] = React.useState(user.first_name);
  const [last_Name] = React.useState(user.last_name);
  const [email] = React.useState(user.email);
  const [phone] = React.useState(user.phone);
  const [gender] = React.useState(user.gender);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await Axios.get(`admin/users/${id}`,
        { headers: authHeader() }
      )
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
     <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb:2 ,mt:4}}>
          <Header title="User Details" subtitle="" />
        </DialogTitle>
     <Box height="75vh">  
        <form onSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={10}>
        <TextField
            margin="normal"
            fullWidth
            name="name"
            label="First Name"
            value={first_Name}
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, ml:11 }}
          />
              </Grid>
              <Grid item xs={10}>
          <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Last Name"
            value={last_Name}
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, ml:11 }}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            value={email}
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, ml:11 }}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            margin="normal"
            fullWidth
            name="Phone"
            label="Phone"
            value={phone}
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, ml:11 }}
          />
          </Grid>
          <Grid item xs={10}>
          <TextField
            margin="normal"
            fullWidth
            name="gender"
            label="Gender"
            value={gender}
            variant="outlined"
            color="secondary"
            sx={{ mb: 2, ml:11 }}
          />
          </Grid>
         </Grid> 
        </form>
        </Box>
        <DialogActions >
          <Button sx={{ mb: 6,}} style={{ backgroundColor: 'black' , color:'white' }} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        View
      </Button>
    </Box>
  );
}

