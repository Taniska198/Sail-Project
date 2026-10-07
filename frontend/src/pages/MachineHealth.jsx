import "./Dashboard.css";
import "./MachineHealth.css";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaCogs,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTools,
  FaThermometerHalf,
} from "react-icons/fa";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2E7D32", "#F9A825", "#D32F2F"];

const MachineHealth = () => {

  const [summary, setSummary] = useState({
    overall_health: 0,
    healthy: 0,
    warning: 0,
    critical: 0,
  });

  const [machines, setMachines] = useState([]);
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    fetchMachineData();
  }, []);

  const fetchMachineData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/machine");

      setSummary(res.data.summary);
      setMachines(res.data.machines);

      setHealthData([
        {
          name: "Healthy",
          value: res.data.summary.healthy,
        },
        {
          name: "Warning",
          value: res.data.summary.warning,
        },
        {
          name: "Critical",
          value: res.data.summary.critical,
        },
      ]);
    } catch (err) {
      console.error("Machine API Error:", err);
    }
  };

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>⚙ Machine Health Monitoring</h1>

        <p>
          Monitor equipment condition, maintenance schedule,
          machine temperature and operational health.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="machine-summary">

        <div className="machine-card">
          <FaCogs className="machine-icon blue" />
          <h2>{machines.length}</h2>
          <span>Total Machines</span>
        </div>

        <div className="machine-card">
          <FaCheckCircle className="machine-icon green" />
          <h2>{summary.healthy}</h2>
          <span>Healthy</span>
        </div>

        <div className="machine-card">
          <FaExclamationTriangle className="machine-icon orange" />
          <h2>{summary.warning}</h2>
          <span>Warning</span>
        </div>

        <div className="machine-card">
          <FaTools className="machine-icon red" />
          <h2>{summary.critical}</h2>
          <span>Critical</span>
        </div>

      </div>

      {/* Pie Chart + Status */}

      <div className="machine-grid">

        <div className="pie-card">

          <h3>Machine Health Distribution</h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={healthData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {healthData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

        </div>

        {/* Live Status */}

        <div className="status-card">

          <h3>Live Machine Status</h3>

          {machines.map((machine, index) => (

            <div
              key={index}
              className={`status-box ${
                machine.status === "Excellent"
                  ? "healthy"
                  : machine.status === "Warning"
                  ? "warning"
                  : machine.status === "Critical"
                  ? "critical"
                  : "healthy"
              }`}
            >
              <span>{machine.machine}</span>

              <strong>{machine.status}</strong>

            </div>

          ))}

        </div>

      </div>

      {/* Machine Table */}

      <div className="machine-table-card">

        <h3>Machine Temperature Status</h3>

        <table>

          <thead>
            <tr>
              <th>Machine</th>
              <th>Status</th>
              <th>Temperature</th>
            </tr>
          </thead>

          <tbody>

            {machines.map((machine, index) => (

              <tr key={index}>

                <td>{machine.machine}</td>

                <td>{machine.status}</td>

                <td>
                  <FaThermometerHalf />{" "}
                  {Math.round(300 + machine.efficiency * 4)}°C
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Maintenance */}

      <div className="maintenance-card">

        <h3>Upcoming Maintenance</h3>

        <div className="maintenance-item">
          <h4>Rolling Mill</h4>
          <p>Lubrication & Belt Inspection</p>
          <span>Tomorrow</span>
        </div>

        <div className="maintenance-item">
          <h4>Coke Oven</h4>
          <p>Motor Replacement</p>
          <span>26 July</span>
        </div>

        <div className="maintenance-item">
          <h4>Power Plant</h4>
          <p>Routine Inspection</p>
          <span>28 July</span>
        </div>

      </div>

    </main>
  );
};

export default MachineHealth;