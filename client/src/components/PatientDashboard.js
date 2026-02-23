import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    department: '',
    doctorName: '',
    date: '',
    timeSlot: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const departments = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology'];
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/doctors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDoctors(response.data);
    } catch (err) {
      console.error('Failed to fetch doctors');
    }
  };

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAppointments(response.data);
    } catch (err) {
      setError('Failed to fetch appointments');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/appointments', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowForm(false);
      setFormData({ department: '', doctorName: '', date: '', timeSlot: '' });
      fetchAppointments();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>👨‍⚕️ Patient Dashboard - {localStorage.getItem('userName')}</h2>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      <button onClick={() => setShowForm(!showForm)} className="book-btn">
        {showForm ? '✗ Cancel' : '➕ Book New Appointment'}
      </button>

      {showForm && (
        <div className="appointment-form">
          <h3>📝 Book Appointment</h3>
          {error && <div className="error">❌ {error}</div>}
          <form onSubmit={handleSubmit}>
            <select name="department" value={formData.department} onChange={handleChange} required>
              <option value="">🏥 Select Department</option>
              {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
            </select>
            <select name="doctorName" value={formData.doctorName} onChange={handleChange} required>
              <option value="">🩺 Select Doctor</option>
              {doctors.length > 0 ? (
                doctors.map(doctor => <option key={doctor._id} value={doctor.name}>Dr. {doctor.name}</option>)
              ) : (
                <option value="" disabled>No doctors available</option>
              )}
            </select>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required>
              <option value="">🕐 Select Time Slot</option>
              {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
            </select>
            <button type="submit">Book Appointment</button>
          </form>
        </div>
      )}

      <div className="appointments-list">
        <h3>📋 My Appointments</h3>
        {appointments.length === 0 ? (
          <p style={{textAlign: 'center', color: '#999', padding: '40px'}}>No appointments found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map(apt => (
                <tr key={apt._id}>
                  <td>🏥 {apt.department}</td>
                  <td>🩺 Dr. {apt.doctorName}</td>
                  <td>📅 {apt.date}</td>
                  <td>🕐 {apt.timeSlot}</td>
                  <td><span className={`status-${apt.status}`}>{apt.status.toUpperCase()}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
