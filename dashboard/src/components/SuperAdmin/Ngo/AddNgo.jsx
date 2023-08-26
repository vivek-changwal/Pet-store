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
  const [ngo, setNgoData] = useState({
    contact: '',
    name: '',
    time: '',
    address:'',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/ngos')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      // User is not selected
      console.error('Error: User is not selected');
      return;
    }

    if (!ngo.time || !ngo.contact || !ngo.address || !ngo.name) {
      // Required fields are not filled
      console.error('Error: Required fields are not filled');
      return;
    }

    const body = {
      user_id: selectedUser.id,
      contact: ngo.contact,
      name: ngo.name,
      time: ngo.time,
      fees: ngo.fees,
      address: ngo.address,
    };
    try {
      const response = await axios.post(`ngos`, body, {
        headers: {
          "Authorization": authHeader(),
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      window.location = "/ngos";
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find(user => user.id === selectedUserId);
    setSelectedUser(selectedUser);
    setNgoData((prevState) => ({
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
      <Header title="Add Product" subtitle="" />
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
                id="time"
                label="Time"
                name="time"
                type="text"
                value={ngo.time}
                onChange={(e) => setNgoData((prevState) => ({ ...prevState, time: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="contact"
                label="Contact"
                name="contact"
                type="text"
                value={ngo.contact}
                onChange={(e) => setNgoData((prevState) => ({ ...prevState, contact: e.target.value }))}
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
                value={ngo.address}
                onChange={(e) => setNgoData((prevState) => ({ ...prevState, address: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
              />
            </Stack>
            <Stack spacing={1} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="name"
                label="Ngo Name"
                name="name"
                type="text"
                value={ngo.name}
                onChange={(e) => setNgoData((prevState) => ({ ...prevState, name: e.target.value }))}
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
