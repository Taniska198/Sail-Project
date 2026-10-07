import "./Dashboard.css";
import "./Reports.css";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaFilePdf,
  FaFileExcel,
  FaDownload,
  FaChartBar,
  FaClipboardList,
  FaCalendarAlt,
} from "react-icons/fa";

const API = "http://localhost:5000/api/reports";

const Reports = () => {
  const [summary, setSummary] = useState({
    production: 0,
    energy: 0,
    downtime: 0,
    machine: 0,
    total: 0,
  });

  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchHistory();
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axios.get(`${API}/summary`);
      setSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API}/history`);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPDF = (type) => {
    window.open(`${API}/pdf/${type}`, "_blank");
  };

  const downloadExcel = (type) => {
    window.open(`${API}/excel/${type}`, "_blank");
  };
  

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>📄 Reports & Analytics</h1>

        <p>
          Generate and download Production, Energy, Machine Health and
          Downtime reports directly from the database.
        </p>
      </div>

      {/* Summary */}

      <div className="report-summary">

        <div className="report-card">
          <FaFilePdf className="report-icon red" />
          <h2>{summary.production}</h2>
          <span>Production Records</span>
          
        </div>
      

        <div className="report-card">
          <FaFileExcel className="report-icon green" />
          <h2>{summary.energy}</h2>
          <span>Energy Records</span>
        </div>

        <div className="report-card">
          <FaClipboardList className="report-icon blue" />
          <h2>{summary.total}</h2>
          <span>Total Records</span>
        </div>

        <div className="report-card">
          <FaCalendarAlt className="report-icon orange" />
          <h2>{summary.machine}</h2>
          <span>Machine Records</span>
        </div>

      </div>

      {/* Available Reports */}

      <div className="report-category">

        <h3>Generate Reports</h3>

        <div className="category-grid">

          <div className="category-card">
            <FaChartBar />
            <h4>Production Report</h4>
            <p>Production performance report.</p>

            <button onClick={() => downloadPDF("production")}>
              Generate PDF
            </button>

            <button
              className="excel-btn"
              onClick={() => downloadExcel("production")}
            >
              Download Excel
            </button>
          </div>

          <div className="category-card">
            <FaChartBar />
            <h4>Energy Report</h4>
            <p>Energy consumption analysis.</p>

            <button onClick={() => downloadPDF("energy")}>
              Generate PDF
            </button>

            <button
              className="excel-btn"
              onClick={() => downloadExcel("energy")}
            >
              Download Excel
            </button>
          </div>

          <div className="category-card">
            <FaChartBar />
            <h4>Machine Health</h4>
            <p>Machine condition and health report.</p>

            <button onClick={() => downloadPDF("machine")}>
              Generate PDF
            </button>

            <button
              className="excel-btn"
              onClick={() => downloadExcel("machine")}
            >
              Download Excel
            </button>
          </div>

          <div className="category-card">
            <FaChartBar />
            <h4>Downtime Report</h4>
            <p>Downtime analysis report.</p>

            <button onClick={() => downloadPDF("downtime")}>
              Generate PDF
            </button>

            <button
              className="excel-btn"
              onClick={() => downloadExcel("downtime")}
            >
              Download Excel
            </button>
          </div>

        </div>

      </div>

      {/* Recent Reports */}

      <div className="report-table">

        <h3>Recent Reports</h3>

        <table>

          <thead>

            <tr>
              <th>Report Name</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Download</th>
            </tr>

          </thead>

          <tbody>

            {reports.map((item, index) => (

              <tr key={index}>

                <td>{item.name}</td>

                <td>{item.date}</td>

                <td>{item.type}</td>

                <td>{item.status}</td>

                <td>

                  <button
                    className="download-btn"
                    onClick={() => {
                      const type = item.name
                        .toLowerCase()
                        .includes("production")
                        ? "production"
                        : item.name.toLowerCase().includes("energy")
                        ? "energy"
                        : item.name.toLowerCase().includes("machine")
                        ? "machine"
                        : "downtime";

                      if (item.type === "PDF")
                        downloadPDF(type);
                      else
                        downloadExcel(type);
                    }}
                  >
                    <FaDownload /> Download
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
};


export default Reports;