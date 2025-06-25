import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthForm from "../komponen/AuthForm";
import MapComponent from "../komponen/Map";
import ProtectedRoute from "../komponen/ProtectedRoute";

import Navbar from "../komponen/Navbar/Navbar";
import Home from "../komponen/Navbar/Home";
import About from "../komponen/Navbar/About";
import Footer from "../komponen/Navbar/Footer";
import Pricing from "../komponen/Navbar/Pricing";
import Information1 from "../komponen/Navbar/Information/Information-1";
import Information2 from "../komponen/Navbar/Information/Information-2";
import Information3 from "../komponen/Navbar/Information/Information-3";
import Information4 from "../komponen/Navbar/Information/Information-4";
import Information5 from "../komponen/Navbar/Information/Information-5";
import Information6 from "../komponen/Navbar/Information/Information-6";
const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname !== "/dashboard";
  const showHeaderFooter = location.pathname !== "/login";
  return (
    <>
      {showHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/geoid-datum-vertikal-stabil" element={<Information1 />} />
        <Route path="/alat-ukur-gaya-berat" element={<Information2 />} />
        <Route
          path="/free-air-anomaly-bouguer-anomaly"
          element={<Information3 />}
        />
        <Route path="/metode-pengolahan" element={<Information4 />} />
        <Route path="/geoid-vs-msl" element={<Information5 />} />
        <Route path="/aplikasi-gaya-berat" element={<Information6 />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MapComponent />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<AuthForm />} />
        <Route path="*" element={<Home />} />
      </Routes>
      {showFooter && showHeaderFooter && <Footer />}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
