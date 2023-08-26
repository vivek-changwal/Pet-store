import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductSubCategory from "../../authProductSubCatergoryLink";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl";
import authHeader from "../../authHeaders";
import ViewForm from "./ViewProductSubCategory";
import EditForm from "./EditProductSubCategory"
const ProductTable = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [productSubCategories, setProductSubCategories] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductSubCategoryId, setSelectedProductSubCategoryId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`product-sub-categories/${id}`, {
        headers:
          { "Authorization": authHeader() }
      });
      setProductSubCategories(productSubCategories.filter(productSubCategory => productSubCategory.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedProductSubCategoryId(id);
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
      editable: true,
    },
    {
        field: "product_category",
        flex: 1,
        headerName: "Product Category Name",
        valueGetter: (params) => params.row?.product_category?.name
    },
    {
        field: "Actions",
        flex: 2,
        renderCell: (params) => {
          const productSubCategories = params.row;
          return (
            <>
              <Button color="secondary">
                <ViewForm productSubCategories={productSubCategories} />
              </Button>
              <Button color="secondary">
                <EditForm productSubCategories={productSubCategories} />
              </Button>
              <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(productSubCategories.id)}>
              <DeleteIcon />
            </Button>
            </>
          );
        }
      },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProductSubCategory.getAllProductSubCategory();
        setProductSubCategories(response.data.productSubCategories);
        console.log(response)
      } catch (error) {
        if (error.response && error.response.status === 403) {

        }
      }
    };

    fetchData();
  }, []);

  return (
    <Box mx="10px">
      <Header title="Product Sub Categories" />
      <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/add-product-sub-category">
         Add New
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
          rows={productSubCategories}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: () => (
              <GridToolbarContainer>
                <GridToolbarFilterButton />
                <GridToolbarExport />
              </GridToolbarContainer>
            ),
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
            Are you sure you want to delete this product subcategory?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedProductSubCategoryId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProductTable;
