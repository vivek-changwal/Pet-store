import React, { useState } from 'react';
import axios from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import authHeader from '../../authHeaders';
import { Grid, Button, Stack, TextField, RadioGroup, FormControlLabel, Radio, Box, FormLabel } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';
import Header from "../../Header";

export default function Form() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    gender: "",
    first_name: "",
    last_name: "",
    phone: "",
    date_of_birth: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.first_name.trim() === "" ||
      formData.last_name.trim() === "" ||
      formData.email.trim() === "" ||
      formData.password.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.date_of_birth.trim() === "" ||
      formData.gender.trim() === ""
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    const phoneRegex = /^\d{10}$/; 
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }

    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(formData.first_name) || !nameRegex.test(formData.last_name)) {
      toast.error("First name and last name should only contain letters");
      return;
    }

    try {
      const body = { ...formData };
      const response = await axios.post("admin/users", body, {
        headers: {
          "Authorization": authHeader(),
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      navigate("/users");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add User" subtitle="" />
      <br />
      <Box height="75vh">
        <Grid>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="First Name"
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              />
              <TextField
                label="Last Name"
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="Email"
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{ mb: 3 }}
                fullWidth
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <TextField
                label="Password"
                required
                variant="outlined"
                color="secondary"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                fullWidth
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="Phone"
                required
                variant="outlined"
                color="secondary"
                type="number"
                sx={{ mb: 3 }}
                fullWidth
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <FormLabel id="demo-radio-buttons-group-label" sx={{ mt: 1 }} s>Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                required
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <div>
                  <FormControlLabel value="Female" control={<Radio />} label="female" />
                  <FormControlLabel value="Male" control={<Radio />} label="male" />
                </div>
              </RadioGroup>
            </Stack>
            <Button variant="outlined" color="secondary" type="submit">Add User</Button>
          </form>
        </Grid>
      </Box>
      <Toaster />
    </Box>
  );
}
