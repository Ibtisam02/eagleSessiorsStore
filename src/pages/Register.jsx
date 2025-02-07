import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginWithGoogle, registerUser } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

function Register() {
  const dispatch = useDispatch();
  let navigate=useNavigate();
  let [showPass, setShowPass] = useState(false);

  // data to send to backend
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // handle backend request to create account
  const handleSubmitSingup = (e) => {
    e.preventDefault();
    let formData = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(registerUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success(data?.payload?.message+" please login now")
        navigate("/login")
      }
      else{
        toast.error('error! invalid credentils or account with this email already exist')
      }
    });
  };
  let responseGoogle=async (authResult)=>{
    try {
      console.log(authResult?.code);
      dispatch(loginWithGoogle(authResult?.code)).then((res)=>{
        console.log(res);
      })
      
    } catch (error) {
      console.error("Error while requesting google");
      
    }
  }
  let googleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:"auth-code"
  })

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-white">
      <form
        onSubmit={handleSubmitSingup}
        className="bg-white flex flex-col items-center py-8 px-6 w-full max-w-[400px] text-black rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold my-4">Create Account</h1>
        <div className="flex flex-col justify-center items-center gap-y-6 w-full">
          {/* Name Input */}
          <div className="relative w-full">
            <FaUser className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Full Name"
              className="text-lg py-2 pl-12 pr-4 w-full rounded-md bg-transparent text-black outline-none border border-gray-300 focus:border-black transition duration-300"
              id="name"
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="relative w-full">
            <MdEmail className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Email"
              className="text-lg py-2 pl-12 pr-4 w-full rounded-md bg-transparent text-black outline-none border border-gray-300 focus:border-black transition duration-300"
              id="email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full">
            <IoMdKey className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {showPass ? (
              <HiEye
                onClick={() => setShowPass(false)}
                className="absolute w-6 h-6 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            ) : (
              <HiEyeOff
                onClick={() => setShowPass(true)}
                className="absolute w-6 h-6 right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              />
            )}
            <input
              placeholder="Password"
              className="text-lg py-2 pl-12 pr-12 w-full rounded-md bg-transparent text-black outline-none border border-gray-300 focus:border-black transition duration-300"
              id="password"
              type={showPass ? "text" : "password"}
              value={password}
              required
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
          >
            Create Account
          </button>

          {/* Google Sign In Button */}
          <button
          onClick={googleLogin}
            type="button"
            className="w-full flex items-center justify-center bg-black text-white py-2 rounded-md font-semibold gap-x-2 hover:bg-gray-800 transition duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            Continue with Google
          </button>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline text-black hover:text-gray-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
