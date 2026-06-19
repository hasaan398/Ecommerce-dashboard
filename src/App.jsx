import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/navbar/navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/products/Product";
import AddProduct from "./pages/products/AddProduct";
import Transaction from "./pages/transaction/transaction";
import Customers from "./pages/Customers/customers";
import Login from "./pages/login/login";
import AddCustomer from "./pages/Customers/addcustomer";
import Setting from "./pages/setting/setting";



function DashboardLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="main" style={{ marginLeft: sidebarOpen ? "200px" : "60px" }}>
        <Header isOpen={sidebarOpen} />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <DashboardLayout
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product/sneakers" element={<Product category="Sneakers" />} />
          <Route path="/product/jacket" element={<Product category="Jacket" />} />
          <Route path="/product/tshirt" element={<Product category="T-Shirt" />} />
          <Route path="/product/bag" element={<Product category="Bag" />} />
          
         <Route path="/setting" element={<Setting />} />
<Route path="/product/add" element={<AddProduct />} />
<Route path="/product/add/:id" element={<AddProduct />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;