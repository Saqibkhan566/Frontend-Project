import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    // ✅ Load appointment and user data from LocalStorage
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
            setShowNotification(true); // ✅ Show notification when an appointment exists
        }
    }, []);

    // ✅ Update notification dynamically when LocalStorage changes
    // useEffect(() => {
    //     const handleStorageChange = () => {
    //         const updatedAppointmentData = JSON.parse(localStorage.getItem("appointmentData"));
    //         const updatedDoctorData = JSON.parse(localStorage.getItem("doctorData"));

    //         setDoctorData(updatedDoctorData);
    //         setAppointmentData(updatedAppointmentData);
    //         setShowNotification(true);
    //     };

    //     window.addEventListener("storage", handleStorageChange);
    //     handleStorageChange();

    //     return () => {
    //         window.removeEventListener("storage", handleStorageChange);
    //     };
    // }, []);
    useEffect(() => {
        const handleStorageChange = () => {
            const updatedAppointments = JSON.parse(localStorage.getItem("appointmentData")) || [];
            const updatedDoctorData = JSON.parse(localStorage.getItem("doctorData"));

            setDoctorData(updatedDoctorData || null);
            setAppointmentData(updatedAppointments.length > 0 ? updatedAppointments[updatedAppointments.length - 1] : null);  // ✅ Display only the last appointment
            setShowNotification(updatedAppointments.length > 0);
        };

        window.addEventListener("storage", handleStorageChange);
        handleStorageChange();

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // ✅ Handle appointment cancellation
    const handleCancelAppointment = () => {
        localStorage.removeItem('appointmentData');
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
                            <p><strong>Time Slot:</strong> {appointmentData?.appointmentTimeSlot}</p>
                            <button className="cancel-button" onClick={handleCancelAppointment}>Cancel Appointment</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;