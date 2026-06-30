import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/navbar/navbar";

import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/products/product";
import ViewProduct from "./pages/products/ViewProduct";
import AddProduct from "./pages/products/AddProduct";
import Transaction from "./pages/transaction/transaction";
import AddOrder from "./pages/transaction/addorder";
import Customers from "./pages/Customers/customers";
import AddCustomer from "./pages/Customers/addcustomer";
import Login from "./pages/login/login";
import Setting from "./pages/setting/setting";
import SalesReport from "./pages/Salesreport/salesreport";
import Help from "./pages/Help/help";

function DashboardLayout({ sidebarOpen, setSidebarOpen }) {
  const isMobile = window.innerWidth <= 700;
  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="main" style={{ marginLeft: isMobile ? "0" : (sidebarOpen ? "200px" : "60px") }}>
        <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
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
          <Route path="/product/:category" element={<Product />} />
          <Route path="/product/view/:id" element={<ViewProduct />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/add/:id" element={<AddProduct />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/add" element={<AddOrder />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/help" element={<Help />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;