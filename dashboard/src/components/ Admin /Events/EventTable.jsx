import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Event from "../../authEventsLink";
import { useNavigate } from "react-router-dom";
import ViewForm from './ViewEvent'
import EditForm from './EditEvent'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import authHeader from '../../authHeaders';

const EventsSuperAdmin = () => {

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [events, setEvents] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`events/${id}`, {
        headers: { "Authorization": authHeader() }
      });
      setEvents(events.filter(event => event.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedEventId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      editable: true
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      valueGetter: (params) => {
        const rawDate = params.row.date;
        const formattedDate = new Date(rawDate).toLocaleDateString("en-GB");
        return formattedDate;
      },
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "organised_by",
      headerName: "Organised By",
      flex: 1,
    },
    {
      field: "Actions",
      flex: 2,
      renderCell: (params) => {
        const event = params.row;
        return (
          <>
            <Button color="secondary">
              <ViewForm events={event} />
            </Button>
            <Button>
              <EditForm events={event} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(event.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Event.getAllEvents().then(
      (response) => {
        console.log(response);
        setEvents(response.data.events);
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          navigate("/");
        }
      }
    );
  }, []);

  return (
    <Box mx="28px" >
      <Header title="Events" />
      <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/add-event">
          Add Events
        </Button>
      </Box>
      <Box
        height="82vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={events}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            )
          }}
        />
      </Box>
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this event?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedEventId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EventsSuperAdmin;
