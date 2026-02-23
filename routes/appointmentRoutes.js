const express = require('express');
const { body } = require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.post('/', authenticate, authorize('patient'), [
  body('department').notEmpty().withMessage('Department is required'),
  body('doctorName').notEmpty().withMessage('Doctor name is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('timeSlot').notEmpty().withMessage('Time slot is required')
], appointmentController.createAppointment);

router.get('/', authenticate, appointmentController.getAppointments);

router.put('/:id', authenticate, authorize('doctor'), appointmentController.updateAppointmentStatus);

module.exports = router;
