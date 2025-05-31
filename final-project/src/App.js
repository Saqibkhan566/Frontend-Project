import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Notification from './Components/Notification/Notification';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Login from './Components/Login/Login';
import Sign_up from './Components/Sign_up/Sign_up';
// import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation';
import BookingConsultation from './Components/BookingConsultation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Review from './Components/ReviewForm/ReviewForm';
import ProfileCard from './Components/ProfileCard/ProfileCard';
import ReportsLayout from './Components/ReportsLayout/ReportsLayout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Notification >
          <Navbar />
          {/* <ProfileCard /> */}
          <Routes>
            <Route path="/" element={<Landing_Page />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/sign_up" element={<Sign_up />} />
            <Route path='/reviews' element={<Review />} />
            <Route path='/profile' element={<ProfileCard />} />
            <Route path='/reports' element={<ReportsLayout />} />
            {/* <Route path="/instant-consultation" element={<InstantConsultation />} /> */}
            <Route path="/booking-consultation" element={<BookingConsultation />} />
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
// // Import necessary modules from React library
// import React, { useEffect } from 'react';
// // Import components for routing from react-router-dom library
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// // Import custom Navbar component
// import Navbar from './Components/Navbar/Navbar';
// import Landing_Page from './Components/Landing_Page/Landing_Page';
// import Login from './Components/Login/Login';
// import Sign_up from './Components/Sign_up/Sign_up';
// import InstantConsultation from './Components/InstantConsultationBooking/InstantConsultation'

// // Function component for the main App
// function App() {

//   // Render the main App component
//   return (
//     <div className="App">
//       {/* Set up BrowserRouter for routing */}
//       <BrowserRouter>
//         {/* Display the Navbar component */}
//         <Navbar />

//         {/* Set up the Routes for different pages */}
//         <Routes>
//           {/* Define individual Route components for different pages */}
//           <Route path="/" element={<Landing_Page />} />
//           <Route path="/Login" element={<Login />} />
//           <Route path="/Sign_up" element={<Sign_up />} />
//           <Route path="/instant-consultation" element={<InstantConsultation />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// // Export the App component as the default export
// export default App;