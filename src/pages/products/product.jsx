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
    page: Number(searchParams.get("page")) || 0,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  });
  const [totalCount, setTotalCount] = useState(0);

  // ===== Server-side sorting state =====
  const [sortModel, setSortModel] = useState(() => {
    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    return sortBy ? [{ field: sortBy, sort: order || "asc" }] : [];
  });

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
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    }
  }, [category]);

  // ===== URL (searchParams) = single source of truth =====
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");

    setPaginationModel({
      page: Number(searchParams.get("page")) || 0,
      pageSize: Number(searchParams.get("pageSize")) || 10,
    });

    const sortBy = searchParams.get("sortBy");
    const order = searchParams.get("order");
    setSortModel(sortBy ? [{ field: sortBy, sort: order || "asc" }] : []);
  }, [searchParams]);

  // ===== Debounce search =====
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ===== Products Fetch / Search / Sort =====
  useEffect(() => {
    if (!activeTab) return;

    setLoading(true);
    setError(null);

    const { page, pageSize } = paginationModel;
    const skip = page * pageSize;

    const sortField = sortModel[0]?.field;
    const sortOrder = sortModel[0]?.sort;

    const fieldMap = {
      name: "title",
      qty: "stock",
      price: "price",
      size: "weight",
    };
    const apiSortField = fieldMap[sortField] || sortField;

    let url = "";

    if (debouncedSearch.trim() !== "") {
      url = `https://dummyjson.com/products/search?q=${debouncedSearch}&limit=${pageSize}&skip=${skip}`;
    } else {
      url = `https://dummyjson.com/products/category/${activeTab}?limit=${pageSize}&skip=${skip}`;
    }

    if (apiSortField && sortOrder) {
      url += `&sortBy=${apiSortField}&order=${sortOrder}`;
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
  }, [activeTab, paginationModel, debouncedSearch, sortModel]);

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
    { field: "date", headerName: "Date", width: 180, sortable: false },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      sortable: false,
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

              const params = {
                page: "0",
                pageSize: String(paginationModel.pageSize),
              };
              if (value.trim() !== "") params.search = value;
              if (sortModel[0]) {
                params.sortBy = sortModel[0].field;
                params.order = sortModel[0].sort;
              }
              setSearchParams(params);
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
              setSearchParams({
                page: "0",
                pageSize: String(paginationModel.pageSize),
              });
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
              setSearchParams({
                page: "0",
                pageSize: String(paginationModel.pageSize),
              });
              navigate(`/product/${tab.name}`);
            }}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* DataGrid — server-side pagination + sorting */}
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
              setPaginationModel(model); // turant local update - DataGrid ko immediate feedback
              setSearchParams({
                search: searchTerm,
                page: String(model.page),
                pageSize: String(model.pageSize),
                ...(sortModel[0] && {
                  sortBy: sortModel[0].field,
                  order: sortModel[0].sort,
                }),
              });
            }}
            pageSizeOptions={[5, 10, 20]}

            // ===== Server-side sorting =====
            sortingMode="server"
            sortModel={sortModel}
            onSortModelChange={(model) => {
              setSortModel(model); // turant local update
              const params = {
                search: searchTerm,
                page: "0",
                pageSize: String(paginationModel.pageSize),
              };
              if (model[0]) {
                params.sortBy = model[0].field;
                params.order = model[0].sort;
              }
              setSearchParams(params);
            }}

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
                alignItems: "center",
                padding: "12px 16px",
                flexWrap: "wrap",
                gap: "8px",
              },
              "& .MuiTablePagination-root": {
                display: "flex",
                alignItems: "center",
                width: "auto",
              },
              "& .MuiTablePagination-toolbar": {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "auto",
                paddingLeft: 0,
              },
              "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                fontSize: "13px",
                color: "#555",
                margin: 0,
              },
              "& .MuiTablePagination-select": {
                fontSize: "13px",
              },
              "& .MuiTablePagination-actions": {
                display: "flex",
                gap: "4px",
                marginLeft: "8px",
              },
              "& .MuiTablePagination-actions button": {
                border: "1px solid #eee",
                borderRadius: "6px",
                padding: "4px",
              },
              "& .MuiTablePagination-actions button:hover": {
                backgroundColor: "#f0f4ff",
                borderColor: "#2563EB",
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