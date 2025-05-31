import React, { useState, useEffect, useRef } from "react";
import "./ReportsLayout.css";

const ReportsLayout = () => {
    const [reports, setReports] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const reportRef = useRef(null); // ✅ Create ref for detecting outside clicks

    useEffect(() => {
        const storedReports = JSON.parse(localStorage.getItem("appointmentData")) || [];
        setReports(storedReports);
    }, []);

    const handleViewReport = (report) => {
        setSelectedReport(report);
    };

    const handleDownloadReport = (report) => {
        const reportContent = `
        Doctor Name: ${report.doctorName}
        Speciality: ${report.doctorSpeciality}
        Date: ${report.appointmentDate}
        Time: ${report.appointmentTime}
        Time Slot: ${report.appointmentTimeSlot}
        Patient Name: ${report.name}
        Phone Number: ${report.phoneNumber}
    `;

        const blob = new Blob([reportContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Report_${report.doctorName}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (reportRef.current && !reportRef.current.contains(event.target)) {
                setSelectedReport(null); // ✅ Close if clicked outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="reports-container">
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Speciality</th>
                        <th>View Report</th>
                        <th>Download Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.length > 0 ? (
                        reports.map((report, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{report.doctorName}</td>
                                <td>{report.doctorSpeciality}</td>
                                <td>
                                    <button className="view-btn" onClick={() => handleViewReport(report)}>View Report</button>
                                </td>
                                <td>
                                    <button className="download-btn" onClick={() => handleDownloadReport(report)}>Download Report</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No reports available.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {selectedReport && (
                <div className="selected-report-overlay">
                    <div className="selected-report" ref={reportRef}>
                        <h3>Report Details</h3>
                        <p><strong>Doctor Name:</strong> {selectedReport.doctorName}</p>
                        <p><strong>Speciality:</strong> {selectedReport.doctorSpeciality}</p>
                        <p><strong>Date:</strong> {selectedReport.appointmentDate}</p>
                        <p><strong>Time:</strong> {selectedReport.appointmentTime}</p>
                        <p><strong>Time Slot:</strong> {selectedReport.appointmentTimeSlot}</p>
                        <p><strong>Patient Name:</strong> {selectedReport.name}</p>
                        <p><strong>Phone Number:</strong> {selectedReport.phoneNumber}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReportsLayout;