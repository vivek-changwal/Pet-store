import * as React from 'react';
import Button from '@mui/material/Button';
import {TextField, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';


export default function ViewForm({ productCategories }) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ color: 'white' }}>
        View
      </Button>
      <Dialog open={open} onClose={handleClose}  >
        <DialogTitle  color={blue}>Product Category Details</DialogTitle>
        <form >
        <Grid container spacing={2} >
        <Grid item xs={10} style={{position:"relative",left:"20px" ,width:"31%;"}}>
        <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Product Category Name"
            value={productCategories.name}
          />
         </Grid>
        </Grid>
        </form>
        <Button sx={{ mb: 3,ml:10}} onClick={handleClose} style={{ color: 'white' }}>
                Cancel
        </Button>
      </Dialog>
    </div>
  );
}