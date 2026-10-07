import "./Dashboard.css";
import "./Forecast.css";

import { useEffect, useState } from "react";
import axios from "axios";



import {
  FaChartLine,
  FaBrain,
  FaIndustry,
  FaArrowUp,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const Forecast = () => {
  const [summary, setSummary] = useState({
    confidence: 0,
    trend: "",
    forecast_days: 0,
  });

  const [forecast, setForecast] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [energySummary, setEnergySummary] = useState({});
  const [energyChart, setEnergyChart] = useState([]);

  const [downtimeSummary, setDowntimeSummary] = useState({});
  const [downtimeChart, setDowntimeChart] = useState([]);

  const [machineSummary, setMachineSummary] = useState({});
  const [machines, setMachines] = useState([]);

  const [recommendations, setRecommendations] = useState([]);


  

  const fetchEnergyForecast = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/forecast/energy"
    );

    setEnergySummary(data.summary);

    const history = data.history.map((item) => ({
      label: item.date,
      consumption: item.consumption,
      prediction: null,
    }));

    const forecast = data.forecast.map((item) => ({
      label: item.day,
      consumption: null,
      prediction: item.consumption,
    }));

    setEnergyChart([...history, ...forecast]);

  } catch (err) {
    console.error(err);
  }
};



const fetchDowntimeForecast = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/forecast/downtime"
    );

    setDowntimeSummary(data.summary);

    const history = data.history.map((item) => ({
      label: item.date,
      duration: item.duration,
      prediction: null,
    }));

    const forecast = data.forecast.map((item) => ({
      label: item.day,
      duration: null,
      prediction: item.duration,
    }));

    setDowntimeChart([...history, ...forecast]);

  } catch (err) {
    console.error(err);
  }
};



const fetchMachineForecast = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/forecast/machine"
    );

    setMachineSummary(data.summary);
    setMachines(data.machines);

  } catch (err) {
    console.error(err);
  }
};

const fetchRecommendations = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:5000/api/forecast/recommendations"
    );

    setRecommendations(data.recommendations);

  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  fetchForecast();
  fetchEnergyForecast();
  fetchDowntimeForecast();
  fetchMachineForecast();
  fetchRecommendations();
}, []);



  const fetchForecast = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/forecast/production"
      );

      console.log(data);

      setSummary(data.summary || {});
      setForecast(data.forecast || []);

      const history = (data.history || []).map((item) => ({
        label: item.date,
        production: item.production,
        prediction: null,
      }));

      const prediction = (data.forecast || []).map((item) => ({
        label: item.day,
        production: null,
        prediction: item.prediction,
      }));

      setChartData([...history, ...prediction]);
    } catch (error) {
      console.error("Forecast Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          color: "#fff",
          textAlign: "center",
          paddingTop: "100px",
          fontSize: "24px",
        }}
      >
        Loading Forecast...
      </div>
    );
  }

  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>🤖 AI Forecast & Prediction</h1>
        <p>
          AI-powered Production Forecast using Machine Learning
        </p>
      </div>

      {/* KPI Cards */}

      <div className="forecast-summary">

        <div className="forecast-card">
          <FaIndustry className="forecast-icon blue" />
          <h2>{forecast.length}</h2>
          <span>Forecast Days</span>
        </div>

        <div className="forecast-card">
          <FaChartLine className="forecast-icon green" />
          <h2>{summary.confidence || 0}%</h2>
          <span>Confidence</span>
        </div>

        <div className="forecast-card">
          <FaArrowUp className="forecast-icon orange" />
          <h2>{summary.trend || "-"}</h2>
          <span>Trend</span>
        </div>

        <div className="forecast-card">
          <FaBrain className="forecast-icon purple" />
          <h2>Linear Regression</h2>
          <span>AI Model</span>
        </div>

      </div>

      {/* Chart */}

      <div className="chart-card">

        <h3>Historical Production vs Forecast</h3>

        <ResponsiveContainer width="100%" height={400}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="label" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="production"
              stroke="#1565C0"
              strokeWidth={3}
              name="Historical"
            />

            <Line
              type="monotone"
              dataKey="prediction"
              stroke="#43A047"
              strokeWidth={3}
              strokeDasharray="5 5"
              name="Forecast"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* ================= ENERGY FORECAST ================= */}

<div className="chart-card">

  <h3>⚡ Energy Consumption Forecast</h3>

  <div className="forecast-summary">

    <div className="forecast-card">
      <h2>{energySummary.average}</h2>
      <span>Average kWh</span>
    </div>

    <div className="forecast-card">
      <h2>₹ {energySummary.expected_cost}</h2>
      <span>Expected Cost</span>
    </div>

    <div className="forecast-card">
      <h2>{energySummary.forecast_days}</h2>
      <span>Forecast Days</span>
    </div>

  </div>

  <ResponsiveContainer width="100%" height={350}>

    <LineChart data={energyChart}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="label" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="consumption"
        stroke="#1565C0"
        strokeWidth={3}
        name="Historical"
      />

      <Line
        type="monotone"
        dataKey="prediction"
        stroke="#43A047"
        strokeWidth={3}
        strokeDasharray="5 5"
        name="Forecast"
      />

    </LineChart>

  </ResponsiveContainer>

</div>


      {/* AI Insights */}

      <div className="ai-panel">

        <h3>AI Insights</h3>

        <div className="prediction-grid">

          <div className="prediction success">
            ✔ Production Trend :
            <strong> {summary.trend}</strong>
          </div>

          <div className="prediction info">
            ℹ Model Confidence :
            <strong> {summary.confidence}%</strong>
          </div>

          <div className="prediction warning">
            ⚡ Forecast Generated :
            <strong> {forecast.length} Days</strong>
          </div>

        </div>

      </div>

      {/* ================= DOWNTIME FORECAST ================= */}

<div className="chart-card">

  <h3>⏱ Downtime Forecast</h3>

  <div className="forecast-summary">

    <div className="forecast-card">
      <h2>{downtimeSummary.average} hrs</h2>
      <span>Average Downtime</span>
    </div>

    <div className="forecast-card">
      <h2>{downtimeSummary.forecast_days}</h2>
      <span>Forecast Days</span>
    </div>

  </div>

  <ResponsiveContainer width="100%" height={350}>

    <LineChart data={downtimeChart}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="label" />

      <YAxis />

      <Tooltip />

      <Legend />

      <Line
        type="monotone"
        dataKey="duration"
        stroke="#ef4444"
        strokeWidth={3}
        name="Historical"
      />

      <Line
        type="monotone"
        dataKey="prediction"
        stroke="#f59e0b"
        strokeWidth={3}
        strokeDasharray="6 6"
        name="Forecast"
      />

    </LineChart>

  </ResponsiveContainer>

</div>


{/* ================= MACHINE HEALTH ================= */}

<div className="chart-card">

  <h3>🏭 Machine Health Prediction</h3>

  <div className="forecast-summary">

    <div className="forecast-card">
      <h2>{machineSummary.total_machines}</h2>
      <span>Total Machines</span>
    </div>

    <div className="forecast-card">
      <h2>{machineSummary.average_health}%</h2>
      <span>Average Health</span>
    </div>

    <div className="forecast-card">
      <h2>{machineSummary.average_risk}%</h2>
      <span>Average Risk</span>
    </div>

  </div>

  <table className="forecast-table">

    <thead>
      <tr>
        <th>Machine</th>
        <th>Health</th>
        <th>Risk</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>

      {machines.map((machine, index) => (

        <tr key={index}>

          <td>{machine.machine}</td>

          <td>
  <span className="health-badge">
    {machine.health}%
  </span>
</td>

          <td>
  <span
    className={`risk-badge ${
      machine.risk <= 20
        ? "risk-low"
        : machine.risk <= 60
        ? "risk-medium"
        : "risk-high"
    }`}
  >
    {machine.risk}%
  </span>
</td>

<td>
  <span
    className={`status-badge ${
      machine.status === "Low"
        ? "status-low"
        : machine.status === "Medium"
        ? "status-medium"
        : "status-high"
    }`}
  >
    {machine.status}
  </span>
</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>


{/* ================= AI RECOMMENDATIONS ================= */}

<div
  className="chart-card"
  style={{
    marginTop: "30px",
    background: "linear-gradient(135deg, #111827, #1f2937)",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "25px",
    }}
  >
    <div>
      <h2
        style={{
          margin: 0,
          color: "#fff",
          fontWeight: 700,
        }}
      >
        🤖 AI Recommendations
      </h2>

      <p
        style={{
          color: "#9CA3AF",
          marginTop: "6px",
          fontSize: "14px",
        }}
      >
        AI-generated recommendations based on production, energy,
        downtime and machine health analysis.
      </p>
    </div>

    <div
      style={{
        background: "#2563EB",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "30px",
        fontWeight: 600,
      }}
    >
      {recommendations.length} Insights
    </div>
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: "20px",
    }}
  >
    {recommendations.map((item, index) => {
      const colors = {
        High: {
          bg: "#FEF2F2",
          border: "#DC2626",
          icon: "🔴",
          badge: "#DC2626",
        },
        Medium: {
          bg: "#FFFBEB",
          border: "#F59E0B",
          icon: "🟡",
          badge: "#F59E0B",
        },
        Low: {
          bg: "#ECFDF5",
          border: "#10B981",
          icon: "🟢",
          badge: "#10B981",
        },
      };

      const style = colors[item.priority] || colors.Low;

      return (
        <div
          key={index}
          style={{
            background: style.bg,
            borderLeft: `8px solid ${style.border}`,
            borderRadius: "16px",
            padding: "22px",
            transition: "0.3s",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <h3
              style={{
                margin: 0,
                color: "#111827",
              }}
            >
              {style.icon} {item.title}
            </h3>

            <span
              style={{
                background: style.badge,
                color: "#fff",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {item.priority}
            </span>
          </div>

          <p
            style={{
              color: "#374151",
              lineHeight: "1.6",
              marginBottom: "18px",
            }}
          >
            {item.description}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #E5E7EB",
              paddingTop: "12px",
            }}
          >
            <span
              style={{
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Generated by AI Engine
            </span>

            <span
              style={{
                color: style.badge,
                fontWeight: "bold",
              }}
            >
              
            </span>
          </div>
        </div>
      );
    })}
  </div>
</div>
      {/* Forecast Table */}

      <div className="forecast-table">

        <h3>Next Production Forecast</h3>

        <table>

          <thead>

            <tr>
              <th>Day</th>
              <th>Predicted Production</th>
            </tr>

          </thead>

          <tbody>

            {forecast.map((item, index) => (

              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.prediction} Ton</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
};

export default Forecast;