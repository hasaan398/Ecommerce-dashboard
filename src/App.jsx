import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Header from "./components/navbar/navbar";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import Customers from "./pages/Customers";
import SalesReport from "./pages/SalesReport";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
function App() {
  return (
    <BrowserRouter>
      <div className="layout">


        <Sidebar />

        <div className="main">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Product />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/sales" element={<SalesReport />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </div>

      </div>
    </BrowserRouter>
  );
}
export default App