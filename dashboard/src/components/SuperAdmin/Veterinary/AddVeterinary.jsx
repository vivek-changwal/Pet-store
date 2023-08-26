import React, { useState, useEffect } from 'react';
import axios from "../../api/baseUrl";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import authHeader from '../../authHeaders';
import { Grid, Button, Stack, TextField, FormControl, InputLabel, Select, Box, MenuItem } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Header from "../../Header";
import UserCategory from "../../authUserLink"

export default function Form() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const colors = tokens(theme.palette.mode);
  const [veterinary, setVeterinaryData] = useState({
    experience: '',
    start_time: '',
    end_time: '',
    fees: '',
    address:'',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/veterinaries')
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(veterinary);
    console.log('Selected User:', selectedUser);
    const body = {
      user_id: selectedUser.id,
      experience: veterinary.experience,
      start_time: veterinary.start_time,
      end_time: veterinary.end_time,
      fees: veterinary.fees,
      address: veterinary.address,
    };
    try {
      const response = await axios.post(`veterinaries`, body, {
        headers: {
          "Authorization": authHeader(),
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      window.location = "/veterinaries";
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find(user => user.id === selectedUserId);
    setSelectedUser(selectedUser);
    setVeterinaryData((prevState) => ({
      ...prevState,
      user_id: selectedUser.id
    }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserCategory.getAllUser();
        console.log(response)
        setUsers(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Add Veterinary" subtitle="" />
      <br />
      <Box height="75vh">
        <Grid>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="user-label">User</InputLabel>
                <Select
                  margin="normal"
                  variant="filled"
                  labelId="user-label"
                  id="user-select"
                  value={selectedUser ? selectedUser.id : ''}
                  label="User"
                  onChange={handleUserChange}
                  sx={{ mb: 3 }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.first_name}  {user.last_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                required
                id="end_time"
                label="End Time"
                name="end_time"
                type="text"
                value={veterinary.end_time}
                onChange={(e) => setVeterinaryData((prevState) => ({ ...prevState, end_time: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="experience"
                label="Experience"
                name="experience"
                type="number"
                value={veterinary.experience}
                onChange={(e) => setVeterinaryData((prevState) => ({ ...prevState, experience: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
                 <TextField
                fullWidth
                required
                id="start_time"
                label="Start Time"
                name="Start Time"
                type="text"
                value={veterinary.start_time}
                onChange={(e) => setVeterinaryData((prevState) => ({ ...prevState, start_time: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="fees"
                label="Fees"
                name="fees"
                type="number"
                value={veterinary.fees}
                onChange={(e) => setVeterinaryData((prevState) => ({ ...prevState, fees: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
                 <TextField
                fullWidth
                required
                id="address"
                label="Address"
                name="address"
                type="text"
                value={veterinary.address}
                onChange={(e) => setVeterinaryData((prevState) => ({ ...prevState, address: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>
            <Grid item xs={12} mt={3} mb={4} mr={3}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button variant="contained" color="primary" type="submit">
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
