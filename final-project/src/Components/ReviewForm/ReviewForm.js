import React, { useState, useEffect } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
    const [appointments, setAppointments] = useState([]);
    const [reviews, setReviews] = useState({});
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [rating, setRating] = useState('');
    const [name, setName] = useState('');
    const [comments, setComments] = useState('');

    useEffect(() => {
        const storedAppointments = localStorage.getItem('appointmentData');

        // ✅ Ensure storedAppointments is an array or default to an empty array
        const parsedAppointments = storedAppointments ? JSON.parse(storedAppointments) : [];

        // ✅ If parsedAppointments is not an array, convert it into one
        setAppointments(Array.isArray(parsedAppointments) ? parsedAppointments : [parsedAppointments]);

        const storedReviews = JSON.parse(localStorage.getItem('reviews')) || {};
        setReviews(storedReviews);
    }, []);

    const handleReviewSubmit = (doctorName) => {
        const updatedReviews = { ...reviews, [doctorName]: { rating, comments } };
        localStorage.setItem('reviews', JSON.stringify(updatedReviews));
        setReviews(updatedReviews);
        setSelectedDoctor(null);
        setRating('');
        setComments('');
    };

    return (
        <div className="review-container">
            <h2>Provide Feedback on Your Consultation</h2>
            <table>
                <thead>
                    <tr>
                        <th>Serial Number</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>Provide Feedback</th>
                        <th>Review Given</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{appointment.doctorName}</td>
                            <td>{appointment.doctorSpeciality}</td>
                            <td>
                                {!reviews[appointment.doctorName] ? (
                                    <button onClick={() => setSelectedDoctor(appointment.doctorName)}>Click Here</button>
                                ) : (
                                    "Review Submitted"
                                )}
                            </td>
                            <td>{reviews[appointment.doctorName]?.rating} ★ </td>
                            {/* - {reviews[appointment.doctorName]?.comments} */}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedDoctor && (
                <form className='Review-form'>
                    <h3>Provide Feedback for {selectedDoctor}</h3>
                    <div className="form-group">
                        <label htmlFor='Name'>Name:</label>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor='Review'>Review:</label>
                        <textarea value={comments} onChange={(e) => setComments(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor='Rating'>Rating (1-5):</label>
                        <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required />
                    </div>
                    <button onClick={() => handleReviewSubmit(selectedDoctor)}>Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default ReviewForm;