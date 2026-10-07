import "./Dashboard.css";
import "./Upload.css";

import { useState, useEffect } from "react";
import axios from "axios";

import {
  FaUpload,
  FaFileCsv,
  FaCheckCircle,
  FaTimesCircle,
  FaDatabase,
} from "react-icons/fa";

const Upload = () => {

const [selectedFile, setSelectedFile] = useState(null);
const [fileName, setFileName] = useState("");
const [loading, setLoading] = useState(false);

// Upload Statistics
const [stats, setStats] = useState({
  total: 0,
  csv: 0,
  success: 0,
  failed: 0,
});

// Upload History
const [uploadHistory, setUploadHistory] = useState([]);

// Load Upload History from Backend
const loadUploads = async () => {

  try {

    const response = await axios.get(
      "http://localhost:5000/api/upload/history"
    );

    setStats(response.data.stats);

    setUploadHistory(response.data.history);

  } catch (error) {

    console.error("Error loading uploads:", error);

  }

};


// Delete System


const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this upload?"
  );

  if (!confirmDelete) return;

  try {

    const response = await axios.delete(
      `http://localhost:5000/api/upload/${id}`
    );

    alert(response.data.message);

    // Reload upload history
    loadUploads();

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Delete failed."
    );

  }

};




  useEffect(() => {
  loadUploads();
  }, []);
  const handleFileChange = (e) => {

    if (e.target.files.length > 0) {

      setSelectedFile(e.target.files[0]);
      setFileName(e.target.files[0].name);

    }

  };



  const handleUpload = async () => {

  if (!selectedFile) {
    alert("Please select a CSV file.");
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {

    setLoading(true);

    const response = await axios.post(
      "http://localhost:5000/api/upload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert(response.data.message);

    // Reload upload history and statistics from backend
    await loadUploads();

    // Clear selected file
    setSelectedFile(null);
    setFileName("");

  } catch (error) {

    console.error(error);

    alert(
      error.response?.data?.message ||
      "Upload Failed."
    );

  } finally {

    setLoading(false);

  }

};

  return (
    <main className="dashboard">

      <div className="dashboard-header">

        <h1>📤 Upload CSV Data</h1>

        <p>
          Upload production, energy, downtime and machine health datasets
          for analysis and AI prediction.
        </p>

      </div>

 <div className="upload-summary">

  <div className="upload-card">
    <FaDatabase className="upload-icon blue" />
    <h2>{stats.total}</h2>
    <span>Total Uploads</span>
  </div>

  <div className="upload-card">
    <FaFileCsv className="upload-icon green" />
    <h2>{stats.csv}</h2>
    <span>CSV Files</span>
  </div>

  <div className="upload-card">
    <FaCheckCircle className="upload-icon orange" />
    <h2>{stats.success}</h2>
    <span>Successful Uploads</span>
  </div>

  <div className="upload-card">
    <FaTimesCircle className="upload-icon red" />
    <h2>{stats.failed}</h2>
    <span>Failed Uploads</span>
  </div>

  </div>

      <div className="upload-box">

        <FaUpload className="upload-large-icon"/>

        <h2>Choose CSV File</h2>

        <p>Drag & Drop your CSV file here or browse your computer.</p>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
        />

        {fileName && (

          <p className="selected-file">

            Selected File :
            <strong> {fileName}</strong>

          </p>

        )}

        <button
          onClick={handleUpload}
          disabled={loading}
        >

          {loading ? "Uploading..." : "Upload CSV"}

        </button>

      </div>

      <div className="guideline-card">

        <h3>Upload Guidelines</h3>

        <ul>

          <li>✔ Only CSV files are supported.</li>

          <li>✔ Maximum file size: 20 MB.</li>

          <li>✔ Ensure headers are included.</li>

          <li>✔ UTF-8 encoding is recommended.</li>

          <li>✔ Duplicate records will be ignored.</li>

        </ul>

      </div>

      <div className="upload-table">

        <h3>Upload History</h3>

        <table>

          <thead>

            <tr>

              <th>File Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

  {uploadHistory.length > 0 ? (

    uploadHistory.map((item) => (

      <tr key={item.id}>

        <td>{item.file}</td>

        <td>{item.date}</td>

        <td
          className={
            item.status === "Uploaded"
              ? "uploaded"
              : "failed"
          }
        >
          {item.status}
        </td>

        <td>
          <button
            className="delete-btn"
            onClick={() => handleDelete(item.id)}
          >
            Delete
          </button>
        </td>

      </tr>

    ))

  ) : (

    <tr>
      <td colSpan="4" style={{ textAlign: "center" }}>
        No Upload History
      </td>
    </tr>

  )}

</tbody>

        </table>

      </div>

    </main>
  );
};

export default Upload;