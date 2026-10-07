import "./AlertCard.css";
import {
  FaExclamationTriangle,
  FaInfoCircle,
  FaTools,
} from "react-icons/fa";

const alerts = [
  {
    id: 1,
    type: "Critical",
    message: "Blast Furnace temperature exceeded safe limit.",
    time: "2 min ago",
    icon: <FaExclamationTriangle />,
    color: "#DC2626",
    bg: "#FEE2E2",
  },
  {
    id: 2,
    type: "Warning",
    message: "Rolling Mill vibration level is increasing.",
    time: "15 min ago",
    icon: <FaInfoCircle />,
    color: "#D97706",
    bg: "#FEF3C7",
  },
  {
    id: 3,
    type: "Maintenance",
    message: "Cooling Pump requires scheduled maintenance.",
    time: "1 hour ago",
    icon: <FaTools />,
    color: "#2563EB",
    bg: "#DBEAFE",
  },
];

const AlertCard = () => {
  return (
    <section className="alert-section">
      <h2 className="alert-title">System Alerts</h2>

      <div className="alert-container">
        {alerts.map((alert) => (
          <div
            className="alert-card"
            key={alert.id}
            style={{ borderLeft: `6px solid ${alert.color}` }}
          >
            <div
              className="alert-icon"
              style={{
                backgroundColor: alert.bg,
                color: alert.color,
              }}
            >
              {alert.icon}
            </div>

            <div className="alert-content">
              <h3>{alert.type}</h3>
              <p>{alert.message}</p>
            </div>

            <div className="alert-time">
              <span>{alert.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AlertCard;