import "./StatusCard.css";
import {
  FaCheckCircle,
  FaTools,
  FaPauseCircle,
  FaTimesCircle,
} from "react-icons/fa";

const machineStatus = [
  {
    id: 1,
    machine: "Blast Furnace - 1",
    status: "Running",
    icon: <FaCheckCircle />,
    color: "#10B981",
  },
  {
    id: 2,
    machine: "Rolling Mill",
    status: "Maintenance",
    icon: <FaTools />,
    color: "#F59E0B",
  },
  {
    id: 3,
    machine: "Cooling System",
    status: "Idle",
    icon: <FaPauseCircle />,
    color: "#3B82F6",
  },
  {
    id: 4,
    machine: "Power Generator",
    status: "Offline",
    icon: <FaTimesCircle />,
    color: "#EF4444",
  },
];

const StatusCard = () => {
  return (
    <section className="status-section">
      <h2 className="status-title">Machine Status</h2>

      <div className="status-container">
        {machineStatus.map((item) => (
          <div className="status-card" key={item.id}>
            <div
              className="status-icon"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="status-content">
              <h3>{item.machine}</h3>
              <p style={{ color: item.color }}>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatusCard;