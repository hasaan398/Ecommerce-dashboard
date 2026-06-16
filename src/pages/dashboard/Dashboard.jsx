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

      {/* TOP SECTION */}
      <div className="dashboard-top">

        {/* Sales Target */}
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
            <div className="progress-fill" style={{width: "60%"}}></div>
          </div>
        </div>

        {/* Total Revenue */}
        
        <div className="stat-card blue">
          <div className="stat-top">
            <span>Total Revenue</span>
            <span>↗</span>
          </div>
          <h2>$81.000</h2>
          <small className="green">+10.6% From last week</small>
        </div>

        {/* Total Customer */}
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Customer</span>
            <span>↗</span>
          </div>
          <h2>5.000</h2>
          <small className="green">+1.5% From last week</small>
        </div>

        {/* Total Transactions */}
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Transactions</span>
            <span>↗</span>
          </div>
          <h2>12.000</h2>
          <small className="green">+3.6% From last week</small>
        </div>

        {/* Total Product */}
        <div className="stat-card">
          <div className="stat-top">
            <span>Total Product</span>
            <span>↗</span>
          </div>
          <h2>5.000</h2>
          <small className="red">-1.5% From last week</small>
        </div>

      </div>

      {/* MIDDLE SECTION */}
      <div className="dashboard-middle">

        {/* Your Sales */}
      <div className="sales-chart">

  <img src={chartsImg} alt="charts" />
</div>

        {/* Increase Sales Banner */}
        <div className="increase-banner">
          <h3>Increase your sales</h3>
          <p>Discover the Proven Methods to Skyrocket Your Sales!</p>
          <button>Learn More</button>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="dashboard-bottom">

        {/* Customer Growth */}
     
   
   
   <div className="customer-growth">
  <img src={mapImg} alt="map" style={{width:"100%", borderRadius:"8px"}} />
</div>
        

        {/* Product Popular */}
        <div className="product-table">
          <div className="chart-header">
            <h6>Product Popular</h6>
            <span>Show All ↗</span>
          </div>
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
                      <div className="product-img"><div className="product-img">
  <img src={shoesImg} alt="product" style={{width:"32px", height:"32px", objectFit:"cover", borderRadius:"6px"}} />
</div></div>
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
  );
}