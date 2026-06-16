import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import "./app.css";

import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/navbar/navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Product from "./pages/products/Product";

import Transaction from "./pages/Transaction";
import Customers from "./pages/Customers";
import SalesReport from "./pages/SalesReport";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Login from "./pages/login/login";

// Layout component
function DashboardLayout({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="main" style={{ marginLeft: sidebarOpen ? "200px" : "60px" }}>
        <Header isOpen={sidebarOpen} />
        <div className="content">
          <Outlet />  {/* ← pages yahan render honge */}
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

        {/* Login - no sidebar, no header */}
        <Route path="/" element={<Login />} />

        {/* Dashboard pages - sidebar + header ke saath */}
        <Route element={<DashboardLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}>
          <Route path="/dashboard" element={<Dashboard />} />        
          <Route path="/product" element={<Product />} />
          <Route path="/product/sneakers" element={<Product category="Sneakers" />} />
          <Route path="/product/jacket" element={<Product category="Jacket" />} />
          <Route path="/product/tshirt" element={<Product category="T-Shirt" />} />
          <Route path="/product/bag" element={<Product category="Bag" />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<SalesReport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;