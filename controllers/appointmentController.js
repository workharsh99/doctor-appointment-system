const { validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');

exports.createAppointment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { department, doctorName, date, timeSlot } = req.body;

    const appointment = new Appointment({
      department,
      doctorName,
      patientId: req.user.userId,
      patientName: req.user.name,
      date,
      timeSlot
    });

    await appointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    let appointments;

    if (req.user.role === 'patient') {
      appointments = await Appointment.find({ patientId: req.user.userId });
    } else if (req.user.role === 'doctor') {
      const doctorNameQuery = req.query.filterByName === 'true' 
        ? { doctorName: req.user.name }
        : {};
      appointments = await Appointment.find(doctorNameQuery).sort({ createdAt: -1 });
    }

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();

    res.json({ message: 'Appointment status updated', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
