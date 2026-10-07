import "./Dashboard.css";

import KPIcard from "../components/dashboard/KPIcard";
import StatusCard from "../components/dashboard/StatusCard";
import AlertCard from "../components/dashboard/AlertCard";

const Dashboard = () => {
  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>

        <p>
          Welcome to the SAIL Industry Dashboard. Monitor energy consumption,
          production, machine health, downtime, and system alerts in real time.
        </p>
      </div>

      <section className="dashboard-section">
        <KPIcard />
      </section>

      <section className="dashboard-section">
        <StatusCard />
      </section>

      <section className="dashboard-section">
        <AlertCard />
      </section>
    </main>
  );
};

export default Dashboard;