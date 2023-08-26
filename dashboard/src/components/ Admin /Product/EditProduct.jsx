import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl, Grid, InputLabel, MenuItem, Select, Box } from '@mui/material';
import authHeader from '../../authHeaders';
import ProductCategory from '../../authProductCategoryLink';
import { blue } from '@mui/material/colors';
import Header from "../../Header";

export default function EditForm({ product }) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [name, setName] = useState(product.name);
  const [quantity, setQuantity] = useState(product.quantity);
  const [size, setSize] = useState(product.size);
  const [weight, setWeight] = useState(product.weight);
  const [price, setPrice] = useState(product.price);
  const [productCategories, setProductCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product.product_sub_category.product_category.id);
  const [selectedSubCategory, setSelectedSubCategory] = useState(product.product_sub_category.id);
  const [productSubCategories, setProductSubCategories] = useState([]);
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');
  const [nameError, setNameError] = useState('');
  const [brandError, setBrandError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [weightError, setWeightError] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchProductCategories = async () => {
    try {
      const response = await ProductCategory.getAllProductCategory();
      setProductCategories(response.data.productCategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryChange = (event) => {
    const selectedValue = event.target.value || null;
    setSelectedSubCategory(selectedValue);
  };

  const handleCategoryChange = (event) => {
    const selectedProductCategoryId = event.target.value;
    const selectedProductCategory = productCategories.find((category) => category.id === selectedProductCategoryId);
    setSelectedCategory(selectedProductCategoryId);
    setProductSubCategories(selectedProductCategory.product_sub_categories);
    setSelectedSubCategory(null);
  };

  const validateForm = () => {
    let isValid = true;
    setCategoryError('');
    setSubCategoryError('');
    setNameError('');
    setBrandError('');
    setDescriptionError('');
    setQuantityError('');
    setSizeError('');
    setWeightError('');
    if (!selectedCategory) {
      setCategoryError('Please select a product category');
      isValid = false;
    }
  
    if (!selectedSubCategory) {
      setSubCategoryError('Please select a product sub-category');
      isValid = false;
    }

    return isValid;
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const data = {
        product_sub_category_id: selectedSubCategory,
        brand: brand,
        description: description,
        name: name,
        price: price,
        quantity: quantity,
        size: size,
        weight: weight,
      };
      try {
        const response = await axios.put(`http://localhost:5000/api/admin/products/${product.id}`, data, {
          headers: {
            Authorization: authHeader(),
            'Content-Type': 'application/json',
          },
        });
        window.location = '/productTable';
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchProductCategories();
  }, []);

  return (
    <Box m="5.5rem 5.5rem">
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color={blue} sx={{ mb: 3 }}>
          <Header title="Edit Product" subtitle="" />
        </DialogTitle>
        <Box height="75vh" style={{width:"1025px"}}>
          <form onSubmit={updateProduct}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="category-label">Product Category</InputLabel>
                  <Select
                    margin="normal"
                    variant="filled"
                    labelId="category-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Product Category"
                    onChange={handleCategoryChange}
                    error={!!categoryError}
                    helperText={categoryError}
                    sx={{ mb: 5 }}
                  >
                    {productCategories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="sub-category-label">Product Sub Category</InputLabel>
                  <Select
                    margin="normal"
                    variant="filled"
                    labelId="sub-category-label"
                    id="sub-category-select"
                    value={selectedSubCategory }
                    label="Product Sub Category"
                    onChange={handleSubCategoryChange}
                    error={!!subCategoryError}
                    helperText={subCategoryError}
                  >
                    {productSubCategories.map((subCategory) => (
                      <MenuItem key={subCategory.id} value={subCategory.id}>
                        {subCategory.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="name"
                  label="Name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  error={!!nameError}
                  helperText={nameError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  id="brand"
                  label="Brand"
                  name="brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  variant="outlined"
                  color="secondary"
                  error={!!brandError}
                  helperText={brandError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  color="secondary"
                  id="description"
                  label="Description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!descriptionError}
                  helperText={descriptionError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  error={!!quantityError}
                  helperText={quantityError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  id="size"
                  name="size"
                  label="Size"
                  type="number"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  error={!!sizeError}
                  helperText={sizeError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  id="weight"
                  name="weight"
                  label="Weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  error={!!weightError}
                  helperText={weightError}
                  sx={{ mb: 5 }}
                />
              </Grid>
              <Grid item xs={12}>
                <DialogActions>
                  <Button type="submit"  style={{ color: 'white', backgroundColor:'black', marginRight:'10px' }}>
                    Save
                  </Button>
                  <Button onClick={handleClose} style={{  color: 'white', backgroundColor:'grey' }}>
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
