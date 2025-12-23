import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full mt-5">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10 ">
        <div className=" mb-2 flex justify-content">
          <Logo width="100%" className="mx-auto mb-6" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-zinc-700">
          SignIn to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-4">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address",
                },
              })}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
                validate: {
                  minLength: (value) =>
                    value.length >= 6 ||
                    "Password must be at least 6 characters long",
                },
              })}
            />

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              <span className="text-white text-lg font-medium">Sign In</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
