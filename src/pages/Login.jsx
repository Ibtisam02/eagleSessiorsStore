import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { Link } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../redux/authSlice";
import {useGoogleLogin} from "@react-oauth/google"
import toast from "react-hot-toast";

function Login() {
  const { user } = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { email, password: pass };
    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast.success("Logged In Successfully!")
      }
      else{
        toast.error("Failure! Commen Reason(Email Or Password is Invaid!)")
      }
    });
  };

  //google login

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
        onSubmit={handleSubmit}
        className="bg-white flex flex-col items-center py-8 px-6 w-full max-w-[400px] text-black rounded-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold my-4">Login</h1>
        <div className="flex flex-col justify-center items-center gap-y-6 w-full">
          {/* Email Input */}
          <div className="relative w-full">
            <MdEmail className="absolute w-6 h-6 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-lg py-2 pl-12 pr-4 w-full rounded-md bg-transparent text-black outline-none border border-gray-300 focus:border-black transition duration-300"
              id="email"
              type="email"
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
              onChange={(e) => setPass(e.target.value)}
              required
              className="text-lg py-2 pl-12 pr-12 w-full rounded-md bg-transparent text-black outline-none border border-gray-300 focus:border-black transition duration-300"
              id="password"
              type={showPass ? "text" : "password"}
            />
          </div>

          

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>

          {/* Login with Google */}
          <button
          onClick={googleLogin}
            type="button"
            className="w-full flex items-center justify-center bg-black text-white py-2 rounded-md font-semibold gap-x-2 hover:bg-gray-800 transition duration-300"
          >
            <FcGoogle className="w-5 h-5" />
            Login with Google
          </button>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-center text-sm">
          Don't have an account?{" "}
          <Link to={"/singup"} className="underline text-black hover:text-gray-500">
            Create Account
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
