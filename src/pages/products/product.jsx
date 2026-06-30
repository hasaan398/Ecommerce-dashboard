import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./product.css";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import searchIcon from "../../assets/search.png";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Product() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [allRows, setAllRows] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(category || "");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=40")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        const mapped = data.products.map((p) => ({
          id: p.id,
          productId: p.sku || `SKU-${p.id}`,
          image: p.thumbnail,
          name: p.title,
          price: `$${p.price.toFixed(2)}`,
          size: p.weight ? `${p.weight}kg` : "-",
          qty: p.stock,
          date: new Date(p.meta?.createdAt || Date.now()).toLocaleDateString(),
          status: p.stock > 0 ? "Available" : "Out of Stock",
          category: p.category,
        }));

        setAllRows(mapped);

        const uniqueCategories = [...new Set(mapped.map((m) => m.category))];
        setTabs(uniqueCategories.map((c) => ({ name: c })));

        if (!category && uniqueCategories.length > 0) {
          setActiveTab(uniqueCategories[0]);
        }

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  const filteredRows = allRows.filter(
    (r) =>
      r.category?.toLowerCase().trim() === activeTab?.toLowerCase() &&
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
    { field: "size", headerName: "Weight", width: 80 },
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
      renderCell: (params) => (
        <div className="action-btns">
          <span
            title="View"
            onClick={() => navigate(`/product/view/${params.row.id}`)}
            style={{ cursor: "pointer" }}
          >
            <FaEye />
          </span>
          <span
            title="Edit"
            onClick={() => navigate(`/product/add/${params.row.id}`)}
            style={{ cursor: "pointer" }}
          >
            <FaEdit />
          </span>
          <span
            title="Delete"
            onClick={() => {
              toast.success("Product deleted (dummy API, no real delete)");
            }}
            style={{ cursor: "pointer" }}
          >
            <FaTrash />
          </span>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="product-page">
        <p style={{ padding: 24 }}>Loading products from API...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <p style={{ padding: 24, color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="product-page">

      {/* Title */}
      <div className="page-title">
        <h1>Product</h1>
        <p>
          <Link to="/dashboard">Dashboard</Link> ⯈{" "}
          <Link to="/product">Product</Link> ⯈{" "}
          <span className="bold">{activeTab}</span>
        </p>
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
          <button className="new-btn" onClick={() => navigate("/product/add")}>
            New Product +
          </button>
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
              onClick={() => {
                setActiveTab(tab.name);
                navigate(`/product/${tab.name}`);
              }}
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
          getRowClassName={(params) =>
            params.row.status === "Out of Stock" ? "row-outofstock" : ""
          }
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
              justifyContent: "space-between",
              padding: "0 16px",
            },
            "& .MuiTablePagination-root": {
              width: "auto",
            },
            "& .MuiTablePagination-toolbar": {
              minHeight: "40px",
              paddingLeft: 0,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontSize: "12px",
              color: "#777",
            },
            "& .MuiTablePagination-spacer": {
              display: "none",
            },
          }}
        />
      </div>

    </div>
  );
}