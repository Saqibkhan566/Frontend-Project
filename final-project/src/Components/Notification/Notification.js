import React, { useEffect, useState } from 'react';
import './Notification.css';
import Navbar from '../Navbar/Navbar';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    // ✅ Initial data retrieval
    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
            setShowNotification(true);
        }
    }, []);

    // ✅ Watch for localStorage changes dynamically
    useEffect(() => {
        const interval = setInterval(() => {
            const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));
            console.log("📌 Appointment Data Retrieved:", storedAppointmentData);
            if (storedAppointmentData) {
                setAppointmentData(storedAppointmentData);
                setShowNotification(true);
            } else {
                setShowNotification(false);
            }
        }, 1000); // ✅ Check every second for updates

        return () => clearInterval(interval); // ✅ Cleanup interval to prevent memory leaks
    }, []);

    const handleCancelAppointment = () => {
        localStorage.removeItem('appointmentData'); // ✅ Corrected removal
        setAppointmentData(null);
        setShowNotification(false); // ✅ Hide notification properly
    };

    return (
        <div>
            <Navbar />
            {children}

            {isLoggedIn && showNotification && appointmentData && (
                <div className="notification-container">
                    <div className="appointment-card">
                        <div className="appointment-card__content">
                            <h3 className="appointment-card__title">Appointment Details</h3>
                            <p><strong>Patient Name:</strong> {username}</p>
                            <p><strong>Doctor:</strong> {doctorData?.name}</p>
                            <p><strong>Specialty:</strong> {doctorData?.speciality}</p>
                            <p><strong>Date:</strong> {appointmentData?.appointmentDate}</p>
                            <p><strong>Time:</strong> {appointmentData?.appointmentTime}</p>
                            <button className="cancel-button" onClick={handleCancelAppointment}>Cancel Appointment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;