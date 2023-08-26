import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import authHeader from '../../authHeaders';
import ProductCategory from '../../authProductCategoryLink';

export default function EditForm({ productSubCategories }) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(productSubCategories.product_category.id 
  );
  const [productCategories, setProductCategories] = useState([]);
  const [productCategoryData, setProductCategoryData] = useState({
    name:productSubCategories.name
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value || null;
    setSelectedCategory(selectedValue);
    setProductCategoryData({ ...productCategoryData, [event.target.name]: event.target.value });
  };
  


  const fetchProductCategories = async () => {
    try {
      const response = await ProductCategory.getAllProductCategory();
      setProductCategories(response.data.productCategories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name } = productCategoryData;
    const data = {
      name: name,
      product_category: selectedCategory,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/product-sub-categories/${productSubCategories.id}`,
        data,
        {
          headers: {
            Authorization: authHeader(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      window.location = '/ProductSubCategoryTable';
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div maxWidth="xs" >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{ color: 'white' }}
        data-bs-target={`#id${productSubCategories ? productSubCategories.id : ''}`}
      >
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit</DialogTitle>
        <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
        <Grid item xs={10} style={{position:"relative",left:"29px"}}>
          <FormControl fullWidth>
            <InputLabel id="category-label">Product Category</InputLabel>
            <Select
              margin="normal"
              variant="filled"
              labelId="category-label"
              id="category-select"
              value={selectedCategory}
              label="Product Category"
              onChange={handleChange}
              name="category"
            >
              {productCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         </Grid> 
         <Grid item xs={10} style={{position:"relative",left:"29px"}}>
          <TextField
            margin="normal"
            fullWidth
            name="name"
            label="Name"
            type="text"
            id="name"
            value={productCategoryData.name}
            onChange={handleChange}
          />
        </Grid>
        </Grid>
          <DialogActions>
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