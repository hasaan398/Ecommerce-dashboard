import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./customers.css";
import searchIcon from "../../assets/search.png";
import { customers } from "../../data";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Customers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = customers.filter((r) =>
    r.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.customerId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "name",
      headerName: "Name Customer",
      width: 200,
      renderCell: (params) => (
        <div className="customer-cell">
          <p className="customer-id">{params.row.customerId}</p>
          <p className="customer-name-text">{params.row.name}</p>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Contact",
      width: 180,
      renderCell: (params) => (
        <div className="contact-cell">
          <p>{params.row.email}</p>
          <small>{params.row.phone}</small>
        </div>
      ),
    },
    { field: "purchases", headerName: "Purchases", width: 110 },
    { field: "qty", headerName: "Order QTY", width: 110 },
    { field: "address", headerName: "Address", width: 280 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      sortable: false,
      renderCell: () => (
        <div className="action-btns">
          <span title="View"><FaEye /></span>
          <span title="Edit"><FaEdit /></span>
          <span title="Delete"><FaTrash /></span>
        </div>
      ),
    },
  ];

  return (
    <div className="customers-page">

      {/* Title */}
      <div className="page-title">
        <h1>Customer</h1>
        <p>Dashboard ▼ <span className="bold">Customer</span></p>
      </div>

      {/* Toolbar */}
      <div className="customers-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for id, name Customer"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="search" />
        </div>
        <div className="toolbar-right">
          <button className="filter-btn">Filter ▼</button>
          <button className="export-btn">Export ↓</button>
          <button className="new-btn" onClick={() => navigate("/customers/add")}>
            + Add Customer
          </button>
        </div>
      </div>

      {/* DataGrid */}
      <div className="table-wrapper">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          rowHeight={70}
          disableRowSelectionOnClick
          autoHeight
          checkboxSelection
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[5, 10, 20]}
          sx={{
            border: "none",
            fontFamily: "inherit",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f9f9f9",
              fontSize: "12px",
              color: "#777",
              fontWeight: 600,
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f0f4ff",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #f0f0f0",
              justifyContent: "space-between",
              padding: "0 16px",
            },
            "& .MuiTablePagination-root": { width: "auto" },
            "& .MuiTablePagination-toolbar": {
              minHeight: "40px",
              paddingLeft: 0,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "12px",
              color: "#777",
            },
            "& .MuiTablePagination-spacer": { display: "none" },
          }}
        />
      </div>

    </div>
  );
}