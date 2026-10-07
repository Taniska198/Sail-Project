import "./Dashboard.css";
import "./Recommendations.css";

import {
  FaRobot,
  FaBolt,
  FaTools,
  FaLeaf,
  FaCheckCircle,
} from "react-icons/fa";

const recommendations = [
  {
    priority: "High",
    title: "Optimize Blast Furnace Energy Usage",
    description:
      "Reduce unnecessary power consumption during low production hours.",
  },
  {
    priority: "Medium",
    title: "Schedule Rolling Mill Maintenance",
    description:
      "Perform preventive maintenance within the next 48 hours.",
  },
  {
    priority: "Low",
    title: "Increase Solar Power Utilization",
    description:
      "Shift auxiliary loads to renewable energy during daytime.",
  },
];

const history = [
  {
    recommendation: "Motor Speed Optimization",
    status: "Implemented",
    saving: "8%",
  },
  {
    recommendation: "Boiler Temperature Control",
    status: "Completed",
    saving: "6%",
  },
  {
    recommendation: "Shift Scheduling",
    status: "Pending",
    saving: "4%",
  },
];

const Recommendations = () => {
  return (
    <main className="dashboard">

      <div className="dashboard-header">
        <h1>🤖 AI Recommendations</h1>

        <p>
          Intelligent recommendations generated from production,
          energy consumption, downtime and machine health analytics.
        </p>
      </div>

      {/* KPI Cards */}

      <div className="recommend-summary">

        <div className="recommend-card">
          <FaRobot className="recommend-icon blue" />
          <h2>18</h2>
          <span>AI Suggestions</span>
        </div>

        <div className="recommend-card">
          <FaBolt className="recommend-icon orange" />
          <h2>12%</h2>
          <span>Energy Saving</span>
        </div>

        <div className="recommend-card">
          <FaTools className="recommend-icon red" />
          <h2>9</h2>
          <span>Maintenance Tasks</span>
        </div>

        <div className="recommend-card">
          <FaLeaf className="recommend-icon green" />
          <h2>15%</h2>
          <span>CO₂ Reduction</span>
        </div>

      </div>

      {/* AI Recommendation Cards */}

      <div className="recommend-grid">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className={`recommend-box ${item.priority.toLowerCase()}`}
          >

            <h3>{item.title}</h3>

            <p>{item.description}</p>

            <span>Priority : {item.priority}</span>

          </div>

        ))}

      </div>

      {/* Benefits */}

      <div className="benefit-panel">

        <h3>Expected Benefits</h3>

        <div className="benefit-grid">

          <div className="benefit-card">

            <FaBolt />

            <h4>Reduce Energy Cost</h4>

            <p>Approx. 12% reduction in energy consumption.</p>

          </div>

          <div className="benefit-card">

            <FaTools />

            <h4>Reduce Downtime</h4>

            <p>Preventive maintenance improves availability.</p>

          </div>

          <div className="benefit-card">

            <FaLeaf />

            <h4>Lower Carbon Emissions</h4>

            <p>Cleaner operations with optimized processes.</p>

          </div>

        </div>

      </div>

      {/* History */}

      <div className="recommend-table">

        <h3>Recommendation History</h3>

        <table>

          <thead>

            <tr>

              <th>Recommendation</th>
              <th>Status</th>
              <th>Estimated Saving</th>

            </tr>

          </thead>

          <tbody>

            {history.map((item, index) => (

              <tr key={index}>

                <td>{item.recommendation}</td>

                <td>

                  <FaCheckCircle
                    style={{ color: "green", marginRight: "8px" }}
                  />

                  {item.status}

                </td>

                <td>{item.saving}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
};

export default Recommendations;