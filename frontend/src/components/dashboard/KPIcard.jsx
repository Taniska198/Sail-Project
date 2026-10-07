import "./KPIcard.css";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaBolt,
  FaIndustry,
  FaCogs,
  FaClock,
  FaMoneyBillWave,
} from "react-icons/fa";

const KPIcard = () => {
  const [dashboard, setDashboard] = useState({
    production: 0,
    target: 0,
    efficiency: 0,
    records: 0,
    energy: 0,
    energy_cost: 0,
    downtime: 0,
    health: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setDashboard(res.data);
    } catch (err) {
      console.error("Dashboard API Error:", err);
    }
  };

  const kpiData = [
    {
      id: 1,
      title: "Production Output",
      value: `${dashboard.production} Tons`,
      icon: <FaIndustry />,
      color: "#2563EB",
    },
    {
      id: 2,
      title: "Production Target",
      value: `${dashboard.target} Tons`,
      icon: <FaMoneyBillWave />,
      color: "#8B5CF6",
    },
    {
      id: 3,
      title: "Machine Efficiency",
      value: `${dashboard.efficiency.toFixed(2)} %`,
      icon: <FaCogs />,
      color: "#10B981",
    },
    {
      id: 4,
      title: "Production Records",
      value: dashboard.records,
      icon: <FaIndustry />,
      color: "#0EA5E9",
    },
    {
      id: 5,
      title: "Energy Consumption",
      value: `${dashboard.energy} kWh`,
      icon: <FaBolt />,
      color: "#F59E0B",
    },
    {
      id: 6,
      title: "Energy Cost",
      value: `₹${dashboard.energy_cost}`,
      icon: <FaMoneyBillWave />,
      color: "#14B8A6",
    },
    {
      id: 7,
      title: "Downtime",
      value: `${dashboard.downtime} Hours`,
      icon: <FaClock />,
      color: "#EF4444",
    },
  ];

  return (
    <div className="kpi-container">
      {kpiData.map((item) => (
        <div className="kpi-card" key={item.id}>
          <div
            className="kpi-icon"
            style={{ backgroundColor: item.color }}
          >
            {item.icon}
          </div>

          <div className="kpi-content">
            <h4>{item.title}</h4>
            <h2>{item.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPIcard;