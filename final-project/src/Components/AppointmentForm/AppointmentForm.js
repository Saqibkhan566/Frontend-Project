import React, { useState } from 'react'
// import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    // const [selectedSlot, setSelectedSlot] = useState('');

    const handleSlotSelection = (slot) => {
        setSelectedSlot(slot);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!name || !phoneNumber || !appointmentDate || !appointmentTime || !selectedSlot) {
            alert("Please fill all fields before submitting!");
            return;
        }
        onSubmit({ name, phoneNumber, appointmentDate, appointmentTime, selectedSlot });
        setName('');
        setPhoneNumber('');
        setAppointmentDate('');
        setAppointmentTime('');
    };

    return (
        <form onSubmit={handleFormSubmit} className="appointment-form">
            <h2>Book Appointment with  {doctorName}</h2>
            <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Appointment Date:</label>
                <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentTime">Appointment Time:</label>
                <input type="time" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="selectedSlot">Select Time Slot:</label>
                <select id="selectedSlot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
                    <option value="" disabled>Select a time slot</option>
                    <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                    <option value="Afternoon (1PM - 4PM)">Afternoon (1PM - 4PM)</option>
                    <option value="Evening (5PM - 8PM)">Evening (5PM - 8PM)</option>
                </select>
            </div>
            <button type="submit">Book Appointment</button>
        </form>
    );
};

export default AppointmentForm

