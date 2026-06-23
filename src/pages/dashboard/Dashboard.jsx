import React from "react";
import "./dashboard.css";
import chartsImg from "../../assets/charts.png";
import mapImg from "../../assets/map.png";
import shoesImg from "../../assets/shoes.png";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* Page Title */}
      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Dashboard</p>
      </div>

      {/* TOP + MIDDLE SECTION */}
      <div className="dashboard-top-grid">

        {/* LEFT COLUMN: Sales Target + Chart */}
        <div className="left-col">
          <div className="sales-target">
            <h6>Sales Target</h6>
            <div className="target-row">
              <div>
                <small>In Progress</small>
                <h4>$231,032,444</h4>
              </div>
              <div>
                <small>Sales Target</small>
                <h4>$500,000,00</h4>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: "60%" }}></div>
            </div>
          </div>

          <div className="sales-chart">
  
            <img src={chartsImg} alt="charts" />
          </div>
        </div>

        {/* RIGHT COLUMN: Stats grid + Banner */}
        <div className="right-col">
          <div className="stats-grid">

            <div className="stat-card blue">
              <div className="stat-top">
                <span>Total Revenue</span>
                <span>↗</span>
              </div>
              <h2>$81.000</h2>
              <small>+10.6% From last week</small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Total Customer</span>
                <span>↗</span>
              </div>
              <h2>5.000</h2>
              <small className="green">+1.5% From last week</small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Total Transactions</span>
                <span>↗</span>
              </div>
              <h2>12.000</h2>
              <small className="green">+7.2% From last week</small>
            </div>

            <div className="stat-card">
              <div className="stat-top">
                <span>Total Product</span>
                <span>↙</span>
              </div>
              <h2>5.000</h2>
              <small className="red">-7.15% From last week</small>
            </div>

          </div>

          <div className="increase-banner">
            <h3>Increase your sales</h3>
            <p>Discover the Proven Methods to Skyrocket Your Sales!</p>
            <button>Learn More</button>
          </div>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="dashboard-bottom">

        <div className="customer-growth">
       
   
          <img src={mapImg} alt="map" />
        </div>

        <div className="product-table">
          <div className="chart-header">
            <h6>Product Popular</h6>
            <span>Show All</span>
          </div>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Kanky Kitadakata (Green)", price: "$20.00", sales: 1000, status: "Success" },
                  { name: "Kanky Kitadakata (Green)", price: "$20.00", sales: 2331, status: "Success" },
                  { name: "Kanky Kitadakata (Green)", price: "$20.00", sales: 2111, status: "Success" },
                  { name: "Kanky Kitadakata (Green)", price: "$20.00", sales: 1661, status: "Success" },
                ].map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div className="product-name">
                        <div className="product-img">
                          <img src={shoesImg} alt="product" />
                        </div>
                        <span>{p.name}</span>
                      </div>
                    </td>
                    <td>{p.price}</td>
                    <td>{p.sales}</td>
                    <td><span className="success-badge">{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}