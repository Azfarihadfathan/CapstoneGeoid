import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Circle, Underline } from "lucide-react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, signOut } from "firebase/auth";
import { User, LogOut, LogIn } from "lucide-react";

function Navbar() {
  const [profileData, setProfileData] = useState(null);
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef(null);

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    // Hanya jalankan jika ada user yang login
    if (user) {
      setIsLoading(true);
      const db = getDatabase();

      // Membuat path ke data user.
      // Sesuai struktur Anda, kita ganti '.' dengan ',' pada email.
      const sanitizedEmail = user.email.replace(/\./g, ",");
      const userRef = ref(db, "users/" + sanitizedEmail); // Ganti 'users/' jika path Anda berbeda

      // Menggunakan onValue untuk mendengarkan perubahan data secara real-time
      const unsubscribe = onValue(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setProfileData(snapshot.val()); // Simpan data ke state
          } else {
            console.log("No profile data available for this user.");
            setProfileData(null); // Atau set data default
          }
          setIsLoading(false); // Selesai loading
        },
        (error) => {
          console.error(error);
          setIsLoading(false); // Selesai loading meskipun error
        }
      );

      // Cleanup listener saat komponen unmount untuk mencegah memory leak
      return () => unsubscribe();
    } else {
      // Jika tidak ada user, pastikan data kosong dan tidak loading
      setIsLoading(false);
      setProfileData(null);
    }
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Fungsi untuk handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileIsOpen(false);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const location = useLocation();
  const showHeader = location.pathname !== "/dashboard";

  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);
  return (
    <div className="flex flex-col max-w-screen overflow-x-clip -mb-25">
      <div
        className={`fixed z-2000 py-3.5 w-screen [background:#006699] flex items-center justify-between ${
          showHeader ? "pb-12" : "pb-0"
        }`}
      >
        <img src="/geoid_logo_white.png" className="w-27 bg-cover ml-5" />

        <div className="flex justify-end w-full mr-2.5">
          <button
            className="md:hidden text-white "
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        <div className="relative z-3000" ref={dropdownRef}>
          <button
            onClick={() => setProfileIsOpen(!isOpen)}
            className="w-10 h-10 mr-10 rounded-full border-2 border-white cursor-pointer z-3000 "
          >
            <div className="w-full h-full flex items-center justify-center">
              <User className="text-white" />
            </div>
          </button>

          {profileIsOpen && (
            <div
              className="
            absolute top-full right-0 mt-2 w-64 
            bg-white rounded-lg shadow-xl 
            text-gray-800 z-50
            origin-top-right animate-fade-in-down
          "
            >
              {user ? (
                // Tampilan jika USER SUDAH LOGIN
                <>
                  <div className="px-4 py-3 border-b">
                    {isLoading ? (
                      <p className="text-sm text-gray-500">
                        Loading profile...
                      </p>
                    ) : profileData ? (
                      <>
                        <p className="text-sm text-gray-600">Signed in as</p>
                        <p
                          className="font-medium truncate"
                          title={profileData.nama}
                        >
                          {/* Tampilkan NAMA dari Realtime DB */}
                          {profileData.nama}
                        </p>
                        <p
                          className="text-sm text-gray-500 truncate"
                          title={user.email}
                        >
                          {/* Tampilkan EMAIL dari Auth */}
                          {user.email}
                        </p>
                        <p
                          className={`text-xs font-bold mt-1 ${
                            profileData.isSubscribed
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {/* Tampilkan status langganan */}
                          Status:{" "}
                          {profileData.isSubscribed
                            ? "subscribed"
                            : "not subscribed"}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-red-500">
                        Profil tidak ditemukan.
                      </p>
                    )}
                  </div>

                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-x-2 px-3 py-2 text-sm text-left text-red-600 rounded-md hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                // Tampilan jika USER BELUM LOGIN
                <div className="p-2">
                  <Link
                    to="/login"
                    onClick={() => setProfileIsOpen(false)} // Tutup dropdown saat diklik
                    className="
                  w-full flex items-center gap-x-2 px-3 py-2 
                  text-sm text-left text-blue-600 
                  rounded-md hover:bg-blue-50
                "
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        <nav className="absolute hidden md:flex justify-center space-x-25 text-white w-screen font-montserrat">
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : null}`}
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : null}`}
            to="/about"
          >
            About Us
          </NavLink>

          <NavLink
            className={({ isActive }) => `${isActive ? "underline" : null}`}
            to="/dashboard"
          >
            Product
          </NavLink>
        </nav>

        <div
          className={`
          absolute top-16 left-0 w-full bg-[#006699] 
          flex flex-col items-center space-y-4 p-4 md:hidden 
          border-b-2 border-b-white text-white z-[2000]
          
          transform transition-all duration-300 ease-in-out
          ${
            isOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0 invisible"
          }
        `}
        >
          <Link to="/" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)}>
            About Us
          </Link>

          <Link to="/dashboard" onClick={() => setIsOpen(false)}>
            Product
          </Link>
        </div>
      </div>

      <div
        className={`relative self-center  ${
          showHeader ? "sm:h-[100vh] h-[70vh] pt-[10vh]" : " pt-45"
        }`}
      >
        {showHeader && (
          <>
            <svg
              viewBox="0 0 24 24"
              className={`absolute md:bottom-[0vw] sm:bottom-[15vw] bottom-[45vw] right-[30vw] left-1/2 -translate-x-1/2 w-[160vw] -z-10
        transition-all duration-1200 ease-out
        ${show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}
      `}
              style={{ clipPath: "inset(50% 0 0 0)" }}
            >
              <defs>
                <linearGradient id="circleGradient" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#004466" />
                  <stop offset="19%" stopColor="#006699" />
                </linearGradient>
              </defs>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="#004466"
                strokeWidth="0.5"
                fill="url(#circleGradient)"
              />
            </svg>
            <img
              src="/geoid_logo_white.png"
              className="w-[75vw] sm:w-[75vw] md:w-[75vw] lg:w-[40vw] self-center bg-cover ml-5 z-0"
            />
          </>
        )}
      </div>
      {showHeader && (
        <img
          src="/pattern.png"
          className="fixed  self-center bg-cover ml-5 -z-1000"
        />
      )}
    </div>
  );
}

export default Navbar;
