import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Footer from "./components/layout/Footer";

import Dashboard from "./pages/Dashboard";
import Energy from "./pages/Energy";
import Production from "./pages/Production";
import MachineHealth from "./pages/MachineHealth";
import Downtime from "./pages/Downtime";
import Forecast from "./pages/Forecast";
import Recommendations from "./pages/Recommendations";
import Reports from "./pages/Reports";
import Upload from "./pages/Upload";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <Sidebar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/energy" element={<Energy />} />
        <Route path="/production" element={<Production />} />
        <Route path="/machine-health" element={<MachineHealth />} />
        <Route path="/downtime" element={<Downtime />} />
        <Route path="/forecast" element={<Forecast />} />
        <Route
          path="/recommendations"
          element={<Recommendations />}
        />
        <Route path="/reports" element={<Reports />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;