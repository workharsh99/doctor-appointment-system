import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [filterByName, setFilterByName] = useState(false);
  const navigate = useNavigate();
  const doctorName = localStorage.getItem('userName');

  useEffect(() => {
    fetchAppointments();
  }, [filterByName]);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/appointments?filterByName=${filterByName}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/appointments/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAppointments();
    } catch (err) {
      setError('Failed to update appointment status');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>🩺 Doctor Dashboard - Dr. {doctorName}</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {error && <div className="error">❌ {error}</div>}

      <div className="filter-section">
        <label>
          <input 
            type="checkbox" 
            checked={filterByName} 
            onChange={(e) => setFilterByName(e.target.checked)}
          />
          {' '}🔍 Show only my appointments
        </label>
      </div>

      <div className="appointments-list">
        <h3>📋 Appointment Requests</h3>
        {appointments.length === 0 ? (
          <p style={{textAlign: 'center', color: '#999', padding: '40px'}}>No appointments found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt._id}>
                  <td>👤 {apt.patientName}</td>
                  <td>🏥 {apt.department}</td>
                  <td>📅 {apt.date}</td>
                  <td>🕐 {apt.timeSlot}</td>
                  <td><span className={`status-${apt.status}`}>{apt.status.toUpperCase()}</span></td>
                  <td>
                    {apt.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'approved')}
                          className="approve-btn"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(apt._id, 'rejected')}
                          className="reject-btn"
                        >
                          ✗ Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
