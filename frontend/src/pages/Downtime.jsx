import "./Dashboard.css";
import "./Downtime.css";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaClock,
  FaExclamationTriangle,
  FaTools,
  FaIndustry,
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

const Downtime = () => {

  const [summary, setSummary] = useState({
    total_hours: 0,
    incidents: 0,
    average: 0,
  });

  const [trendData, setTrendData] = useState([]);
  const [reasonData, setReasonData] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    fetchDowntime();
  }, []);

  const fetchDowntime = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/downtime"
      );

      setSummary(res.data.summary);

      setTrendData(res.data.daily);

      setReasonData(
        res.data.reasons.map((item) => ({
          reason: item.reason,
          value: item.count,
        }))
      );

      setMachines(res.data.machines);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>⏱ Downtime Analysis</h1>

        <p>
          Monitor equipment downtime, root causes,
          maintenance impact and operational availability.
        </p>
      </div>

      {/* KPI */}

      <div className="downtime-summary">

        <div className="downtime-card">
          <FaClock className="dt-icon blue" />
          <h2>{summary.total_hours} hrs</h2>
          <span>Total Downtime</span>
        </div>

        <div className="downtime-card">
          <FaExclamationTriangle className="dt-icon orange" />
          <h2>{summary.incidents}</h2>
          <span>Incidents</span>
        </div>

        <div className="downtime-card">
          <FaTools className="dt-icon red" />
          <h2>{summary.average} hrs</h2>
          <span>Average Downtime</span>
        </div>

        <div className="downtime-card">
          <FaIndustry className="dt-icon green" />
          <h2>
            {(100 - summary.total_hours / 10).toFixed(1)}%
          </h2>
          <span>Plant Availability</span>
        </div>

      </div>

      {/* Charts */}

      <div className="downtime-grid">

        <div className="chart-card">

          <h3>Weekly Downtime Trend</h3>

          <ResponsiveContainer width="100%" height={320}>

            <LineChart data={trendData}>

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="day"/>

              <YAxis/>

              <Tooltip/>

              <Line
                dataKey="hours"
                stroke="#D32F2F"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-card">

          <h3>Downtime Causes</h3>

          <ResponsiveContainer width="100%" height={320}>

            <BarChart
              layout="vertical"
              data={reasonData}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis type="number"/>

              <YAxis
                type="category"
                dataKey="reason"
              />

              <Tooltip/>

              <Bar
                dataKey="value"
                fill="#1565C0"
                radius={[0,8,8,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Live Status */}

      <div className="incident-panel">

        <h3>Live Incident Status</h3>

        <div className="incident-grid">

          {machines.map((item,index)=>(

            <div
              key={index}
              className="incident-card maintenance"
            >

              <h4>{item.machine}</h4>

              <p>Total Downtime</p>

              <strong>{item.hours} hrs</strong>

            </div>

          ))}

        </div>

      </div>

      {/* Table */}

      <div className="downtime-table">

        <h3>Machine Downtime Summary</h3>

        <table>

          <thead>

            <tr>

              <th>Machine</th>

              <th>Total Downtime</th>

            </tr>

          </thead>

          <tbody>

            {machines.map((item,index)=>(

              <tr key={index}>

                <td>{item.machine}</td>

                <td>{item.hours} hrs</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
};

export default Downtime;