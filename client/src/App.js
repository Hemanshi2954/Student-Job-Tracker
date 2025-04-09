import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://student-job-tracker-backend-qo0n.onrender.com";

function App() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied", date: "", link: "" });

  const fetchJobs = async () => {
    const res = await axios.get(API);
    setJobs(res.data);
  };
  // Utility function to count statuses
  const countJobStatuses = (jobs) => {
    return jobs.reduce((acc, job) => {
      const status = job.status;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async () => {
    await axios.post(API, form);
    fetchJobs();
    setForm({ company: "", role: "", status: "Applied", date: "", link: "" });
  };

  const updateStatus = async (id, status) => {
    await axios.put(`${API}/${id}`, { status });
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchJobs();
  };
  const statusFrequency = countJobStatuses(jobs);
  return (
    <div className="App">
      <div className="bg-overlay">
        <div className="container">
          <h1>🎓 Student Job Tracker</h1>
          <p className="subtitle">By <strong>Hemanshi Prajapati</strong></p>

          <div className="form-grid">
            <input
              placeholder="Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
            <input
              placeholder="Role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </select>
            <label className="date-label">
              Application Date:
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
              />
            </label>
            <input
              placeholder="Job Link"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
            <button onClick={addJob}>Add Job</button>
          </div>
          <div className="status-summary">
            <h2>Status Summary</h2>
            <ul>
              {Object.entries(statusFrequency).map(([status, count]) => (
                <li key={status}>
                  <strong>{status}</strong>: {count}
                </li>
              ))}
            </ul>
          </div>

          <div className="job-list">
            {jobs.length === 0 ? (
              <p className="no-jobs">No job applications yet. Start by adding one! 😊</p>
            ) : (
              jobs.map((job) => (
                <div className="job-card" key={job._id}>
                  <div className="job-header">
                    <h3>{job.company}</h3>
                    <span className={`status-badge ${job.status.toLowerCase()}`}>{job.status}</span>
                  </div>
                  <p><strong>Role:</strong> {job.role}</p>
                  <p><strong>Date Applied:</strong> {new Date(job.date).toLocaleDateString()}</p>
                  <p>
                    <strong>Link:</strong>{" "}
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#0077cc",
                        textDecoration: "underline"
                      }}
                    >
                      View Job
                    </a>
                  </p>

                  <div className="card-actions">
                    <select value={job.status} onChange={(e) => updateStatus(job._id, e.target.value)}>
                      <option>Applied</option>
                      <option>Interview</option>
                      <option>Offer</option>
                      <option>Rejected</option>
                    </select>
                    <button onClick={() => deleteJob(job._id)}>Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
