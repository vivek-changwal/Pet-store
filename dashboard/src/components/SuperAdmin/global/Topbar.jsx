import { Box,Button , useTheme, MenuItem, Menu } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../../theme";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {  useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate() 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const userName = localStorage.getItem("first_name");
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const logOut = () => {
    localStorage.removeItem("authtoken");
    navigate('/')
  };
  return (
    <Box display="flex" justifyContent="end" p={2}>
      <Box display="flex">
      <h2>Admin Name-{userName}</h2>
      <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <ExitToAppIcon
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
      </Box>
    </Box>
  );
};

export default Topbar;