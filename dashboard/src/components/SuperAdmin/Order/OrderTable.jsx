import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Cart from "../../authOrderLink";
import { useNavigate } from "react-router-dom";
import ViewForm from "./ViewOrder";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl"
import authHeader from "../../authHeaders";
import EditForm from "./EditOrder";

const Contacts = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cartdata, setCart] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCartId, setSelectedCartId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`carts/${id}`, {
        headers:
          { "Authorization": authHeader() }
      });
      setCart(cartdata.filter(cart => cart.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedCartId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };


  const columns = [
    // {
    //   field: "cart_id",
    //   headerName: "Cart Id",
    //   flex: 1,
    //   valueGetter: (params) => params.row?.cart_items[0].cart_id || ""
    // },
    {
      field: "product_id",
      headerName: "Product Id ",
      flex: 1,
      valueGetter: (params) => params.row?.cart_items[0].product_id || ""
    },
    {
      field: "full_name",
      headerName: "User Full Name",
      flex: 1,
      valueGetter: (params) => {
        const firstName = params.row?.user?.first_name || "";
        const lastName = params.row?.user?.last_name || "";
        return `${firstName} ${lastName}`;
      }
    },
    {
      field: "total_quantity",
      headerName: "Total Quantity",
      flex: 1,
      editable: true
    },
    {
      field: "total_amount",
      headerName: "Total Amount ",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "Actions",
      flex: 2,
      renderCell: (cartdata) => {
        return (
          <>

            <Button>
              <ViewForm cartdata={cartdata.row} />
            </Button>
            <Button >
              <EditForm cartdata={cartdata?.row} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(cartdata.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Cart.getAllCart().then(
      (response) => {
        console.log(response.data)
        setCart(response.data.cartdata);
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
        title="Orders"
      />
      {/* <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/addOrder">
          Add Order
        </Button>
      </Box> */}
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
          rows={cartdata}
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
            Are you sure you want to delete this order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedCartId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box >

  );
};

export default Contacts;