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
  const colors = tokens(theme.palette.mode);
  const [productSubCategoryData, setProductSubCategoryData] = useState({
    name: '',
    product_category: '',
    product_sub_category: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    product_category: '',
    product_sub_category: ''
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/product-sub-categories')
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productSubCategoryData);
    console.log('Selected Category:', selectedCategory);
    const isValid = validateForm();
    if (isValid) {
      const body = {
        product_category_id: selectedCategory.id,
        name: productSubCategoryData.name,
      };
      try {
        const response = await axios.post(`product-sub-categories`, body, {
          headers: {
            "Authorization": authHeader(),
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        window.location = "/product-sub-categories";
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
    return isValid;
  };


  const handleSubCategoryChange = (event) => {
    const selectedValue = event.target.value || '';
    setSelectedSubCategory(selectedValue);
    setProductSubCategoryData((prevState) => ({
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
    setProductSubCategoryData((prevState) => ({
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
              </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="name"
                label="Name"
                name="name"
                type="text"
                value={productSubCategoryData.name}
                onChange={(e) => setProductSubCategoryData((prevState) => ({ ...prevState, name: e.target.value }))}
                error={Boolean(formErrors.name)}
                helperText={formErrors.name}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
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
