import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      login(userCredentials.user);
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="lg:flex items-center justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="mt-40 px-12 bg-[#FFFAE9] sm:px-24 md:px-48 lg:px-12  xl:px-24 xl:max-w-2xl">
            <div className="cursor-pointer flex items-center justify-center p-6">
              <img src="/images/logo.svg" alt="Logo" />
            </div>
            <h2 className="text-center m-auto text-xl font-semibold xl:text-3xl xl:text-bold">
              Admin Login
            </h2>
            <div className="p-8 bg-[#FFFAE9]">
              <form onSubmit={handleLogin}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-10">
                  <button
                    className="bg-orange text-textwhite font-[Albert-sans] py-2 px-6 rounded-md duration-500"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
