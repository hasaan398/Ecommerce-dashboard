import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./product.css";
import searchIcon from "../../assets/search.png";
import { allRows, tabs } from "../../data";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Product() {
  const [activeTab, setActiveTab] = useState("Sneakers");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRows = allRows.filter((r) =>
    r.category?.toLowerCase().trim() === activeTab.toLowerCase() &&
    r.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "name",
      headerName: "Product",
      width: 260,
      renderCell: (params) => (
        <div className="product-cell">
          <div className="product-thumb">
            <img src={params.row.image} alt={params.row.name} />
          </div>
          <div>
            <p className="product-id">{params.row.productId}</p>
            <p className="product-name-text">{params.row.name}</p>
          </div>
        </div>
      ),
    },
    { field: "price", headerName: "Price", width: 100 },
    { field: "size", headerName: "Size", width: 80 },
    { field: "qty", headerName: "QTY", width: 80 },
    { field: "date", headerName: "Date", width: 180 },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      renderCell: (params) => (
        <span className={`status-badge ${params.value === "Out of Stock" ? "outofstock" : "available"}`}>
          {params.value}
        </span>
      ),
    },
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
    <div className="product-page">

      {/* Title */}
      <div className="page-title">
        <h1>Product</h1>
        <p>Dashboard ▶ Product ▶ {activeTab}</p>
      </div>

      {/* Toolbar */}
      <div className="product-toolbar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for id, name product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <img src={searchIcon} alt="search" />
        </div>
        <div className="toolbar-right">
          <button className="filter-btn">Filter ▼</button>
          <button className="export-btn">Export ↓</button>
          <button className="new-btn">+ New Product</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        {tabs.map((tab) => {
          const count = allRows.filter((r) => r.category === tab.name).length;
          return (
            <button
              key={tab.name}
              className={`tab-btn ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name} ({count})
            </button>
          );
        })}
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
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
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
            },
          }}
        />
      </div>

    </div>
  );
}