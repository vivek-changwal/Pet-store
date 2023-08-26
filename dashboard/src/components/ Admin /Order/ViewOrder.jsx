import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { Grid, Box } from '@mui/material';
import Header from "../../Header";
export default function ViewForm({ cartdata }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const firstName = cartdata?.user?.first_name;
  const lastName = cartdata?.user?.last_name;

  const fullName = `${firstName} ${lastName}`;
  return (

    <Box m="4.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb: 3, mt:4 }}>
          <Header title="Order Details" subtitle="" />
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
                  sx={{ mb: 8 }}
                  name="cart_items"
                  label="Cart Id"
                  value={cartdata?.cart_items[0].cart_id}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 4 }}
                  name="cart_items"
                  label="Product Id"
                  value={cartdata?.cart_items[0].product_id}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 8 }}
                  name="user"
                  label="Full Name"
                  value={fullName}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 4 }}
                  name="total_quantity"
                  label="Total Quantity"
                  value={cartdata.total_quantity}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 4 }}
                  name="total_amount"
                  label="Total Amount"
                  value={cartdata.total_amount}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 4 }}
                  name="status"
                  label="Status"
                  value={cartdata.status}

                />
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button style={{ color: 'white', backgroundColor: 'black', marginRight: '10px' }} onClick={handleClose}>Close</Button>
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
