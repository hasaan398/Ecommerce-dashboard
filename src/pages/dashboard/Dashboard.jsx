import React, { useEffect } from "react";
import "./dashboard.css";
import Chart from "react-apexcharts";
import mapImg from "../../assets/map.png";
import shoesImg from "../../assets/shoes.png";

export default function Dashboard() {

  // useEffect(() => {
  //   fetch("https://api.openweathermap.org/data/2.5/weather?q=Lahore&appid=cb13910d3f202264ecc8b3680e9000eb&units=metric")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Weather API test:", data);
  //     })
  //     .catch((err) => console.error("Error:", err));
  // }, []);

const chartOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  colors: ["#B4E61D", "#2563EB"],
  stroke: {
    curve: "smooth",
    width: [4, 4],
    dashArray: [0, 8],
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    show: false,
  },
  legend: {
    position: "top",
    horizontalAlign: "left",
    markers: {
      radius: 2,
    },
  },
  markers: {
    size: 0,
    hover: {
      size: 7,
    },
  },
  xaxis: {
    categories: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    show: false,
  },
  tooltip: {
    shared: true,
    intersect: false,
  },
};

const chartSeries = [
  {
    name: "Average Sale Value",
    data: [22, 15, 18, 28, 35, 34, 25, 20, 32, 38, 37, 46],
  },
  {
    name: "Average item persale",
    data: [14, 17, 29, 24, 26, 25, 32, 26, 34, 33, 45, 42],
  },
];

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
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="line"
              height={250}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: Stats grid + Banner */}
        <div className="right-col">
          <div className="stats-grid">

            <div className="stat-card">
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
  <div className="chart-header">
    <h6>Customer Growth - 3 Province</h6>
    <span>Show All</span>
  </div>
  <div className="legend">
    <span><span className="dot green"></span>East Java (50%)</span>
    <span><span className="dot blue"></span>Kalimantan (50%)</span>
    <span><span className="dot red"></span>Bali (65%)</span>
  </div>
<iframe
  src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d244201.8395338205!2d74.14982657017556!3d31.56914551114501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1srandom%20map!5e0!3m2!1sen!2s!4v1782673270170!5m2!1sen!2s"
  width="100%"
  height="300"
  style={{ border: 0, borderRadius: "8px" }}
  referrerPolicy="strict-origin-when-cross-origin"
  loading="lazy"
></iframe>
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