import { useState, useEffect } from "react";
import { Routes, Route,Outlet, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./components/SuperAdmin/global/Topbar";
import Sidebar from "./components/SuperAdmin/global/Sidebar";
import Login from './components/Login';
import UserTable from './components/SuperAdmin/User/Table';
import Form from "./components/SuperAdmin/User/AddUser";
import Layout from "./components/Layout"
import ProductTable from './components/SuperAdmin/Product/ProductTable';
import Charts from './components/SuperAdmin/Dashboard/index'
import AddProduct from './components/SuperAdmin/Product/AddProduct'
import ProductCategoryTable from './components/SuperAdmin/ProductCategory/ProductCategoryTable'  
import AddProductCategory from './components/SuperAdmin/ProductCategory/AddProductCategory'
import ProductSubCategoryTable from './components/SuperAdmin/ProductSubCategory/ProductSubCategoryTable'
import AddProductSubCategory from './components/SuperAdmin/ProductSubCategory/AddProductSubCategory'
import OrderTable from'./components/SuperAdmin/Order/OrderTable'
import SuperAdminPetTable from './components/SuperAdmin/Pets/PetTable'
import SuperAdminEventTable from './components/SuperAdmin/Events/EventTable'
import SuperAdminVeterniaryTable from './components/SuperAdmin/Veterinary/VeterinatyTable'
import SuperAdminNgoTable from './components/SuperAdmin/Ngo/NgoTable'
import AddVeterinary from './components/SuperAdmin/Veterinary/AddVeterinary'
import AddNgo from './components/SuperAdmin/Ngo/AddNgo'
import AddEvent from './components/SuperAdmin/Events/AddEvent'
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('auth') || false
  );

  useEffect(() => { 
    localStorage.setItem("auth", isAuthenticated);
  }, [isAuthenticated]);

  const SidebarLayout = () => (
    <>
      <div className="app">
        <Sidebar isSidebar={isSidebar} />
        <main className="content">
          <Topbar setIsSidebar={setIsSidebar} />
        </main>
      </div>
      <Outlet />
    </>
  );
  return (
    <div className="app">
      <main className="content">
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<Login />} />
              <Route element={<Layout />}>
                <Route path="/" element=
                  {<Navigate to="/" replace />} />
                   <Route path="/charts" element=
                  {
                    <Charts />
                  }
                  />
                <Route path="/users" element=
                  {
                    <UserTable />
                  }
                />
                 <Route path="/add-product" element=
                  {
                    < AddProduct />
                  }
                  />
                    <Route path="/product-categories" element=
                  {
                    < ProductCategoryTable />
                  }
                  />
                    <Route path="/add-product-category" element=
                  {
                    < AddProductCategory />
                  }
                  />
                 <Route path="/product-sub-categories" element=
                  {
                    < ProductSubCategoryTable />
                  }
                  />
                     <Route path="/add-product-sub-category" element=
                  {
                    < AddProductSubCategory />
                  }
                  />
         
                  <Route path="/products" element=
                  {
                    <ProductTable />
                  }
                />
                 <Route path="/user-form" element=
                  {
                    <Form />
                  }
                />
                  <Route path="/orders" element=
                  {
                    <OrderTable />
                  }
                />
                     <Route path="/events" element=
                  {
                    < SuperAdminEventTable />
                  }
                  />
                      <Route path="/pets" element=
                  {
                    < SuperAdminPetTable />
                  }
                  />
                    <Route path="/veterinaries" element=
                  {
                    < SuperAdminVeterniaryTable />
                  }
                  />
                    <Route path="/ngos" element=
                  {
                    < SuperAdminNgoTable />
                  }
                  />
                     <Route path="/add-veterinary" element=
                  {
                    < AddVeterinary />
                  }
                  />
                     <Route path="/add-ngo" element=
                  {
                    < AddNgo />
                  }
                  />
                   <Route path="/add-event" element=
                  {
                    < AddEvent />
                  }
                  />
              </Route>
            </Routes>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </main>
    </div>
  );
}
export default App;