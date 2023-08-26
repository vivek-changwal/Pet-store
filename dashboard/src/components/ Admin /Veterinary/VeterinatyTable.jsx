import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Veterinary from "../../authVeterinary";
import { useNavigate } from "react-router-dom";
import ViewForm from './ViewVeterinary'
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl";
import authHeader from "../../authHeaders";
import EditForm from './EditVeterinary'

const VeterinaryDetails = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [veterinaries, setVeterinaries] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVeterinaryId, setSelectedVeterinaryId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`veterinaries/${id}`, {
        headers:
          { "Authorization": authHeader() }
      });
      setVeterinaries(veterinaries.filter(veterinary => veterinary.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedVeterinaryId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };


  const columns = [
    {
        field: "full_name",
        headerName: "Veterinary Name",
        flex: 1,
        valueGetter: (params) => {
          const firstName = params.row?.user?.first_name || "";
          const lastName = params.row?.user?.last_name || "";
          return `${firstName} ${lastName}`;
        }
      },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      valueGetter: (params) => params.row?.user?.phone || ""
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row?.user?.email || ""
    },
    {
      field: "experience",
      headerName: "Experience",
      flex: 1,
      editable: true
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 1,
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 1,
    },
    {
      field: "fees",
      headerName: "Fees",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "Actions",
      flex: 2,
      renderCell: (veterinary) => {
        return (
          <>
            <Button color="secondary"  >
              <ViewForm veterinary={veterinary?.row} />
            </Button>
            <Button >
              <EditForm veterinary={veterinary?.row} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(veterinary.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Veterinary.getAllVeterinaries().then(
      (response) => {
        setVeterinaries(response.data.veterinary);
        console.log(response)
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
        title="Veterinary"
      />
      <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/add-veterinary">
         Add Veterinary
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
          rows={veterinaries}
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
            Are you sure you want to delete this veterinary?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedVeterinaryId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    </Box >
    
  );
};

export default VeterinaryDetails;