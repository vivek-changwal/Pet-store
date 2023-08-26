import React, { useState } from 'react';
import axios from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import authHeader from '../../authHeaders';
import { Grid, Button, Stack, TextField, Box,  } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Header from "../../Header";

export default function Form() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productCategoryData, setProductCategoryData] = useState({
    name: "",

  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(productCategoryData);
    const body = {
      name: productCategoryData.name,
    };
    try {
      const response = await axios.post(
        `product-categories`,
        body,
        {
          headers: {
            "Authorization": authHeader(),
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response);
      window.location = "/product-categories";
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Product Category" subtitle="" />
      <br />
      <Box height="75vh">
        <Grid >
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row"  sx={{ mb:4, }}  >
              <TextField  
                label="Product Category Name"
                type="text"
                id="name"
                value={productCategoryData.name}
                required
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                fullWidth
                onChange={(e) => setProductCategoryData({ ...productCategoryData, name: e.target.value })}
              />
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">Add Product Sub Category</Button>
          </form>
        </Grid>
      </Box>
      <Toaster />
    </Box>
  );
}