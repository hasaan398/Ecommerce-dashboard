import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./product.css";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
import searchIcon from "../../assets/search.png";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

export default function Product() {
  const navigate = useNavigate();
const { category } = useParams();

const [searchParams, setSearchParams] = useSearchParams();

const [allRows, setAllRows] = useState([]);
const [tabs, setTabs] = useState([]);
const [activeTab, setActiveTab] = useState(category || "");

const [searchTerm, setSearchTerm] = useState(
  searchParams.get("search") || ""
);
const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

const [paginationModel, setPaginationModel] = useState({
  page: 0,
  pageSize: 10,
});
const [totalCount, setTotalCount] = useState(0);

  // ===== Categories list fetch (sirf ek baar) =====
  useEffect(() => {
    fetch("https://dummyjson.com/products/category-list")
      .then((res) => res.json())
      .then((data) => {
        const tabList = data.map((name) => ({ name }));
        setTabs(tabList);
        if (!category && tabList.length > 0) {
          setActiveTab(tabList[0].name);
        }
      })
      .catch(() => setTabs([]));
  }, []);

  useEffect(() => {
    if (category) {
      setActiveTab(category);
      setPaginationModel((prev) => ({ ...prev, page: 0 })); // naye category pe page reset
    }
  }, [category]);
useEffect(() => {
  setSearchTerm(searchParams.get("search") || "");

  setPaginationModel({
    page: Number(searchParams.get("page")) || 0,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  });
}, [searchParams]);

useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedSearch(searchTerm);
  },500 );

  return () => clearTimeout(timer);
}, [searchTerm]);
// ===== Products Fetch / Search =====
useEffect(() => {
  if (!activeTab) return;

  setLoading(true);
  setError(null);

  const { page, pageSize } = paginationModel;
  const skip = page * pageSize;

  let url = "";

 if (debouncedSearch.trim() !== "") {
  url = `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=${pageSize}&skip=${skip}`;
  } else {
    url = `https://dummyjson.com/products/category/${activeTab}?limit=${pageSize}&skip=${skip}`;
  }

  fetch(url)
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
        date: new Date(
          p.meta?.createdAt || Date.now()
        ).toLocaleDateString(),
        status: p.stock > 0 ? "Available" : "Out of Stock",
        category: p.category,
      }));

      setAllRows(mapped);
      setTotalCount(data.total);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
}, [activeTab, paginationModel, searchTerm]);


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
              toast.success("Product deleted (only for show, not real delete)");
            }}
            style={{ cursor: "pointer" }}
          >
            <FaTrash />
          </span>
        </div>
      ),
    },
  ];

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
  onChange={(e) => {
    const value = e.target.value;

    setSearchTerm(value);

if (value.trim() === "") {
  setSearchParams({
    page: 0,
    pageSize: paginationModel.pageSize,
  });
} else {
  setSearchParams({
    search: value,
    page: 0,
    pageSize: paginationModel.pageSize,
  });
}

    // Search change hote hi first page pe aa jao
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }}
/>
          <img src={searchIcon} alt="search" />
        </div>
        <div className="toolbar-right">
          <button className="filter-btn">Filter ▼</button>
          <button className="export-btn">Export ↓</button>
          <button className="new-btn" onClick={() => navigate("/product/add")}>
            New Product +
          </button>
          <button
  className="filter-btn"
  onClick={() => {
    setSearchTerm("");
   setSearchParams({
  page: 0,
  pageSize: 10,
});
    setPaginationModel((prev) => ({
      ...prev,
      page: 0,
    }));
  }}
>
  Clear
</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="product-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`tab-btn ${activeTab === tab.name ? "active" : ""}`}
            onClick={() => {
              setActiveTab(tab.name);
              setPaginationModel((prev) => ({ ...prev, page: 0 }));
              navigate(`/product/${tab.name}`);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* DataGrid — server-side pagination with dynamic pageSize */}
   {loading ? (
  <p style={{ padding: 24 }}>Loading {activeTab} products...</p>
) : allRows.length === 0 ? (
  <div
    style={{
      textAlign: "center",
      padding: "50px",
      fontSize: "22px",
      fontWeight: "600",
      color: "#888",
    }}
  >
    Product Not Found 😔 kuch or likh lo
  </div>
) : (
  <div className="table-wrapper">
    <DataGrid
      rows={allRows}
      columns={columns}
      getRowId={(row) => row.id}
      getRowClassName={(params) =>
        params.row.status === "Out of Stock" ? "row-outofstock" : ""
      }
      rowHeight={70}
      disableRowSelectionOnClick
      autoHeight

      pagination
      paginationMode="server"
      rowCount={totalCount}
      paginationModel={paginationModel}
   onPaginationModelChange={(model) => {
  setPaginationModel(model);

  setSearchParams({
    search: searchTerm,
    page: model.page,
    pageSize: model.pageSize,
  });
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
)}

    </div>
  );
}