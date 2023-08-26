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
  const [event, setEventData] = useState({
    contact: '',
    name: '',
    time: '',
    location:'',
    organised_by:'',
  });
  const [errors, setErrors] = useState({
    contact: '',
    name: '',
    time: '',
    location:'',
    organised_by:'',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    navigate('/events')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(event);
      console.log('Selected User:', selectedUser);
      const body = {
        user_id: selectedUser.id,
        contact: event.contact,
        name: event.name,
        time: event.time,
        organised_by: event.organised_by,
        location: event.location,
      };
      try {
        const response = await axios.post(`events`, body, {
          headers: {
            "Authorization": authHeader(),
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        window.location = "/events";
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const handleUserChange = (event) => {
    const selectedUserId = event.target.value;
    const selectedUser = users.find(user => user.id === selectedUserId);
    setSelectedUser(selectedUser);
    setEventData((prevState) => ({
      ...prevState,
      user_id: selectedUser.id
    }));
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      contact: '',
      name: '',
      time: '',
      location:'',
      organised_by:'',
    };

    if (!event.contact) {
      newErrors.contact = 'Contact is required';
      valid = false;
    }

    if (!event.name) {
      newErrors.name = 'Event name is required';
      valid = false;
    }

    if (!event.time) {
      newErrors.time = 'Time is required';
      valid = false;
    }

    if (!event.location) {
      newErrors.location = 'Location is required';
      valid = false;
    }

    if (!event.organised_by) {
      newErrors.organised_by = 'Organised by is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
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
      <Header title="Add Event" subtitle="" />
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
                value={event.time}
                onChange={(e) => setEventData((prevState) => ({ ...prevState, time: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                error={!!errors.time}
                helperText={errors.time}
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
                value={event.contact}
                onChange={(e) => setEventData((prevState) => ({ ...prevState, contact: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                error={!!errors.contact}
                helperText={errors.contact}
              />
              <TextField
                fullWidth
                required
                id="location"
                label="Location"
                name="location"
                type="text"
                value={event.location}
                onChange={(e) => setEventData((prevState) => ({ ...prevState, location: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                error={!!errors.location}
                helperText={errors.location}
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                fullWidth
                required
                id="name"
                label="Event Name"
                name="name"
                type="text"
                value={event.name}
                onChange={(e) => setEventData((prevState) => ({ ...prevState, name: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                fullWidth
                required
                id="organised_by"
                label="Organised By"
                name="organised_by"
                type="text"
                value={event.organised_by}
                onChange={(e) => setEventData((prevState) => ({ ...prevState, organised_by: e.target.value }))}
                variant="outlined"
                color="secondary"
                sx={{ mb: 3 }}
                error={!!errors.organised_by}
                helperText={errors.organised_by}
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
