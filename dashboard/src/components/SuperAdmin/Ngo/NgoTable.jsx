import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Ngo from "../../authNgoLink";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl";
import ViewForm from "./ViewNgo";
import EditForm from "./EditNgo"
import authHeader from "../../authHeaders";

const Pets = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [ngos, setNgos] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`ngos/${id}`, {
        headers:
          { "Authorization": authHeader() }
      })
      setNgos(ngos.filter(event => event.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message)
    }
  }

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
        headerName: "Ngo Name",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 1,
        valueGetter: (params) => params.row?.user?.email || ""
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "contact",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
    },
   
    {
      field: "Actions",
      flex: 2,
      renderCell: (ngos) => {
        return (
          <>
            <Button color="secondary"  >
              <ViewForm ngos={ngos?.row} />
            </Button>
            <Button >
              <EditForm ngos={ngos?.row} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(ngos.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Ngo.getAllNgos().then(
      (response) => {
        console.log(response)
        setNgos(response.data.ngos);
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
      <Header
        title="Ngos"
      />
       <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/add-ngo">
         Add Ngo
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
          rows={ngos}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: () => {
              return <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            }
          }}
        >
        </DataGrid>
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
            Are you sure you want to delete this ngo?
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
    </Box >
    
  );
};

export default Pets;