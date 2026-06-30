import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./transaction.css";
import searchIcon from "../../assets/search.png";
import { orders } from "../../data";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate, useLocation,Link} from "react-router-dom";
import { toast } from "react-toastify";

export default function Transaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    if (location.state?.success) {
      toast.success(location.state.success);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ✅ Dynamic tab counts
  const orderTabs = [
    { name: "All Orders", count: orders.length },
    { name: "Shipping", count: orders.filter((o) => o.status === "Shipping").length },
    { name: "Completed", count: orders.filter((o) => o.status === "Completed").length },
    { name: "Cancel", count: orders.filter((o) => o.status === "Cancelled").length },
  ];

  const filteredRows = orders.filter((r) => {
    const matchTab = activeTab === "All Orders" ? true : r.status === activeTab;
    const matchSearch = r.name?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchTab && matchSearch;
  });

  const columns = [
    {
      field: "name",
      headerName: "Orders",
      width: 240,
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
    { field: "customer", headerName: "Customer", width: 160 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "date", headerName: "Date", width: 110 },
    {
      field: "payment",
      headerName: "Payment",
      width: 110,
      renderCell: (params) => (
        <span className={`payment-badge ${params.value === "Paid" ? "paid" : "unpaid"}`}>
          {params.value}
        </span>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => (
        <span className={`order-status ${params.value === "Shipping" ? "shipping" : "cancelled"}`}>
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
    <div className="transaction-page">

      {/* Title */}
      <div className="page-title">
        <h1>Orders</h1>
        <p>
  <Link to="/dashboard">Dashboard</Link> ▼{" "}
  <Link to="/transaction">Orders</Link> ▼{" "}
  <span className="bold">{activeTab}</span>
</p>
      </div>

      {/* Toolbar */}
      <div className="transaction-toolbar">
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
          <button className="new-btn" onClick={() => navigate("/transaction/add")}>
            + New Order
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="transaction-tabs">
        {orderTabs.map((tab) => (
          <button
            key={tab.name}
            className={`tab-btn ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name} ({tab.count})
          </button>
        ))}
      </div>

      {/* DataGrid */}
      <div className="table-wrapper">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          getRowId={(row) => row.id}
          getRowClassName={(params) =>
            params.row.status === "Cancelled" ? "row-cancelled" : ""
          }
          rowHeight={70}
          disableRowSelectionOnClick
          autoHeight
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