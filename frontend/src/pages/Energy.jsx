import "./Dashboard.css";
import "./Energy.css";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaBolt,
  FaPlug,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

const Energy = () => {
  const [summary, setSummary] = useState({
    total_energy: 0,
    total_cost: 0,
    peak_load: 0,
    average_load: 0,
  });

  const [lineData, setLineData] = useState([]);
  const [plantData, setPlantData] = useState([]);

  useEffect(() => {
    fetchEnergy();
  }, []);

  const fetchEnergy = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/energy");

      console.log(res.data);

      if (res.data.summary) {
        setSummary(res.data.summary);
      }

      if (res.data.weekly) {
        setLineData(res.data.weekly);
      }

      if (res.data.plants) {
        setPlantData(res.data.plants);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>⚡ Energy Analytics</h1>
        <p>
          Monitor real-time energy consumption and electricity cost.
        </p>
      </div>

      <div className="energy-summary">
        <div className="energy-box">
          <FaBolt className="energy-icon" />
          <h2>{summary.total_energy} kWh</h2>
          <span>Total Energy</span>
        </div>

        <div className="energy-box">
          <FaPlug className="energy-icon" />
          <h2>{summary.peak_load} kWh</h2>
          <span>Peak Load</span>
        </div>

        <div className="energy-box">
          <FaChartLine className="energy-icon" />
          <h2>{summary.average_load} kWh</h2>
          <span>Average Load</span>
        </div>

        <div className="energy-box">
          <FaMoneyBillWave className="energy-icon" />
          <h2>₹{summary.total_cost}</h2>
          <span>Total Cost</span>
        </div>
      </div>

      <div className="chart-grid">
        <div className="chart-card">
          <h3>Weekly Energy Consumption</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="energy"
                stroke="#1565C0"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Plant Wise Energy Consumption</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={plantData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="plant" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#0097A7"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default Energy;