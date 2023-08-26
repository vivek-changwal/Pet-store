import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Pet from "../../authPetLink";
import { useNavigate } from "react-router-dom";
import ViewForm from "./ViewPet";
import EditForm from './EditPet';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl";
import authHeader from "../../authHeaders";

const Pets = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pets, setPets] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`pets/${id}`, {
        headers:
          { "Authorization": authHeader() }
      });
      setPets(pets.filter(pets => pets.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedPetId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };


  const columns = [
      {
        field: "name",
        headerName: "Pet Name",
        flex: 1,
      },
    {
      field: "age",
      headerName: "Age",
      flex: 1,
    },
   
    {
      field: "colour",
      headerName: "Colour",
      flex: 1,
    },
    {
        field: "life_expectancy",
        headerName: "Life Expectancy",
        flex: 1,
    },
    {
        field: "breed",
        headerName:  "Breed",
        flex: 1,
    },
    {
      field: "Actions",
      flex: 2,
      renderCell: (pets) => {
        return (
          <>
            <Button color="secondary"  >
              <ViewForm pets={pets?.row} />
            </Button>
            <Button color="secondary">
              <EditForm pets={pets?.row} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(pets.row.id)}>
            <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Pet.getAllPets().then(
      (response) => {
        console.log(response)
        setPets(response.data.pets);
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
        title="Pets"
      />
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
          rows={pets}
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
            Are you sure you want to delete this pet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedPetId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
    
  );
};

export default Pets;