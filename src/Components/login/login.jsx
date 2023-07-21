import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useAuth } from "../../AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((credentials) => {
        login(credentials.user);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
          // Invalid email format
          toast.error("Invalid email");
        } else if (error.code === "auth/wrong-password") {
          // Wrong password
          toast.error("Wrong password");
        } else {
          // Other error cases
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <>
      <div className="lg:flex items-center justify-center">
        <div className="lg:w-1/2 xl:max-w-screen-sm">
          <div className="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
            <div className="cursor-pointer flex items-center">
              <div className="text-2xl text-indigo-800 tracking-wide ml-2 font-semibold">
                <img src="https://img.icons8.com/color/48/000000/whatsapp.png" />
              </div>
            </div>
          </div>
          <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
            <h2 className="text-center text-4xl text-indigo-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold">
              Log in
            </h2>
            <div className="mt-12">
              <form onSubmit={handleLogin}>
                <div>
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Email Address
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mt-8">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                      Password
                    </div>
                    <div>
                      <a className="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                  <input
                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-10">
                  <button
                    className="bg-indigo-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
              </form>
              <div className="mt-12 text-sm font-display font-semibold text-gray-700 text-center">
                Don &apos;t have an account ?
                <a className="cursor-pointer text-indigo-600 hover:text-indigo-800">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
