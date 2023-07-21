import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route ,Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./AuthContext";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
import FindProperty from "./pages/FindProperty";
import ListProperty from "./pages/ListProperty";
import Agents from "./pages/Contacts";
import Contacts from "./pages/Agents";

function App() {
  return (
    <div className="App">
            <Router>
                <AuthProvider>

                    <Routes>
                        <Route path="/login" element={<Loginpage/>}/>
                        <Route path="/" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
                        <Route path="/findproperty" element={<PrivateRoute><FindProperty/></PrivateRoute>}/>
                        <Route path="/listproperty" element={<PrivateRoute><ListProperty/></PrivateRoute>}/>
                        <Route path="/agents" element={<PrivateRoute><Agents/></PrivateRoute>}/>
                        <Route path="/contacts" element={<PrivateRoute><Contacts/></PrivateRoute>}/>
                        <Route path="*" element={<PrivateRoute><Homepage/></PrivateRoute>}/>
                    </Routes>

                </AuthProvider>
            </Router>
        </div>
  );
}

export default App;
