import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="App">
            <Router>
                <AuthProvider>

                    <Routes>
                        <Route path="/login" element={<Loginpage/>}/>
                        <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
                        <Route path="*" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
                    </Routes>

                </AuthProvider>
            </Router>
        </div>
  );
}

export default App;
