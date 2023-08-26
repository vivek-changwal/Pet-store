import * as React from 'react';
import Button from '@mui/material/Button';
import {TextField, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { blue } from '@mui/material/colors';
import { positions } from '@mui/system';


export default function ViewForm({ productSubCategories }) {
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue}>Product Sub Category Details</DialogTitle>
        <form >
        <Grid container spacing={5}>
        <Grid item xs={10} style={{position:"relative",left:"29px"}}>
        <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Product Category Name"
            value={productSubCategories.name}
          />
          </Grid>
          <Grid item xs={10} style={{position:"relative",left:"29px"}}>
              <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  sx={{ mb: 3 }}
                  name="product_sub_category"
                  label="Product Sub Category"
                  value={productSubCategories?.product_category?.name }
                />
            </Grid>
         </Grid>
        </form>
        <Grid item xs={12} sx={{ mb: 2 }} >
                <DialogActions>
                  <Button  style={{ color: 'white', backgroundColor:'black', marginRight:'10px' }} onClick={handleClose}>Close</Button>
                </DialogActions>
              </Grid>
      </Dialog>
    </div>
  );
}