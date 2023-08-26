import React, { useState, useEffect } from 'react';
import axios from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import authHeader from '../../authHeaders';
import { Grid, Button, Stack, TextField, FormControl, InputLabel, Select, Box, MenuItem } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Header from "../../Header";
import ProductCategory from "../../authProductCategoryLink"

export default function Form(product) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const [productSubCategories, setProductSubCategories] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryError, setCategoryError] = useState('');
  const [subCategoryError, setSubCategoryError] = useState('');
  const colors = tokens(theme.palette.mode);
  const [productData, setProductData] = useState({
    name: '',
    brand: '',
    description: '',
    quantity: '',
    size: '',
    weight: '',
    price: '',
    total_price: '',
    product_category: '',
    product_sub_category: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    brand: '',
    description: '',
    quantity: '',
    size: '',
    weight: '',
    price: '',
    total_price: '',
    product_category: '',
    product_sub_category: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/products')
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productData);
    console.log('Selected Sub Category:', selectedSubCategory);
    const isValid = validateForm();
    if (isValid) {
      const body = {
        product_sub_category_id: selectedSubCategory,
        name: productData.name,
        brand: productData.brand,
        description: productData.description,
        quantity: productData.quantity,
        size: productData.size,
        weight: productData.weight,
        price: productData.price,
        total_price: productData.total_price
      };
      try {
        const response = await axios.post(`products`, body, {
          headers: {
            "Authorization": authHeader(),
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        window.location = "/products";
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};
    setFormErrors(errors);
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


  const handleSubCategoryChange = (event) => {
    const selectedValue = event.target.value || '';
    setSelectedSubCategory(selectedValue);
    setProductData((prevState) => ({
      ...prevState,
      product_sub_category: selectedValue
    }));
    console.log(selectedValue)
  };

  const handleCategoryChange = (event) => {
    const selectedProductCategoryId = event.target.value;
    const selectedProductCategory = productCategories.find(category => category.id === selectedProductCategoryId);
    setSelectedCategory(selectedProductCategory);
    setProductSubCategories(selectedProductCategory.product_sub_categories);
    setProductData((prevState) => ({
      ...prevState,
      product_category: selectedProductCategory
    }));
  };

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await ProductCategory.getAllProductCategory();
        setProductCategories(response.data.productCategories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductCategories();
  }, []);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Product" subtitle="" />
      <br />
      <Box height="75vh">
        <Grid>
          <form autoComplete="off" onSubmit={handleSubmit}>
          <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <FormControl fullWidth>
                <InputLabel id="category-label">Product Category</InputLabel>
                <Select
                  margin="normal"
                  variant="filled"
                  labelId="category-label"
                  id="category-select"
                  value={selectedCategory ? selectedCategory.id : ''}
                  label="Product Category"
                  onChange={handleCategoryChange}
                  sx={{ mb: 3 }}
                >
                  {productCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="sub-category-label">Product Sub Category</InputLabel>
                <Select
                  margin="normal"
                  variant="filled"
                  labelId="sub-category-label"
                  id="sub-category-select"
                  value={selectedSubCategory}
                  label="Product Sub Category"
                  onChange={handleSubCategoryChange}
                  sx={{ mb: 3 }}
                >
                  {productSubCategories.map((category, index) => (
                    <MenuItem key={index} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                name="name"
                type="text"
                value={productData.name}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, name: e.target.value }))}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                required
                id="brand"
                label="Brand"
                name="brand"
                type="text"
                value={productData.brand}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, brand: e.target.value }))}
                error={Boolean(formErrors.brand)}
                helperText={formErrors.brand}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
              fullWidth
              required
              variant="outlined"
              color="secondary"
              id="description"
              label="Description"
              name="description"
              type="text"
              value={productData.description}
              onChange={(e) => setProductData((prevState) => ({ ...prevState, description: e.target.value }))}
              error={Boolean(formErrors.description)}
              helperText={formErrors.description}
              sx={{ mb: 3 }}
              />
              <TextField
                required
                variant="outlined"
                color="secondary"
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                type="number"
                value={productData.quantity}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, quantity: e.target.value }))}
                error={Boolean(formErrors.quantity)}
                helperText={formErrors.quantity}
                sx={{ mb: 3 }}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                id="size"
                name="size"
                label="Size"
                type="number"
                value={productData.size}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, size: e.target.value }))}
                error={Boolean(formErrors.size)}
                helperText={formErrors.size}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                variant="outlined"
                color="secondary"
                id="weight"
                name="weight"
                label="Weight"
                type="number"
                value={productData.weight}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, weight: e.target.value }))}
                error={Boolean(formErrors.weight)}
                helperText={formErrors.weight}
              />
            </Stack>
       
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                required
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                id="total_price"
                name="total_price"
                label="Total Price"
                type="number"
                value={productData.total_price}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, total_price: e.target.value }))}
                error={Boolean(formErrors.total_price)}
                helperText={formErrors.total_price}
              />
              <TextField
                required
                variant="outlined"
                color="secondary"
                fullWidth
                sx={{ mb: 3 }}
                id="price"
                name="price"
                label="Price"
                type="number"
                value={productData.price}
                onChange={(e) => setProductData((prevState) => ({ ...prevState, price: e.target.value }))}
                error={Boolean(formErrors.price)}
                helperText={formErrors.price}
              />
            </Stack>
            <Grid item xs={12} mt={3} mb={4} mr={3}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
               <Button   variant="contained" color="primary" type="submit">
                   Save
                 </Button>
                   <Button sx={{ backgroundColor: theme.palette.grey[500], color: theme.palette.common.white }} onClick={handleClose}> Cancel</Button>
               </Stack>
             </Grid>
          </form>
        </Grid>
      </Box>
      <Toaster />
    </Box>
  );
}