import React, { useState } from "react";
import "./salesreport.css";
import { useLocation, useNavigate ,Link} from "react-router-dom";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const salesData = [
  { month: "Jan", sales: 21000, orders: 320 },
  { month: "Feb", sales: 25000, orders: 380 },
  { month: "Mar", sales: 19000, orders: 290 },
  { month: "Apr", sales: 28000, orders: 410 },
  { month: "May", sales: 31000, orders: 450 },
  { month: "Jun", sales: 27000, orders: 400 },
  { month: "Jul", sales: 35000, orders: 480 },
  { month: "Aug", sales: 33000, orders: 460 },
  { month: "Sep", sales: 29000, orders: 420 },
  { month: "Oct", sales: 38000, orders: 510 },
  { month: "Nov", sales: 41000, orders: 540 },
  { month: "Dec", sales: 45000, orders: 580 },
];

const tableData = [
  { id: "TRX001", customer: "Leslie Alexander", product: "Kanky Kitadakata", date: "04/17/23", amount: "$21.78", status: "Completed" },
  { id: "TRX002", customer: "Leslie Alexander", product: "Kanky Kitadakata", date: "04/17/23", amount: "$21.78", status: "Completed" },
  { id: "TRX003", customer: "Leslie Alexander", product: "Kanky Kitadakata", date: "04/17/23", amount: "$21.78", status: "Pending" },
  { id: "TRX004", customer: "Leslie Alexander", product: "Kanky Kitadakata", date: "04/17/23", amount: "$21.78", status: "Completed" },
];

export default function SalesReport() {
  const [chartType, setChartType] = useState("line");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleExport = () => {
    const headers = ["ID", "Customer", "Product", "Date", "Amount", "Status"];
    const rows = tableData.map(r => [r.id, r.customer, r.product, r.date, r.amount, r.status]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="sales-report-page">

      {/* Title */}
      <div className="page-title">
        <h1>Sales Report</h1>
       <p>
  <Link to="/dashboard">Dashboard</Link> ⯈{" "}
  <Link to="/customers">Customer</Link> ⯈{" "}
  <span className="bold">Add Customer</span>
</p>
      </div>

      {/* Filter Row */}
      <div className="filter-row">
        <div className="date-filters">
          <div className="date-group">
            <label>From</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>
          <div className="date-group">
            <label>To</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
        </div>
        <button className="export-btn" onClick={handleExport}>Export ↓</button>
      </div>

      {/* Stat Cards */}
      <div className="report-stats-grid">
        <div className="stat-card blue">
          <div className="stat-top">
            <span>Total Sales</span>
            <span>↗</span>
          </div>
          <h2>$372,000</h2>
          <small>+12.4% From last period</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Total Orders</span>
            <span>↗</span>
          </div>
          <h2>5,240</h2>
          <small className="green">+8.1% From last period</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Average Order Value</span>
            <span>↗</span>
          </div>
          <h2>$71.00</h2>
          <small className="green">+3.6% From last period</small>
        </div>

        <div className="stat-card">
          <div className="stat-top">
            <span>Growth Rate</span>
            <span>↘</span>
          </div>
          <h2>-2.1%</h2>
          <small className="red">From last period</small>
        </div>
      </div>

      {/* Chart Card */}
      <div className="report-chart-card">
        <div className="chart-header">
          <h6>Sales Overview</h6>
          <div className="chart-toggle">
            <button
              className={chartType === "line" ? "active" : ""}
              onClick={() => setChartType("line")}
            >
              Line
            </button>
            <button
              className={chartType === "bar" ? "active" : ""}
              onClick={() => setChartType("bar")}
            >
              Bar
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          {chartType === "line" ? (
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2} dot={false} />
            </LineChart>
          ) : (
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Table Card */}
      <div className="report-table-card">
        <div className="chart-header">
          <h6>Transaction Details</h6>
          <span>Show All</span>
        </div>

        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Customer</th>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.customer}</td>
                  <td>{row.product}</td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={`status-badge ${row.status === "Completed" ? "success" : "pending"}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}