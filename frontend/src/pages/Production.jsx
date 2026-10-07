import "./Dashboard.css";
import "./Production.css";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaIndustry,
  FaBoxes,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Production = () => {
  const [summary, setSummary] = useState({
    total_production: 0,
    total_target: 0,
    average_efficiency: 0,
    departments: 0,
  });

  const [productionTrend, setProductionTrend] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetchProduction();
  }, []);

  const fetchProduction = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/production");

      setSummary(res.data.summary);

      setProductionTrend(res.data.daily);

      const deptData = res.data.departments.map((item) => ({
        dept: item.department,
        value: item.production,
        target: item.target,
        efficiency: item.efficiency,
      }));

      setDepartmentData(deptData);
    } catch (error) {
      console.error("Error fetching production data:", error);
    }
  };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>🏭 Production Analytics</h1>

        <p>
          Monitor plant production, manufacturing efficiency,
          throughput and daily operational performance.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="production-summary">

        <div className="production-box">
          <FaIndustry className="production-icon" />
          <h2>{summary.total_production.toLocaleString()} T</h2>
          <span>Total Production</span>
        </div>

        <div className="production-box">
          <FaBoxes className="production-icon" />
          <h2>{summary.total_target.toLocaleString()} T</h2>
          <span>Total Target</span>
        </div>

        <div className="production-box">
          <FaChartLine className="production-icon" />
          <h2>{summary.average_efficiency}%</h2>
          <span>Average Efficiency</span>
        </div>

        <div className="production-box">
          <FaCheckCircle className="production-icon" />
          <h2>{summary.departments}</h2>
          <span>Departments</span>
        </div>

      </div>

      {/* Charts */}

      <div className="chart-grid">

        <div className="chart-card">

          <h3>Production Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="production"
                stroke="#2E7D32"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h3>Department Production</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dept" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#43A047"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>

        </div>

      </div>

      {/* Department Table */}

      <div className="production-status">

        <h2>Department Performance</h2>

        <table className="production-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Production (T)</th>
              <th>Target (T)</th>
              <th>Efficiency (%)</th>
            </tr>
          </thead>

          <tbody>
            {departmentData.map((dept, index) => (
              <tr key={index}>
                <td>{dept.dept}</td>
                <td>{dept.value.toLocaleString()}</td>
                <td>{dept.target.toLocaleString()}</td>
                <td>{dept.efficiency}%</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </main>
  );
};

export default Production;