import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";

const Homepage = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      logout();
    } catch (error) {
      console.log("Error logging out:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h1>Homepage</h1>
        <p>This is HomePage</p>
        <button className="logoutBtn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Homepage;
