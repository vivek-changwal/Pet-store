import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import Product from "../../authProductLink";
import { useNavigate } from "react-router-dom";
import ViewForm from "./ViewProduct";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "../../api/baseUrl";
import ProductCategory from "../../authProductCategoryLink"
import Form from "./EditProduct";
import authHeader from "../../authHeaders";

const Products = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`admin/products/${id}`, {
        headers:
          { "Authorization": authHeader() }
      });
      setProducts(products.filter(product => product.id !== id));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedProductId(id);
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
      field: "size",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "weight",
      headerName: "Weight",
      flex: 1,
    },
    {
      field: "description",
      flex: 1,
      headerName: "Description",
    },
    {
      field: "brand",
      flex: 1,
      headerName: "Brand",
    },
    {
      field: "Actions",
      flex: 3,
      renderCell: (params) => {
        const product = params.row;
        return (
          <>
            <Button color="secondary">
              <ViewForm  product={product} />
            </Button>
            <Button color="secondary">
              <Form product={product} />
            </Button>
            <Button style={{ color: 'white' }} onClick={() => handleOpenDeleteDialog(product.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      }
    },
  ];

  useEffect(() => {
    Product.getAllProducts().then(
      (response) => {
        setProducts(response.data.products);
      },
      (error) => {
        if (error.response && error.response.status === 403) {
          navigate("/");
        }
      }
    );

  }, []);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const response = await ProductCategory.getAllProductCategory();
        setProductsCategory(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProductCategories();
  }, []);


  return (
    <Box mx="10px">
      <Header
        title="Products"
      />
    <Box display="flex" justifyContent="end" mt="10px" position="relative" right="26px">
        <Button type="submit" color="secondary" variant="contained" href="/add-product">
         Add Product
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
          rows={products}
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
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete(selectedProductId)} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Products;
